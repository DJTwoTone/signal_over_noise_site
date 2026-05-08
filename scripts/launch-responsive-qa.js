const fs = require("fs");
const path = require("path");

const { chromium } = require("playwright");

const BASE_URL = process.env.QA_BASE_URL || "http://localhost:8080";
const OUT_DIR = path.resolve(process.cwd(), ".qa-screenshots", "launch-technical-qa-2026-05-04");
const FIXED_WIDTHS = [320, 360, 375, 390, 414, 430, 480, 540, 640, 768, 834, 900, 1024, 1112, 1280, 1366, 1440, 1536, 1728, 1920];
const HEIGHT_FOR_WIDTH = (width) => {
  if (width < 700) return 720;
  if (width < 1100) return 900;
  return 1080;
};

const ROUTES = [
  { key: "home", path: "/" },
  { key: "services", path: "/services/" },
  { key: "process", path: "/process/" },
  { key: "proof", path: "/proof/" },
  { key: "workshops", path: "/workshops/" },
  { key: "diagnostic", path: "/diagnostic/" },
  { key: "toolkit", path: "/toolkit/" },
  { key: "thanks", path: "/thanks/" },
  { key: "get-started", path: "/get-started/" },
  { key: "contact", path: "/contact/" },
  { key: "privacy", path: "/privacy/" },
  { key: "packages", path: "/packages/" },
];

const FORM_ROUTES = new Set(["diagnostic", "toolkit", "contact", "get-started"]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function urlFor(routePath) {
  return new URL(routePath, BASE_URL).toString();
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: "msedge" });
  } catch (edgeError) {
    try {
      return await chromium.launch({ channel: "chrome" });
    } catch (chromeError) {
      return chromium.launch();
    }
  }
}

async function collectOverflow(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
    const offenders = [...document.querySelectorAll("body *")]
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: typeof el.className === "string" ? el.className : "",
          id: el.id || "",
          text: (el.innerText || "").replace(/\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.right > vw + 1 || item.left < -1)
      .slice(0, 20);

    return {
      overflow,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      offenders,
    };
  });
}

async function collectFormState(page) {
  return page.evaluate(() => {
    return [...document.querySelectorAll("[data-tally-mount]")].map((mount) => {
      const iframe = mount.querySelector("iframe");
      return {
        mount: mount.getAttribute("data-tally-mount"),
        configuredHeight: mount.getAttribute("data-tally-height") || "",
        iframeHeight: iframe ? iframe.getAttribute("height") : "",
        iframeSrc: iframe ? iframe.getAttribute("src") || iframe.getAttribute("data-tally-src") || "" : "",
        mountRect: mount.getBoundingClientRect().toJSON(),
        iframeRect: iframe ? iframe.getBoundingClientRect().toJSON() : null,
      };
    });
  });
}

async function checkRouteAtWidth(browser, route, width, mode) {
  const context = await browser.newContext({ viewport: { width, height: HEIGHT_FOR_WIDTH(width) } });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const allowExternal = mode === "fixed" && FORM_ROUTES.has(route.key) && [375, 768, 1440].includes(width);

  page.on("console", (message) => {
    if (message.text().includes("ERR_BLOCKED_BY_CLIENT")) {
      return;
    }
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("requestfailed", (request) => {
    const failedUrl = request.url();
    if (failedUrl.startsWith(BASE_URL)) {
      requestFailures.push(`${failedUrl} :: ${request.failure()?.errorText || "request failed"}`);
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

  const response = await page.goto(urlFor(route.path), { waitUntil: "domcontentloaded" });
  if (allowExternal) {
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(allowExternal ? 500 : 100);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const overflow = await collectOverflow(page);
  const forms = FORM_ROUTES.has(route.key) ? await collectFormState(page) : [];
  const status = response ? response.status() : null;
  const finalUrl = page.url();
  const failures = [];

  if (overflow.overflow) failures.push("horizontal-overflow");
  if (consoleErrors.length) failures.push("console-warning-or-error");
  if (requestFailures.length) failures.push("request-failure");
  if (status && status >= 400) failures.push(`http-${status}`);

  let screenshot = "";
  if (failures.length || (mode === "fixed" && [375, 768, 1440].includes(width))) {
    screenshot = path.join(OUT_DIR, `${route.key}-${mode}-${width}.png`);
    if (fs.existsSync(screenshot)) {
      fs.unlinkSync(screenshot);
    }
    await page.screenshot({ path: screenshot, fullPage: true });
  }

  await context.close();

  return {
    route: route.path,
    key: route.key,
    width,
    mode,
    status,
    finalUrl,
    failures,
    overflow,
    forms,
    consoleErrors,
    requestFailures,
    screenshot: screenshot ? path.relative(process.cwd(), screenshot) : "",
  };
}

async function main() {
  ensureDir(OUT_DIR);
  const browser = await launchBrowser();
  const results = [];

  for (const route of ROUTES) {
    for (const width of FIXED_WIDTHS) {
      console.log(`fixed ${route.path} @ ${width}`);
      results.push(await checkRouteAtWidth(browser, route, width, "fixed"));
    }
  }

  for (const route of ROUTES) {
    for (let width = 320; width <= 1920; width += 20) {
      console.log(`sweep ${route.path} @ ${width}`);
      results.push(await checkRouteAtWidth(browser, route, width, "sweep"));
    }
  }

  await browser.close();

  const reportPath = path.join(OUT_DIR, "responsive-results.json");
  fs.writeFileSync(reportPath, JSON.stringify({ baseUrl: BASE_URL, generatedAt: new Date().toISOString(), results }, null, 2));

  const failed = results.filter((result) => result.failures.length);
  console.log(`Results: ${results.length} checks, ${failed.length} with failures.`);
  console.log(`Report: ${path.relative(process.cwd(), reportPath)}`);

  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
