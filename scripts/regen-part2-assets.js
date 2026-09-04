const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'blog-zip-intake', 'son-part2-copilot-handoff', 'son-part2-copilot-handoff', 'assets', 'part-2-sources');
const outDir = path.join(__dirname, '..', 'assets', 'images', 'insights', 'unpack-dense-noun-stacks');

const entries = [
  ['hero-SOURCE-NOT-FINAL.png', 'hero.webp', 1600, 900],
  ['og-SOURCE-NOT-FINAL.png', 'og.webp', 1200, 630],
  ['inline-noun-stack-SOURCE-REFERENCE.png', 'inline-noun-stack-breakdown.webp', 1200, 900],
];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  for (const [inputName, outputName, width, height] of entries) {
    const inputPath = path.join(srcDir, inputName);
    const outputPath = path.join(outDir, outputName);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Missing source image: ${inputPath}`);
    }

    await sharp(inputPath)
      .resize({ width, height, fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`Generated ${outputName}`);
  }

  for (const stale of ['hero.svg', 'og.svg', 'inline-noun-stack-breakdown.svg']) {
    const stalePath = path.join(outDir, stale);
    if (fs.existsSync(stalePath)) {
      fs.unlinkSync(stalePath);
      console.log(`Removed ${stale}`);
    }
  }
})();
