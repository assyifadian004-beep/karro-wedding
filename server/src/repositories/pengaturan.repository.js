import { pool } from '../config/db.js';

export function ambilPengaturan() {
  return pool.query('SELECT * FROM pengaturan_situs WHERE id = 1');
}

export function ubahPengaturan({ no_wa_admin, template_pesan, info_kontak }) {
  return pool.query(
    `INSERT INTO pengaturan_situs (id, no_wa_admin, template_pesan, info_kontak)
     VALUES (1, $1, $2, $3)
     ON CONFLICT (id) DO UPDATE SET no_wa_admin = $1, template_pesan = $2, info_kontak = $3
     RETURNING *`,
    [no_wa_admin, template_pesan, info_kontak],
  );
}
