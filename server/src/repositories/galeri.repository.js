import { pool } from '../config/db.js';

export function semuaGaleri() {
  return pool.query('SELECT * FROM galeri ORDER BY diunggah_pada DESC, id DESC');
}

export function galeriByPaketId(paketId) {
  return pool.query('SELECT * FROM galeri WHERE paket_id = $1 ORDER BY diunggah_pada DESC, id DESC', [paketId]);
}

export function buatGaleri({ paketId, file, keterangan }) {
  return pool.query(
    'INSERT INTO galeri (paket_id, file, keterangan) VALUES ($1, $2, $3) RETURNING *',
    [paketId || null, file, keterangan],
  );
}

export function ubahGaleri(id, { paketId, keterangan }) {
  return pool.query(
    'UPDATE galeri SET paket_id = $1, keterangan = $2 WHERE id = $3 RETURNING *',
    [paketId || null, keterangan, id],
  );
}

export function hapusGaleri(id) {
  return pool.query('DELETE FROM galeri WHERE id = $1', [id]);
}
