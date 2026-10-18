CREATE TABLE IF NOT EXISTS permintaan_booking (
  id SERIAL PRIMARY KEY,
  paket_id INTEGER REFERENCES paket(id) ON DELETE SET NULL,
  nama_lengkap TEXT NOT NULL,
  no_wa TEXT NOT NULL,
  rencana_tanggal DATE NOT NULL,
  lokasi TEXT,
  catatan TEXT,
  dikirim_pada TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
