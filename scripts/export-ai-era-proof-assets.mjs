import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "img", "ai-era-proof", "source");
const outputDir = path.join(root, "img", "ai-era-proof");

const W = 1920;
const H = 1080;

const colors = {
  blue: "#0b2d53",
  blueDeep: "#132033",
  blueMid: "#193b64",
  gold: "#c49a45",
  goldSoft: "#f2e5c8",
  page: "#fbf7f0",
  surface: "#faf8f3",
  cream: "#f1e9dc",
  cool: "#e7eef5",
  border: "#e2ded0",
  textMuted: "#6f7785",
  quietBar: "#cfd9e3",
};

const beforeData = [
  ["Email", 6, "#6e9fcf"],
  ["Organic search", 9, "#c49a45"],
  ["Paid social", 5, "#9b7bd7"],
  ["Partners", 8, "#62a878"],
  ["Referrals", 15, "#dd8b5c"],
  ["Webinars", 10, "#4fb4c8"],
];

const afterData = [
  ["Referrals", 15],
  ["Webinars", 10],
  ["Organic search", 9],
  ["Partners", 8],
  ["Email", 6],
  ["Paid social", 5],
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fontFaces() {
  return `
    @font-face {
      font-family: "Merriweather";
      src: local("Merriweather");
    }
    @font-face {
      font-family: "Mulish";
      src: local("Mulish");
    }
  `;
}

function chartRows(data, { x, y, width, rowGap, barHeight, highlight = false }) {
  const max = 15;
  return data
    .map(([label, value, color], index) => {
      const rowY = y + index * rowGap;
      const barW = Math.round((value / max) * width);
      const fill = highlight
        ? label === "Referrals"
          ? colors.gold
          : colors.quietBar
        : color;
      const labelFill = highlight && label === "Referrals" ? colors.blueDeep : colors.blueMid;
      return `
        <text x="${x}" y="${rowY + 28}" class="axis-label" fill="${labelFill}">${esc(label)}</text>
        <rect x="${x + 250}" y="${rowY}" width="${barW}" height="${barHeight}" rx="16" fill="${fill}" />
        <text x="${x + 250 + barW + 22}" y="${rowY + 28}" class="value-label">${value}%</text>
      `;
    })
    .join("");
}

function beforeSlide({ annotated = false } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <style>
      ${fontFaces()}
      text { font-family: "Mulish", "Source Sans 3", Arial, sans-serif; }
      .title { font-family: "Merriweather", Georgia, serif; font-size: 74px; font-weight: 700; fill: ${colors.blue}; }
      .subtitle { font-size: 31px; fill: ${colors.textMuted}; }
      .chart-label { font-size: 28px; font-weight: 700; fill: ${colors.blueMid}; }
      .axis-label { font-size: 29px; font-weight: 700; }
      .value-label { font-size: 29px; font-weight: 800; fill: ${colors.blueDeep}; }
      .panel-title { font-family: "Merriweather", Georgia, serif; font-size: 42px; font-weight: 700; fill: ${colors.blueDeep}; }
      .bullet { font-size: 27px; fill: ${colors.blueMid}; }
      .footer { font-size: 22px; fill: ${colors.textMuted}; }
      .pin { font-size: 24px; font-weight: 900; fill: white; }
      .pin-label { font-size: 25px; font-weight: 900; fill: ${colors.blueDeep}; }
    </style>
    <linearGradient id="cornerGlow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${colors.goldSoft}" stop-opacity="0.8"/>
      <stop offset="1" stop-color="${colors.cool}" stop-opacity="0.25"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${colors.blue}"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="${colors.page}"/>
  <circle cx="1715" cy="115" r="180" fill="url(#cornerGlow)"/>
  <g opacity="0.28" fill="${colors.blue}">
    ${Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => `<circle cx="${1600 + col * 42}" cy="${58 + row * 42}" r="6"/>`).join("")
    ).join("")}
  </g>
  <text x="110" y="138" class="title">Lead Source Performance</text>
  <text x="113" y="191" class="subtitle">Q1 2026 Marketing Review</text>
  <text x="116" y="292" class="chart-label">Qualified-lead conversion rate</text>
  ${chartRows(beforeData, { x: 116, y: 345, width: 620, rowGap: 92, barHeight: 44 })}
  <rect x="1265" y="286" width="510" height="575" rx="34" fill="${colors.cool}" stroke="${colors.border}" stroke-width="3"/>
  <text x="1320" y="370" class="panel-title">Key Takeaways</text>
  <text x="1320" y="448" class="bullet">Referrals continue to</text>
  <text x="1320" y="489" class="bullet">perform well.</text>
  <text x="1320" y="566" class="bullet">Webinar leads show</text>
  <text x="1320" y="607" class="bullet">promising results.</text>
  <text x="1320" y="684" class="bullet">Paid social remains an</text>
  <text x="1320" y="725" class="bullet">important acquisition channel.</text>
  <text x="1320" y="802" class="bullet">Our channel mix creates</text>
  <text x="1320" y="843" class="bullet">multiple opportunities for growth.</text>
  <line x1="110" y1="972" x2="1810" y2="972" stroke="${colors.border}" stroke-width="3"/>
  <text x="110" y="1019" class="footer">Source: Illustrative sample data, Q1 2026</text>
  ${annotated ? annotations() : ""}
</svg>`;
}

function pin(n, x, y, label, tx, ty) {
  return `
    <line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="${colors.blue}" stroke-width="5" marker-end="url(#arrow)"/>
    <circle cx="${x}" cy="${y}" r="27" fill="${colors.blue}"/>
    <text x="${x}" y="${y + 9}" text-anchor="middle" class="pin">${n}</text>
    <rect x="${x + 42}" y="${y - 27}" width="${Math.max(330, label.length * 14)}" height="54" rx="18" fill="white" stroke="${colors.border}" stroke-width="3"/>
    <text x="${x + 65}" y="${y + 9}" class="pin-label">${esc(label)}</text>
  `;
}

function annotations() {
  return `
    <g>
      ${pin(1, 110, 245, "The title hides the point.", 265, 128)}
      ${pin(2, 690, 300, "Everything is shouting.", 665, 492)}
      ${pin(3, 108, 870, "The chart is tidy, not analytical.", 205, 714)}
      ${pin(4, 1190, 238, "More words, less clarity.", 1398, 520)}
      <path d="M1038 529 C1110 560 1112 704 1037 806" fill="none" stroke="${colors.blue}" stroke-width="7"/>
      ${pin(5, 770, 884, "The audience is doing the math.", 1038, 806)}
    </g>
  `;
}

function afterSlide() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <style>
      ${fontFaces()}
      text { font-family: "Mulish", "Source Sans 3", Arial, sans-serif; }
      .title { font-family: "Merriweather", Georgia, serif; font-size: 58px; font-weight: 700; fill: ${colors.blueDeep}; }
      .subtitle { font-size: 31px; fill: ${colors.textMuted}; }
      .axis-label { font-size: 31px; font-weight: 800; }
      .value-label { font-size: 31px; font-weight: 900; fill: ${colors.blueDeep}; }
      .callout { font-size: 35px; font-weight: 900; fill: ${colors.blueDeep}; }
      .implication { font-size: 32px; font-weight: 700; fill: ${colors.blueMid}; }
      .footer { font-size: 22px; fill: ${colors.textMuted}; }
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="${colors.page}"/>
  <text x="110" y="126" class="title">Referrals convert 3× more qualified leads</text>
  <text x="110" y="194" class="title">than paid social.</text>
  <text x="113" y="248" class="subtitle">Qualified-lead conversion rate by source, Q1 2026</text>
  <rect x="104" y="296" width="1398" height="562" rx="28" fill="${colors.surface}" stroke="${colors.border}" stroke-width="3"/>
  ${chartRows(afterData, { x: 150, y: 350, width: 900, rowGap: 75, barHeight: 40, highlight: true })}
  <path d="M1168 333 C1250 430 1250 675 1168 753" fill="none" stroke="${colors.gold}" stroke-width="8"/>
  <circle cx="1277" cy="543" r="76" fill="${colors.goldSoft}" stroke="${colors.gold}" stroke-width="5"/>
  <text x="1277" y="557" text-anchor="middle" class="callout">3×</text>
  <text x="1368" y="512" class="implication">Referrals are the</text>
  <text x="1368" y="555" class="implication">clearest signal.</text>
  <rect x="110" y="884" width="1585" height="86" rx="24" fill="${colors.cool}" opacity="0.78"/>
  <text x="145" y="939" class="implication">The strongest next question is whether referral volume can grow without reducing lead quality.</text>
  <line x1="110" y1="1004" x2="1810" y2="1004" stroke="${colors.border}" stroke-width="3"/>
  <text x="110" y="1046" class="footer">Source: Illustrative sample data, Q1 2026</text>
</svg>`;
}

function slidePage(svg) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:100%;height:100%;background:${colors.page};}svg{display:block;width:100vw;height:100vh;}</style></head><body>${svg.replace(/^<\?xml[^>]+>\s*/, "")}</body></html>`;
}

function imageTag(svg, label) {
  const data = Buffer.from(svg).toString("base64");
  return `<img src="data:image/svg+xml;base64,${data}" alt="${label}">`;
}

function comparisonPage(beforeAnnotatedSvg, afterSvg) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:2400px;height:1350px;background:${colors.page};font-family:Mulish,Arial,sans-serif;color:${colors.blueDeep};}
    body{box-sizing:border-box;padding:72px;}
    h1{font-family:Merriweather,Georgia,serif;font-size:74px;margin:0 0 18px;}
    p{font-size:32px;margin:0 0 40px;color:${colors.blueMid};}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:start;}
    figure{margin:0;display:grid;gap:16px;}
    figcaption{font-size:30px;font-weight:900;color:${colors.blue};}
    img{display:block;width:100%;border:1px solid ${colors.border};border-radius:28px;box-shadow:0 18px 40px rgba(11,45,83,.12);background:white;}
  </style></head><body>
    <h1>A polished slide is not the same as a room-ready slide.</h1>
    <p>The expert pass makes the takeaway visible, removes unsupported noise, and gives the audience less work to do.</p>
    <div class="grid">
      <figure><figcaption>Before</figcaption>${imageTag(beforeAnnotatedSvg, "Annotated before slide")}</figure>
      <figure><figcaption>Expert pass</figcaption>${imageTag(afterSvg, "Expert pass slide")}</figure>
    </div>
  </body></html>`;
}

function mobileStackPage(beforeAnnotatedSvg, afterSvg) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:1080px;height:1350px;background:${colors.page};font-family:Mulish,Arial,sans-serif;color:${colors.blueDeep};}
    body{box-sizing:border-box;padding:48px;}
    h1{font-family:Merriweather,Georgia,serif;font-size:55px;line-height:1.08;margin:0 0 16px;}
    p{font-size:25px;line-height:1.35;margin:0 0 28px;color:${colors.blueMid};}
    .stack{display:grid;gap:20px;}
    img{display:block;width:100%;border:1px solid ${colors.border};border-radius:24px;background:white;}
    .caption{font-size:26px;font-weight:800;color:${colors.blueDeep};}
  </style></head><body>
    <h1>AI gets you to a draft. Expert review gets it ready for the room.</h1>
    <p>A polished slide can still make the audience work too hard.</p>
    <div class="stack">
      ${imageTag(beforeAnnotatedSvg, "Annotated before slide")}
      ${imageTag(afterSvg, "Expert pass slide")}
      <p class="caption">The expert pass states the finding, sorts the evidence, highlights the signal, and removes unsupported noise.</p>
    </div>
  </body></html>`;
}

async function screenshotHtml(browser, html, outputPath, viewport, type = "png", quality) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  if (type === "webp") {
    const pngBuffer = await page.screenshot({ type: "png", fullPage: false });
    const dataUrl = await page.evaluate(
      async ({ base64, width, height, imageQuality }) => {
        const image = new Image();
        image.src = `data:image/png;base64,${base64}`;
        await image.decode();
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        return canvas.toDataURL("image/webp", imageQuality);
      },
      {
        base64: pngBuffer.toString("base64"),
        width: viewport.width,
        height: viewport.height,
        imageQuality: quality ? quality / 100 : 0.82,
      },
    );
    fs.writeFileSync(outputPath, Buffer.from(dataUrl.split(",")[1], "base64"));
  } else {
    await page.screenshot({ path: outputPath, type, quality, fullPage: false });
  }
  await page.close();
}

async function main() {
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const before = beforeSlide();
  const annotated = beforeSlide({ annotated: true });
  const after = afterSlide();

  const sourceFiles = [
    ["son_ai-era-proof-asset_lead-sources_before_v01.svg", before],
    ["son_ai-era-proof-asset_lead-sources_before-annotated_v01.svg", annotated],
    ["son_ai-era-proof-asset_lead-sources_after_v01.svg", after],
  ];

  for (const [name, svg] of sourceFiles) {
    fs.writeFileSync(path.join(sourceDir, name), svg.replace(/[ \t]+$/gm, ""), "utf8");
  }

  const browser = await chromium.launch();
  try {
    await screenshotHtml(browser, slidePage(before), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_before_v01.png"), { width: 1920, height: 1080 });
    await screenshotHtml(browser, slidePage(annotated), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_before-annotated_v01.png"), { width: 1920, height: 1080 });
    await screenshotHtml(browser, slidePage(after), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_after_v01.png"), { width: 1920, height: 1080 });
    await screenshotHtml(browser, slidePage(before), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_before-web_v01.webp"), { width: 1600, height: 900 }, "webp", 82);
    await screenshotHtml(browser, slidePage(annotated), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_before-annotated-web_v01.webp"), { width: 1600, height: 900 }, "webp", 82);
    await screenshotHtml(browser, slidePage(after), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_after-web_v01.webp"), { width: 1600, height: 900 }, "webp", 82);
    await screenshotHtml(browser, comparisonPage(annotated, after), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_comparison-desktop_v01.webp"), { width: 2400, height: 1350 }, "webp", 82);
    await screenshotHtml(browser, mobileStackPage(annotated, after), path.join(outputDir, "son_ai-era-proof-asset_lead-sources_mobile-stack_v01.webp"), { width: 1080, height: 1350 }, "webp", 82);
  } finally {
    await browser.close();
  }

  console.log(`Exported AI-era proof assets to ${path.relative(root, outputDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
