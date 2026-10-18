INSERT INTO paket (nama, slug, harga, kapasitas, deskripsi_singkat, deskripsi_lengkap, urutan)
VALUES
  ('Silver', 'silver', 3500000, '150-250 tamu', 'Paket hemat untuk pernikahan intim dengan fasilitas inti.', 'Paket Silver cocok untuk acara sakral bersama keluarga dan sahabat dekat. Sudah mencakup koordinator acara, dekorasi panggung dasar, dan dokumentasi foto.', 1),
  ('Gold', 'gold', 4950000, '250-500 tamu', 'Paket favorit dengan dekorasi lengkap dan tim lebih besar.', 'Paket Gold memberi keseimbangan terbaik antara harga dan fasilitas. Termasuk tim wedding organizer lengkap, dekorasi panggung dan meja tamu, serta dokumentasi foto dan video.', 2),
  ('Platinum', 'platinum', 6550000, '500-1000 tamu', 'Paket premium untuk pernikahan megah tanpa kompromi.', 'Paket Platinum adalah layanan paling lengkap dari Karro Wedding Organizer. Dekorasi premium, tim besar, dokumentasi full, serta pendampingan VIP dari persiapan hingga hari-H.', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('Koordinator acara hari-H'),
  ('Dekorasi panggung dasar'),
  ('Dokumentasi foto'),
  ('Sound system dan MC'),
  ('Katering untuk tamu')
) AS f(nama)
WHERE p.slug = 'silver';

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('Koordinator acara hari-H'),
  ('Dekorasi panggung dan meja tamu'),
  ('Dokumentasi foto dan video'),
  ('Sound system dan MC profesional'),
  ('Katering untuk tamu'),
  ('Riasan dan busana pengantin')
) AS f(nama)
WHERE p.slug = 'gold';

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('Koordinator acara hari-H dan tim besar'),
  ('Dekorasi premium panggung, meja tamu, dan gate'),
  ('Dokumentasi foto dan video full'),
  ('Sound system, lighting, dan MC profesional'),
  ('Katering premium untuk tamu'),
  ('Riasan, busana, dan busana keluarga'),
  ('Pendampingan VIP persiapan hingga hari-H')
) AS f(nama)
WHERE p.slug = 'platinum';
