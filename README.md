# Karro Wedding Organizer

Website profil dan pemesanan jasa wedding organizer. Pengunjung melihat paket (Silver, Gold, Platinum), galeri, dan testimoni, lalu booking lewat WhatsApp. Admin mengelola konten lewat panel login.

Dokumen: `docs/PRD_Karro_Wedding_Organizer.md` (kebutuhan) dan `docs/design.md` (token & aturan desain).

## Stack

- `client/` — React + Vite, React Router, Axios, DOMPurify
- `server/` — Node.js + Express, PostgreSQL (`pg`), JWT + bcrypt, multer, express-validator, helmet, cors, express-rate-limit

## Menjalankan

### 1. Database

Buat database PostgreSQL, misalnya `karro_wedding`. Sesuaikan `server/.env`:

```bash
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/karro_wedding
JWT_SECRET=ganti_dengan_string_acak_panjang
CLIENT_URL=http://localhost:5173
```

Jalankan migrasi dan seed:

```bash
cd server
npm install
npm run migrate
# seed awal (paket + admin)
psql "$DATABASE_URL" -f database/seeds/paket_awal.sql
psql "$DATABASE_URL" -f database/seeds/admin_awal.sql
```

Akun admin awal: username `admin`, kata sandi `admin123`. Ganti setelah masuk.

### 2. Server

```bash
cd server
npm run dev
```

API berjalan di `http://localhost:5000/api`.

### 3. Client

```bash
cd client
npm install
npm run dev
```

Buka `http://localhost:5173`. File `client/.env` sudah menunjuk ke API lokal.

## Struktur

Mengikuti Lampiran B PRD: layering `routes → middlewares → controllers → services → repositories → PostgreSQL`. Validasi ganda di client (`src/utils/validasiForm.js`) dan server (`src/validators`). Foto diunggah ke `server/uploads` (ikut `.gitignore`), path disimpan di database.

## Endpoint utama

| Method | Path | Auth | Fungsi |
|---|---|---|---|
| POST | /api/auth/login | - | Login admin |
| GET | /api/paket | - | Daftar paket |
| GET | /api/paket/:slug | - | Detail paket + fasilitas |
| POST/PUT/DELETE | /api/paket | JWT | CRUD paket |
| GET | /api/galeri | - | Semua foto |
| POST/PUT/DELETE | /api/galeri | JWT | CRUD galeri |
| GET | /api/testimoni | - | Semua testimoni |
| POST/PUT/DELETE | /api/testimoni | JWT | CRUD testimoni |
| POST | /api/booking | - | Kirim formulir booking |
| GET | /api/booking | JWT | Rekap permintaan |
| GET/PUT | /api/pengaturan | PUT: JWT | Nomor WA & kontak |
