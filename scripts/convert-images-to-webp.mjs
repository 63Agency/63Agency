/**
 * Converts all images in public/images to WebP and optionally updates references.
 * Run: node scripts/convert-images-to-webp.mjs
 * Requires: npm install sharp (devDependency)
 */
import { readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images');

const ALLOWED_EXT = /\.(png|jpe?g|jpg)$/i;

function* walk(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = join(dir, f.name);
    if (f.isDirectory()) yield* walk(full);
    else if (ALLOWED_EXT.test(f.name)) yield full;
  }
}

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Install sharp first: npm install --save-dev sharp');
    process.exit(1);
  }

  for (const file of walk(PUBLIC_IMAGES)) {
    const out = file.replace(ALLOWED_EXT, '.webp');
    try {
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(out);
      console.log('Converted:', file.replace(join(__dirname, '..'), ''), '->', out.replace(join(__dirname, '..'), ''));
    } catch (e) {
      console.error('Failed:', file, e.message);
    }
  }
  console.log('Done. Update image paths in src/ from .png/.jpg to .webp if you want to serve WebP files directly.');
}

run();
