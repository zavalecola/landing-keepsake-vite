import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INPUT_DIR = 'raw-images';
const OUTPUT_DIR = 'src/assets/images';
const WIDTHS = [400, 800]; // 1x та 2x ширини для srcset

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`Папку "${INPUT_DIR}" не знайдено. Створіть її та додайте вихідні зображення.`);
  process.exit(1);
}

// Очищаємо старі згенеровані файли, щоб уникнути сміття
fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(INPUT_DIR).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

if (files.length === 0) {
  console.warn(`У папці "${INPUT_DIR}" немає зображень (.jpg, .png, .webp).`);
  process.exit(0);
}

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const file of files) {
  const { name } = path.parse(file);
  const inputPath = path.join(INPUT_DIR, file);
  const originalSize = fs.statSync(inputPath).size;

  console.log(`\nОбробка: ${file} (оригінал: ${formatKB(originalSize)})`);

  for (const width of WIDTHS) {
    const resized = sharp(inputPath).resize({ width });

    const avifPath = path.join(OUTPUT_DIR, `${name}-${width}.avif`);
    const webpPath = path.join(OUTPUT_DIR, `${name}-${width}.webp`);
    const jpgPath = path.join(OUTPUT_DIR, `${name}-${width}.jpg`);

    await resized.clone().avif({ quality: 65 }).toFile(avifPath);
    await resized.clone().webp({ quality: 80 }).toFile(webpPath);
    await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgPath);

    console.log(
      `  ${width}w -> AVIF: ${formatKB(fs.statSync(avifPath).size)} | ` +
        `WebP: ${formatKB(fs.statSync(webpPath).size)} | ` +
        `JPEG: ${formatKB(fs.statSync(jpgPath).size)}`,
    );
  }
}

console.log('\nГотово! Усі зображення збережено в src/assets/images/');
