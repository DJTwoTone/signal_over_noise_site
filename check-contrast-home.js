const { chromium } = require('playwright');

function rgbToLinear(v){ const s=v/255; return s <= 0.03928 ? s/12.92 : ((s+0.055)/1.055)**2.4; }
function luminanceFromCss(color) {
  const s = String(color || '').trim();
  if (!s || s === 'rgba(0, 0, 0, 0)' || s === 'transparent') return 1;
  const match = s.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
  if (match) {
    const r = Number(match[1]); const g = Number(match[2]); const b = Number(match[3]);
    return 0.2126 * rgbToLinear(r) + 0.7152 * rgbToLinear(g) + 0.0722 * rgbToLinear(b);
  }
  let hex = s.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const int = parseInt(hex,16);
  const r = (int >> 16) & 255; const g = (int >> 8) & 255; const b = int & 255;
  return 0.2126 * rgbToLinear(r) + 0.7152 * rgbToLinear(g) + 0.0722 * rgbToLinear(b);
}
function contrastRatio(fg, bg){
  const l1 = luminanceFromCss(fg); const l2 = luminanceFromCss(bg); 
  const lighter = Math.max(l1,l2); const darker = Math.min(l1,l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function nearestBackground(el) {
  let node = el;
  while (node && node !== document.body) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
    node = node.parentElement;
  }
  return getComputedStyle(document.body).backgroundColor;
}
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  const rows = await page.locator('main .hero-title, main .hero-copy, main .eyebrow, main .card-title, main .card-copy, main .button, main .section-title').evaluateAll((els) =>
    els.map((el) => {
      const fg = getComputedStyle(el).color;
      const bg = nearestBackground(el);
      return { text: el.textContent.trim().slice(0,50), fg, bg, ratio: contrastRatio(fg,bg) };
    })
  );
  console.log(JSON.stringify(rows.filter(x => x.ratio < 4.5).slice(0,40), null, 2));
  await browser.close();
})();
