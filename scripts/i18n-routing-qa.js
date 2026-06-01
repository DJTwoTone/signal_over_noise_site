const fs = require("fs");
const path = require("path");

const { chromium } = require("playwright");

const BASE_URL = process.env.QA_BASE_URL || "http://localhost:8080";
const OUT_DIR = path.resolve(process.cwd(), ".qa-screenshots", "i18n-routing-qa");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function urlFor(routePath) {
  return new URL(routePath, BASE_URL).toString();
}

async function setStoredLanguagePreference(page, language) {
  await page.goto(urlFor("/"), { waitUntil: "domcontentloaded" });
  await page.evaluate(({ language }) => {
    window.localStorage.setItem("son-preferred-language", language);
  }, { language });
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

async function checkAutoRedirect(browser, route, expectedPath, locale = "ko-KR") {
  const context = await browser.newContext({ locale });
  const page = await context.newPage();
  const response = await page.goto(urlFor(route), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const result = {
    route,
    locale,
    finalUrl: page.url(),
    status: response ? response.status() : null,
    ok: response && response.ok() && page.url().endsWith(expectedPath),
  };

  await context.close();
  return result;
}

async function checkStoredPreferenceWins(browser, route, storedLanguage, expectedPath, locale = "ko-KR") {
  const context = await browser.newContext({ locale });
  const page = await context.newPage();
  await setStoredLanguagePreference(page, storedLanguage);
  const response = await page.goto(urlFor(route), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const result = {
    route,
    locale,
    storedLanguage,
    finalUrl: page.url(),
    status: response ? response.status() : null,
    ok: response && response.ok() && page.url().endsWith(expectedPath),
  };

  await context.close();
  return result;
}

async function checkSwitcherLinks(browser) {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  const results = [];

  for (const routePath of ["/", "/ko/"]) {
    await page.goto(urlFor(routePath), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(200);

    const links = page.locator("[data-language-switch]");
    const count = await links.count();
    const hrefs = [];
    for (let i = 0; i < count; i += 1) {
      hrefs.push(await links.nth(i).getAttribute("href"));
    }

    results.push({
      route: routePath,
      count,
      hrefs,
      ok: hrefs.includes(routePath === "/" ? "/ko/" : "/"),
    });
  }

  await context.close();
  return results;
}

async function main() {
  ensureDir(OUT_DIR);

  const browser = await launchBrowser();
  const autoRedirect = await checkAutoRedirect(browser, "/", "/ko/");
  const confirmationRedirects = [
    await checkAutoRedirect(browser, "/thanks-diagnostic/", "/ko/thanks-diagnostic/"),
    await checkAutoRedirect(browser, "/thanks-get-started/", "/ko/thanks-get-started/"),
  ];
  const storedPreference = await checkStoredPreferenceWins(
    browser,
    "/thanks-get-started/",
    "en",
    "/thanks-get-started/",
  );
  const switcherLinks = await checkSwitcherLinks(browser);
  await browser.close();

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    outDir: path.relative(process.cwd(), OUT_DIR),
    autoRedirect,
    confirmationRedirects,
    storedPreference,
    switcherLinks,
  };

  const reportPath = path.join(OUT_DIR, "i18n-routing-results.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  const failures = [];
  if (!autoRedirect.ok) {
    failures.push(`home route did not auto-redirect to /ko/ for locale ${autoRedirect.locale} (final: ${autoRedirect.finalUrl})`);
  }

  for (const item of confirmationRedirects) {
    if (!item.ok) {
      failures.push(`${item.route} did not resolve to ${item.route.startsWith("/thanks-") ? `/ko${item.route}` : "its expected Korean route"} for locale ${item.locale} (status: ${item.status}, final: ${item.finalUrl})`);
    }
  }

  if (!storedPreference.ok) {
    failures.push(`stored language preference '${storedPreference.storedLanguage}' did not win for ${storedPreference.route} (status: ${storedPreference.status}, final: ${storedPreference.finalUrl})`);
  }

  for (const item of switcherLinks) {
    if (!item.ok) {
      failures.push(`${item.route} switcher links were incorrect: ${item.hrefs.join(", ")}`);
    }
  }

  console.log(`Report: ${path.relative(process.cwd(), reportPath)}`);
  console.log(`Failures: ${failures.length}`);
  failures.forEach((failure) => console.log(`- ${failure}`));

  if (failures.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
