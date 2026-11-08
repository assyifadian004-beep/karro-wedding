# Implementation Notes — Karro Wedding Organizer

> Dokumen teknis yang menjelaskan keputusan implementasi dan struktur komponen terbaru pada situs Karro Wedding Organizer.

---

## Iterasi 16 — Halaman Galeri: Integrasi Aset Foto Asli, Header Banner Portofolio, Filter Kategori, & Modal Lightbox

### 1. Pemrosesan & Optimasi Aset Foto Asli
Foto mentah beresolusi tinggi dari kamera di direktori `asset/` berukuran antara 4 MB hingga 17 MB per file. Jika diunduh langsung tanpa optimasi, memuat 14 foto akan menghabiskan lebih dari 140 MB bandwidth, yang memperlambat rendering web secara signifikan.

**Langkah Pemrosesan Otomatis (`process_galeri.ps1`):**
1. **EXIF Auto-Rotation**: Membaca metadata orientasi kamera (EXIF Tag 0x0112 / 274) dan merotasi otomatis gambar vertikal (misalnya `AF_P3171.JPG` dan `AF_P3570.JPG` dengan orientasi 8 diputar 270°/90° CW) sehingga tidak ada gambar yang miring atau terbalik.
2. **High-Quality Bicubic Resampling**: Skala dimensi dibatasi maksimal 1600px pada sisi terpanjang dengan algoritma interpolasi bicubic berkualitas tinggi.
3. **JPEG Compression**: Kompresi kualitas 85% menghasilkan ketajaman gambar sempurna untuk layar Retina/4K dengan ukuran file ringan berkisar antara 100 KB – 440 KB. File disimpan pada `client/public/images/galeri/`.

### 2. Arsitektur Komponen Galeri (`Galeri.jsx`)
Mengadopsi pola layout referensi visual yang dilampirkan pengguna (`media_1793515511089_e97397f4.png`):
1. **Hero Banner (`.galeri-hero`)**:
   - Menampilkan latar foto dekorasi pelaminan bergradien gelap radial (`.galeri-hero__bg` & `.galeri-hero__overlay`).
   - Badge pill: `Photography Portfolio`.
   - Judul Display: *"Momen Pernikahan Terindah"* dengan aksen serif miring emas.
   - Subjudul puitis: *"Keindahan dalam setiap bingkai. Karro Wedding Organizer mengabadikan detail terkecil untuk menciptakan kenangan terbesar dalam hidup Anda."*
2. **Kategori Filter Interaktif (`.galeri-filter-bar`)**:
   - Pilihan kategori pill: `Semua`, `Akad`, `Resepsi`, `Adat Jawa`, `Dekorasi`, `Tim WO`.
   - Tab aktif menggunakan warna sage-teal (`#648782`) bersesuaian dengan preferensi referensi visual.
3. **Grid Kartu Galeri Responsif (`.galeri-grid`)**:
   - Grid 3 kolom (desktop), 2 kolom (tablet), dan 1 kolom (mobile).
   - Kartu (`.galeri-card`): Sudut melengkung 18px, bayangan halus, aspect-ratio 4:3 dengan hover zoom `scale(1.06)`.
   - Overlay gelap muncul halus saat hover menampilkan ikon kaca pembesar `ZoomIn`.
   - Badge kategori di pojok atas, judul foto, deskripsi singkat momen, dan lokasi acara (Yogyakarta, Banyumas, Jawa Tengah, Kebumen).
4. **Modal Lightbox Layar Penuh (`.lightbox-backdrop`)**:
   - State `lightboxIndex`: Menampilkan gambar resolusi penuh dengan efek latar kaca buram (`backdrop-filter: blur(10px)`).
   - Tombol navigasi: Panah Kiri (`ChevronLeft`), Panah Kanan (`ChevronRight`), dan Tutup (`X`).
   - Aksesibilitas keyboard: Mendukung tombol keyboard `ArrowLeft`, `ArrowRight`, dan `Escape`.
   - Menampilkan judul foto, pill kategori, deskripsi momen, serta counter dinamis (*Foto 3 dari 14*).
5. **Banner Konsultasi WhatsApp (`.custom-banner`)**:
   - CTA di bawah grid foto untuk menghubungkan calon pengantin yang terkesan dengan portofolio langsung ke chat WhatsApp resmi Karro.

---

## Iterasi 15 — Halaman Paket: Redesain Pricelist Resmi & Syarat Ketentuan Berdasarkan Dokumen PDF

### 1. Latar Belakang & Identifikasi Masalah
Sebelumnya, halaman [Paket.jsx](file:///d:/karro-wedding/client/src/pages/Paket.jsx) menampilkan kartu katalog standar dengan placeholder gambar kotak hitam kosong (`card__media`) akibat belum adanya berkas foto untuk tiap paket. Selain itu, data fasilitas dan harga belum mencerminkan dokumen resmi *Price List Karro Wedding Organizer* (PDF).

### 2. Solusi Arsitektur Antarmuka Baru (Pricing Table Modern)
Halaman Paket ditata ulang menjadi format **Pricing Table Eksklusif** yang dirancang khusus untuk wedding organizer profesional:
1. **Header Eksklusif (`.pricing-page-header`)**:
   - Eyebrow mono emas, heading display serif dengan aksen miring, dan deskripsi nilai layanan Karro.
2. **Grid 3 Kartu Paket Resmi (`.pricing-grid`)**:
   - **Silver (3.500K / Rp 3.500.000)**: Kapasitas 150–250 pack, 4–5 crew, durasi 7 jam kerja, 1 buku tamu, 4 confetti, 10 wedding book, meeting client & vendor.
   - **Gold (4.950K / Rp 4.950.000)**: *Paling Populer* dengan pita ribbon emas di atas kartu, border emas 2px, kapasitas 250–500 pack, 5–6 crew, durasi 8 jam kerja, 2 buku tamu, 6 confetti, dan keunggulan **1 Saxophone Entrance**.
   - **Platinum (6.550K / Rp 6.550.000)**: *VIP Luxury*, kapasitas 500–750 pack, 6–7 crew, durasi 9 jam kerja, 3 buku tamu, 6 confetti, **2 Titik Dry Ice**, dan **1 Saxophone Entrance**.
3. **Komponen Visual Tiap Kartu**:
   - *Quick Specs Bar*: 3 kotak metrik ringkas di bawah harga (Kapasitas Pack, Jumlah Crew, Durasi Layanan).
   - *Checklist Include*: Daftar fasilitas lengkap dengan tanda centang hijau dan ikon aksen emas khusus untuk fitur unggulan (Saxophone & Dry Ice).
   - *Dual Action Buttons*: Tombol primer hijau WhatsApp (`btn--pricing-wa`) yang otomatis memuat pesan penawaran spesifik untuk paket tersebut, serta tombol sekunder (`btn--pricing-detail`) menuju halaman rincian detail & formulir booking.
4. **Banner Custom Package (`.custom-banner`)**:
   - Kartu gradien navy gelap dengan tombol WhatsApp langsung bagi pasangan yang membutuhkan penyesuaian jumlah undangan di luar batas paket.
5. **Syarat & Ketentuan Layanan (`.terms-section`)**:
   - Mengintegrasikan seluruh 8 poin ketentuan dari halaman 5 PDF ke dalam grid 8 kartu bernomor emas (`01`–`08`), mencakup ketentuan DP Rp 500.000, pelunasan final meeting, kebijakan pembatalan, fleksibilitas tanggal, dan ketentuan acara luar kota.

---

## Iterasi 14 — Halaman Tentang: Harmonisasi Warna Latar QnA & Integrasi Seksi Konsultasi WhatsApp

### 1. Harmonisasi Ritme Pewarnaan (Eliminasi "Biru Monoton")
**Masalah sebelumnya:** Seksi *Cakupan Kerja* dan seksi *Tanya Jawab (FAQ)* berturut-turut menggunakan latar belakang biru navy gelap (`#0b2742`), sehingga halaman terasa terlalu padat dan monoton berwarna biru secara terus-menerus.

**Solusi:**
- Mengubah seksi FAQ (`.faq-section`) menjadi **latar terang alami** (`var(--color-surface-base)` / `#fdfbf7`) dengan garis pemisah halus di atasnya.
- Menjaga kontras tipografi: judul FAQ menggunakan navy gelap (`#0b2742`) dengan aksen miring emas (`#c9a227`), serta deskripsi abu-abu gelap (`#5a6b7d`).
- Tombol kategori (*tabs*) dan kartu accordion menggunakan warna putih bersih dengan bayangan lembut, menciptakan efek berlapis yang ringan dan mewah.
- Menghasilkan alur kontras visual selang-seling yang ritmis dan tidak melelahkan mata:
  1. **Hero**: Latar Terang Bersih
  2. **Cakupan Kerja**: Latar Biru Navy Gelap
  3. **Tanya Jawab (FAQ)**: Latar Terang Bersih dengan Kartu Putih & Badge Nomor
  4. **Konsultasi & Pemesanan**: Latar Permukaan Hangat (`--color-surface-alt`) dengan Kartu Berelevasi
  5. **Footer**: Biru Navy Gelap

### 2. Integrasi Seksi Konsultasi & Pemesanan WhatsApp
Sesuai referensi visual yang dilampirkan pengguna (`media_1792931180650_ba172448.png`), seksi konsultasi ditambahkan di bagian bawah halaman Tentang ([Tentang.jsx](file:///d:/karro-wedding/client/src/pages/Tentang.jsx)):
- **Card Wrapper**: Menggunakan `.consultation-card` dengan sudut melengkung 24px dan bayangan halus.
- **Tombol WhatsApp Utama**: Tombol hijau bergradien halus (`.btn--whatsapp`) yang membuka obrolan langsung ke WhatsApp admin Karro.
- **Formulir Rencana Acara Opsional**: Tombol sekunder yang membuka formulir isian (Nama Lengkap, No WA, Tanggal Rencana, Lokasi Kota, dan Catatan Konsep). Data disimpan ke backend (`createBooking`) dan langsung membuat tautan pesan percakapan terformat ke WhatsApp.

---

## Iterasi 13 — Halaman Tentang: FAQ Terpusat Satu Kolom Rapi (Kartu Putih di Atas Navy)

### 1. Eliminasi Masalah Sticky Sidebar ("Layout Berjalan")
Pada iterasi sebelumnya, seksi FAQ menggunakan format dua kolom (`.faq-inner`) di mana kolom kiri (`.faq-sidebar`) menggunakan `position: sticky; align-self: start`. Hal ini menyebabkan judul dan teks deskripsi terlihat "berjalan" mengikuti guliran layar ke atas dan ke bawah, yang dirasa mengganggu kenyamanan visual pengguna.

**Solusi:**
- Menghilangkan sepenuhnya layout grid 2 kolom pada FAQ.
- Mengembalikan struktur seksi menjadi satu alur vertikal yang simetris, kokoh, dan terpusat:
  1. **Header FAQ Terpusat (`.faq-header`)**: Eyebrow mono emas, heading display putih, dan deskripsi terpusat rapi di bagian atas (`max-width: 720px; margin: 0 auto 32px auto;`).
  2. **Filter Kategori Terpusat (`.faq-tabs`)**: Tombol pill (`Semua`, `Layanan`, `Harga & Paket`, `Hari H`) tertata horizontal di tengah (`justify-content: center`) tepat di antara header dan daftar kartu.
  3. **Daftar Accordion Kartu Putih (`.faq-list`)**: Ditata dalam wadah terpusat proporsional (`max-width: 880px; margin: 0 auto;`).

### 2. Peningkatan Estetika Kartu Accordion
- Kartu (`.faq-item`) menggunakan latar putih bersih (`#ffffff`) dengan border halus (`#e2e8f0`), sudut melengkung elegan (`border-radius: 16px`), dan bayangan lembut di atas latar biru navy (`#0b2742`).
- Badge nomor urut (`.faq-badge`): Menampilkan nomor dua digit (`01`, `02`, dst.) dengan warna navy pekat berlatar gelap, yang bertransformasi menjadi warna emas (`#c9a227`) saat kartu dalam status terbuka (`.faq-item--open`).
- Aksen border kiri emas (`border-left: 4px solid #c9a227`) aktif secara mulus saat pertanyaan diklik untuk dibaca.
- Ikon Chevron berotasi 180° secara halus (`transition: transform 0.25s cubic-bezier`).

---

## Iterasi 9 — Transformasi Halaman Tentang: Penjelasan Wedding Organizer & QnA Interaktif (FAQ)

### 1. Rasionalisasi Pemindahan Konten
Sebelumnya, narasi *Perjalanan Karro Wedding*, *Visi Kami*, dan *6 Komitmen Pelayanan Karro* berada di dua tempat sekaligus (halaman Beranda dan halaman Tentang), menimbulkan redundansi konten. 
Sesuai arahan pengguna:
1. Bagian *Perjalanan sampai Komitmen* dihapus dari [Tentang.jsx](file:///d:/karro-wedding/client/src/pages/Tentang.jsx) karena sudah tampil secara utuh dan representatif di [Home.jsx](file:///d:/karro-wedding/client/src/pages/Home.jsx).
2. Halaman Tentang difokuskan untuk dua kebutuhan utama calon pengantin:
   - **Edukasi Peran Wedding Organizer**: Penjelasan komprehensif mengenai definisi, tanggung jawab, dan mengapa pasangan memerlukan jasa WO profesional.
   - **QnA / FAQ Interaktif**: Tanya jawab seputar layanan, harga, sistem pembayaran, dan mekanisme kerja sesuai referensi visual pengguna.

### 2. Komponen Edukasi Wedding Organizer
- **Hero Section**:
  - Mengangkat topik *"Peran Penting Wedding Organizer"*.
  - Memberikan pemahaman mengapa kehadiran wedding organizer membantu pasangan mewujudkan momen sakral tanpa stres logistik.
- **4 Pilar Tanggung Jawab Utama (`.wo-explainer-grid`)**:
  1. *Perencanaan Konsep & Anggaran* (`ClipboardList`): Alokasi budget dan pemilihan venue.
  2. *Kurasi & Koordinasi Vendor* (`Users`): Jembatan komunikasi vendor dan technical meeting terpadu.
  3. *Manajemen Rundown & Waktu* (`Clock`): Penjadwalan menit-demi-menit sejak subuh hingga acara usai.
  4. *Pengawalan Hari H & Solusi Cepat* (`ShieldCheck`): Supervisi lapangan dan penanganan kendala tak terduga.

### 3. Komponen QnA / FAQ Sesuai Referensi Visual
Mengadopsi pola antarmuka dari gambar referensi (`media_1792923857657_c8589efb.png`):
- **Tabs Kategori (`.faq-tabs`)**:
  - Pilihan: `Semua`, `Layanan`, `Harga & Bayar`, `Perencanaan`.
  - Tombol pill responsif: tab aktif menggunakan warna sage-teal solid (`#648782`) dengan teks putih dan bayangan lembut, sedangkan tab tidak aktif memiliki garis batas netral.
- **Accordion Card (`.faq-item`)**:
  - Tanda tanya lingkaran (`.faq-badge`): Lingkaran berdiameter 32px berwarna teal dengan huruf `?` putih.
  - Teks pertanyaan berbobot medium yang mudah dibaca (`color: #1e293b`).
  - Ikon Chevron berotasi 180° saat dibuka (`transition: transform 0.25s`).
  - Penjelasan jawaban yang terstruktur, komunikatif, dan langsung menjawab kekhawatiran calon pengantin.
- **State Management**:
  - `activeCategory`: Menyaring daftar FAQ secara dinamis.
  - `openItems`: Menyimpan status expand/collapse tiap kartu, memungkinkan pengguna membuka satu atau beberapa pertanyaan secara fleksibel.

---

## Iterasi 8 — Penyelarasan Layout Beranda dengan Sistem Desain

### 1. Konsistensi Layout Beranda
- Beranda (`Home.jsx`) mengadopsi alur narasi terpadu:
  1. Landing Hero (visual logo berlatar navy fullscreen).
  2. Perjalanan Karro Wedding (pengenalan tim, filosofi nama dari bahasa Jawa *karro* = bersama, dan foto tim presisi rasio 1024×682).
  3. Visi Kami (latar alternatif dengan kutipan visi beraksen miring).
  4. Misi Kami: 6 Komitmen Pelayanan Karro (6 ubin komitmen dalam `.tile-grid`).
  5. Sesi Konsultasi WhatsApp & Footer Navy.

---

## Iterasi 7 — Presisi Padding, Margin, dan Penyelarasan Grid Vertikal

### 1. Masalah Ketidakkonsistenan Spasi Sebelumnya

Pada tampilan sebelumnya, terdapat beberapa ketidakseimbangan visual:
1. **Lebar horizontal yang berbeda-beda**:
   - Foto: `max-width: 1100px`
   - Profil di Navy Band: `max-width: 860px` (rata kiri di dalam container tengah)
   - Kotak Visi: `max-width: 860px`
   - Header Misi: `max-width: 680px`
   - Grid Misi: `max-width: 1200px`
   Hal ini menyebabkan tepi kiri dan kanan setiap elemen melompat-lompat dan tidak berada pada satu garis pandang vertikal.
2. **Kotak Visi yang kaku**: Visi masih terbungkus dalam kartu berbingkai garis tebal mengambang yang terasa janggal.
3. **Gap vertikal yang berlebihan**: Penumpukan padding 60px di Navy Band dan 60px di White Section menghasilkan rongga kosong sebesar 120px sebelum kutipan visi.

### 2. Solusi & Standardisasi Presisi

1. **Standardisasi Lebar Sumbu 1040px**:
   - Seluruh blok utama (`.about-photo-frame`, `.about-profile-intro`, `.about-misi-section .container`) dipatok pada batas lebar yang identik: `max-width: 1040px; margin-inline: auto;`.
   - Tepi kiri foto, narasi, dan kartu misi baris pertama kini sejajar sempurna pada garis vertikal yang sama.
2. **Visi Alami Tanpa Kotak Tebal**:
   - Menghilangkan `border`, `background-raised`, dan `box-shadow` pada `.about-visi-flow`.
   - Visi kini berwujud *editorial headline quote* berukuran fluid `clamp(22px, 2.5vw, 29px)` dengan aksen miring, icon badge `Target`, serta garis aksen emas 56px (`.about-visi-divider`) yang menghubungkannya dengan Misi Kami secara proporsional.
3. **Harmonisasi Ritme Vertikal**:
   - Navy Band: `padding-block: 52px;`
   - White Section: `padding-top: 52px; padding-bottom: 64px;`
   - Jarak Visi ke Header Misi: `36px`
   - Jarak Header Misi ke Grid Kartu: `36px`
   - Gap antar-kartu Misi: `24px` (desktop), `20px` (tablet), `16px` (mobile).

---

## Iterasi 6 — Reposisi Visi Mengalir & Pemulihan Kontras Background Putih pada Misi

### 1. Reposisi Visi Kami (Mengalir Sebelum Misi)

**Masalah sebelumnya:** Pada iterasi sebelumnya, Visi diletakkan dalam kotak terpisah di samping kanan teks profil perusahaan, yang terasa terkotak-kotak dan menyempitkan ruang baca narasi profil.

**Solusi:**
- Kotak samping kanan dihilangkan.
- Bagian Profil Perusahaan (`.about-profile-intro`) di dalam Navy Band kini berformat satu kolom terpusat yang lega (`max-width: 860px`).
- **Visi Kami** diposisikan mengalir tepat di bawah profil perusahaan sebelum deretan 6 Misi (`.about-visi-flow`).
- Tampilan kutipan visi dikemas secara anggun dengan font display serif miring, aksen border atas emas 64px, dan icon `Target`.

### 2. Pemulihan Background Putih pada Section Misi

**Masalah sebelumnya:** Seluruh section dibuat berlatar biru gelap sehingga tampilan menjadi monoton ("semuanya biru") dan kehilangan kontras khas Karro (kombinasi biru dan putih).

**Solusi:**
- Section Misi Kami (`.about-misi-section`) dikembalikan menggunakan latar putih terang (`var(--color-surface-base)` / `#ffffff`).
- 6 kartu Misi (`.about-misi-card`) menggunakan kartu putih berelevasi (`background: var(--color-surface-raised)`), border halus, nomor mono emas (`01`–`06`), icon dengan badge kontras, dan hover shadow yang halus.
- Hal ini menciptakan ritme visual yang harmonis:
  1. **Hero**: Biru Navy gelap penuh (`#04243d`)
  2. **Foto Showcase**: Terpusat presisi di latar terang
  3. **Profil Perusahaan**: Biru Navy berwibawa (`#0b2d4a`)
  4. **Visi & Misi**: Latar putih terang yang bersih dan kontras
  5. **Konsultasi**: Card terang beraksen hijau WhatsApp

---

## Iterasi 5 — Penyatuan Layout Company Profile, Visi & Misi dan Standarisasi Penulisan

### 1. Penyatuan Layout (Single Unified Section)

**Masalah sebelumnya:** Bagian Profil Perusahaan dan Visi berada di dalam section biru navy (`.about-navy-band`), sedangkan bagian Misi terpisah di section putih terpisah (`.about-misi-section`), memberikan kesan tata letak yang terpecah.

**Solusi:**
- Seluruh konten profil perusahaan, visi, dan misi digabungkan ke dalam satu wadah layout tunggal: `.about-unified-band`.
- **Bagian Atas (`.about-unified-top`)**: Grid 2 kolom yang menyeimbangkan cerita profil Karro dan makna nama (kiri) dengan kartu Visi Kami beraksen emas (kanan).
- **Pembatas Halus (`.about-unified-divider`)**: Garis transparan halus (`rgba(255, 255, 255, 0.12)`) yang menghubungkan narasi dengan bagian misi tanpa memutus kesatuan latar belakang.
- **Bagian Bawah (`.about-misi-grid`)**: 6 kartu misi berlatar semi-transparan (`rgba(255, 255, 255, 0.05)`) dengan nomor mono emas (`#c9a227`) dan icon, serasi dengan keseluruhan skema navy beranda.

### 2. Standarisasi Penulisan Nama Merek ("Karro" bukan "KARRO")

- Seluruh penggunaan kata **"KARRO"** diubah menjadi **"Karro"** untuk menjaga keanggunan dan konsistensi tipografi brand.
- Pengecekan otomatis memastikan 0 kemunculan kata all-caps "KARRO" pada seluruh komponen `.jsx`.
- Penyempurnaan ejaan bahasa Indonesia baku:
  - "bahasa Jawa" (huruf kapital 'J')
  - "Mewujudkan" (kapitalisasi awal kalimat visi)

---

## Iterasi 4 — Pembaruan Foto Presisi & Konten Company Profile

### 1. Foto Dokumentasi Pelaminan Baru & Rendering Presisi

**Perubahan Aset:**
- File `client/public/images/karro-team-about.jpg` diganti dengan foto pernikahan terbaru yang diunggah pengguna (1024×682 px, aspect ratio 1.501:1).
- Foto menampilkan seluruh tim profesional KARRO (3 kru di kiri, 4 kru di kanan) bersama kedua mempelai di pelaminan berlatar dekorasi bunga dan ukiran gebyok berinisial "KR".

**Penyempurnaan Styling & Eliminasi Pemotongan:**
- Menghapus aturan `max-height: 620px` dan container full-bleed yang sebelumnya memotong bagian atas dan bawah foto pada layar desktop/tablet.
- Menggunakan container `.about-photo-wrapper` dan `.about-photo-frame` dengan `max-width: 1100px`, `margin-inline: auto`, dan `aspect-ratio: 1024 / 682`.
- Menghapus overlay gradient gelap sehingga foto tampil alami, bersih, dan wajah seluruh anggota tim serta detail pakaian terlihat presisi.

```css
.about-photo-frame {
  max-width: 1100px;
  margin-inline: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(4, 36, 61, 0.12);
  border: 1px solid var(--color-border-default);
  background-color: #04243d;
}

.about-photo-frame img {
  width: 100%;
  height: auto;
  aspect-ratio: 1024 / 682;
  object-fit: contain;
  display: block;
}
```

### 2. Integrasi Narasi Company Profile Resmi

- **Narasi Utama**:
  "KARRO Wedding Organizer merupakan sebuah wedding organizer yang terbentuk oleh beberapa team profesional dengan tujuan yang sama, yaitu berkeinginan untuk memenejemen suatu acara agar berjalan dengan lancar dan sesuai dengan keinginan pihak-pihak yang terlibat."
- **Kartu Filosofi Nama (Meaning Card)**:
  "KARRO Wedding Organizer berasal dari bahasa jawa yang artinya dengan atau bersama. Harapannya, setiap kali event bersama kami selalu sukses."

### 3. Visi Resmi

- Ditempatkan dalam kartu aksen gold-navy bergradien dengan icon `Target`:
  *"mewujudkan wedding dream client sehingga dapat memberikan kesan terbaik untuk semua orang."*

### 4. 6 Misi Resmi

- Disusun dalam grid responsif 6 kartu bernomor (`01`-`06`) lengkap dengan icon Lucide:
  1. **Relasi Vendor**: Membangun jaringan dan relasi vendor
  2. **Komunikasi & Transparansi**: Membangun komunikasi yang baik dan transparansi dengan internal team, client dan vendor.
  3. **Strategi Kekinian**: Melakukan strategi pemasaran dengan konsep kekinian.
  4. **Team Solid & Sehat**: Membangun team yang solid, profesional, kreatif, ceria dan lingkungan team yang sehat.
  5. **Prioritas Team Work**: Memprioritaskan team work.
  6. **Manajemen Menyeluruh**: Mengorganisir acara secara kesuluruhan dalam berbagai aspek kebutuhan.

---

## Iterasi 3 — Detail Implementasi Perbaikan Tampilan

### 1. Logo Hero — PNG Transparan di Atas Navy

**Masalah sebelumnya:** Logo JPEG lama (`karro-logo-blue.png`) berbasis JPEG dengan latar biru terpanggang—hasilnya buram karena kompresi JPEG. Selain itu, `object-fit: cover` menyebabkan logo memenuhi layar secara tidak proporsional.

**Solusi:**
- Aset baru: `karro-logo-white.png` — format RGBA PNG 1024×1024, logo putih di atas latar transparan
- CSS diubah ke `object-fit: contain` + `padding: 10vh 8vw` agar logo proporsional di tengah layar
- Background `#04243d` pada `.landing-hero` menjadi latar biru, logo putih tampil tajam tanpa artefak kompresi

```css
.landing-hero__visual {
  background-color: #04243d; /* warisan dari .landing-hero */
}
.landing-hero__image {
  object-fit: contain;
  object-position: center;
  padding: 10vh 8vw;
  max-width: 640px;
}
```

### 2. Foto Tim — Rasio Terjaga, Tidak Terpotong

**Masalah sebelumnya:** `height: clamp(300px, 48vw, 560px)` + `object-position: center top` memotong bagian bawah foto (lantai, kaki anggota tim tidak terlihat).

**Solusi:**
- Gunakan `aspect-ratio: 1024 / 682` (rasio asli foto) + `max-height: 620px` — tinggi container mengikuti lebar secara otomatis
- `object-position: center center` — foto tidak dipaksa crop ke atas

```css
.about-photo-band {
  aspect-ratio: 1024 / 682;
  max-height: 620px;
}
.about-photo-band__img {
  object-position: center center;
}
```

### 3. Hapus Label Foto

Elemen `<span className="about-photo-band__label">TIM KARRO WEDDING ORGANIZER</span>` dihapus dari `Home.jsx`. CSS class `.about-photo-band__label` dibiarkan di CSS untuk kemungkinan penggunaan di masa depan.

### 4. Footer Navy — Hanya di Halaman Beranda

**Pendekatan:** Conditional class via prop, tanpa mengubah CSS global `.site-footer`.

```
AppRouter.jsx
  └─ PublikLayout reads useLocation().pathname
  └─ passes variant="navy" to <Footer> only when pathname === '/'
  
Footer.jsx
  └─ accepts variant prop (default: 'default')
  └─ footerClass = `site-footer${variant === 'navy' ? ' site-footer--navy' : ''}`
  └─ <footer className={footerClass}>

index.css
  └─ .site-footer--navy overrides: background #0b2d4a, text white, links semi-transparent white
  └─ Social icons, dividers, brand, tagline semua menyesuaikan skema navy
```

**Keuntungan approach ini:** Footer di halaman lain (`/tentang`, `/paket`, `/galeri`, dll.) tetap putih seperti semula — tidak ada perubahan pada tampilan halaman lain.



Halaman `Home.jsx` kini terdiri dari **tiga section utama** yang mengalir secara vertikal:

```
┌──────────────────────────────────────┐
│  1. LANDING HERO                     │
│     Logo full-screen berlatar biru   │
│     navy — object-fit: cover         │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  2. ABOUT SECTION (3 sub-bagian)     │
│   ┌────────────────────────────────┐ │
│   │ 2a. Foto tim full-width band   │ │
│   └────────────────────────────────┘ │
│   ┌────────────────────────────────┐ │
│   │ 2b. Navy band: narasi + stats  │ │
│   │  Left: heading + paragraf      │ │
│   │  Right: 3 statistik bertumpuk  │ │
│   └────────────────────────────────┘ │
│   ┌────────────────────────────────┐ │
│   │ 2c. Tiga kartu pilar (putih)   │ │
│   └────────────────────────────────┘ │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  3. KONSULTASI & PEMESANAN           │
│     CTA WhatsApp langsung            │
│     Formulir rencana acara opsional  │
└──────────────────────────────────────┘
```

---

## Section 1 — Landing Hero

### Pendekatan Visual
- Logo (`karro-logo-blue.png`) berlatar biru navy **mengisi 100% viewport** menggunakan `object-fit: cover`
- Tidak ada `max-width`, `padding`, atau `border-radius` pada container gambar
- Tombol "Kenali Kami" muncul di sudut bawah dengan animasi bouncing `ChevronDown`

### CSS Classes Kunci
| Class | Fungsi |
|---|---|
| `.landing-hero` | `width: 100%; min-height: 100vh; background: #04243d` |
| `.landing-hero__visual` | `width: 100%; height: 100vh; overflow: hidden` |
| `.landing-hero__image` | `object-fit: cover; object-position: center` |
| `.landing-hero__scroll-indicator` | Tombol scroll bawah, `position: absolute; bottom: 32px` |

---

## Section 2 — About Section

### 2a. Foto Tim (Photo Band)
- Foto tim (`karro-team-about.jpg`, 1024×682) ditampilkan **full-width** sebagai "band" horizontal
- Tinggi: `clamp(300px, 48vw, 560px)` — responsif dan proporsional
- Overlay gradient dari bawah: `transparent → rgba(4,36,61, 0.55)` untuk transisi mulus ke navy band
- Label glassmorphism "TIM KARRO WEDDING ORGANIZER" di atas foto dengan `backdrop-filter: blur(12px)`

### 2b. Narasi + Statistik (Navy Band)
- Latar: `#0b2d4a` (biru navy lebih pekat dari hero)
- **Grid 2 kolom**: narasi di kiri, statistik bertumpuk di kanan
- Heading menggunakan `DM Serif Display` dengan `<em>` berwarna `#c9a227` (emas)
- Statistik: 3 baris, masing-masing memiliki nilai besar (emas) + label + deskripsi singkat
- Dipisahkan border bawah `rgba(255,255,255,0.12)` antar baris statistik

### 2c. Tiga Pilar Keunggulan (White Band)
- Latar: `var(--color-surface-base)` (krem terang)
- Header section: label mono aksen + heading serif
- Tiga kartu `about-pillar` dalam grid 3 kolom
- Setiap kartu memiliki:
  - Nomor mono (`01`, `02`, `03`) berwarna aksen emas
  - Heading serif medium
  - Deskripsi body light
  - `::before` pseudo-element gradient bar (biru→emas) yang muncul on-hover

---

## Section 3 — Konsultasi & Pemesanan

### Komponen
- **Tombol WA Direct**: `<a href={waDirectUrl}>` membuka WhatsApp langsung tanpa formulir
- **Tombol Toggle Formulir**: menggunakan `useState(showForm)` untuk show/hide form
- **Formulir Opsional**: field nama, nomor WA, tanggal, lokasi, catatan
  - Validasi menggunakan `validasiForm()` yang sudah ada
  - Submit: `createBooking()` → lalu buka WhatsApp dengan pesan terisi otomatis

### Integrasi API
```js
// Link WA dinamis — nomor dari pengaturan sistem atau fallback mock
const nomorAdmin = pengaturan?.no_wa_admin || '6281234567890';
const waDirectUrl = linkWhatsapp(nomorAdmin, pesanKonsultasiDefault);

// Submit form → POST /booking → buka WA
await createBooking(payload);
window.open(linkWhatsapp(nomorAdmin, pesan), '_blank', 'noopener,noreferrer');
```

---

## Palette Warna & Tipografi

| Token | Nilai | Digunakan di |
|---|---|---|
| `--color-primary` | `#1b3a5c` | Tombol, border strong, teks utama |
| Navy hero | `#04243d` | Background landing hero |
| Navy band | `#0b2d4a` | Background about navy band |
| `--color-accent` | `#c9a227` | Statistik nilai, aksen emas, label pilar |
| `--color-surface-base` | `#fdfbf7` | Background kartu pilar |
| `--font-display` | DM Serif Display | Heading, judul section |
| `--font-sans` | Inter | Body teks, form, navigasi |
| `--font-mono` | Roboto Mono | Label mono, nomor pilar, eyebrow |

---

## Responsivitas

| Breakpoint | Perubahan Layout |
|---|---|
| `> 860px` | About navy: 2 kolom; Pilar: 3 kolom |
| `≤ 860px` | About navy: 1 kolom; Pilar: 1 kolom |
| `≤ 600px` | Hero menggunakan `100svh`; Photo band tinggi dikurangi |

---

## Tidak Diubah (Sistem Terjaga)

- `client/src/components/` — semua komponen layout, booking, paket tetap utuh
- `client/src/api/` — semua API clients tidak diubah
- `client/src/pages/` — hanya `Home.jsx` yang dimodifikasi
- `client/src/styles/index.css` — hanya blok CSS yang ditambahkan pada iterasi sebelumnya yang diganti; CSS inti (reset, header, footer, form, btn, grid-paket, galeri, admin, dll.) tidak tersentuh
- `server/` — tidak ada perubahan sama sekali

