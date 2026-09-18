import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackRate = 1364;
const prices = { 150000: 110, 375000: 280, 1200000: 880 };

let rate = fallbackRate;
try {
  const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=KRW", { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (Number.isFinite(data.rates?.KRW) && data.rates.KRW > 0) rate = data.rates.KRW;
} catch (error) {
  console.warn(`USD price update used fallback rate (${fallbackRate} KRW/USD): ${error.message}`);
}

const usd = (krw) => Math.round((krw / rate) / 10) * 10;
const replacements = [
  [/\(about \$\d+\)/g, ` (about $${usd(150000)})`],
  [/\(약 \$\d+\)/g, ` (약 $${usd(150000)})`],
];
for (const relative of ["services/index.html", "ko/services/index.html"]) {
  const file = path.join(root, relative);
  let html = await fs.readFile(file, "utf8");
  html = html.replace(/(Focused Coaching \/ Review Session: &#8361;150,000|집중 코칭\/리뷰 세션: ₩150,000)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(150000)})` : `(about $${usd(150000)})`));
  html = html.replace(/(Presentation Sprint: from &#8361;375,000|프레젠테이션 스프린트: ₩375,000부터)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(375000)})` : `(about $${usd(375000)})`));
  html = html.replace(/(Deck Building: from &#8361;1,200,000|덱 제작: ₩1,200,000부터)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(1200000)})` : `(about $${usd(1200000)})`));
  await fs.writeFile(file, html);
}
console.log(`USD equivalents updated using ${rate.toFixed(2)} KRW/USD.`);
