import * as repo from '../repositories/galeri.repository.js';
import { AppError } from '../utils/appError.js';
import { sanitizeText } from '../utils/sanitize.js';

export async function listGaleri() {
  const { rows } = await repo.semuaGaleri();
  return rows;
}

export async function listGaleriPaket(paketId) {
  const { rows } = await repo.galeriByPaketId(paketId);
  return rows;
}

export async function tambahGaleri({ paket_id, keterangan }, file) {
  if (!file) throw new AppError('Berkas foto wajib diunggah.', 400);
  const { rows } = await repo.buatGaleri({
    paketId: paket_id ? Number(paket_id) : null,
    file: file.filename,
    keterangan: sanitizeText(keterangan || ''),
  });
  return rows[0];
}

export async function editGaleri(id, { paket_id, keterangan }) {
  const { rows } = await repo.ubahGaleri(id, {
    paketId: paket_id ? Number(paket_id) : null,
    keterangan: sanitizeText(keterangan || ''),
  });
  if (rows.length === 0) throw new AppError('Foto tidak ditemukan.', 404);
  return rows[0];
}

export async function hapusGaleri(id) {
  const result = await repo.hapusGaleri(id);
  if (result.rowCount === 0) throw new AppError('Foto tidak ditemukan.', 404);
}
