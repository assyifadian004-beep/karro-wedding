INSERT INTO galeri (paket_id, file, keterangan)
SELECT p.id, g.file, g.keterangan
FROM (VALUES
  ('silver', '/images/galeri/af-project-0103.jpg', 'Penyerahan Buku Nikah'),
  ('silver', '/images/galeri/af-project-6017.jpg', 'Penyematan Cincin Pernikahan'),
  ('silver', '/images/galeri/af-p3171.jpg', 'Penataan Meja Ijab Qabul'),
  ('silver', '/images/galeri/af-project-151.jpg', 'Detail Undangan & Wax Seal'),
  ('gold', '/images/galeri/2025-06-21-11-25-img-9211.jpg', 'Grand Entrance Kirab Pengantin'),
  ('gold', '/images/galeri/af-project-8319.jpg', 'Kecupan Manis Bertabur Bunga'),
  ('gold', '/images/galeri/af-p3570.jpg', 'Pemotongan Kue & Bubble Shower'),
  ('gold', '/images/galeri/af-project-0958.jpg', 'Siluet Cinta & Kilau Cahaya'),
  ('gold', '/images/galeri/af-project-0176.jpg', 'Pelaminan Botanical Elegan'),
  ('platinum', '/images/galeri/img-4482.jpg', 'Kemegahan Taburan Confetti'),
  ('platinum', '/images/galeri/2025-06-21-14-48-img-9311.jpg', 'Pesona Beludru Marun Klasik'),
  ('platinum', '/images/galeri/img-4434.jpg', 'Kirab Agung Pengantin Berpaes'),
  ('platinum', '/images/galeri/img-4403.jpg', 'Welcome Signage Karro Wedding'),
  ('platinum', '/images/karro-team-about.jpg', 'Kru Profesional Karro Wedding')
) AS g(slug, file, keterangan)
JOIN paket p ON p.slug = g.slug
ON CONFLICT DO NOTHING;

