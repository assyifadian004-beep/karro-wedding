import { pool } from '../config/db.js';

export function semuaPaket() {
  return pool.query('SELECT * FROM paket ORDER BY urutan, id');
}

export function paketBySlug(slug) {
  return pool.query('SELECT * FROM paket WHERE slug = $1', [slug]);
}

export function paketById(id) {
  return pool.query('SELECT * FROM paket WHERE id = $1', [id]);
}

export function buatPaket(data) {
  return pool.query(
    `INSERT INTO paket (nama, slug, harga, kapasitas, deskripsi_singkat, deskripsi_lengkap, foto, urutan)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [data.nama, data.slug, data.harga, data.kapasitas, data.deskripsi_singkat, data.deskripsi_lengkap, data.foto, data.urutan],
  );
}

export function ubahPaket(id, data) {
  return pool.query(
    `UPDATE paket SET nama = $1, slug = $2, harga = $3, kapasitas = $4, deskripsi_singkat = $5,
     deskripsi_lengkap = $6, foto = COALESCE($7, foto), urutan = $8, diubah_pada = NOW()
     WHERE id = $9 RETURNING *`,
    [data.nama, data.slug, data.harga, data.kapasitas, data.deskripsi_singkat, data.deskripsi_lengkap, data.foto, data.urutan, id],
  );
}

export function hapusPaket(id) {
  return pool.query('DELETE FROM paket WHERE id = $1', [id]);
}

export function fasilitasByPaketId(paketId) {
  return pool.query('SELECT * FROM fasilitas_paket WHERE paket_id = $1 ORDER BY id', [paketId]);
}

export function gantiFasilitas(paketId, daftar) {
  return pool.query('DELETE FROM fasilitas_paket WHERE paket_id = $1', [paketId]).then(() =>
    Promise.all(
      daftar.map((nama) =>
        pool.query('INSERT INTO fasilitas_paket (paket_id, nama) VALUES ($1, $2)', [paketId, nama]),
      ),
    ),
  );
}
