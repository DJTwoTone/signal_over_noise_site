const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  const rows = await page.locator('body, main, section, .eyebrow, .hero-title, .hero-copy, .card-title, .card-copy, .button, .button--primary, .button--secondary').evaluateAll((els) =>
    els.slice(0, 20).map((el) => ({
      tag: el.tagName,
      className: el.className,
      text: (el.textContent || '').trim().slice(0, 40),
      color: getComputedStyle(el).color,
      bg: getComputedStyle(el).backgroundColor,
      parentBg: el.parentElement ? getComputedStyle(el.parentElement).backgroundColor : 'n/a',
      bodyBg: getComputedStyle(document.body).backgroundColor,
      fontWeight: getComputedStyle(el).fontWeight,
      fontSize: getComputedStyle(el).fontSize
    }))
  );
  console.log(JSON.stringify(rows, null, 2));
  await browser.close();
})();
