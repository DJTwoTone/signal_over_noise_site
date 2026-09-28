const { chromium } = require('playwright');

function rgbToLinear(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hexOrRgb) {
  const value = hexOrRgb.trim();
  const match = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
  if (match) {
    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);
    const a = match[4] !== undefined ? Number(match[4]) : 1;
    if (a < 1) return null;
    return 0.2126 * rgbToLinear(r) + 0.7152 * rgbToLinear(g) + 0.0722 * rgbToLinear(b);
  }
  const hex = value.replace('#', '');
  if (hex.length === 3) {
    const full = hex.split('').map((ch) => ch + ch).join('');
    return relativeLuminance('#' + full);
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return 0.2126 * rgbToLinear(r) + 0.7152 * rgbToLinear(g) + 0.0722 * rgbToLinear(b);
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  if (l1 == null || l2 == null) return 0;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  const rows = await page.locator('main .hero-title, main .hero-copy, main .eyebrow, main .card-title, main .card-copy, main .button, main .section-title').evaluateAll((els) =>
    els.map((el) => {
      const style = getComputedStyle(el);
      const fg = style.color;
      const bg = style.backgroundColor === 'rgba(0, 0, 0, 0)' ? getComputedStyle(el.parentElement || document.body).backgroundColor : style.backgroundColor;
      return { text: el.textContent.trim().slice(0, 40), fg, bg, ratio: (() => {
        const v = fg.trim();
        const bgv = bg.trim();
        const l1 = (() => {
          const m = v.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
          if (m) {
            const r = Number(m[1]); const g = Number(m[2]); const b = Number(m[3]);
            return 0.2126 * ((r/255) <= 0.03928 ? (r/255)/12.92 : (((r/255)+0.055)/1.055)**2.4) + 0.7152 * ((g/255) <= 0.03928 ? (g/255)/12.92 : (((g/255)+0.055)/1.055)**2.4) + 0.0722 * ((b/255) <= 0.03928 ? (b/255)/12.92 : (((b/255)+0.055)/1.055)**2.4);
          }
          const h = v.replace('#','');
          const full = h.length===3? h.split('').map((x)=>x+x).join('') : h;
          const num = parseInt(full,16);
          const r = (num >> 16) & 255; const g=(num >>8)&255; const b=num & 255;
          return 0.2126 * ((r/255) <= 0.03928 ? (r/255)/12.92 : (((r/255)+0.055)/1.055)**2.4) + 0.7152 * ((g/255) <= 0.03928 ? (g/255)/12.92 : (((g/255)+0.055)/1.055)**2.4) + 0.0722 * ((b/255) <= 0.03928 ? (b/255)/12.92 : (((b/255)+0.055)/1.055)**2.4);
        })();
        const l2 = (() => {
          const m = bgv.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
          if (m) {
            const r = Number(m[1]); const g = Number(m[2]); const b = Number(m[3]);
            return 0.2126 * ((r/255) <= 0.03928 ? (r/255)/12.92 : (((r/255)+0.055)/1.055)**2.4) + 0.7152 * ((g/255) <= 0.03928 ? (g/255)/12.92 : (((g/255)+0.055)/1.055)**2.4) + 0.0722 * ((b/255) <= 0.03928 ? (b/255)/12.92 : (((b/255)+0.055)/1.055)**2.4);
          }
          const h = bgv.replace('#','');
          const full = h.length===3? h.split('').map((x)=>x+x).join('') : h;
          const num = parseInt(full,16);
          const r = (num >> 16) & 255; const g=(num >>8)&255; const b=num & 255;
          return 0.2126 * ((r/255) <= 0.03928 ? (r/255)/12.92 : (((r/255)+0.055)/1.055)**2.4) + 0.7152 * ((g/255) <= 0.03928 ? (g/255)/12.92 : (((g/255)+0.055)/1.055)**2.4) + 0.0722 * ((b/255) <= 0.03928 ? (b/255)/12.92 : (((b/255)+0.055)/1.055)**2.4);
        })();
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      })() }
    })
  );
  console.log(JSON.stringify(rows.filter(x => x.ratio < 4.5).slice(0, 20), null, 2));
  await browser.close();
})();
