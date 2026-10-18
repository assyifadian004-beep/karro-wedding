import multer from 'multer';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
import { env } from './env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const uploadsPath = join(__dirname, '..', '..', env.uploadsDir);
mkdirSync(uploadsPath, { recursive: true });

const allowed = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.diskStorage({
  destination: uploadsPath,
  filename: (_req, file, cb) => {
    const safe = file.originalname.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  },
});

function fileFilter(_req, file, cb) {
  const ext = extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error('Jenis berkas tidak diizinkan. Gunakan jpg, jpeg, png, atau webp.'));
  }
  cb(null, true);
}

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
