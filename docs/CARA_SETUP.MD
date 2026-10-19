# Cara Setup — Karro Wedding Organizer

Panduan ini menjelaskan cara menjalankan aplikasi dari awal, urutannya:

1. Siapkan database
2. Jalankan backend (server)
3. Jalankan frontend (website)

Ikuti langkahnya satu per satu.

---

## Langkah 0: Siapkan Program yang Dipakai

Sebelum mulai, pastikan laptop kamu sudah punya:

| Program | Cara cek di terminal |
|---|---|
| Node.js (versi 20 ke atas) | `node -v` |
| PostgreSQL | `psql --version` |
| Git | `git --version` |

Kalau belum ada, install dulu. Node.js dan PostgreSQL bisa di-download dari situs resminya.

---

## Langkah 1: Siapkan Database

Database adalah tempat menyimpan data (paket, galeri, testimoni, akun admin).

Buka terminal, lalu buat database baru dengan nama `karro_wedding`:

```bash
psql -U postgres -c "CREATE DATABASE karro_wedding;"
```

Kalau diminta sandi, isi sandi PostgreSQL kamu.

Catat alamat database kamu, contohnya:

```
postgresql://postgres:password@localhost:5432/karro_wedding
```

> Ganti `password` dengan sandi PostgreSQL kamu sendiri. Alamat ini akan dipakai di langkah berikutnya.

---

## Langkah 2: Siapkan Backend (Server)

Backend adalah "otak" aplikasi: menyimpan dan mengirim data.

### 2.1 Install library

```bash
cd server
npm install
```

Tunggu sampai selesai.

### 2.2 Buat file `.env`

Buat file bernama `.env` di dalam folder `server`, isinya seperti ini:

```env
PORT=9000
DATABASE_URL=postgresql://postgres:password@localhost:5432/karro_wedding
JWT_SECRET=tulis_di_sini_teks_acak_yang_panjang
CLIENT_URL=http://localhost:5173
```

Penjelasan isinya:

- **PORT** — nomor tempat server berjalan. Biarkan `9000`.
- **DATABASE_URL** — alamat database dari Langkah 1.
- **JWT_SECRET** — kunci rahasia untuk login admin. Buat teks acak yang panjang, misalnya jalankan:
  ```bash
  node -e "console.log(crypto.randomBytes(48).toString('hex'))"
  ```
  lalu hasilnya tempel ke `JWT_SECRET`.
- **CLIENT_URL** — alamat website. Biarkan `http://localhost:5173`.

> Keempat isian wajib ada. Kalau ada yang kosong, server tidak akan mau jalan.

### 2.3 Buat tabel database

```bash
cd server
npm run migrate
```

Perintah ini membuat semua tabel yang dibutuhkan. Kalau dijalankan lagi, tidak masalah — tabel yang sudah ada akan dilewati.

### 2.4 Isi data awal

```bash
cd server
psql "$DATABASE_URL" -f database/seeds/paket_awal.sql
psql "$DATABASE_URL" -f database/seeds/admin_awal.sql
```

Ini mengisi:

- Paket awal: Silver, Gold, Platinum
- Akun admin: **username `admin`, sandi `admin123`** (ganti sandinya setelah pertama kali masuk)

> Kalau muncul error "`DATABASE_URL` tidak dikenal", jalankan perintahnya dengan menyalin alamat database langsung:
> ```bash
> psql "postgresql://postgres:password@localhost:5432/karro_wedding" -f database/seeds/paket_awal.sql
> psql "postgresql://postgres:password@localhost:5432/karro_wedding" -f database/seeds/admin_awal.sql
> ```

### 2.5 Nyalakan server

```bash
cd server
npm run dev
```

Cek apakah berhasil: buka **http://localhost:9000/api/paket** di browser.

- Muncul teks/daftar data → server sudah jalan ✅
- Muncul error → kembali cek `.env` dan pastikan database sudah menyala.

**Biarkan terminal ini terbuka** (jangan ditutup), karena server harus terus berjalan.

---

## Langkah 3: Siapkan Frontend (Website)

Frontend adalah tampilan website yang dilihat pengunjung.

### 3.1 Install library

```bash
cd client
npm install
```

### 3.2 Buat file `.env`

Buat file bernama `.env` di dalam folder `client`, isinya:

```env
VITE_API_URL=http://localhost:9000/api
VITE_USE_MOCK=false
```

Penjelasan:

- **VITE_API_URL** — alamat backend. Harus cocok dengan `PORT` di langkah 2 (`9000`).
- **VITE_USE_MOCK** — pengaturan data palsu:
  - `true` = website menampilkan data contoh dari file mock, **bukan** dari database
  - `false` = website membaca data sungguhan dari database

> **Penting:** supaya yang tampil data asli dari database, isi `VITE_USE_MOCK=false`.

### 3.3 Nyalakan website

```bash
cd client
npm run dev
```

Buka **http://localhost:5173** di browser. Website sudah bisa dibuka.

---

## Ringkasan (Versi Singkat)

Kalau semuanya sudah pernah di-setup, cukup jalankan 2 terminal ini:

**Terminal 1 — server:**
```bash
cd server
npm run dev
```

**Terminal 2 — website:**
```bash
cd client
npm run dev
```

Lalu buka **http://localhost:5173**.

---

## Cara Masuk ke Panel Admin

1. Buka **http://localhost:5173/login**
2. Username: `admin`
3. Sandi: `admin123`
4. Tekan **Masuk** — kamu akan diarahkan ke halaman `/admin`

> Selama belum login, membuka `/admin` akan otomatis dilempar ke halaman login.

---

## Kalau Ada Masalah

| Masalah | Cara mengatasinya |
|---|---|
| Server langsung error soal variabel env | File `server/.env` belum lengkap — isi keempat isian wajib |
| Error koneksi database (`ECONNREFUSED`) | PostgreSQL belum nyala, atau `DATABASE_URL` salah |
| Website jalan tapi datanya tidak berubah | `VITE_USE_MOCK` masih `true` — ubah ke `false`, lalu restart `npm run dev` |
| Muncul error CORS di browser | `CLIENT_URL` di `server/.env` harus persis `http://localhost:5173` |
| Error port sudah dipakai | Matikan program lama, atau ganti `PORT` (server/.env) dan `VITE_API_URL` (client/.env) |
| Login gagal | Pastikan seed admin sudah dijalankan; sandi default `admin123` |
| Ingin mulai dari nol lagi | Hapus database `karro_wedding`, buat ulang, jalankan lagi `npm run migrate` + seed |

---

## Hal yang Perlu Dijaga

- Jangan pakai `JWT_SECRET` teks contoh — buat yang asli dan rahasia.
- File `.env` jangan sampai di-push ke GitHub (sudah masuk `.gitignore`).
- Ganti sandi admin `admin123` setelah pertama kali masuk.
