import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://signal-over-noise.coach";
const REPORT_PATH = "docs/admin/indexing-safety-report.md";

const intentionalNoindexFiles = new Set([
  "packages/index.html",
  "ko/packages/index.html",
  "thanks/index.html",
  "ko/thanks/index.html",
  "thanks-diagnostic/index.html",
  "thanks-get-started/index.html",
  "thanks-toolkit/index.html",
  "thanks-workshop/index.html",
  "ko/thanks-diagnostic/index.html",
  "ko/thanks-get-started/index.html",
  "ko/thanks-toolkit/index.html",
  "ko/thanks-workshop/index.html",
]);

function normalizeSlashes(value) {
  return value.replaceAll("\\", "/");
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function robotsFromHtml(html) {
  const match = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
  return match ? match[1].trim() : "";
}

function routePathFromUrl(url) {
  const parsed = new URL(url);
  let pathname = parsed.pathname;
  if (!pathname.endsWith("/")) {
    pathname = `${pathname}/`;
  }
  return pathname;
}

function fileForRoute(route) {
  if (route === "/") {
    return "index.html";
  }

  return normalizeSlashes(path.join(route.slice(1), "index.html"));
}

function listHtmlFiles(dir) {
  const htmlFiles = [];

  if (!fs.existsSync(dir)) {
    return htmlFiles;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      htmlFiles.push(...listHtmlFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      htmlFiles.push(normalizeSlashes(fullPath));
    }
  }

  return htmlFiles;
}

function getSitemapLocs() {
  const sitemap = readIfExists("sitemap.xml");
  if (!sitemap) {
    return [];
  }

  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function formatList(items) {
  if (items.length === 0) {
    return "- None\n";
  }

  return items.map((item) => `- ${item}`).join("\n") + "\n";
}

function run() {
  const now = new Date();
  const iso = now.toISOString();
  const warnings = [];
  const errors = [];
  const intentionalNoindexSeen = [];
  const unexpectedNoindex = [];
  const implicitIndexPages = [];

  const sitemapLocs = getSitemapLocs();
  const sitemapNoindexConflicts = [];
  const inspectedSourceFiles = new Set();

  for (const loc of sitemapLocs) {
    if (!loc.startsWith(`${SITE_URL}/`)) {
      warnings.push(`Sitemap has non-apex URL: ${loc}`);
      continue;
    }

    const route = routePathFromUrl(loc);
    const filePath = fileForRoute(route);
    inspectedSourceFiles.add(filePath);

    const html = readIfExists(filePath);
    if (!html) {
      continue;
    }

    const robots = robotsFromHtml(html);
    if (!robots) {
      implicitIndexPages.push(filePath);
      continue;
    }

    if (/noindex/i.test(robots)) {
      if (intentionalNoindexFiles.has(filePath)) {
        intentionalNoindexSeen.push(`${filePath} (${robots})`);
      } else {
        unexpectedNoindex.push(`${filePath} (${robots})`);
      }
      sitemapNoindexConflicts.push(`${loc} -> ${filePath} (${robots})`);
    }
  }

  for (const filePath of intentionalNoindexFiles) {
    if (inspectedSourceFiles.has(filePath)) {
      continue;
    }

    const html = readIfExists(filePath);
    if (!html) {
      continue;
    }

    const robots = robotsFromHtml(html);
    if (/noindex/i.test(robots)) {
      intentionalNoindexSeen.push(`${filePath} (${robots})`);
    }
  }

  const generatedTargets = [".insights-build/insights", "dist/insights"];
  for (const target of generatedTargets) {
    if (!fs.existsSync(target)) {
      continue;
    }

    const htmlFiles = listHtmlFiles(target);
    for (const htmlFile of htmlFiles) {
      const html = fs.readFileSync(htmlFile, "utf8");
      const robots = robotsFromHtml(html);
      if (!robots) {
        implicitIndexPages.push(htmlFile);
        continue;
      }

      if (/noindex/i.test(robots)) {
        unexpectedNoindex.push(`${htmlFile} (${robots})`);
      }
    }
  }

  if (sitemapNoindexConflicts.length > 0) {
    errors.push(...sitemapNoindexConflicts.map((item) => `Sitemap includes noindex URL: ${item}`));
  }

  if (unexpectedNoindex.length > 0) {
    errors.push(...unexpectedNoindex.map((item) => `Unexpected noindex: ${item}`));
  }

  const status = errors.length > 0 ? "FAIL" : "PASS";
  const report = [
    "# Indexing Safety Report",
    "",
    `- Generated at (UTC): ${iso}`,
    `- Status: ${status}`,
    `- Sitemap URLs checked: ${sitemapLocs.length}`,
    "",
    "## Intentional Noindex Pages Found",
    formatList([...new Set(intentionalNoindexSeen)].sort()),
    "## Unexpected Noindex Findings",
    formatList([...new Set(unexpectedNoindex)].sort()),
    "## Pages Using Implicit Indexing (No Robots Meta)",
    formatList([...new Set(implicitIndexPages)].sort()),
    "## Warnings",
    formatList([...new Set(warnings)].sort()),
    "## Errors",
    formatList([...new Set(errors)].sort()),
  ].join("\n");

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, report, "utf8");

  if (errors.length > 0) {
    console.error(`Indexing safety report: ${status}. See ${REPORT_PATH}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Indexing safety report: ${status}. Wrote ${REPORT_PATH}`);
}

run();