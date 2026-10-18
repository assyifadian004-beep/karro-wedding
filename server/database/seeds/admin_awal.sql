INSERT INTO admin (nama, username, password_hash)
VALUES ('Admin Karro', 'admin', '$2b$10$IHMAJqLrT1IM3t8LUcbsaO8SDIP9hFLeJFc.DexaN2mpze/a/VlXS')
ON CONFLICT (username) DO NOTHING;

INSERT INTO pengaturan_situs (id, no_wa_admin, template_pesan, info_kontak)
VALUES (1, '6281234567890', 'Halo, saya ingin booking paket pernikahan.', 'Karro Wedding Organizer')
ON CONFLICT (id) DO NOTHING;
