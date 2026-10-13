import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const rootSitemapPath = path.join(root, "sitemap.xml");
const insightsSitemapPath = path.join(root, ".insights-build", "insights-sitemap.xml");
const SITE = "https://signal-over-noise.coach";

function parseLocEntries(xml) {
  return [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)]
    .map((match) => match[0])
    .filter((urlBlock) => {
      const loc = urlBlock.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
      return Boolean(loc && loc.startsWith(`${SITE}/insights/`));
    });
}

function buildInsightUrlBlock(urlBlocks) {
  return urlBlocks
    .map((block) => block
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "")
      .trim()
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n"))
    .join("\n");
}

function syncRootSitemap() {
  if (!fs.existsSync(rootSitemapPath)) {
    throw new Error("Missing root sitemap.xml");
  }

  if (!fs.existsSync(insightsSitemapPath)) {
    throw new Error("Missing .insights-build/insights-sitemap.xml. Run build:insights first.");
  }

  const rootSitemap = fs.readFileSync(rootSitemapPath, "utf8");
  const insightsSitemap = fs.readFileSync(insightsSitemapPath, "utf8");

  const insightUrlBlocks = parseLocEntries(insightsSitemap);
  if (insightUrlBlocks.length === 0) {
    throw new Error("No insight routes found in .insights-build/insights-sitemap.xml");
  }

  const freshInsightBlock = buildInsightUrlBlock(insightUrlBlocks);

  let next = rootSitemap;

  const markerPattern = /(\s*<!-- insights:start -->)[\s\S]*?(<!-- insights:end -->)/;
  if (markerPattern.test(next)) {
    next = next.replace(markerPattern, `$1\n${freshInsightBlock}\n  $2`);
  } else {
    // Remove any existing root sitemap entries for /insights/ pages.
    next = next.replace(/\s*<url>\s*<loc>https:\/\/signal-over-noise\.coach\/insights\/[\s\S]*?<\/url>\s*/g, "\n");

    // Keep spacing tidy before appending refreshed insight routes.
    next = next.replace(/\n{3,}/g, "\n\n").trimEnd();

    // Insert refreshed /insights/ URLs at the end of the urlset.
    next = next.replace(/\s*<\/urlset>\s*$/, `\n\n  <!-- insights:start -->\n${freshInsightBlock}\n  <!-- insights:end -->\n</urlset>\n`);
  }

  if (next === rootSitemap) {
    console.log("sitemap.xml already in sync with insights sitemap.");
    return;
  }

  fs.writeFileSync(rootSitemapPath, next, "utf8");
  console.log(`Updated sitemap.xml with ${insightUrlBlocks.length} insights route(s).`);
}

syncRootSitemap();
