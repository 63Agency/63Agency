/**
 * Converts all images in public/images to WebP.
 * Partner logos under public/images/partners/partner-logos/ are resized to max 200x100px.
 * Run: npm run images:webp
 * Requires: npm install sharp (devDependency)
 */
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images');
const PARTNER_LOGOS_DIR = join(PUBLIC_IMAGES, 'partners', 'partner-logos');
const ALLOWED_EXT = /\.(png|jpe?g|jpg)$/i;
const MAX_PARTNER_WIDTH = 200;
const MAX_PARTNER_HEIGHT = 100;

function* walk(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = join(dir, f.name);
    if (f.isDirectory()) yield* walk(full);
    else if (ALLOWED_EXT.test(f.name)) yield full;
  }
}

function isPartnerLogo(filePath) {
  return filePath.replace(/\\/g, '/').includes('/partners/partner-logos/');
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
    const rel = file.replace(join(__dirname, '..'), '');
    try {
      let pipeline = sharp(file);
      if (isPartnerLogo(file)) {
        pipeline = pipeline
          .resize(MAX_PARTNER_WIDTH, MAX_PARTNER_HEIGHT, { fit: 'inside', withoutEnlargement: true });
      }
      await pipeline
        .webp({ quality: 85 })
        .toFile(out);
      console.log('Converted:', rel, '->', out.replace(join(__dirname, '..'), ''));
    } catch (e) {
      console.error('Failed:', file, e.message);
    }
  }
  console.log('Done. Update image paths in src/ from .png/.jpg to .webp.');
}

run();
