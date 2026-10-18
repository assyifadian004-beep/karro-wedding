import * as repo from '../repositories/pengaturan.repository.js';
import { sanitizeText } from '../utils/sanitize.js';

export async function getPengaturan() {
  const { rows } = await repo.ambilPengaturan();
  return rows[0] || { no_wa_admin: '', template_pesan: 'Halo, saya ingin booking paket pernikahan.', info_kontak: '' };
}

export async function updatePengaturan(data) {
  const payload = {
    no_wa_admin: sanitizeText(data.no_wa_admin).replace(/[^0-9+]/g, ''),
    template_pesan: sanitizeText(data.template_pesan || 'Halo, saya ingin booking paket pernikahan.'),
    info_kontak: sanitizeText(data.info_kontak || ''),
  };
  const { rows } = await repo.ubahPengaturan(payload);
  return rows[0];
}
