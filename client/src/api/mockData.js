const placeholder = '/images/placeholder.jpg';

export const mockPaket = [
  {
    id: 1,
    nama: 'Silver',
    slug: 'silver',
    harga: 3500000,
    kapasitas: '150-250 tamu',
    deskripsi_singkat: 'Paket hemat untuk pernikahan intim dengan fasilitas inti.',
    deskripsi_lengkap:
      'Paket Silver cocok untuk acara sakral bersama keluarga dan sahabat dekat. Sudah mencakup koordinator acara, dekorasi panggung dasar, dan dokumentasi foto.',
    foto: placeholder,
    urutan: 1,
    fasilitas: [
      { id: 1, nama: 'Koordinator acara hari-H' },
      { id: 2, nama: 'Dekorasi panggung dasar' },
      { id: 3, nama: 'Dokumentasi foto' },
      { id: 4, nama: 'Sound system dan MC' },
      { id: 5, nama: 'Katering untuk tamu' },
    ],
  },
  {
    id: 2,
    nama: 'Gold',
    slug: 'gold',
    harga: 4950000,
    kapasitas: '250-500 tamu',
    deskripsi_singkat: 'Paket favorit dengan dekorasi lengkap dan tim lebih besar.',
    deskripsi_lengkap:
      'Paket Gold memberi keseimbangan terbaik antara harga dan fasilitas. Termasuk tim wedding organizer lengkap, dekorasi panggung dan meja tamu, serta dokumentasi foto dan video.',
    foto: placeholder,
    urutan: 2,
    fasilitas: [
      { id: 6, nama: 'Koordinator acara hari-H' },
      { id: 7, nama: 'Dekorasi panggung dan meja tamu' },
      { id: 8, nama: 'Dokumentasi foto dan video' },
      { id: 9, nama: 'Sound system dan MC profesional' },
      { id: 10, nama: 'Katering untuk tamu' },
      { id: 11, nama: 'Riasan dan busana pengantin' },
    ],
  },
  {
    id: 3,
    nama: 'Platinum',
    slug: 'platinum',
    harga: 6550000,
    kapasitas: '500-1000 tamu',
    deskripsi_singkat: 'Paket premium untuk pernikahan megah tanpa kompromi.',
    deskripsi_lengkap:
      'Paket Platinum adalah layanan paling lengkap dari Karro Wedding Organizer. Dekorasi premium, tim besar, dokumentasi full, serta pendampingan VIP dari persiapan hingga hari-H.',
    foto: placeholder,
    urutan: 3,
    fasilitas: [
      { id: 12, nama: 'Koordinator acara hari-H dan tim besar' },
      { id: 13, nama: 'Dekorasi premium panggung, meja tamu, dan gate' },
      { id: 14, nama: 'Dokumentasi foto dan video full' },
      { id: 15, nama: 'Sound system, lighting, dan MC profesional' },
      { id: 16, nama: 'Katering premium untuk tamu' },
      { id: 17, nama: 'Riasan, busana, dan busana keluarga' },
      { id: 18, nama: 'Pendampingan VIP persiapan hingga hari-H' },
    ],
  },
];

export const mockGaleri = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: i,
  paket_id: i <= 2 ? 1 : i <= 4 ? 2 : 3,
  file: placeholder,
  keterangan: `Dokumentasi pernikahan ${i}`,
}));

export const mockTestimoni = [
  { id: 1, nama_klien: 'Dinda & Raka', isi: 'Tim Karro sangat sigap dari konsultasi sampai hari-H. Dekorasi sesuai konsep yang kami minta.', foto: null },
  { id: 2, nama_klien: 'Sari & Bagas', isi: 'Harga transparan, hasil dokumentasi rapi. Tamu banyak tapi acara tetap tertib.', foto: null },
  { id: 3, nama_klien: 'Nadia & Fajar', isi: 'Respons WhatsApp cepat. Semua revisi kecil dikerjakan dengan sabar.', foto: null },
];

export const mockPengaturan = {
  no_wa_admin: '6281234567890',
  template_pesan: 'Halo, saya ingin booking paket pernikahan.',
  info_kontak: 'Karro Wedding Organizer',
};

export function mockFor(url) {
  if (url === '/paket') return mockPaket;
  if (url.startsWith('/paket/')) {
    const slug = url.split('/')[2];
    return mockPaket.find((p) => p.slug === slug) || null;
  }
  if (url.startsWith('/galeri/paket/')) {
    const id = Number(url.split('/')[3]);
    return mockGaleri.filter((g) => g.paket_id === id);
  }
  if (url === '/galeri') return mockGaleri;
  if (url === '/testimoni') return mockTestimoni;
  if (url === '/pengaturan') return mockPengaturan;
  if (url === '/booking') return [];
  return null;
}
