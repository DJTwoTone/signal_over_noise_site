const fs = require("fs");
const path = require("path");
const https = require("https");

const KO_PAGE_PATHS = [
  "ko/index.html",
  "ko/services/index.html",
  "ko/process/index.html",
  "ko/proof/index.html",
  "ko/workshops/index.html",
  "ko/diagnostic/index.html",
  "ko/get-started/index.html",
  "ko/contact/index.html",
  "ko/toolkit/index.html",
  "ko/thanks/index.html",
  "ko/privacy/index.html",
  "ko/packages/index.html",
];

const TRANSLATABLE_TAGS = [
  "title",
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "span",
  "a",
  "li",
  "figcaption",
  "button",
];

const TRANSLATABLE_ATTRS = ["alt", "aria-label"];

const cache = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hasKorean(text) {
  return /[\u3131-\uD79D]/.test(text);
}

function shouldTranslate(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }

  if (trimmed.includes("TODO(i18n)")) {
    return false;
  }

  if (hasKorean(trimmed)) {
    return false;
  }

  if (/^[0-9\s\W_]+$/.test(trimmed)) {
    return false;
  }

  if (trimmed.length > 280) {
    return false;
  }

  return true;
}

function decodeGooglePayload(payload) {
  const parsed = JSON.parse(payload);
  if (!Array.isArray(parsed) || !Array.isArray(parsed[0])) {
    return "";
  }

  return parsed[0]
    .map((part) => (Array.isArray(part) ? part[0] : ""))
    .join("")
    .trim();
}

function translateText(text) {
  if (cache.has(text)) {
    return Promise.resolve(cache.get(text));
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(text)}`;

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Translator HTTP ${res.statusCode}`));
          return;
        }

        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            const translated = decodeGooglePayload(body);
            if (!translated) {
              reject(new Error("No translation payload returned"));
              return;
            }

            cache.set(text, translated);
            resolve(translated);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);

    req.setTimeout(12000, () => {
      req.destroy(new Error("Translator request timeout"));
    });
  });
}

async function replaceTagContents(html) {
  for (const tag of TRANSLATABLE_TAGS) {
    const re = new RegExp(`<${tag}(\\s[^>]*)?>([^<]+)</${tag}>`, "g");
    const matches = [...html.matchAll(re)];

    for (const match of matches) {
      const full = match[0];
      const attrs = match[1] || "";
      const content = match[2] || "";

      if (!shouldTranslate(content)) {
        continue;
      }

      const translated = await translateText(content.trim());
      console.log(`  [${tag}] ${content.trim().slice(0, 50)}...`);
      const leading = content.match(/^\s*/)[0];
      const trailing = content.match(/\s*$/)[0];
      const next = `<${tag}${attrs}>${leading}${translated}${trailing}</${tag}>`;
      html = html.replace(full, next);
      await sleep(80);
    }
  }

  return html;
}

async function replaceAttributeValues(html) {
  for (const attr of TRANSLATABLE_ATTRS) {
    const re = new RegExp(`${attr}="([^"]+)"`, "g");
    const matches = [...html.matchAll(re)];

    for (const match of matches) {
      const full = match[0];
      const value = match[1];

      if (!shouldTranslate(value)) {
        continue;
      }

      const translated = await translateText(value);
      const next = `${attr}="${translated.replace(/"/g, "&quot;")}"`;
      html = html.replace(full, next);
      await sleep(80);
    }
  }

  return html;
}

async function replaceMetaDescription(html) {
  const re = /<meta\s+name="description"\s+content="([^"]*)"\s*>/i;
  const match = html.match(re);
  if (!match) {
    return html;
  }

  const value = match[1] || "";
  if (!shouldTranslate(value)) {
    return html;
  }

  const translated = await translateText(value);
  const updated = `<meta name="description" content="${translated.replace(/"/g, "&quot;")}">`;
  return html.replace(match[0], updated);
}

async function translateFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  html = await replaceMetaDescription(html);
  html = await replaceTagContents(html);
  html = await replaceAttributeValues(html);
  fs.writeFileSync(filePath, html, "utf8");
}

async function main() {
  for (const relPath of KO_PAGE_PATHS) {
    const fullPath = path.join(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
      continue;
    }

    console.log(`Translating ${relPath}...`);
    await translateFile(fullPath);
  }

  console.log("Korean draft generation complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
