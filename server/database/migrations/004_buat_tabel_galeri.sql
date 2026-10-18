CREATE TABLE IF NOT EXISTS galeri (
  id SERIAL PRIMARY KEY,
  paket_id INTEGER REFERENCES paket(id) ON DELETE CASCADE,
  file TEXT NOT NULL,
  keterangan TEXT NOT NULL DEFAULT '',
  diunggah_pada TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galeri_paket_id ON galeri(paket_id);
