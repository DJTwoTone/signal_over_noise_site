import sharp from 'sharp';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const heroPath = join(dir, 'hero-no-text.png');
const heroSvg = await readFile(join(dir, 'hero-type.svg'));
const ogSvg = await readFile(join(dir, 'og-type.svg'));
const inlineSvg = await readFile(join(dir, 'inline-01.svg'));

await sharp(heroPath).resize(1600, 900, { fit: 'cover', position: 'centre' }).composite([{ input: heroSvg }]).webp({ quality: 88, effort: 6 }).toFile(join(dir, 'hero.webp'));
await sharp(heroPath).resize(1200, 630, { fit: 'cover', position: 'centre' }).composite([{ input: ogSvg }]).webp({ quality: 88, effort: 6 }).toFile(join(dir, 'og.webp'));
await sharp(inlineSvg).webp({ quality: 94, effort: 6 }).toFile(join(dir, 'inline-01.webp'));

for (const name of ['hero.webp', 'og.webp', 'inline-01.webp']) {
  const info = await sharp(join(dir, name)).metadata();
  const { size } = await stat(join(dir, name));
  console.log(`${name}: ${info.width}x${info.height}, ${size} bytes`);
}
