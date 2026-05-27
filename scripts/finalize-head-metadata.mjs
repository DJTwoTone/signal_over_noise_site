import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://signal-over-noise.coach";
const SOCIAL_IMAGE = `${SITE_URL}/img/signal-over-noise-square-logo.png`;
const THEME_COLOR = "#0b2d53";

const routeFiles = [
  "index.html",
  "services/index.html",
  "process/index.html",
  "proof/index.html",
  "workshops/index.html",
  "diagnostic/index.html",
  "get-started/index.html",
  "contact/index.html",
  "toolkit/index.html",
  "thanks/index.html",
  "privacy/index.html",
  "packages/index.html",
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

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rootPrefixFor(filePath) {
  const dir = path.dirname(filePath);
  const relativeRoot = dir === "." ? "." : path.relative(dir, ".").replace(/\\/g, "/");
  return `${relativeRoot}/`;
}

function getRequired(html, filePath, pattern, label) {
  const value = html.match(pattern)?.[1]?.trim();
  if (!value) {
    throw new Error(`${filePath}: missing ${label}`);
  }

  return value;
}

function removeGeneratedHeadMetadata(html) {
  return html
    .replace(/^\s*<meta\s+property="og:[^\n]*\n/gim, "")
    .replace(/^\s*<meta\s+name="twitter:[^\n]*\n/gim, "")
    .replace(/^\s*<meta\s+name="theme-color"[^\n]*\n/gim, "")
    .replace(/^\s*<link\s+rel="apple-touch-icon"[^\n]*\n/gim, "")
    .replace(/^\s*<link\s+rel="manifest"[^\n]*\n/gim, "");
}

function alignDeprecatedPackageAlternates(html) {
  return html
    .replace(/<link rel="alternate" hreflang="en" href="[^"]+">/, `<link rel="alternate" hreflang="en" href="${SITE_URL}/services/">`)
    .replace(/<link rel="alternate" hreflang="ko" href="[^"]+">/, `<link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/services/">`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]+">/, `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/services/">`);
}

function ensureThanksNoindex(html) {
  if (/<meta\s+name="robots"/i.test(html)) {
    return html;
  }

  return html.replace(
    /(\s*<link rel="alternate" hreflang="x-default"[^\n]*>\r?\n)/,
    `$1    <meta name="robots" content="noindex, follow">\n`,
  );
}

function buildMetadataBlock({ title, description, canonical, rootPrefix }) {
  return [
    `    <meta property="og:title" content="${escapeAttr(title)}">`,
    `    <meta property="og:description" content="${escapeAttr(description)}">`,
    `    <meta property="og:type" content="website">`,
    `    <meta property="og:url" content="${escapeAttr(canonical)}">`,
    `    <meta property="og:image" content="${SOCIAL_IMAGE}">`,
    `    <meta property="og:image:alt" content="Signal over Noise logo">`,
    `    <meta name="twitter:card" content="summary">`,
    `    <meta name="twitter:title" content="${escapeAttr(title)}">`,
    `    <meta name="twitter:description" content="${escapeAttr(description)}">`,
    `    <meta name="twitter:image" content="${SOCIAL_IMAGE}">`,
    `    <meta name="theme-color" content="${THEME_COLOR}">`,
    `    <link rel="apple-touch-icon" href="${rootPrefix}img/signal-over-noise-square-logo.png">`,
    `    <link rel="manifest" href="${rootPrefix}site.webmanifest">`,
  ].join("\n");
}

function updateRoute(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const title = getRequired(html, filePath, /<title>([^<]*)<\/title>/i, "title");
  const description = getRequired(html, filePath, /<meta\s+name="description"\s+content="([^"]*)"/i, "description");
  const canonical = getRequired(html, filePath, /<link\s+rel="canonical"\s+href="([^"]*)"/i, "canonical");

  html = removeGeneratedHeadMetadata(html);

  if (filePath === "packages/index.html" || filePath === "ko/packages/index.html") {
    html = alignDeprecatedPackageAlternates(html);
  }

  if (filePath === "thanks/index.html" || filePath === "ko/thanks/index.html") {
    html = ensureThanksNoindex(html);
  }

  const block = buildMetadataBlock({
    title,
    description,
    canonical,
    rootPrefix: rootPrefixFor(filePath),
  });

  const insertPoint = /(\s*<(?:meta name="robots"|link rel="alternate" hreflang="x-default")[^\n]*>\r?\n)/;
  if (!insertPoint.test(html)) {
    throw new Error(`${filePath}: could not find metadata insertion point`);
  }

  fs.writeFileSync(filePath, html.replace(insertPoint, `$1${block}\n`), "utf8");
}

function removeNoindexRoutesFromSitemap() {
  let sitemap = fs.readFileSync("sitemap.xml", "utf8");
  sitemap = sitemap.replace(
    /\n\s*<url>\s*\n\s*<loc>https:\/\/signal-over-noise\.coach\/(?:ko\/)?thanks\/<\/loc>[\s\S]*?\n\s*<\/url>/g,
    "",
  );
  sitemap = sitemap.replace(/\r\n/g, "\n").replace(/\r/g, "");
  sitemap = sitemap.replace(/\n{3,}/g, "\n\n");
  fs.writeFileSync("sitemap.xml", sitemap, "utf8");
}

for (const filePath of routeFiles) {
  updateRoute(filePath);
}

removeNoindexRoutesFromSitemap();
console.log(`Finalized head metadata for ${routeFiles.length} route files.`);
