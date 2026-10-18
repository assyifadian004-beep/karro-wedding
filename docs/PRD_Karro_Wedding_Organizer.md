# Product Requirements Document (PRD)
## Website Karro Wedding Organizer ("Karro Wedding")

| Atribut | Keterangan |
|---|---|
| Mata kuliah | Pemrograman Web |
| Kelompok | 2 |
| Anggota | As Syifa Dian Rinesti (240320559), Azizah Nurul Putri (240320560), Difa Rizkiana Fauziyah (240320564), Febiana Saputri (240320569) |
| Sumber | Rancangan Awal Website Wedding Organizer "Karro Wedding" (hasil wawancara) |
| Status | Draf 1 |

---

## 1. Ringkasan Produk

Website Karro Wedding Organizer adalah website profil dan pemesanan jasa *wedding organizer*. Website ini ditujukan bagi calon pengantin dan keluarga yang ingin mengenal layanan, membandingkan tiga paket (Silver, Gold, dan Platinum), melihat galeri dan testimoni, lalu berkonsultasi atau memesan paket melalui WhatsApp.

Pada tahap awal, website **tidak** memproses pembayaran maupun penjadwalan. Kedua hal tersebut tetap diselesaikan langsung antara admin dan calon klien.

## 2. Latar Belakang Masalah

| No | Permasalahan | Dampak | Solusi yang Diusulkan |
|---|---|---|---|
| P1 | Calon klien sulit membandingkan layanan | Informasi paket tersebar di media sosial dan chat pribadi | Halaman daftar paket dengan harga, kapasitas tamu, dan ringkasan setiap paket |
| P2 | Pertanyaan yang sama sering berulang | Admin kewalahan menjawab isi paket, harga, dan contoh hasil | Halaman detail paket dengan deskripsi, rincian "Apa yang Anda Dapatkan", dan galeri paket |
| P3 | Data calon klien tidak lengkap | Admin harus menanyakan ulang tanggal, lokasi, dan kebutuhan acara | Formulir booking yang meminta nama, WhatsApp, rencana tanggal, lokasi, dan catatan |
| P4 | Kepercayaan calon klien perlu dibangun | Calon klien ingin melihat bukti hasil kerja sebelum memutuskan | Halaman galeri dan testimoni klien sebelumnya |
| P5 | Respons ke calon klien lambat | Tidak ada jalur kontak yang cepat dan terarah | Tombol "Chat WhatsApp Sekarang" yang membuka WhatsApp dengan pesan otomatis berisi data formulir |
| P6 | Admin sulit memperbarui informasi | Perubahan harga atau isi paket harus diedit manual | Panel admin untuk mengelola paket, galeri, dan testimoni (tahap lanjutan) |

## 3. Tujuan Produk

1. Memudahkan calon klien memilih paket dengan membandingkan harga dan kapasitas tamu.
2. Mengurangi pertanyaan berulang yang masuk ke admin.
3. Memastikan data kebutuhan calon klien (nama, nomor WhatsApp, rencana tanggal, lokasi, dan catatan) diterima admin dengan lengkap.
4. Mempercepat respons admin melalui jalur WhatsApp dengan pesan yang sudah terisi otomatis.
5. Membangun kepercayaan calon klien melalui galeri dan testimoni.

## 4. Ruang Lingkup

### 4.1 Termasuk dalam Tahap Awal
- Halaman publik: Beranda, Tentang, Paket, Detail Paket, Galeri, dan Testimoni.
- Formulir booking/konsultasi dengan validasi.
- Tombol konsultasi dan Chat WhatsApp otomatis.
- Login admin dan pengelolaan konten (paket, galeri, testimoni, kontak).
- Tampilan responsif untuk HP, tablet, dan komputer.

### 4.2 Di Luar Ruang Lingkup Tahap Awal
- Pemrosesan pembayaran (uang muka dan pelunasan) melalui website.
- Penjadwalan atau kalender ketersediaan tanggal.
- Registrasi atau login untuk calon klien.
- Negosiasi harga dan kesepakatan kontrak melalui website.

## 5. Pengguna dan Hak Akses

### 5.1 Pengunjung / Calon Klien (tanpa login)
- Melihat halaman beranda, tentang kami, paket, galeri, dan testimoni.
- Melihat daftar paket beserta harga dan kapasitas tamu.
- Membuka detail paket, rincian fasilitas, dan galeri paket.
- Mengisi formulir konsultasi atau booking pada halaman detail paket.
- Menghubungi admin melalui tombol Chat WhatsApp dengan pesan yang terisi otomatis.

### 5.2 Admin
- Login ke panel admin menggunakan akun khusus.
- Menambah, mengubah, dan menghapus data paket (nama, harga, kapasitas tamu, deskripsi, rincian fasilitas).
- Mengelola foto galeri umum dan galeri tiap paket.
- Mengelola testimoni klien.
- Mengubah nomor WhatsApp tujuan dan informasi kontak.
- Melihat daftar permintaan konsultasi yang masuk *(asumsi awal, jika data formulir disimpan)*.

## 6. Kebutuhan Fungsional

| Kode | Fitur | Deskripsi Kebutuhan | Prioritas |
|---|---|---|---|
| F01 | Navigasi utama | Menu Home, Tentang, Paket, Galeri, Testimoni, dan tombol Konsultasi tersedia di setiap halaman. | Tinggi |
| F02 | Beranda | Menampilkan pengenalan Karro Wedding, ajakan bertindak (CTA), dan ringkasan layanan. | Sedang |
| F03 | Halaman Tentang | Menampilkan profil, visi, dan keunggulan wedding organizer. | Sedang |
| F04 | Daftar Paket | Menampilkan kartu paket (Silver, Gold, Platinum) berisi foto, harga, kapasitas tamu, deskripsi singkat, dan tombol "Lihat Detail Lengkap". | Tinggi |
| F05 | Detail Paket | Menampilkan deskripsi paket, daftar "Apa yang Anda Dapatkan", dan galeri foto paket. | Tinggi |
| F06 | Formulir Booking | Pengunjung mengisi nama lengkap, nomor WhatsApp, rencana tanggal, lokasi/venue (opsional), serta catatan atau pertanyaan. | Tinggi |
| F07 | Validasi Formulir | Sistem memeriksa kolom wajib, format nomor WhatsApp, dan tanggal agar tidak di masa lalu. | Tinggi |
| F08 | Chat WhatsApp Otomatis | Tombol "Chat WhatsApp Sekarang" membuka WhatsApp admin dengan pesan berisi paket dan data formulir. | Tinggi |
| F09 | Galeri | Menampilkan kumpulan foto dokumentasi pernikahan. | Sedang |
| F10 | Testimoni | Menampilkan ulasan klien yang pernah menggunakan layanan. | Sedang |
| F11 | Konsultasi | Tombol Konsultasi pada menu mengarahkan pengunjung ke WhatsApp atau formulir konsultasi. | Tinggi |
| F12 | Login Admin | Admin masuk menggunakan akun untuk mengakses panel pengelolaan. | Tinggi |
| F13 | Kelola Paket | Admin dapat menambah, mengubah, dan menghapus paket beserta foto dan rincian fasilitas. | Tinggi |
| F14 | Kelola Galeri dan Testimoni | Admin dapat mengunggah, mengubah, dan menghapus foto galeri serta testimoni. | Sedang |
| F15 | Rekap Permintaan | Admin dapat melihat daftar permintaan booking yang masuk *(asumsi awal)*. | Rendah |
| F16 | Tampilan Responsif | Halaman dapat diakses dengan nyaman melalui HP maupun komputer. | Tinggi |

### 6.1 Kriteria Penerimaan (Acceptance Criteria) Fitur Utama

**F04 – Daftar Paket**
- Tiga kartu paket (Silver, Gold, Platinum) tampil lengkap dengan foto, harga, dan kapasitas tamu.
- Setiap kartu memiliki tombol "Lihat Detail Lengkap" yang mengarah ke halaman detail paket yang sesuai.

**F06 & F07 – Formulir Booking**
- Formulir tidak dapat dikirim jika nama lengkap, nomor WhatsApp, atau rencana tanggal kosong.
- Nama lengkap minimal dua karakter.
- Nomor WhatsApp valid jika diawali `08` atau `+62` dan sesuai format nomor telepon Indonesia.
- Rencana tanggal tidak boleh sebelum tanggal hari ini.
- Lokasi/venue dan catatan boleh dikosongkan.
- Pesan kesalahan ditampilkan di dekat kolom yang bermasalah.

**F08 – Chat WhatsApp Otomatis**
- Tombol membuka WhatsApp dengan pesan yang memuat nama paket, nama, tanggal, dan lokasi sesuai isian formulir.
- Contoh pesan: *"Halo, saya ingin booking paket pernikahan. Nama: ..., Paket: Silver, Tanggal: ..., Lokasi: ..."*
- Tautan berfungsi pada HP maupun WhatsApp Web.

**F13 – Kelola Paket**
- Perubahan harga atau isi paket oleh admin langsung tampil pada daftar dan detail paket.

## 7. Alur Proses Bisnis

### 7.1 Proses Penelusuran Paket
1. Pengunjung membuka beranda dan menelusuri menu Tentang, Paket, Galeri, dan Testimoni.
2. Pengunjung membuka halaman Paket dan membandingkan tiga paket beserta harga dan kapasitas tamu.
3. Pengunjung memilih satu paket dan membuka halaman detail paket.

### 7.2 Proses Booking atau Konsultasi
1. Pengunjung membaca rincian "Apa yang Anda Dapatkan" dan melihat galeri paket.
2. Pengunjung mengisi formulir: nama lengkap, nomor WhatsApp, rencana tanggal, lokasi (opsional), dan catatan (opsional).
3. Sistem memvalidasi isian formulir.
4. Pengunjung menekan tombol "Chat WhatsApp Sekarang".
5. Sistem membuka WhatsApp dengan pesan otomatis.
6. Pengunjung mengirim pesan.
7. Admin membalas dan melanjutkan konsultasi, penawaran, serta kesepakatan **di luar website**.

### 7.3 Proses Pengelolaan Konten oleh Admin
1. Admin login ke panel admin.
2. Admin memperbarui paket, harga, galeri, dan testimoni sesuai kebutuhan.
3. Perubahan langsung tampil pada halaman publik.

## 8. Aturan Bisnis

| Aspek | Aturan Bisnis |
|---|---|
| Layanan | Website digunakan untuk mempromosikan dan menerima permintaan booking jasa wedding organizer Karro Wedding. |
| Pengguna Publik | Pengunjung dapat melihat seluruh informasi dan mengisi formulir tanpa registrasi atau login. |
| Jenis Paket | Tersedia tiga paket: Silver, Gold, dan Platinum. Rincian lengkap terdapat pada lampiran dokumen sumber. |
| Harga Paket | Ditampilkan sebagai harga nett sesuai price list: **Silver** Rp 3.500.000 (150–250 tamu), **Gold** Rp 4.950.000 (250–500 tamu), **Platinum** Rp 6.550.000 (500–1.000 tamu). Harga dapat berubah sewaktu-waktu. Acara di luar kota atau jauh dari base dikenakan biaya transport. |
| Data Formulir | Nama lengkap, nomor WhatsApp, dan rencana tanggal wajib diisi. Lokasi/venue dan catatan bersifat opsional. |
| Rencana Tanggal | Tanggal yang dipilih tidak boleh sebelum tanggal hari ini. |
| Nomor WhatsApp | Harus berformat nomor telepon Indonesia yang valid. |
| Kanal Pemesanan | Booking dan konsultasi dilakukan melalui WhatsApp admin. |
| Pesan Otomatis | Pesan WhatsApp memuat nama paket dan data yang diisi pengunjung. |
| Status Booking | Booking dianggap resmi setelah admin mengonfirmasi dan terjadi kesepakatan di luar website *(asumsi awal)*. |
| Pembayaran | Belum diproses melalui website. Sesuai ketentuan Karro, kesepakatan ditandai uang muka **Rp 500.000** dan pelunasan maksimal **H-1**, keduanya diselesaikan langsung dengan admin. |
| Pengelolaan Konten | Hanya admin yang dapat mengubah paket, galeri, testimoni, dan kontak. |
| Konten Galeri | Foto yang ditampilkan adalah dokumentasi milik Karro Wedding Organizer atau telah mendapat izin klien. |
| Hak Akses | Pengunjung hanya dapat melihat dan mengirim formulir. Admin memiliki akses pengelolaan konten. |

## 9. Kebutuhan Keamanan dan Validasi Data

Meskipun website tidak memproses pembayaran, data pribadi calon klien tetap perlu dijaga.

1. Halaman admin hanya dapat diakses setelah login, dan kata sandi disimpan dalam bentuk **hash**.
2. Formulir memvalidasi kolom wajib, format nomor WhatsApp, dan tanggal.
3. Teks yang diisi pengunjung dibersihkan (sanitasi) sebelum ditampilkan atau dimasukkan ke tautan WhatsApp agar aman dari penyisipan skrip.
4. Nomor WhatsApp admin disimpan pada pengaturan sistem, bukan ditulis berulang di banyak halaman.
5. Unggahan foto dibatasi pada jenis dan ukuran berkas tertentu.
6. Data calon klien yang disimpan (jika ada) hanya dapat dilihat oleh admin.
7. Gambar yang gagal dimuat pada halaman paket dan galeri ditangani dengan **gambar pengganti** dan pemeriksaan jalur berkas agar tampilan tetap rapi.

## 10. Kebutuhan Data

### 10.1 Entitas Data

| Entitas | Atribut / Informasi yang Disimpan |
|---|---|
| Admin | ID admin, nama, email/username, kata sandi (hash). |
| Paket | ID paket, nama paket, slug, harga, kapasitas tamu, deskripsi singkat, deskripsi lengkap, foto utama, urutan tampil. |
| Fasilitas Paket | ID fasilitas, ID paket, nama fasilitas (isi bagian "Apa yang Anda Dapatkan"). |
| Galeri | ID foto, ID paket (opsional), berkas foto, keterangan, tanggal unggah. |
| Testimoni | ID testimoni, nama klien, isi testimoni, foto (opsional). |
| Permintaan Booking | ID permintaan, ID paket, nama lengkap, nomor WhatsApp, rencana tanggal, lokasi, catatan, waktu dikirim *(asumsi awal)*. |
| Pengaturan Situs | Nomor WhatsApp admin, template pesan, informasi kontak. |

### 10.2 Relasi Antar-entitas
- Satu paket dapat memiliki **banyak** fasilitas.
- Satu paket dapat memiliki **banyak** foto galeri.
- Satu paket dapat menerima **banyak** permintaan booking.

## 11. Kebutuhan Nonfungsional

| Aspek | Kebutuhan |
|---|---|
| Kemudahan Penggunaan | Antarmuka sederhana. Alur dari melihat paket sampai menghubungi admin tidak lebih dari tiga langkah. |
| Tampilan | Tema biru navy dengan aksen warna putih/krem dan huruf bergaya elegan, konsisten di seluruh halaman. |
| Responsif | Tampilan menyesuaikan layar HP, tablet, dan komputer. |
| Kinerja | Foto dikompres agar halaman paket dan galeri dimuat dengan cepat. |
| Keamanan | Kata sandi di-hash, halaman admin dilindungi login, dan input pengunjung divalidasi. |
| Konsistensi Data | Perubahan paket oleh admin langsung tampil pada daftar dan detail paket. |
| Kompatibilitas | Berjalan pada browser modern. Tautan WhatsApp berfungsi pada HP maupun WhatsApp Web. |
| Pemeliharaan | Konten paket, galeri, dan testimoni dapat diubah tanpa mengubah kode program. |
| Backup | Database dan foto dicadangkan secara berkala. |

## 12. Rancangan Antarmuka

### 12.1 Identitas Visual
- Mengikuti identitas Karro Wedding Organizer: biru navy, putih, dan logo matahari terbit dengan tulisan "Karro".
- Setiap halaman memakai header yang sama, berisi logo, menu Home, Tentang, Paket, Galeri, Testimoni, dan tombol Konsultasi.

### 12.2 Struktur Halaman

| Halaman | Isi Utama |
|---|---|
| Beranda (Home) | Pengenalan Karro Wedding, CTA, ringkasan layanan. |
| Tentang | Profil, visi, keunggulan. |
| Paket | Tiga kartu paket (Silver, Gold, Platinum). |
| Detail Paket | Deskripsi, "Apa yang Anda Dapatkan", galeri paket, formulir booking, tombol Chat WhatsApp. |
| Galeri | Kumpulan foto dokumentasi pernikahan. |
| Testimoni | Ulasan klien. |
| Login Admin | Form login. |
| Panel Admin | Kelola paket, galeri, testimoni, kontak, dan rekap permintaan. |

### 12.3 Spesifikasi Formulir Booking

| Kolom | Wajib | Keterangan |
|---|---|---|
| Nama Lengkap | Ya | Teks bebas, minimal dua karakter. |
| No. WhatsApp | Ya | Format `08xxxxxxxxxx` atau `+62xxxxxxxxxx`. |
| Rencana Tanggal | Ya | Pemilih tanggal, tidak boleh sebelum hari ini. |
| Lokasi / Venue | Tidak | Contoh: nama gedung atau tempat acara. |
| Catatan / Pertanyaan | Tidak | Kebutuhan tambahan atau pertanyaan untuk admin. |

## 13. Skenario Pengujian

| No | Skenario | Hasil yang Diharapkan |
|---|---|---|
| T1 | Formulir dikirim dalam keadaan kosong | Muncul pesan kesalahan pada kolom wajib, data tidak diteruskan. |
| T2 | Nomor WhatsApp tidak valid (contoh: `12345`) | Muncul pesan format nomor tidak valid. |
| T3 | Rencana tanggal sudah lewat | Sistem menolak tanggal dan menampilkan pesan kesalahan. |
| T4 | Gambar gagal dimuat | Gambar pengganti tampil, tata letak tetap rapi. |
| T5 | Admin mengubah harga paket | Harga baru langsung tampil di daftar dan detail paket. |
| T6 | Tombol Chat WhatsApp ditekan setelah formulir valid | WhatsApp terbuka dengan pesan berisi nama paket dan data formulir. |
| T7 | Akses halaman admin tanpa login | Pengunjung diarahkan ke halaman login. |
| T8 | Tampilan di HP, tablet, dan komputer | Layout menyesuaikan dan tetap dapat digunakan. |

## 14. Pertanyaan Terbuka dan Catatan Perbaikan

Beberapa hal perlu dikonfirmasi sebelum tahap desain dan implementasi:

1. **Lampiran rincian paket** disebutkan pada dokumen sumber, tetapi isi fasilitas tiap paket belum tersedia. Perlu daftar fasilitas final untuk Silver, Gold, dan Platinum.
2. **Konsistensi warna.** Bagian pendahuluan menyebut putih sebagai warna pendamping, sedangkan bagian nonfungsional menyebut krem. Perlu ditentukan satu palet warna resmi.
3. **Penyimpanan permintaan booking** masih berstatus asumsi awal. Perlu dipastikan apakah data formulir disimpan ke database atau hanya diteruskan ke WhatsApp.
4. **Status booking** masih berstatus asumsi awal. Perlu konfirmasi dari pihak Karro bagaimana booking dianggap resmi.
5. **Biaya transport** untuk acara di luar kota atau jauh dari base belum memiliki ketentuan nominal di website. Perlu diputuskan apakah ditampilkan atau dibahas saat konsultasi.
6. **Jumlah dan nama admin** yang akan memiliki akses panel belum ditentukan.

## 15. Tahapan Pengembangan Selanjutnya

1. Membuat **use case diagram** untuk aktor pengunjung dan admin.
2. Membuat **activity diagram** untuk alur booking melalui WhatsApp.
3. Membuat **ERD** berdasarkan entitas pada bagian 10.
4. Membuat **wireframe** untuk setiap halaman pada bagian 12.
5. Mengimplementasikan fitur prioritas tinggi (F04, F05, F06, F07, F08, F11, F12, F13, F16).
6. Melakukan pengujian sesuai skenario pada bagian 13.

## 16. Kesimpulan

Website Karro Wedding Organizer mengintegrasikan penyajian paket, galeri, testimoni, formulir booking, dan penerusan pesan ke WhatsApp admin. Fitur yang perlu diprioritaskan adalah daftar dan detail paket, formulir booking dengan validasi, tombol Chat WhatsApp otomatis, galeri, testimoni, serta panel admin untuk mengelola konten.

Dengan rancangan ini, website diharapkan tidak hanya mempercantik promosi layanan, tetapi juga mempermudah calon klien menghubungi admin dan membantu wedding organizer mengelola calon klien secara lebih teratur.

---

## Lampiran A. Stack Teknologi

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| Frontend | React.js (dibangun dengan Vite) | Antarmuka pengunjung dan panel admin (SPA) |
| Routing (frontend) | React Router | Navigasi antarhalaman |
| HTTP Client | Axios | Komunikasi frontend dengan API |
| Backend | Node.js + Express.js | REST API, autentikasi, validasi, dan upload foto |
| Database | PostgreSQL | Penyimpanan data paket, galeri, testimoni, booking, dan admin |
| Manajemen DB | pgAdmin | Administrasi dan inspeksi database secara visual |
| Driver DB | node-postgres (`pg`) | Koneksi dan query dari Express ke PostgreSQL |
| Migrasi DB | Berkas SQL di `database/migrations` | Pembuatan dan perubahan tabel secara terurut |
| Keamanan | bcrypt, jsonwebtoken, helmet, cors, express-rate-limit | Hash kata sandi, token login, header keamanan, CORS, pembatasan request |
| Validasi | express-validator (server), validasi manual (client) | Memeriksa kolom wajib, format WhatsApp, dan tanggal |
| Upload Foto | multer | Menerima berkas foto dengan batasan jenis dan ukuran |
| Sanitasi Input | sanitize-html (server), DOMPurify (client) | Membersihkan teks dari penyisipan skrip |

### A.1 Pemetaan Entitas ke Tabel PostgreSQL

| Entitas (bagian 10) | Nama Tabel | Catatan |
|---|---|---|
| Admin | `admin` | Kolom `password_hash` (bcrypt). |
| Paket | `paket` | Kolom `slug` unik. Harga disimpan sebagai `NUMERIC(12,2)` atau `INTEGER` (rupiah). |
| Fasilitas Paket | `fasilitas_paket` | Foreign key `paket_id` dengan `ON DELETE CASCADE`. |
| Galeri | `galeri` | `paket_id` boleh `NULL` (galeri umum). |
| Testimoni | `testimoni` | Kolom `foto` opsional. |
| Permintaan Booking | `permintaan_booking` | Foreign key `paket_id`, kolom `dikirim_pada` bertipe `TIMESTAMPTZ`. |
| Pengaturan Situs | `pengaturan_situs` | Menyimpan nomor WhatsApp admin dan template pesan (satu baris). |

Relasi satu-ke-banyak pada bagian 10.2 diterjemahkan menjadi foreign key dari `fasilitas_paket`, `galeri`, dan `permintaan_booking` ke `paket`.

## Lampiran B. Struktur Folder Proyek

Proyek dibagi menjadi dua aplikasi terpisah, yaitu `client` (React) dan `server` (Express), dalam satu repositori.

```
karro-wedding/
├── client/                              # Frontend React.js (Vite)
│   ├── public/
│   │   └── images/
│   │       ├── logo-karro.png           # Logo matahari terbit + tulisan Karro
│   │       └── placeholder.jpg          # Gambar pengganti jika foto gagal dimuat
│   ├── src/
│   │   ├── api/                         # Konfigurasi Axios & fungsi pemanggilan API
│   │   │   ├── axiosClient.js
│   │   │   ├── paketApi.js
│   │   │   ├── galeriApi.js
│   │   │   ├── testimoniApi.js
│   │   │   ├── bookingApi.js
│   │   │   └── authApi.js
│   │   ├── assets/                      # Gambar dan ikon yang diimpor di komponen
│   │   ├── components/
│   │   │   ├── layout/                  # Header, Footer, AdminLayout
│   │   │   ├── common/                  # Button, Modal, Loader, ImageWithFallback
│   │   │   ├── paket/                   # PaketCard, PaketList, FasilitasList
│   │   │   ├── galeri/                  # GaleriGrid, Lightbox
│   │   │   ├── testimoni/               # TestimoniCard
│   │   │   ├── booking/                 # BookingForm, FormField
│   │   │   └── admin/                   # FormPaket, TabelPermintaan, UploadFoto
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # F02
│   │   │   ├── Tentang.jsx              # F03
│   │   │   ├── Paket.jsx                # F04
│   │   │   ├── DetailPaket.jsx          # F05, F06, F08
│   │   │   ├── Galeri.jsx               # F09
│   │   │   ├── Testimoni.jsx            # F10
│   │   │   ├── Login.jsx                # F12
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── KelolaPaket.jsx      # F13
│   │   │       ├── KelolaGaleri.jsx     # F14
│   │   │       ├── KelolaTestimoni.jsx  # F14
│   │   │       ├── KelolaKontak.jsx     # Nomor WhatsApp & kontak
│   │   │       └── RekapPermintaan.jsx  # F15
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Status login admin
│   │   ├── routes/
│   │   │   ├── AppRouter.jsx
│   │   │   └── ProtectedRoute.jsx       # Melindungi halaman admin
│   │   ├── hooks/                       # useFetch, useForm, dsb.
│   │   ├── utils/
│   │   │   ├── validasiForm.js          # F07: wajib diisi, format WA, tanggal
│   │   │   ├── buatPesanWhatsapp.js     # F08: menyusun teks pesan otomatis
│   │   │   ├── formatRupiah.js
│   │   │   └── sanitize.js              # DOMPurify
│   │   ├── styles/
│   │   │   ├── variables.css            # Warna navy, putih, krem; font elegan
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                             # VITE_API_URL, VITE_WHATSAPP_ADMIN
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                              # Backend Express.js
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js                   # Membaca dan memvalidasi variabel .env
│   │   │   ├── db.js                    # Pool koneksi PostgreSQL (pg)
│   │   │   └── upload.js                # Konfigurasi multer (jenis & ukuran berkas)
│   │   ├── routes/
│   │   │   ├── index.js                 # Menggabungkan semua router di /api
│   │   │   ├── auth.routes.js           # POST /api/auth/login, /logout
│   │   │   ├── paket.routes.js          # GET & CRUD /api/paket
│   │   │   ├── galeri.routes.js         # GET & CRUD /api/galeri
│   │   │   ├── testimoni.routes.js      # GET & CRUD /api/testimoni
│   │   │   ├── booking.routes.js        # POST /api/booking, GET (admin)
│   │   │   └── pengaturan.routes.js     # GET & PUT /api/pengaturan
│   │   ├── controllers/                 # Menerima request, memanggil service, mengirim response
│   │   ├── services/                    # Logika bisnis (aturan bagian 8)
│   │   ├── repositories/                # Query SQL ke PostgreSQL
│   │   ├── middlewares/
│   │   │   ├── auth.js                  # Verifikasi token admin
│   │   │   ├── validate.js              # Menjalankan express-validator
│   │   │   ├── errorHandler.js          # Penanganan error terpusat
│   │   │   └── rateLimiter.js           # Pembatasan request form booking
│   │   ├── validators/
│   │   │   ├── booking.validator.js     # Aturan nama, WhatsApp, tanggal
│   │   │   └── paket.validator.js
│   │   ├── utils/
│   │   │   ├── sanitize.js              # sanitize-html
│   │   │   ├── buatPesanWhatsapp.js
│   │   │   └── appError.js
│   │   ├── app.js                       # Setup Express (helmet, cors, json, routes)
│   │   └── server.js                    # Menjalankan server
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 001_buat_tabel_admin.sql
│   │   │   ├── 002_buat_tabel_paket.sql
│   │   │   ├── 003_buat_tabel_fasilitas_paket.sql
│   │   │   ├── 004_buat_tabel_galeri.sql
│   │   │   ├── 005_buat_tabel_testimoni.sql
│   │   │   ├── 006_buat_tabel_permintaan_booking.sql
│   │   │   └── 007_buat_tabel_pengaturan_situs.sql
│   │   ├── seeds/
│   │   │   ├── paket_awal.sql           # Silver, Gold, Platinum
│   │   │   └── admin_awal.sql
│   │   └── runMigrations.js             # Menjalankan berkas migrasi berurutan
│   ├── uploads/                         # Penyimpanan foto (galeri, paket, testimoni)
│   ├── .env                             # PORT, DATABASE_URL, JWT_SECRET, dll.
│   └── package.json
│
├── docs/                                # Dokumen pendukung
│   ├── PRD_Karro_Wedding_Organizer.md
│   ├── usecase-diagram.png
│   ├── activity-diagram-booking.png
│   ├── erd.png
│   └── wireframe/
│
├── .gitignore                           # node_modules, .env, uploads/
└── README.md                            # Cara instalasi dan menjalankan proyek
```

### B.1 Catatan Konfigurasi

1. **Pemisahan lapisan di server.** Alur request mengikuti urutan `routes → middlewares → controllers → services → repositories → PostgreSQL`. Dengan pemisahan ini, aturan bisnis (misalnya tanggal tidak boleh lewat) cukup ditulis di `services`, sehingga konsisten walaupun dipanggil dari endpoint mana pun.
2. **Validasi ganda.** Validasi dilakukan di `client/src/utils/validasiForm.js` untuk umpan balik cepat, dan diulang di `server/src/validators` karena pemeriksaan di browser dapat dilewati.
3. **Nomor WhatsApp admin** hanya disimpan di tabel `pengaturan_situs` dan `server/.env` atau `client/.env`, sesuai aturan bagian 9 poin 4, sehingga tidak ditulis berulang di banyak halaman.
4. **Foto** disimpan di folder `server/uploads` dan dilayani sebagai file statis. Di database hanya disimpan path-nya. Folder ini masuk `.gitignore`.
5. **Pengelolaan database** dilakukan melalui pgAdmin. Perubahan skema dilakukan lewat berkas di `database/migrations`, bukan mengubah tabel secara manual, agar tim tetap memiliki riwayat perubahan yang sama.
6. **Backup** (bagian 11) dapat dilakukan dengan `pg_dump` atau fitur Backup di pgAdmin, dijadwalkan berkala, sementara folder `uploads` dicadangkan terpisah.

### B.2 Contoh Variabel Lingkungan

```bash
# server/.env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/karro_wedding
JWT_SECRET=ganti_dengan_string_acak_panjang
CLIENT_URL=http://localhost:5173

# client/.env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_ADMIN=628xxxxxxxxxx
```

Catatan: nilai `VITE_WHATSAPP_ADMIN` idealnya diambil dari tabel `pengaturan_situs` melalui API, bukan dari `.env` client, agar admin bisa mengubah nomor tanpa menyunting kode. Variabel tersebut dicantumkan di sini sebagai nilai awal.