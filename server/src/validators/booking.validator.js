import { body } from 'express-validator';

export const bookingRules = [
  body('nama_lengkap').trim().isLength({ min: 2 }).withMessage('Nama lengkap minimal dua karakter.'),
  body('no_wa').trim().matches(/^(08|\+628)[0-9]{8,13}$/).withMessage('Nomor WhatsApp tidak valid. Gunakan format 08xx atau +628xx.'),
  body('rencana_tanggal').isISO8601().withMessage('Format tanggal tidak valid.').custom((value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(value);
    if (picked < today) throw new Error('Rencana tanggal tidak boleh sebelum hari ini.');
    return true;
  }),
  body('lokasi').optional({ values: 'falsy' }).trim(),
  body('catatan').optional({ values: 'falsy' }).trim(),
  body('paket_id').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('Paket tidak valid.'),
];
