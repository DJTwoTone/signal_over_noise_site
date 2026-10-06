const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'premium-editorial-home.png', fullPage: true });

  const hero = await page.locator('main .hero-title').first().evaluate((el) => {
    const parse = (v) => {
      if (!v || v === 'transparent') return [255, 255, 255, 1];
      const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)/);
      if (m) return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] ? Number(m[4]) : 1];
      const hex = v.replace('#', '');
      const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
      const n = parseInt(full, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
    };

    const lum = (n) => {
      const c = n / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };

    const cs = getComputedStyle(el);
    let cur = el;
    let bg = 'transparent';

    while (cur && cur !== document.body) {
      const c = getComputedStyle(cur).backgroundColor;
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') {
        bg = c;
        break;
      }
      cur = cur.parentElement;
    }

    if (bg === 'transparent') {
      bg = getComputedStyle(document.body).backgroundColor;
    }

    const color = parse(cs.color);
    const bgColor = parse(bg);
    const L1 = 0.2126 * lum(color[0]) + 0.7152 * lum(color[1]) + 0.0722 * lum(color[2]);
    const L2 = 0.2126 * lum(bgColor[0]) + 0.7152 * lum(bgColor[1]) + 0.0722 * lum(bgColor[2]);
    return { color: cs.color, bg, ratio: (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05) };
  });

  console.log(JSON.stringify(hero, null, 2));
  await browser.close();
})();
