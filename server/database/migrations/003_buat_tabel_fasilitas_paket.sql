CREATE TABLE IF NOT EXISTS fasilitas_paket (
  id SERIAL PRIMARY KEY,
  paket_id INTEGER NOT NULL REFERENCES paket(id) ON DELETE CASCADE,
  nama TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fasilitas_paket_paket_id ON fasilitas_paket(paket_id);
