export function buatPesanWhatsapp({ namaPaket, nama, tanggal, lokasi, catatan }) {
  const baris = [
    'Halo, saya ingin booking paket pernikahan.',
    `Nama: ${nama}`,
    `Paket: ${namaPaket}`,
    `Tanggal: ${tanggal}`,
  ];
  if (lokasi) baris.push(`Lokasi: ${lokasi}`);
  if (catatan) baris.push(`Catatan: ${catatan}`);
  return baris.join('\n');
}
