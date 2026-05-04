const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const OUT_DIR = path.join(__dirname, 'all-pages-2026-05-04');

const PAGES = [
  { key: 'home',        url: '/' },
  { key: 'services',    url: '/services/' },
  { key: 'process',     url: '/process/' },
  { key: 'proof',       url: '/proof/' },
  { key: 'workshops',   url: '/workshops/' },
  { key: 'get-started', url: '/get-started/' },
  { key: 'diagnostic',  url: '/diagnostic/' },
  { key: 'contact',     url: '/contact/' },
  { key: 'scan',        url: '/scan/' },
  { key: 'packages',    url: '/packages/' },
  { key: 'privacy',     url: '/privacy/' },
  { key: 'thanks',      url: '/thanks/' },
];

const VIEWPORTS = [
  { name: 'mobile',  width: 375,  height: 812 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const pg of PAGES) {
      const url = BASE_URL + pg.url;
      console.log(`  ${pg.key} @ ${vp.name}`);
      await page.goto(url, { waitUntil: 'networkidle' });

      // Scroll to bottom to trigger lazy loads (Tally embeds etc.)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const file = path.join(OUT_DIR, `${pg.key}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
    }

    await ctx.close();
  }

  await browser.close();
  console.log('Done →', OUT_DIR);
})();
