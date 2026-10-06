const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.11.0/axe.min.js' });
  const result = await page.evaluate(async () => {
    const { violations } = await axe.run(document);
    return {
      violationCount: violations.length,
      violations: violations.map((v) => ({ id: v.id, impact: v.impact, count: v.nodes.length, selector: v.nodes[0]?.target?.[0] || null }))
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
