import * as repo from '../repositories/testimoni.repository.js';
import { AppError } from '../utils/appError.js';
import { sanitizeText } from '../utils/sanitize.js';

export async function listTestimoni() {
  const { rows } = await repo.semuaTestimoni();
  return rows;
}

export async function tambahTestimoni(data, file) {
  const { rows } = await repo.buatTestimoni({
    nama_klien: sanitizeText(data.nama_klien),
    isi: sanitizeText(data.isi),
    foto: file ? file.filename : null,
  });
  return rows[0];
}

export async function editTestimoni(id, data, file) {
  const { rows } = await repo.ubahTestimoni(id, {
    nama_klien: sanitizeText(data.nama_klien),
    isi: sanitizeText(data.isi),
    foto: file ? file.filename : null,
  });
  if (rows.length === 0) throw new AppError('Testimoni tidak ditemukan.', 404);
  return rows[0];
}

export async function hapusTestimoni(id) {
  const result = await repo.hapusTestimoni(id);
  if (result.rowCount === 0) throw new AppError('Testimoni tidak ditemukan.', 404);
}
