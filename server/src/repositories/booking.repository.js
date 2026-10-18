import { pool } from '../config/db.js';

export function semuaPermintaan() {
  return pool.query(
    `SELECT b.*, p.nama AS nama_paket FROM permintaan_booking b
     LEFT JOIN paket p ON p.id = b.paket_id
     ORDER BY b.dikirim_pada DESC`,
  );
}

export function buatPermintaan(data) {
  return pool.query(
    `INSERT INTO permintaan_booking (paket_id, nama_lengkap, no_wa, rencana_tanggal, lokasi, catatan)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [data.paket_id || null, data.nama_lengkap, data.no_wa, data.rencana_tanggal, data.lokasi || null, data.catatan || null],
  );
}
