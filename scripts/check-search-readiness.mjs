import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://signal-over-noise.coach";
const SOCIAL_IMAGE = `${SITE_URL}/img/signal-over-noise-square-logo.png`;

const importantRoutes = [
  { route: "/", file: "index.html", required: true },
  { route: "/services/", file: "services/index.html", required: true },
  { route: "/diagnostic/", file: "diagnostic/index.html", required: true },
  { route: "/toolkit/", file: "toolkit/index.html", required: true },
  { route: "/workshops/", file: "workshops/index.html", required: true },
  { route: "/proof/", file: "proof/index.html", required: true },
  { route: "/contact/", file: "contact/index.html", required: true },
  { route: "/get-started/", file: "get-started/index.html", required: true },
  { route: "/thanks/", file: "thanks/index.html", required: true },
  { route: "/thanks-diagnostic/", file: "thanks-diagnostic/index.html", required: true },
  { route: "/thanks-get-started/", file: "thanks-get-started/index.html", required: true },
  { route: "/thanks-toolkit/", file: "thanks-toolkit/index.html", required: true },
  { route: "/thanks-workshop/", file: "thanks-workshop/index.html", required: true },
  { route: "/ko/thanks-diagnostic/", file: "ko/thanks-diagnostic/index.html", required: true },
  { route: "/ko/thanks-get-started/", file: "ko/thanks-get-started/index.html", required: true },
  { route: "/ko/thanks-toolkit/", file: "ko/thanks-toolkit/index.html", required: true },
  { route: "/ko/thanks-workshop/", file: "ko/thanks-workshop/index.html", required: true },
];

const routeFiles = [
  "index.html",
  "services/index.html",
  "diagnostic/index.html",
  "toolkit/index.html",
  "workshops/index.html",
  "proof/index.html",
  "contact/index.html",
  "get-started/index.html",
  "thanks/index.html",
  "thanks-diagnostic/index.html",
  "thanks-get-started/index.html",
  "thanks-toolkit/index.html",
  "thanks-workshop/index.html",
  "privacy/index.html",
  "process/index.html",
  "packages/index.html",
  "ko/index.html",
  "ko/services/index.html",
  "ko/diagnostic/index.html",
  "ko/toolkit/index.html",
  "ko/workshops/index.html",
  "ko/proof/index.html",
  "ko/contact/index.html",
  "ko/get-started/index.html",
  "ko/thanks/index.html",
  "ko/thanks-diagnostic/index.html",
  "ko/thanks-get-started/index.html",
  "ko/thanks-toolkit/index.html",
  "ko/thanks-workshop/index.html",
  "ko/privacy/index.html",
  "ko/process/index.html",
  "ko/packages/index.html",
];

const noindexRoutes = new Set([
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

const canonicalTargets = new Map([
  ["packages/index.html", `${SITE_URL}/services/`],
  ["ko/packages/index.html", `${SITE_URL}/ko/services/`],
]);

const warnings = [];
const errors = [];

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function getTagContent(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : "";
}

function checkRouteFile(relPath) {
  const html = readIfExists(relPath);
  if (!html) {
    errors.push(`Missing route file: ${relPath}`);
    return;
  }

  const expectedCanonical = canonicalTargets.get(relPath);
  const isNoindexRoute = noindexRoutes.has(relPath);
  const title = getTagContent(html, /<title>([^<]+)<\/title>/i);
  const description = getTagContent(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = getTagContent(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = getTagContent(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const ogTitle = getTagContent(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescription = getTagContent(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogType = getTagContent(html, /<meta\s+property="og:type"\s+content="([^"]*)"/i);
  const ogUrl = getTagContent(html, /<meta\s+property="og:url"\s+content="([^"]*)"/i);
  const ogImage = getTagContent(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const ogImageAlt = getTagContent(html, /<meta\s+property="og:image:alt"\s+content="([^"]*)"/i);
  const twitterCard = getTagContent(html, /<meta\s+name="twitter:card"\s+content="([^"]*)"/i);
  const twitterTitle = getTagContent(html, /<meta\s+name="twitter:title"\s+content="([^"]*)"/i);
  const twitterDescription = getTagContent(html, /<meta\s+name="twitter:description"\s+content="([^"]*)"/i);
  const twitterImage = getTagContent(html, /<meta\s+name="twitter:image"\s+content="([^"]*)"/i);
  const themeColor = getTagContent(html, /<meta\s+name="theme-color"\s+content="([^"]*)"/i);
  const appleTouchIcon = getTagContent(html, /<link\s+rel="apple-touch-icon"\s+href="([^"]+)"/i);
  const manifest = getTagContent(html, /<link\s+rel="manifest"\s+href="([^"]+)"/i);

  if (!title) {
    errors.push(`${relPath}: missing title tag`);
  }

  if (!description) {
    errors.push(`${relPath}: missing meta description`);
  }

  if (!canonical) {
    errors.push(`${relPath}: missing canonical link`);
  } else if (!canonical.startsWith(`${SITE_URL}/`)) {
    errors.push(`${relPath}: canonical is not an apex absolute URL (${canonical})`);
  } else if (expectedCanonical && canonical !== expectedCanonical) {
    errors.push(`${relPath}: canonical should point to ${expectedCanonical} (${canonical})`);
  }

  if (isNoindexRoute && !/noindex,\s*follow/i.test(robots)) {
    errors.push(`${relPath}: expected noindex, follow robots directive`);
  }

  if (/noindex/i.test(robots) && !isNoindexRoute) {
    errors.push(`${relPath}: unexpected noindex directive`);
  }

  const alternates = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="(en|ko|x-default)"\s+href="([^"]+)"/gi)];
  for (const href of alternates) {
    if (!href[2].startsWith(`${SITE_URL}/`)) {
      errors.push(`${relPath}: alternate hreflang is not an apex absolute URL (${href[2]})`);
    }
  }

  if (relPath === "packages/index.html" && !alternates.every((match) => !match[2].includes("/packages/"))) {
    errors.push(`${relPath}: deprecated package route has hreflang alternates pointing at /packages/`);
  }

  if (relPath === "ko/packages/index.html" && !alternates.every((match) => !match[2].includes("/packages/"))) {
    errors.push(`${relPath}: deprecated package route has hreflang alternates pointing at /packages/`);
  }

  const socialChecks = [
    ["og:title", ogTitle, title],
    ["og:description", ogDescription, description],
    ["og:type", ogType, "website"],
    ["og:url", ogUrl, canonical],
    ["og:image", ogImage, SOCIAL_IMAGE],
    ["og:image:alt", ogImageAlt, "Signal over Noise logo"],
    ["twitter:card", twitterCard, "summary"],
    ["twitter:title", twitterTitle, title],
    ["twitter:description", twitterDescription, description],
    ["twitter:image", twitterImage, SOCIAL_IMAGE],
  ];

  for (const [name, actual, expected] of socialChecks) {
    if (!actual) {
      errors.push(`${relPath}: missing ${name}`);
    } else if (expected && actual !== expected) {
      errors.push(`${relPath}: ${name} should match expected metadata (${actual})`);
    }
  }

  if (!themeColor) {
    errors.push(`${relPath}: missing theme-color`);
  }

  if (!appleTouchIcon) {
    errors.push(`${relPath}: missing apple-touch-icon`);
  }

  if (!manifest) {
    errors.push(`${relPath}: missing web app manifest`);
  }
}

function checkImportantRoutes() {
  for (const item of importantRoutes) {
    if (fs.existsSync(item.file)) {
      continue;
    }

    const message = `${item.route}: Missing / not yet created`;
    if (item.required) {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }
}

function checkRobots() {
  const robots = readIfExists("robots.txt");
  if (!robots) {
    errors.push("Missing robots.txt");
    return;
  }

  if (!/^User-agent:\s*\*/im.test(robots)) {
    errors.push("robots.txt: missing User-agent: *");
  }

  if (!/^Allow:\s*\//im.test(robots)) {
    errors.push("robots.txt: missing Allow: /");
  }

  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    errors.push("robots.txt: sitemap reference does not use the apex canonical URL");
  }
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

  return path.join(route.slice(1), "index.html").replaceAll("\\", "/");
}

function checkSitemap() {
  const sitemap = readIfExists("sitemap.xml");
  if (!sitemap) {
    errors.push("Missing sitemap.xml");
    return;
  }

  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (locs.length === 0) {
    errors.push("sitemap.xml: no <loc> entries found");
  }

  for (const loc of locs) {
    if (!loc.startsWith(`${SITE_URL}/`)) {
      errors.push(`sitemap.xml: non-apex URL found (${loc})`);
      continue;
    }

    const routePath = routePathFromUrl(loc);
 const routeFile = fileForRoute(routePath);
    if (!fs.existsSync(routeFile) && !(routePath === `/insights/` || routePath.startsWith(`/insights/`))) {
      errors.push(`sitemap.xml: URL has no matching source route (${loc})`);
    }

    if (noindexRoutes.has(routeFile)) {
      errors.push(`sitemap.xml: noindex route should not be listed (${loc})`);
    }
  }
}

function checkCanonicalConfusion() {
  const filesToScan = [
    ...routeFiles,
    "assets/site.js",
    "robots.txt",
    "sitemap.xml",
    "scripts/i18n-finalize-seo.js",
    "scripts/build-dist.js",
  ];

  for (const relPath of filesToScan) {
    if (!fs.existsSync(relPath)) {
      continue;
    }

    const text = fs.readFileSync(relPath, "utf8");
    if (/www\.signal-over-noise\.coach/i.test(text)) {
      errors.push(`${relPath}: hardcoded www canonical candidate found`);
    }
    if (/pages[.]dev/i.test(text)) {
      errors.push(`${relPath}: hardcoded Cloudflare Pages preview-domain reference found`);
    }
  }
}

function report() {
  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.error("Search readiness check failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Search readiness check passed.");
}

for (const relPath of routeFiles) {
  checkRouteFile(relPath);
}

checkImportantRoutes();
checkRobots();
checkSitemap();
checkCanonicalConfusion();
report();
