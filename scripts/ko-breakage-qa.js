const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const { chromium } = require("playwright");

const BASE_URL = process.env.QA_BASE_URL || "http://localhost:8080";
const OUT_DIR = path.resolve(process.cwd(), ".qa-screenshots", "ko-breakage-qa-2026-05-22");
const WIDTHS = [320, 375, 768, 1024, 1440];

const ROUTE_PAIRS = [
  { en: "/", ko: "/ko/", key: "home" },
  { en: "/services/", ko: "/ko/services/", key: "services" },
  { en: "/process/", ko: "/ko/process/", key: "process" },
  { en: "/proof/", ko: "/ko/proof/", key: "proof" },
  { en: "/workshops/", ko: "/ko/workshops/", key: "workshops" },
  { en: "/diagnostic/", ko: "/ko/diagnostic/", key: "diagnostic" },
  { en: "/get-started/", ko: "/ko/get-started/", key: "get-started" },
  { en: "/contact/", ko: "/ko/contact/", key: "contact" },
  { en: "/toolkit/", ko: "/ko/toolkit/", key: "toolkit" },
  { en: "/thanks/", ko: "/ko/thanks/", key: "thanks" },
  { en: "/privacy/", ko: "/ko/privacy/", key: "privacy" },
  { en: "/packages/", ko: "/ko/packages/", key: "packages" },
];

const FORM_ROUTES = new Set(["diagnostic", "get-started", "contact", "toolkit"]);
const IGNORABLE_404_CONSOLE_PATTERNS = [
  /favicon\.ico/i,
  /apple-touch-icon\.png/i,
  /site\.webmanifest/i,
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toAbsolute(routePath) {
  return new URL(routePath, BASE_URL).toString();
}

function normalizePathFromHref(href) {
  try {
    const parsed = new URL(href, BASE_URL);
    if (parsed.origin !== new URL(BASE_URL).origin) return null;
    return parsed.pathname.replace(/\/+$/, "/") || "/";
  } catch {
    return null;
  }
}

function getWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    const start = Date.now();

    const requestOnce = (target, remaining) => {
      const client = target.startsWith("https:") ? https : http;
      const req = client.get(target, (res) => {
        const status = res.statusCode || 0;
        const location = res.headers.location;
        res.resume();

        if (status >= 300 && status < 400 && location && remaining > 0) {
          const next = new URL(location, target).toString();
          requestOnce(next, remaining - 1);
          return;
        }

        resolve({
          ok: status > 0 && status < 400,
          status,
          finalUrl: target,
          durationMs: Date.now() - start,
        });
      });

      req.setTimeout(3000, () => {
        req.destroy(new Error("timeout"));
      });

      req.on("error", (error) => {
        resolve({
          ok: false,
          status: 0,
          finalUrl: target,
          durationMs: Date.now() - start,
          error: error.message,
        });
      });
    };

    requestOnce(url, maxRedirects);
  });
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: "msedge" });
  } catch {
    try {
      return await chromium.launch({ channel: "chrome" });
    } catch {
      return chromium.launch();
    }
  }
}

function isIgnorableConsoleMessage(text) {
  if (!text) {
    return false;
  }

  if (/Failed to load resource: the server responded with a status of 404 \(Not Found\)/i.test(text)) {
    return true;
  }

  if (!/Failed to load resource: the server responded with a status of 404/i.test(text)) {
    return false;
  }

  return IGNORABLE_404_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
}

function isIgnorableAssetUrl(url) {
  if (!url) {
    return false;
  }

  return IGNORABLE_404_CONSOLE_PATTERNS.some((pattern) => pattern.test(url));
}

async function collectPageState(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const overflow = document.documentElement.scrollWidth > vw + 1;

    const overflowOffenders = [...document.querySelectorAll("body *")]
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: typeof el.className === "string" ? el.className : "",
          id: el.id || "",
          text: (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      })
      .filter((item) => item.right > vw + 1 || item.left < -1)
      .slice(0, 15);

    const localLinks = [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href") || "")
      .filter((href) => href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("javascript:"));

    const ctaSelector = [
      "a.button[href]",
      "a[data-cta-clicked][href]",
      "a[data-diagnostic-link][href]",
      "a[data-workshop-link][href]",
      "a[data-toolkit-link][href]",
      "a[data-get-started-link][href]",
    ].join(",");

    const ctaLinks = [...document.querySelectorAll(ctaSelector)].map((a) => ({
      href: a.getAttribute("href") || "",
      text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
    }));

    const formEmbeds = [...document.querySelectorAll("[data-tally-mount]")].map((mount) => {
      const iframe = mount.querySelector("iframe");
      const mountRect = mount.getBoundingClientRect();
      const iframeRect = iframe ? iframe.getBoundingClientRect() : null;
      const computed = window.getComputedStyle(mount);

      return {
        key: mount.getAttribute("data-tally-mount") || "",
        configuredHeight: mount.getAttribute("data-tally-height") || "",
        iframeHeightAttr: iframe ? iframe.getAttribute("height") || "" : "",
        iframeSrc: iframe ? iframe.getAttribute("src") || "" : "",
        iframePresent: Boolean(iframe),
        mountOverflowY: computed.overflowY,
        mountOverflow: computed.overflow,
        mountBottom: Math.round(mountRect.bottom),
        iframeBottom: iframeRect ? Math.round(iframeRect.bottom) : null,
        iframeTop: iframeRect ? Math.round(iframeRect.top) : null,
      };
    });

    return {
      title: document.title,
      overflow,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflowOffenders,
      localLinks,
      ctaLinks,
      formEmbeds,
    };
  });
}

async function inspectRouteAtWidth(browser, routePath, key, width, allowExternal = false) {
  const context = await browser.newContext({ viewport: { width, height: width < 700 ? 760 : 980 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const httpErrors = [];

  page.on("console", (message) => {
    if (message.text().includes("ERR_BLOCKED_BY_CLIENT")) return;
    if (isIgnorableConsoleMessage(message.text())) return;
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push(`${message.type()}: ${message.text()}`);
    }
  });

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (!url.startsWith(BASE_URL)) {
      return;
    }
    if (status >= 400 && !isIgnorableAssetUrl(url)) {
      httpErrors.push(`${status}: ${url}`);
    }
  });

  page.on("requestfailed", (request) => {
    const requestUrl = request.url();
    if (requestUrl.startsWith(BASE_URL)) {
      requestFailures.push(`${requestUrl} :: ${request.failure()?.errorText || "request failed"}`);
    }
  });

  await page.route("**/*", (routeRequest) => {
    const requestUrl = routeRequest.request().url();
    if (allowExternal || requestUrl.startsWith(BASE_URL) || requestUrl.startsWith("data:")) {
      routeRequest.continue();
      return;
    }
    routeRequest.abort("blockedbyclient");
  });

  const response = await page.goto(toAbsolute(routePath), { waitUntil: "domcontentloaded", timeout: 20000 });
  if (allowExternal) {
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const state = await collectPageState(page);
  const status = response ? response.status() : 0;

  let screenshot = "";
  const failures = [];
  if (state.overflow) failures.push("horizontal-overflow");
  if (status >= 400) failures.push(`http-${status}`);
  if (consoleErrors.length) failures.push("console-warning-or-error");
  if (httpErrors.length) failures.push("http-resource-error");
  if (requestFailures.length) failures.push("request-failure");

  if (failures.length || width === 375 || width === 1440) {
    screenshot = path.join(OUT_DIR, `${key}-${width}.png`);
    if (fs.existsSync(screenshot)) fs.unlinkSync(screenshot);
    await page.screenshot({ path: screenshot, fullPage: true });
  }

  await context.close();

  return {
    route: routePath,
    key,
    width,
    status,
    finalUrl: toAbsolute(routePath),
    failures,
    consoleErrors,
    httpErrors,
    requestFailures,
    screenshot: screenshot ? path.relative(process.cwd(), screenshot) : "",
    state,
  };
}

function compareCtaDestinations(enReport, koReport) {
  const enSet = new Set(
    enReport.state.ctaLinks
      .map((link) => normalizePathFromHref(link.href))
      .filter(Boolean),
  );
  const koSet = new Set(
    koReport.state.ctaLinks
      .map((link) => normalizePathFromHref(link.href))
      .filter(Boolean),
  );

  const missingInKo = [...enSet].filter((pathName) => !koSet.has(pathName));
  const missingInEn = [...koSet].filter((pathName) => !enSet.has(pathName));

  return {
    enCount: enSet.size,
    koCount: koSet.size,
    missingInKo,
    missingInEn,
    ok: missingInKo.length === 0 && missingInEn.length === 0,
  };
}

function evaluateFormEmbedHealth(routeKey, koReportDesktop) {
  if (!FORM_ROUTES.has(routeKey)) {
    return { applicable: false };
  }

  const embeds = koReportDesktop.state.formEmbeds;
  const issues = [];

  if (!embeds.length) {
    issues.push("no-tally-mount-found");
  }

  embeds.forEach((embed) => {
    if (!embed.iframePresent) {
      issues.push(`${embed.key || "unknown"}:iframe-missing`);
      return;
    }

    const parsedHeight = Number.parseInt(embed.iframeHeightAttr || embed.configuredHeight, 10);
    if (!Number.isFinite(parsedHeight) || parsedHeight < 700) {
      issues.push(`${embed.key || "unknown"}:iframe-height-too-short`);
    }

    if (embed.mountOverflow === "hidden" || embed.mountOverflowY === "hidden") {
      issues.push(`${embed.key || "unknown"}:container-overflow-hidden`);
    }
  });

  return {
    applicable: true,
    embedCount: embeds.length,
    issues,
    ok: issues.length === 0,
  };
}

async function main() {
  ensureDir(OUT_DIR);

  const browser = await launchBrowser();
  const responsiveChecks = [];
  const linkChecks = [];
  const ctaParityChecks = [];
  const formChecks = [];

  for (const pair of ROUTE_PAIRS) {
    console.log(`Checking responsive KO route: ${pair.ko}`);
    for (const width of WIDTHS) {
      console.log(`  - ${pair.ko} @ ${width}`);
      responsiveChecks.push(await inspectRouteAtWidth(browser, pair.ko, pair.key, width, FORM_ROUTES.has(pair.key)));
    }

    console.log(`Checking CTA parity pair: ${pair.en} <-> ${pair.ko}`);
    const koDesktop = responsiveChecks.find((item) => item.route === pair.ko && item.width === 1440);
    const enDesktop = await inspectRouteAtWidth(browser, pair.en, `${pair.key}-en`, 1440, FORM_ROUTES.has(pair.key));
    const ctaParity = compareCtaDestinations(enDesktop, koDesktop);
    ctaParityChecks.push({ key: pair.key, en: pair.en, ko: pair.ko, ...ctaParity });

    const localKoLinks = [...new Set(
      (koDesktop.state.localLinks || [])
        .map((href) => normalizePathFromHref(href))
        .filter(Boolean),
    )].slice(0, 40);

    console.log(`Checking local links from ${pair.ko}: ${localKoLinks.length} sampled links`);

    for (const localPath of localKoLinks) {
      const result = await getWithRedirects(toAbsolute(localPath));
      linkChecks.push({ source: pair.ko, target: localPath, ...result });
    }

    formChecks.push({ key: pair.key, route: pair.ko, ...evaluateFormEmbedHealth(pair.key, koDesktop) });
  }

  await browser.close();

  const responsiveFailures = responsiveChecks.filter((item) => item.failures.length > 0);
  const brokenLinks = linkChecks.filter((item) => !item.ok);
  const ctaMismatches = ctaParityChecks.filter((item) => !item.ok);
  const formIssues = formChecks.filter((item) => item.applicable && !item.ok);

  const summary = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    totals: {
      responsiveChecks: responsiveChecks.length,
      responsiveFailures: responsiveFailures.length,
      linkChecks: linkChecks.length,
      brokenLinks: brokenLinks.length,
      ctaPairs: ctaParityChecks.length,
      ctaMismatches: ctaMismatches.length,
      formChecks: formChecks.filter((item) => item.applicable).length,
      formIssues: formIssues.length,
    },
  };

  const report = {
    summary,
    responsiveFailures,
    brokenLinks,
    ctaMismatches,
    formIssues,
    details: {
      responsiveChecks,
      linkChecks,
      ctaParityChecks,
      formChecks,
    },
  };

  const reportPath = path.join(OUT_DIR, "ko-breakage-results.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report: ${path.relative(process.cwd(), reportPath)}`);

  if (responsiveFailures.length || brokenLinks.length || ctaMismatches.length || formIssues.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
