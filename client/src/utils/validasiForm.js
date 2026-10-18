export function validasiForm(values) {
  const errors = {};

  const nama = (values.nama_lengkap || '').trim();
  if (!nama) errors.nama_lengkap = 'Nama lengkap wajib diisi.';
  else if (nama.length < 2) errors.nama_lengkap = 'Nama lengkap minimal dua karakter.';

  const wa = (values.no_wa || '').trim();
  if (!wa) errors.no_wa = 'Nomor WhatsApp wajib diisi.';
  else if (!/^(08|\+628)[0-9]{8,13}$/.test(wa)) errors.no_wa = 'Gunakan format 08xx atau +628xx.';

  const tanggal = values.rencana_tanggal;
  if (!tanggal) errors.rencana_tanggal = 'Rencana tanggal wajib diisi.';
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(tanggal) < today) errors.rencana_tanggal = 'Tanggal tidak boleh sebelum hari ini.';
  }

  return errors;
}
