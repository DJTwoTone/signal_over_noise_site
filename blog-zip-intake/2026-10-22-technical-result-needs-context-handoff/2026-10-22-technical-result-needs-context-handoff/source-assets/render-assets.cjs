const fs = require('node:fs');
const path = require('node:path');
const sharp = require('C:/Users/Benjamin Slater/Documents/Signal over Noise - Site/node_modules/sharp');
const sourceDir = __dirname;
const outputDir = 'C:/Users/Benjamin Slater/Documents/Signal over Noise - Site/assets/images/insights/technical-result-needs-context';
fs.mkdirSync(outputDir, { recursive: true });
async function render() {
  const heroPath = path.join(sourceDir, 'hero-no-text.png');
  await sharp(heroPath).resize(1600, 900, { fit: 'cover', position: 'centre' }).composite([{ input: fs.readFileSync(path.join(sourceDir, 'hero-type.svg')) }]).webp({ quality: 90, effort: 6 }).toFile(path.join(sourceDir, 'hero.webp'));
  await sharp(heroPath).resize(1200, 630, { fit: 'cover', position: 'centre' }).composite([{ input: fs.readFileSync(path.join(sourceDir, 'og-type.svg')) }]).webp({ quality: 90, effort: 6 }).toFile(path.join(sourceDir, 'og.webp'));
  for (const [svg, webp] of [['inline-01-evidence-shift.svg', 'inline-01-evidence-shift.webp'], ['inline-02-six-fields.svg', 'inline-02-six-fields.webp']]) {
    await sharp(path.join(sourceDir, svg)).webp({ quality: 94, effort: 6 }).toFile(path.join(sourceDir, webp));
  }
  for (const name of ['hero.webp', 'og.webp', 'inline-01-evidence-shift.webp', 'inline-02-six-fields.webp']) {
    fs.copyFileSync(path.join(sourceDir, name), path.join(outputDir, name));
    const m = await sharp(path.join(outputDir, name)).metadata();
    console.log(`${name}: ${m.width}x${m.height}`);
  }
}
render().catch(error => { console.error(error); process.exitCode = 1; });
