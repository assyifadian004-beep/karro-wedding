import { pool } from '../config/db.js';

export function semuaTestimoni() {
  return pool.query('SELECT * FROM testimoni ORDER BY id DESC');
}

export function buatTestimoni({ nama_klien, isi, foto }) {
  return pool.query(
    'INSERT INTO testimoni (nama_klien, isi, foto) VALUES ($1, $2, $3) RETURNING *',
    [nama_klien, isi, foto || null],
  );
}

export function ubahTestimoni(id, { nama_klien, isi, foto }) {
  return pool.query(
    'UPDATE testimoni SET nama_klien = $1, isi = $2, foto = COALESCE($3, foto) WHERE id = $4 RETURNING *',
    [nama_klien, isi, foto || null, id],
  );
}

export function hapusTestimoni(id) {
  return pool.query('DELETE FROM testimoni WHERE id = $1', [id]);
}
