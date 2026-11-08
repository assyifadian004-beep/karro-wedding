# Rekap Progress Pembaruan — Karro Wedding Organizer

> Terakhir diperbarui: 1 November 2026

---

## Iterasi 16 — Halaman Galeri: Integrasi Aset Foto Asli, Header Banner Portofolio, Filter Kategori, & Modal Lightbox

### Permintaan Pengguna
| # | Permintaan | Status |
|---|---|---|
| 1 | Masukkan foto-foto dokumentasi yang ada di folder `asset/` ke dalam menu galeri | ✅ Selesai |
| 2 | Rancang tata letak dan konsep galeri seperti contoh gambar referensi (Hero Banner dengan judul artistik, pill tabs kategori, dan card grid) | ✅ Selesai |
| 3 | Terapkan kategorisasi filter (Semua, Akad, Resepsi, Adat Jawa, Dekorasi, Tim WO) | ✅ Selesai |
| 4 | Sediakan fitur interaktif Lightbox (Modal Preview) untuk melihat foto resolusi tinggi secara penuh lengkap dengan navigasi | ✅ Selesai |
| 5 | Tambahkan banner konsultasi WhatsApp di bagian bawah galeri | ✅ Selesai |
| 6 | Pastikan rekap perubahan termuat dalam `task.md` dan `implementation.md` | ✅ Selesai |

---

## Checklist Semua Iterasi

### ✅ Iterasi 1 (20 Okt 2026) — Layout Awal Beranda
- [x] Hero section dengan logo berlatar biru navy
- [x] About section 3-kolom keunggulan
- [x] Formulir konsultasi + CTA WhatsApp
- [x] Hapus grid paket dari beranda

### ✅ Iterasi 2 (20 Okt 2026) — Redesign Layout
- [x] Logo HD baru (819×1024) disimpan sebagai `karro-logo-blue.png`
- [x] Foto tim baru (1024×682) disimpan sebagai `karro-team-about.jpg`
- [x] About Section didesain ulang: foto-band full-width → navy narasi+stats → pilar putih

### ✅ Iterasi 3 (25 Okt 2026) — Perbaikan Tampilan Logo & Footer
- [x] **Logo**: ganti ke `karro-logo-white.png` (RGBA 1024×1024, transparan) — tampil jernih di atas `background-color: #04243d`
- [x] **Footer navy**: CSS `.site-footer--navy` ditambahkan; `Footer` menerima prop `variant`; `AppRouter` pass `variant="navy"` saat `pathname === '/'`

### ✅ Iterasi 4 (25 Okt 2026) — Pembaruan Foto Presisi & Konten Company Profile
- [x] **Foto Tim & Pelaminan Baru**: Disimpan ke `client/public/images/karro-team-about.jpg` (1024×682, quality 95).
- [x] **Tampilan Foto Presisi**: Container responsif `.about-photo-wrapper` dan frame `.about-photo-frame` (aspect-ratio 1024/682, object-fit contain, tanpa pemotongan).

### ✅ Iterasi 5 (25 Okt 2026) — Standarisasi Penulisan "Karro"
- [x] Mengganti seluruh kata all-caps "KARRO" menjadi "Karro" di seluruh berkas `.jsx`, CSS, dan dokumentasi.

### ✅ Iterasi 6 (25 Okt 2026) — Reposisi Visi & Pemulihan Background Putih Misi
- [x] Reposisi Visi ke bawah Profil tepat sebelum Misi.
- [x] Section Misi dikembalikan berlatar putih terang dengan kartu putih berelevasi.

### ✅ Iterasi 7 (25 Okt 2026) — Presisi Padding, Margin, dan Keselarasan Grid Vertikal
- [x] Standardisasi lebar sumbu `1040px`, perataan horizontal, dan eliminasi border kaku pada Visi.

### ✅ Iterasi 8 (25 Okt 2026) — Penyelarasan Layout Beranda dengan Sistem Desain
- [x] Mengadopsi struktur native `.hero`, `.section.section--alt`, `.section`, dan `.tile-grid` pada beranda ([Home.jsx](file:///d:/karro-wedding/client/src/pages/Home.jsx)).

### ✅ Iterasi 9 (25 Okt 2026) — Transformasi Halaman Tentang (Penjelasan WO & QnA)
- [x] Penghapusan konten duplikat perjalanan/komitmen dari Tentang.
- [x] Edukasi peran WO dan integrasi QnA interaktif.

### ✅ Iterasi 10 (25 Okt 2026) — Peran WO: Latar Biru Navy & Tata Letak Rapi
- [x] Latar biru navy berwibawa (`#0b2742`) pada Peran WO dengan kartu putih berelevasi.

### ✅ Iterasi 13 (25 Okt 2026) — FAQ Terpusat Satu Kolom Rapi
- [x] Menghilangkan sistem 2-kolom sidebar dan menjadikannya alur vertikal terpusat yang tenang tanpa pergeseran sticky.

### ✅ Iterasi 14 (25 Okt 2026) — Harmonisasi Warna QnA & Integrasi Seksi Konsultasi
- [x] Penyesuaian pewarnaan latar FAQ menjadi terang alami untuk ritme warna selang-seling dan penambahan seksi konsultasi WhatsApp.

### ✅ Iterasi 15 (25 Okt 2026) — Redesain Halaman Paket Berdasarkan Brosur PDF
- [x] Penyelarasan Paket Silver (3.500K), Gold (4.950K), Platinum (6.550K), banner custom package, dan grid 8 Syarat & Ketentuan Layanan.

### ✅ Iterasi 16 (1 Nov 2026) — Integrasi Aset Foto Asli ke Menu Galeri (Sesuai Referensi Gambar)
- [x] **Optimasi & Impor 13 Foto Resolusi Tinggi dari Folder `asset/`**:
  - Foto mentah kamera (4–17 MB) diproses secara terarah dengan bicubic resampling & EXIF auto-rotation menjadi format web-ready 1600px (~100–440 KB) di `client/public/images/galeri/`.
  - Mengoreksi otomatis orientasi rotasi kamera (EXIF Tag 274) agar tidak ada foto yang miring atau terbalik.
- [x] **Hero Banner Portofolio (Sesuai Referensi Visual)**:
  - Header berlatar belakang foto pelaminan dengan lapisan gradien radial biru navy elegan.
  - Badge pill: `Photography Portfolio`.
  - Judul Display: *"Momen Pernikahan Terindah"* dengan aksen serif miring emas.
  - Subjudul: *"Keindahan dalam setiap bingkai. Karro Wedding Organizer mengabadikan detail terkecil untuk menciptakan kenangan terbesar dalam hidup Anda."*
- [x] **Filter Kategori (Pill Tabs)**:
  - Menyediakan filter interaktif: `Semua`, `Akad`, `Resepsi`, `Adat Jawa`, `Dekorasi`, `Tim WO`.
  - Tombol aktif menggunakan aksen warna sage-teal (`#648782`) dengan efek lembut dan bayangan elevasi.
- [x] **Kartu Galeri Modern & Efek Hover**:
  - Grid 3-kolom responsif dengan sudut melengkung 18px.
  - Efek zoom halus gambar saat kursor diarahkan (`transform: scale(1.06)`).
  - Overlay gelap lembut dengan badge icon kaca pembesar (`ZoomIn`).
  - Label kategori di pojok gambar, judul foto, deskripsi momen, dan lokasi acara (Yogyakarta, Banyumas, Jawa Tengah, Kebumen).
- [x] **Modal Lightbox Interaktif (Preview Foto Penuh)**:
  - Tampilan layar penuh dengan latar belakang kaca buram (`backdrop-filter: blur(10px)`).
  - Navigasi tombol Panah Kiri (`ChevronLeft`), Panah Kanan (`ChevronRight`), dan tombol Tutup (`X`).
  - Dukungan navigasi keyboard: tombol `ArrowLeft`, `ArrowRight`, dan `Escape`.
  - Keterangan foto lengkap dan nomor urut (contoh: *Foto 3 dari 14*).
- [x] **Banner Konsultasi WhatsApp di Bawah Galeri**:
  - Mengarahkan pengunjung yang terkesan dengan portofolio langsung berkonsultasi via WhatsApp admin Karro.
- [x] **Verifikasi Build & Lint**:
  - `npm run build` sukses 100% (5.01s).
  - `npm run lint` nol error.

---

## File yang Diubah (Iterasi 16)

| File | Perubahan |
|---|---|
| `process_galeri.ps1` | Script pemrosesan aset: resizing 1600px, EXIF auto-rotation, dan optimasi kompresi kualitas 85% |
| `client/public/images/galeri/*` | 13 aset foto dokumentasi pernikahan Karro yang telah dioptimasi |
| `client/src/data/galeriData.js` | Berkas baru berisi konstanta `GALERI_CATEGORIES` dan `GALERI_ITEMS` lengkap dengan metadata |
| `client/src/pages/Galeri.jsx` | Redesain total Galeri: Hero Banner, Filter Bar, Grid Kartu Foto, Lightbox Modal, dan CTA WhatsApp |
| `client/src/styles/index.css` | Styling `.galeri-hero`, `.galeri-filter-bar`, `.galeri-grid`, `.galeri-card`, dan modal `.lightbox-*` |
| `server/database/seeds/galeri_awal.sql` | Seed database PostgreSQL galeri yang memetakan foto ke paket terkait |
| `task.md` | Diperbarui dengan rekap Iterasi 16 |
| `implementation.md` | Diperbarui dengan dokumentasi arsitektur galeri dan modal lightbox |
