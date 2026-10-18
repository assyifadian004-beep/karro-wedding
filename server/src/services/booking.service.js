import * as repo from '../repositories/booking.repository.js';
import { sanitizeText } from '../utils/sanitize.js';

export async function listPermintaan() {
  const { rows } = await repo.semuaPermintaan();
  return rows;
}

export async function buatPermintaan(data) {
  const payload = {
    paket_id: data.paket_id ? Number(data.paket_id) : null,
    nama_lengkap: sanitizeText(data.nama_lengkap),
    no_wa: sanitizeText(data.no_wa),
    rencana_tanggal: data.rencana_tanggal,
    lokasi: sanitizeText(data.lokasi || ''),
    catatan: sanitizeText(data.catatan || ''),
  };
  const { rows } = await repo.buatPermintaan(payload);
  return rows[0];
}
