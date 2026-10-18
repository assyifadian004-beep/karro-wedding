CREATE TABLE IF NOT EXISTS pengaturan_situs (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  no_wa_admin TEXT NOT NULL DEFAULT '',
  template_pesan TEXT NOT NULL DEFAULT 'Halo, saya ingin booking paket pernikahan.',
  info_kontak TEXT NOT NULL DEFAULT ''
);
