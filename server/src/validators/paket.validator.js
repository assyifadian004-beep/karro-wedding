import { body } from 'express-validator';

export const paketRules = [
  body('nama').trim().notEmpty().withMessage('Nama paket wajib diisi.'),
  body('harga').isInt({ min: 0 }).withMessage('Harga harus bilangan bulat non-negatif.'),
  body('kapasitas').trim().notEmpty().withMessage('Kapasitas tamu wajib diisi.'),
  body('deskripsi_singkat').optional({ values: 'falsy' }).trim(),
  body('deskripsi_lengkap').optional({ values: 'falsy' }).trim(),
  body('urutan').optional({ values: 'falsy' }).isInt({ min: 0 }).withMessage('Urutan harus bilangan bulat non-negatif.'),
];

export const testimoniRules = [
  body('nama_klien').trim().notEmpty().withMessage('Nama klien wajib diisi.'),
  body('isi').trim().notEmpty().withMessage('Isi testimoni wajib diisi.'),
];

export const kontakRules = [
  body('no_wa_admin').trim().matches(/^(08|\+628)[0-9]{8,13}$/).withMessage('Nomor WhatsApp tidak valid.'),
  body('template_pesan').optional({ values: 'falsy' }).trim(),
  body('info_kontak').optional({ values: 'falsy' }).trim(),
];
