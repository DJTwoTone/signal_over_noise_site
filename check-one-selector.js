const { chromium } = require('playwright');

function luminanceFromRgb(r,g,b){
  const toLinear = (c) => { const s = c/255; return s <= 0.03928 ? s/12.92 : ((s + 0.055)/1.055) ** 2.4; };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}
function hexToRgb(hex) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(x => x+x).join('') : h;
  const n = parseInt(full, 16);
  return { r:(n >> 16) & 255, g:(n >> 8) & 255, b:n & 255 };
}
function ratioFromCss(color,bgColor) {
  const parse = (value) => {
    if (!value || value === 'rgba(0, 0, 0, 0)' || value === 'transparent') return null;
    const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
    if (m) return { r:Number(m[1]), g:Number(m[2]), b:Number(m[3)] };
    if (value.startsWith('#')) return hexToRgb(value);
    return null;
  };
  const fg = parse(color); const bg = parse(bgColor);
  if (!fg || !bg) return null;
  const l1 = luminanceFromRgb(fg.r, fg.g, fg.b);
  const l2 = luminanceFromRgb(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2); const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
(async()=>{
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  const selectors = [
    '#main > section:nth-child(1) > div > div > div > p',
    '#main > section:nth-child(1) > div > div > div > h1',
    '#main > section:nth-child(1) > div > div > div > div > p:nth-child(1)',
    '#main > section:nth-child(1) > div > div > aside > h2'
  ];
  for (const selector of selectors) {
    const info = await page.$eval(selector, (el) => {
      const style = getComputedStyle(el);
      const bg = getComputedStyle(el.parentElement || document.body).backgroundColor;
      return { color: style.color, bg, ratio: (() => { const parse = (value) => { if (!value || value === 'rgba(0, 0, 0, 0)' || value === 'transparent') return null; const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i); if (m) return { r:Number(m[1]), g:Number(m[2]), b:Number(m[3)] }; const h = value.replace('#',''); const full = h.length===3 ? h.split('').map((x)=>x+x).join('') : h; const n = parseInt(full,16); return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }; }; const fg = parse(style.color); const bgc = parse(bg); const toLinear = (c) => { const s = c/255; return s <= 0.03928 ? s/12.92 : ((s+0.055)/1.055)**2.4;}; const l1 = 0.2126*toLinear(fg.r)+0.7152*toLinear(fg.g)+0.0722*toLinear(fg.b); const l2 = 0.2126*toLinear(bgc.r)+0.7152*toLinear(bgc.g)+0.0722*toLinear(bgc.b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)); })() };
    });
    console.log(selector, JSON.stringify(info));
  }
  await browser.close();
})();
