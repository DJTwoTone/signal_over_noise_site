import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(process.cwd());
const host = "127.0.0.1";
const port = 8787;
const baseUrl = `http://${host}:${port}`;
const trackingKeys = ["source", "originPage", "cta_clicked"];

const seedRoutes = [
  "/",
  "/services/",
  "/process/",
  "/proof/",
  "/workshops/",
  "/diagnostic/",
  "/get-started/",
  "/contact/",
  "/toolkit/",
  "/thanks-get-started/",
  "/ko/",
  "/ko/services/",
  "/ko/process/",
  "/ko/proof/",
  "/ko/workshops/",
  "/ko/diagnostic/",
  "/ko/get-started/",
  "/ko/contact/",
  "/ko/toolkit/",
  "/ko/thanks-get-started/",
];

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".xml") return "application/xml; charset=utf-8";
  if (ext === ".webmanifest") return "application/manifest+json; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";

  return "application/octet-stream";
}

function resolveStaticPath(urlPath) {
  let pathname = decodeURIComponent(new URL(urlPath, baseUrl).pathname);
  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  return path.join(root, pathname.replace(/^\//, ""));
}

function resolveInsightsBuildPath(urlPath) {
  let pathname = decodeURIComponent(new URL(urlPath, baseUrl).pathname);
  if (pathname === "/insights/") {
    return path.join(root, ".insights-build", "insights", "index.html");
  }

  if (pathname.startsWith("/insights/") && pathname.endsWith("/")) {
    const rel = pathname.replace(/^\/insights\//, "").replace(/\/$/, "");
    return path.join(root, ".insights-build", "insights", rel, "index.html");
  }

  return "";
}

function isHtmlRoute(pathname) {
  return !/\.(css|js|json|xml|png|jpe?g|webp|svg|ico|pdf|txt|map)$/i.test(pathname);
}

function normalizeRoute(urlString) {
  const url = new URL(urlString, baseUrl);
  url.hash = "";
  return `${url.pathname}${url.search}`;
}

function hasTrackingParams(url) {
  return trackingKeys.some((key) => url.searchParams.has(key));
}

const server = http.createServer((req, res) => {
  try {
    const absolutePath = resolveStaticPath(req.url || "/");

    if (!absolutePath.startsWith(root)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    let filePath = absolutePath;
    if (!fs.existsSync(filePath)) {
      const dirIndex = path.join(absolutePath, "index.html");
      if (fs.existsSync(dirIndex)) {
        filePath = dirIndex;
      }
    }

    if (!fs.existsSync(filePath)) {
      const insightsPath = resolveInsightsBuildPath(req.url || "/");
      if (insightsPath && fs.existsSync(insightsPath)) {
        filePath = insightsPath;
      }
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    res.setHeader("Content-Type", contentType(filePath));
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.end(String(error));
  }
});

await new Promise((resolve) => server.listen(port, host, resolve));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const queue = [...seedRoutes];
const visited = new Set();
const trackingHits = new Set();
const crawlFailures = [];

while (queue.length && visited.size < 120) {
  const route = queue.shift();
  const url = new URL(route, baseUrl).toString();
  const routeKey = normalizeRoute(url);

  if (visited.has(routeKey)) {
    continue;
  }

  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

    if (!response || !response.ok()) {
      crawlFailures.push(`${url} -> ${response ? response.status() : "no-response"}`);
      visited.add(routeKey);
      continue;
    }

    await page.waitForTimeout(350);

    const hrefs = await page.$$eval("a[href]", (anchors) => anchors.map((anchor) => anchor.href));

    for (const href of hrefs) {
      let parsed;
      try {
        parsed = new URL(href);
      } catch {
        continue;
      }

      if (parsed.origin !== new URL(baseUrl).origin) {
        continue;
      }

      if (hasTrackingParams(parsed)) {
        trackingHits.add(`${parsed.pathname}${parsed.search}`);
      }

      if (isHtmlRoute(parsed.pathname)) {
        const candidate = `${parsed.pathname}${parsed.search}`;
        if (!visited.has(candidate) && !queue.includes(candidate)) {
          queue.push(candidate);
        }
      }
    }

    visited.add(routeKey);
  } catch (error) {
    crawlFailures.push(`${url} -> ${error.message}`);
    visited.add(routeKey);
  }
}

await context.close();
await browser.close();
await new Promise((resolve) => server.close(resolve));

console.log(`Crawled routes: ${visited.size}`);
console.log(`Internal tracked-link variants found: ${trackingHits.size}`);
if (trackingHits.size > 0) {
  for (const hit of [...trackingHits].sort()) {
    console.log(`- ${hit}`);
  }
}

console.log(`Crawl failures: ${crawlFailures.length}`);
if (crawlFailures.length > 0) {
  for (const failure of crawlFailures) {
    console.log(`- ${failure}`);
  }
}

if (trackingHits.size > 0) {
  process.exitCode = 1;
}
