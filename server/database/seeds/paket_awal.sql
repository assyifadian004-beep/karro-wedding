INSERT INTO paket (nama, slug, harga, kapasitas, deskripsi_singkat, deskripsi_lengkap, urutan)
VALUES
  ('Paket Silver', 'silver', 3500000, '150-250 pack', 'Paket hemat untuk pernikahan intim dengan pengawalan 4-5 crew profesional.', 'Paket Silver cocok untuk acara sakral bersama keluarga dan sahabat terdekat. Sudah mencakup konsep rundown terstruktur, 4-5 crew lapangan, konsultasi persiapan, meeting client dan final meeting vendor.', 1),
  ('Paket Gold', 'gold', 4950000, '250-500 pack', 'Paket favorit paling populer dengan 5-6 crew dan saxophone entrance.', 'Paket Gold memberi keseimbangan terbaik antara harga dan kemegahan. Dilengkapi penampilan saxophone entrance eksklusif, 5-6 crew lapangan, 2 buku tamu, 6 pcs confetti, dan 8 jam layanan pengawalan.', 2),
  ('Paket Platinum', 'platinum', 6550000, '500-750 pack', 'Paket VIP luxury terlengkap dengan efek dry ice, saxophone, dan 6-7 crew.', 'Paket Platinum adalah layanan paling lengkap dari Karro Wedding Organizer. Mengorganisir acara skala besar hingga 750 pack dengan 6-7 crew, 2 titik efek dry ice megah, saxophone entrance, dan 9 jam layanan pengawalan.', 3)
ON CONFLICT (slug) DO UPDATE SET
  nama = EXCLUDED.nama,
  harga = EXCLUDED.harga,
  kapasitas = EXCLUDED.kapasitas,
  deskripsi_singkat = EXCLUDED.deskripsi_singkat,
  deskripsi_lengkap = EXCLUDED.deskripsi_lengkap;

DELETE FROM fasilitas_paket WHERE paket_id IN (SELECT id FROM paket WHERE slug IN ('silver', 'gold', 'platinum'));

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('Konsep rundown'),
  ('4-5 Crew'),
  ('Konsultasi'),
  ('1 buku tamu'),
  ('4 pcs convety'),
  ('Wedding book 10 pcs'),
  ('1 kali meeting client'),
  ('Handle 150-250 pack'),
  ('1 day service / 7 jam kerja'),
  ('Final meeting client / Vendor')
) AS f(nama)
WHERE p.slug = 'silver';

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('1 saxophone enterance'),
  ('Konsep rundown'),
  ('5-6 Crew'),
  ('Konsultasi'),
  ('2 buku tamu'),
  ('6 pcs convety'),
  ('Wedding book 10 pcs'),
  ('1 kali meeting client'),
  ('Handle 250-500 pack'),
  ('1 day service / 8 jam kerja'),
  ('Final meeting client / Vendor')
) AS f(nama)
WHERE p.slug = 'gold';

INSERT INTO fasilitas_paket (paket_id, nama)
SELECT p.id, f.nama
FROM paket p
CROSS JOIN (VALUES
  ('2 Titik dry ice'),
  ('1 saxophone enterance'),
  ('Konsep rundown'),
  ('6-7 Crew'),
  ('Konsultasi'),
  ('3 buku tamu'),
  ('6 pcs convety'),
  ('Wedding book 10 pcs'),
  ('1 kali meeting client'),
  ('Handle 500-750 pack'),
  ('1 day service / 9 jam kerja'),
  ('Final meeting client / Vendor')
) AS f(nama)
WHERE p.slug = 'platinum';
