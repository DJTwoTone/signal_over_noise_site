import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackRate = 1364;
let rate = fallbackRate;
try {
  const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=KRW", { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (Number.isFinite(data.rates?.KRW) && data.rates.KRW > 0) rate = data.rates.KRW;
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`USD price update used fallback rate (${fallbackRate} KRW/USD): ${message}`);
}

const usd = (krw) => Math.round((krw / rate) / 10) * 10;
for (const relative of ["services/index.html", "ko/services/index.html"]) {
  const file = path.join(root, relative);
  let html = await fs.readFile(file, "utf8");
  html = html.replace(/(Focused Coaching \/ Review Session: &#8361;150,000|집중 코칭\/리뷰 세션: ₩150,000)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(150000)})` : `(about $${usd(150000)})`));
  html = html.replace(/(Presentation Sprint: from &#8361;375,000|프레젠테이션 스프린트: ₩375,000부터)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(375000)})` : `(about $${usd(375000)})`));
  html = html.replace(/(Deck Building: from &#8361;1,200,000|덱 제작: ₩1,200,000부터)[^<]*/g, (m) => m.replace(/\(about \$\d+\)|\(약 \$\d+\)/, relative.startsWith("ko/") ? `(약 $${usd(1200000)})` : `(about $${usd(1200000)})`));
  html = html.replace(/(<span class="price-approx">\(about \$)\d+(\)<\/span>)/, `$1${usd(150000)}$2`);
  html = html.replace(/(<span class="price-approx">\(약 \$)\d+(\)<\/span>)/, `$1${usd(150000)}$2`);
  await fs.writeFile(file, html);
}
console.log(`USD equivalents updated using ${rate.toFixed(2)} KRW/USD.`);
