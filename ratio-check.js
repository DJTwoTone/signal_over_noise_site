const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const el = document.querySelector('#main > section:nth-child(1) > div > div > div > p');
    const style = getComputedStyle(el);
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const parseColor = (value) => {
      if (!value || value === 'rgba(0, 0, 0, 0)' || value === 'transparent') return null;
      const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)\s*(?:,\s*[\d.]+)?\)$/i);
      if (m) return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
      if (value.startsWith('#')) {
        const h = value.replace('#', '');
        const full = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
        const n = parseInt(full, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
      }
      return null;
    };
    const toLinear = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const fg = parseColor(style.color);
    const bg = parseColor(bodyBg);
    const luminance = ({ r, g, b }) => 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    return {
      color: style.color,
      bg: bodyBg,
      ratio: (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05),
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
