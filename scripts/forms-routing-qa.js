const fs = require("fs");
const path = require("path");

const { chromium } = require("playwright");

const BASE_URL = process.env.QA_BASE_URL || "http://localhost:8080";
const OUT_DIR = path.resolve(process.cwd(), ".qa-screenshots", "forms-routing-qa-2026-05-05");
const QUERY = "utm_source=qa&utm_medium=test&utm_campaign=hidden_field_check&utm_content=form_route&utm_term=forms_routing&cta_clicked=qa_test";
const REFERRER = new URL("/proof/", BASE_URL).toString();

const REQUIRED_PARAMS = [
  "source_page",
  "route_type",
  "cta_clicked",
  "offer_context",
  "page_variant",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referring_page",
  "workshop_followup",
];

const FORM_ROUTES = [
  {
    key: "diagnostic",
    path: "/diagnostic/",
    mount: "diagnostic",
    tallyUrl: "https://tally.so/embed/7RoLkz",
    expected: {
      source_page: "/diagnostic",
      route_type: "free_diagnostic",
      offer_context: "diagnostic_first",
      workshop_followup: "false",
    },
    fieldValues: [
      "Codex Hidden Field QA",
      "codex-hidden-field-qa+signal-over-noise@example.com",
      "https://example.com/dummy-hidden-field-test",
      "Dummy hidden field QA presentation",
      "Dummy internal review audience",
      "2099-12-31",
      "Dummy hidden field and routing test. Please ignore.",
    ],
  },
  {
    key: "scan",
    path: "/scan/",
    mount: "toolkit",
    tallyUrl: "https://tally.so/embed/aQG1EZ",
    expected: {
      source_page: "/scan",
      route_type: "toolkit",
      offer_context: "workshop_followup",
      workshop_followup: "true",
    },
    fieldValues: [
      "Codex Hidden Field QA",
      "codex-hidden-field-qa+signal-over-noise@example.com",
      "Dummy hidden field and routing test. Please ignore.",
    ],
  },
  {
    key: "get-started",
    path: "/get-started/",
    mount: "getStarted",
    tallyUrl: "https://tally.so/embed/Ek8bV2",
    expected: {
      source_page: "/get-started",
      route_type: "paid_support",
      offer_context: "paid_support_route",
      workshop_followup: "false",
    },
    fieldValues: [
      "Codex Hidden Field QA",
      "codex-hidden-field-qa+signal-over-noise@example.com",
      "Technical QA Test",
      "Dummy paid-support routing QA test. Please ignore.",
      "Dummy hidden field QA presentation",
      "2099-12-31",
      "https://example.com/dummy-hidden-field-test",
      "Dummy internal review audience",
      "Dummy hidden field and routing test. Please ignore.",
    ],
  },
  {
    key: "contact",
    path: "/contact/",
    mount: "workshop",
    tallyUrl: "https://tally.so/embed/gDLqe4",
    expected: {
      source_page: "/contact",
      route_type: "workshop_inquiry",
      offer_context: "workshop_route",
      workshop_followup: "false",
    },
    fieldValues: [
      "Codex Hidden Field QA",
      "codex-hidden-field-qa+signal-over-noise@example.com",
      "Technical QA Test",
      "Technical QA Test",
      "Dummy workshop hidden field QA test. Please ignore.",
      "2099-12-31",
      "Dummy workshop hidden field QA test. Please ignore.",
    ],
  },
];

const CTA_ROUTES = [
  { selector: "[data-diagnostic-link]", expectedPath: "/diagnostic/" },
  { selector: "[data-get-started-link]", expectedPath: "/get-started/" },
  { selector: "[data-workshop-link]", expectedPath: "/contact/" },
  { selector: "[data-toolkit-link]", expectedPath: "/scan/" },
];

const CTA_PAGES = ["/", "/services/", "/process/", "/proof/", "/workshops/", "/thanks/", "/privacy/"];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function urlFor(routePath) {
  return new URL(routePath, BASE_URL).toString();
}

function routeUrl(routePath) {
  return `${urlFor(routePath)}?${QUERY}`;
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

function inspectParams(src) {
  const url = new URL(src);
  const params = {};
  const duplicates = {};

  REQUIRED_PARAMS.forEach((key) => {
    const values = url.searchParams.getAll(key);
    params[key] = values[0] || "";
    duplicates[key] = values.length;
  });

  ["source", "originPage"].forEach((key) => {
    const values = url.searchParams.getAll(key);
    params[key] = values[0] || "";
    duplicates[key] = values.length;
  });

  return { params, duplicates };
}

async function collectConsoleAndNetwork(page) {
  const consoleErrors = [];
  const requestFailures = [];

  page.on("console", (message) => {
    const text = message.text();
    if (text.includes("ERR_BLOCKED_BY_CLIENT")) {
      return;
    }
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push(`${message.type()}: ${text}`);
    }
  });

  page.on("requestfailed", (request) => {
    const failure = request.failure();
    requestFailures.push(`${request.url()} :: ${failure ? failure.errorText : "request failed"}`);
  });

  return { consoleErrors, requestFailures };
}

async function getFrame(page) {
  const iframe = page.locator("iframe.tally-embed").first();
  await iframe.waitFor({ state: "attached", timeout: 20000 });
  const handle = await iframe.elementHandle();
  const frame = await handle.contentFrame();
  if (!frame) {
    throw new Error("Tally iframe did not expose a content frame");
  }
  await frame.waitForLoadState("domcontentloaded", { timeout: 20000 }).catch(() => {});
  await frame.locator("body").waitFor({ state: "visible", timeout: 20000 });
  return { iframe, frame };
}

async function fillVisibleTextboxes(frame, values) {
  const textboxes = frame.locator('input:not([type="file"]):not([type="radio"]):not([type="checkbox"]):not([type="hidden"]):not([role="combobox"]), textarea');
  const count = await textboxes.count();
  let valueIndex = 0;

  for (let i = 0; i < count; i += 1) {
    const textbox = textboxes.nth(i);
    if (!(await textbox.isVisible().catch(() => false))) {
      continue;
    }
    if (!(await textbox.isEnabled().catch(() => false))) {
      continue;
    }

    const type = await textbox.evaluate((el) => (el.getAttribute("type") || "").toLowerCase()).catch(() => "");
    const value = values[valueIndex]
      || (type === "email" ? "codex-hidden-field-qa+signal-over-noise@example.com" : "Dummy hidden field and routing test. Please ignore.");

    await textbox.fill(value, { timeout: 5000 }).catch(async () => {
      await textbox.click({ timeout: 5000 });
      await textbox.pressSequentially(value, { delay: 5 });
    });
    await textbox.press("Escape").catch(() => {});

    valueIndex += 1;
  }

  return count;
}

async function clickTextChoice(frame, text) {
  const choice = frame.getByText(text, { exact: true }).first();
  if (await choice.isVisible({ timeout: 3000 }).catch(() => false)) {
    await choice.click({ timeout: 5000, force: true });
    return true;
  }
  return false;
}

async function checkPrivacyAcknowledgment(frame) {
  const acknowledgment = frame.getByText(/I understand that Signal over Noise/i).first();
  if (await acknowledgment.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acknowledgment.click({ timeout: 5000, force: true });
    return true;
  }
  return false;
}

async function selectComboboxOption(frame, label, optionText) {
  const combo = frame.locator(`[role="combobox"][aria-label="${label}"]`).first();
  if (!(await combo.isVisible({ timeout: 5000 }).catch(() => false))) {
    return false;
  }

  await combo.click({ timeout: 5000 });
  const option = frame.getByRole("option", { name: optionText, exact: true }).first();
  if (await option.isVisible({ timeout: 5000 }).catch(() => false)) {
    await option.click({ timeout: 5000 });
    await combo.press("Escape").catch(() => {});
    return true;
  }

  return false;
}

async function fillDropdownByBlock(frame, optionText) {
  const input = frame.locator('[data-block-type="DROPDOWN"] input').first();
  if (!(await input.isVisible({ timeout: 5000 }).catch(() => false))) {
    return false;
  }

  await input.click({ timeout: 5000 });
  await input.fill("");
  await input.pressSequentially(optionText, { delay: 5 });
  await input.press("Enter").catch(() => {});
  await input.press("Escape").catch(() => {});
  return true;
}

async function fillRouteSpecificChoices(frame, key) {
  const actions = [];

  if (key === "diagnostic") {
    actions.push(await clickTextChoice(frame, "Slide deck"));
    actions.push(await checkPrivacyAcknowledgment(frame));
  }

  if (key === "scan") {
    actions.push(await selectComboboxOption(frame, "What are your biggest presentation challenges?", "Preparing for a real presentation"));
  }

  if (key === "get-started") {
    actions.push(await selectComboboxOption(frame, "What kind of support are you looking for?", "Presentation sprint"));
    actions.push(await selectComboboxOption(frame, "What are you preparing?", "Business presentation"));
    actions.push(await selectComboboxOption(frame, "What materials do you already have?", "Slide Deck"));
    actions.push(await checkPrivacyAcknowledgment(frame));
  }

  if (key === "contact") {
    actions.push(await clickTextChoice(frame, "6 - 15"));
    actions.push(await clickTextChoice(frame, "Team members"));
    actions.push(await clickTextChoice(frame, "Team presentation standards"));
    actions.push(await fillDropdownByBlock(frame, "Slides / deck habits"));
    actions.push(await clickTextChoice(frame, "Hybrid"));
    actions.push(await selectComboboxOption(frame, "Anything already prepared?", "Workshop goals or internal brief"));
  }

  return actions.filter(Boolean).length;
}

async function clickChoiceControls(frame) {
  let clicked = 0;
  const controls = frame.locator('input[type="checkbox"]');
  const count = await controls.count();

  for (let i = 0; i < count; i += 1) {
    const control = controls.nth(i);
    if (!(await control.isVisible().catch(() => false))) {
      continue;
    }
    if (!(await control.isEnabled().catch(() => false))) {
      continue;
    }
    await control.check({ timeout: 3000, force: true }).catch(() => {});
    clicked += 1;
  }

  return clicked;
}

async function selectDropdownChoices(frame) {
  let selected = 0;
  const dropdowns = frame.locator('[aria-haspopup="listbox"]:not([role="combobox"])');
  const count = await dropdowns.count();

  for (let i = 0; i < count; i += 1) {
    const dropdown = dropdowns.nth(i);
    if (!(await dropdown.isVisible().catch(() => false))) {
      continue;
    }
    if (!(await dropdown.isEnabled().catch(() => false))) {
      continue;
    }

    await dropdown.click({ timeout: 5000 }).catch(() => {});
    const option = frame.locator('[role="option"]').filter({ hasNotText: /^$/ }).first();
    if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
      await option.click({ timeout: 5000 }).catch(() => {});
      selected += 1;
    } else {
      await dropdown.press("ArrowDown").catch(() => {});
      await dropdown.press("Enter").catch(() => {});
      selected += 1;
    }
  }

  return selected;
}

async function submitForm(frame) {
  const submit = frame.locator('button[type="submit"]').last();
  if (!(await submit.isVisible({ timeout: 10000 }).catch(() => false))) {
    return { clicked: false, text: await frame.locator("body").innerText().catch(() => "") };
  }

  await submit.scrollIntoViewIfNeeded().catch(() => {});
  await submit.click({ timeout: 10000 }).catch(async () => {
    await submit.click({ timeout: 10000, force: true });
  });
  await frame.waitForTimeout(8000);
  return { clicked: true, text: await frame.locator("body").innerText().catch(() => "") };
}

function summarizeConfirmation(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (/thanks|thank you|completing this form/i.test(normalized)) {
    return normalized.slice(0, 1000);
  }
  return normalized.slice(0, 1000);
}

async function inspectAndSubmitForm(browser, route) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();
  const { consoleErrors, requestFailures } = await collectConsoleAndNetwork(page);
  const result = {
    route: route.path,
    mount: route.mount,
    tallyUrl: route.tallyUrl,
    finalIframeUrl: "",
    hiddenParams: {},
    duplicateCounts: {},
    paramIssues: [],
    fieldsText: "",
    fieldsFilled: false,
    submitReached: false,
    confirmationText: "",
    confirmationVisible: false,
    finalPageUrl: "",
    consoleErrors,
    requestFailures,
    screenshots: {},
  };

  await page.goto(routeUrl(route.path), { waitUntil: "domcontentloaded", referer: REFERRER });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});

  const { iframe, frame } = await getFrame(page);
  result.finalIframeUrl = await iframe.getAttribute("src");
  const { params, duplicates } = inspectParams(result.finalIframeUrl);
  result.hiddenParams = params;
  result.duplicateCounts = duplicates;

  REQUIRED_PARAMS.forEach((key) => {
    if (!params[key]) {
      result.paramIssues.push(`Missing ${key}`);
    }
    if (duplicates[key] !== 1) {
      result.paramIssues.push(`${key} appears ${duplicates[key]} times`);
    }
  });

  Object.entries(route.expected).forEach(([key, value]) => {
    if (params[key] !== value) {
      result.paramIssues.push(`${key} expected ${value} but found ${params[key] || "(blank)"}`);
    }
  });

  if (params.cta_clicked !== "qa_test") {
    result.paramIssues.push(`cta_clicked expected qa_test but found ${params.cta_clicked || "(blank)"}`);
  }

  result.screenshots.before = path.relative(process.cwd(), path.join(OUT_DIR, `${route.key}-before.png`));
  await page.screenshot({ path: path.resolve(process.cwd(), result.screenshots.before), fullPage: true });

  result.fieldsText = (await frame.locator("body").innerText().catch(() => "")).replace(/\s+/g, " ").trim().slice(0, 3000);

  const textboxCount = await fillVisibleTextboxes(frame, route.fieldValues);
  const routeChoiceCount = await fillRouteSpecificChoices(frame, route.key);
  const choiceCount = await clickChoiceControls(frame);
  const dropdownCount = await selectDropdownChoices(frame);
  result.fieldsFilled = textboxCount > 0 || routeChoiceCount > 0 || choiceCount > 0 || dropdownCount > 0;

  const submitResult = await submitForm(frame);
  result.submitReached = submitResult.clicked;
  result.confirmationText = summarizeConfirmation(submitResult.text);
  result.confirmationVisible = /thanks|thank you|completing this form/i.test(submitResult.text);
  result.finalPageUrl = page.url();

  result.screenshots.after = path.relative(process.cwd(), path.join(OUT_DIR, `${route.key}-after.png`));
  await page.screenshot({ path: path.resolve(process.cwd(), result.screenshots.after), fullPage: true });

  await context.close();
  return result;
}

async function checkCtaRoutes(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const results = [];

  for (const pagePath of CTA_PAGES) {
    await page.goto(urlFor(pagePath), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(200);

    for (const expectation of CTA_ROUTES) {
      const links = page.locator(expectation.selector);
      const count = await links.count();
      for (let i = 0; i < count; i += 1) {
        const href = await links.nth(i).getAttribute("href");
        const resolved = href ? new URL(href, page.url()) : null;
        results.push({
          page: pagePath,
          selector: expectation.selector,
          href,
          expectedPath: expectation.expectedPath,
          ok: Boolean(resolved && resolved.pathname === expectation.expectedPath),
          ctaClicked: resolved ? resolved.searchParams.get("cta_clicked") || "" : "",
        });
      }
    }
  }

  await context.close();
  return results;
}

async function checkPackagesRedirect(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const results = [];

  for (const routePath of ["/packages", "/packages/"]) {
    const response = await page.goto(urlFor(routePath), { waitUntil: "domcontentloaded" });
    results.push({
      route: routePath,
      status: response ? response.status() : null,
      finalUrl: page.url(),
      ok: page.url().endsWith("/services/"),
    });
  }

  await context.close();
  return results;
}

async function main() {
  ensureDir(OUT_DIR);

  const browser = await launchBrowser();
  const forms = [];
  for (const route of FORM_ROUTES) {
    console.log(`Checking ${route.path}`);
    forms.push(await inspectAndSubmitForm(browser, route));
  }

  const ctaRoutes = await checkCtaRoutes(browser);
  const packagesRedirects = await checkPackagesRedirect(browser);
  await browser.close();

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    outDir: path.relative(process.cwd(), OUT_DIR),
    forms,
    ctaRoutes,
    packagesRedirects,
  };

  const reportPath = path.join(OUT_DIR, "forms-routing-results.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  const failures = [
    ...forms.flatMap((form) => form.paramIssues.map((issue) => `${form.route}: ${issue}`)),
    ...ctaRoutes.filter((item) => !item.ok).map((item) => `${item.page} ${item.selector} -> ${item.href}`),
    ...packagesRedirects.filter((item) => !item.ok).map((item) => `${item.route} did not redirect to /services/`),
  ];

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
