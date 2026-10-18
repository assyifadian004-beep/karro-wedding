import * as repo from '../repositories/paket.repository.js';
import { AppError } from '../utils/appError.js';
import { sanitizeText } from '../utils/sanitize.js';

function slugify(nama) {
  return nama.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function bersih(data) {
  return {
    nama: sanitizeText(data.nama),
    slug: data.slug ? slugify(data.slug) : slugify(data.nama),
    harga: Number(data.harga),
    kapasitas: sanitizeText(data.kapasitas),
    deskripsi_singkat: sanitizeText(data.deskripsi_singkat || ''),
    deskripsi_lengkap: sanitizeText(data.deskripsi_lengkap || ''),
    foto: data.foto || null,
    urutan: data.urutan === undefined || data.urutan === '' ? 0 : Number(data.urutan),
  };
}

export async function listPaket() {
  const { rows } = await repo.semuaPaket();
  return rows;
}

export async function detailPaket(slug) {
  const { rows } = await repo.paketBySlug(slug);
  const paket = rows[0];
  if (!paket) throw new AppError('Paket tidak ditemukan.', 404);
  const fasilitas = await repo.fasilitasByPaketId(paket.id);
  return { ...paket, fasilitas: fasilitas.rows };
}

export async function tambahPaket(data, fotoFile) {
  const payload = bersih({ ...data, foto: fotoFile ? fotoFile.filename : null });
  const duplikat = await repo.paketBySlug(payload.slug);
  if (duplikat.rowCount > 0) throw new AppError('Slug sudah dipakai paket lain.', 400);
  const { rows } = await repo.buatPaket(payload);
  const paket = rows[0];
  if (Array.isArray(data.fasilitas)) {
    const daftar = data.fasilitas.map(sanitizeText).filter(Boolean);
    await repo.gantiFasilitas(paket.id, daftar);
  }
  return paket;
}

export async function editPaket(id, data, fotoFile) {
  const existing = await repo.paketById(id);
  if (existing.rowCount === 0) throw new AppError('Paket tidak ditemukan.', 404);
  const payload = bersih({ ...data, foto: fotoFile ? fotoFile.filename : null });
  const { rows } = await repo.ubahPaket(id, payload);
  if (Array.isArray(data.fasilitas)) {
    const daftar = data.fasilitas.map(sanitizeText).filter(Boolean);
    await repo.gantiFasilitas(id, daftar);
  }
  return rows[0];
}

export async function hapusPaket(id) {
  const result = await repo.hapusPaket(id);
  if (result.rowCount === 0) throw new AppError('Paket tidak ditemukan.', 404);
}
