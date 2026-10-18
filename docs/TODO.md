# TODO — Karro Wedding Organizer

Dokumen ini mencatat pekerjaan yang belum selesai atau perlu konfirmasi. Diperbarui saat ada perubahan status.

Status terakhir proyek:
- Frontend: siap dipakai (mode mock aktif), build lolos.
- Backend: kode lengkap, belum teruji end-to-end karena kredensial database belum diisi.

---

## 1. Persiapan Push GitHub

- [ ] `git init` di root proyek 
- [ ] Buat `server/.env.example` (PORT, DATABASE_URL, JWT_SECRET, CLIENT_URL — tanpa kredensial asli)
- [ ] Buat `client/.env.example` (VITE_API_URL, VITE_USE_MOCK)
- [ ] Rapikan README: samakan contoh PORT dengan `.env`, peringatkan password admin seed `admin123`, jelaskan cara menyalakan/mematikan mode mock
- [ ] `git add -A`, pastikan `.env`, `dist/`, `node_modules/`, `uploads/` tidak ikut, lalu commit
- [ ] Buat repository GitHub + `git remote add` + push

## 2. Backend Belum Teruji End-to-End

- [ ] Isi kredensial PostgreSQL asli di `server/.env` (sekarang masih `password`)
- [ ] Jalankan `npm run migrate` — pastikan 7 migrasi sukses
- [ ] Jalankan seed `paket_awal.sql` dan `admin_awal.sql`
- [ ] Uji login admin (`admin` / `admin123`) lewat API dan halaman login
- [ ] Uji CRUD paket, galeri (upload foto ke `server/uploads`), testimoni
- [ ] Uji submit booking dari halaman detail paket sampai masuk tabel `permintaan_booking`
- [ ] Uji ubah nomor WhatsApp di Kelola Kontak dan efeknya ke tombol chat
- [ ] Ganti password admin seed setelah masuk pertama kali
- [ ] Buat mekanisme backup database (`pg_dump`) dan folder `uploads` berkala (PRD bagian 11)
- [ ] Setelah backend siap: matikan `VITE_USE_MOCK` di `client/.env`

## 3. Poin Terbuka PRD (bagian 14)

- [ ] Daftar fasilitas final Silver, Gold, Platinum dari pihak Karro (sekarang masih contoh umum)
- [ ] Keputusan biaya transport: tampilkan di website atau bahas saat konsultasi
- [ ] Jumlah dan akun admin panel (sekarang 1 akun seed)
- [ ] Definisi "booking resmi" — sekarang asumsi, tidak ada alur konfirmasi di sistem
- [ ] Konfirmasi penyimpanan permintaan booking ke database (sekarang sudah disimpan — pastikan disetujui Karro)

## 4. Frontend Belum Dikerjakan

- [ ] Ganti `placeholder.jpg` dengan foto asli dokumentasi Karro (halaman paket dan galeri)
- [ ] Unggah logo asli Karro (sekarang memakai ikon SVG matahari dari lucide)
- [ ] Opsional: lightbox untuk galeri (PRD tidak mewajibkan)
- [ ] Opsional: menu hamburger untuk navigasi mobile (sekarang wrap biasa)
- [ ] Opsional: font berlisensi Lyon Display + Suisse Int'l (sekarang substitute Google: DM Serif Display, Inter, Roboto Mono)
- [ ] Kompresi foto otomatis di server saat upload (PRD bagian 11: foto dikompres)

## 5. Skenario Pengujian PRD (bagian 13)

- [ ] T1 — Formulir kosong: muncul pesan kesalahan kolom wajib, data tidak diteruskan
- [ ] T2 — Nomor WhatsApp tidak valid (contoh `12345`): pesan format tidak valid
- [ ] T3 — Rencana tanggal sudah lewat: sistem menolak, pesan kesalahan tampil
- [ ] T4 — Gambar gagal dimuat: gambar pengganti tampil, layout rapi
- [ ] T5 — Admin mengubah harga paket: harga baru tampil di daftar dan detail
- [ ] T6 — Tombol Chat WhatsApp setelah formulir valid: WhatsApp terbuka dengan pesan berisi data formulir
- [ ] T7 — Akses halaman admin tanpa login: diarahkan ke halaman login
- [ ] T8 — Tampilan di HP, tablet, komputer: layout menyesuaikan

## 6. Catatan Teknis

- `docs/design.md` (Origin Financial) dipakai sebagai acuan layout dan typography saja. Warna mengikuti PRD: navy `#1B3A5C`, krem `#FDFBF7`, putih, aksen emas dekoratif.
- Token frontend ada di `client/src/styles/variables.css` (Tailwind v4 `@theme` + custom properties).
- Mode mock: `VITE_USE_MOCK=true` di `client/.env` membuat GET request gagal jatuh ke data contoh di `client/src/api/mockData.js`. Matikan setelah backend siap.
- Struktur folder mengikuti Lampiran B PRD: `client/` (React+Vite) dan `server/` (Express) dalam satu repositori.
- Akun admin seed: username `admin`, kata sandi `admin123` — GANTI setelah deployment.
