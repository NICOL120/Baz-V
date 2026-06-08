# Baz-V AI Trading Dashboard

A starter institutional-style AI crypto trading dashboard built with Next.js and React.

## Fitur utama
- Dashboard React untuk melihat status, pengaturan, dan hasil analisis AI.
- API backend sederhana untuk menyimpan pengaturan dan memicu trading.
- Integrasi dengan Binance untuk data pasar dan eksekusi order.
- Integrasi OpenAI untuk membuat rekomendasi trading otomatis.
- Worker script untuk menjalankan strategi di luar Vercel.

## Instalasi dan cara menjalankan AI trading
1. Pastikan kamu sudah punya project ini di komputer kamu.
   - Jika belum, clone repository ini.
2. Masuk ke folder project:
   ```bash
   cd Baz-V
   ```
3. Install semua dependensi:
   ```bash
   npm install
   ```
4. Buat file environment bernama `.env.local`.
   - Jika ada file `.env.example`, jalankan:
     ```bash
     cp .env.example .env.local
     ```
   - Kalau tidak ada, buat file baru dengan nama `.env.local`.
5. Isi `.env.local` dengan nilai berikut:
   - `OPENAI_API_KEY` = API key dari OpenAI.
   - `BINANCE_API_KEY` = API key Binance.
   - `BINANCE_API_SECRET` = secret key Binance.
   - `ENABLE_LIVE_TRADING` = `true` agar bisa order live; kosong atau `false` untuk hanya testing.
   - `USE_OPENCLAW` = `true` jika ingin pakai OpenClaw sebagai engine AI.
   - `OPENCLAW_PROFILE` = nama profil OpenClaw (jika dipakai).
   - `OPENCLAW_CLI_PATH` = biasanya `npx`.
   - `OPENCLAW_THINKING` = `high` atau tingkat pemikiran AI lain.
   - `WORKER_INTERVAL_MINUTES` = berapa menit interval worker berjalan. Default 15.
6. Jalankan aplikasi dashboard dan API:
   ```bash
   npm run dev
   ```
7. Buka browser di:
   ```text
   http://localhost:3000
   ```
8. Untuk menjalankan proses trading otomatis, buka terminal baru dan jalankan worker:
   ```bash
   npm run worker
   ```
9. Worker akan berjalan terus dan menjalankan strategi sesuai interval.
10. Jika ingin berhenti, tekan `Ctrl+C` di terminal worker.

## Penjelasan singkat alur kerja
- `npm run dev` menjalankan dashboard Next.js.
- `npm run worker` menjalankan proses terpisah yang memanggil strategi trading.
- Worker memeriksa pasar setiap `WORKER_INTERVAL_MINUTES` dan kemudian menjalankan `lib/trading.js`.
- Dashboard dapat menampilkan status, pengaturan, dan hasil analisis.

## Menjalankan worker trading
Worker ini adalah proses terpisah yang menjalankan strategi trading secara terus menerus setiap beberapa menit.

Jika Anda hanya ingin menjalankan website/dashboard, tinggal jalankan `npm run dev`.
Jika Anda juga ingin menjalankan worker, jalankan perintah ini di terminal lain:
```bash
npm run worker
```

### Apa yang dilakukan worker?
- Worker memanggil fungsi trading di `lib/trading.js`.
- Worker berjalan tanpa berhenti, mengecek pasar setiap `WORKER_INTERVAL_MINUTES`.
- Worker tidak perlu dijalankan di komputer yang sama dengan website.

### Kenapa worker bisa dijalankan terpisah?
- Website Next.js hanya untuk tampilan dan API.
- Worker bisa dijalankan di server lain atau di dalam container Docker.
- Ini berguna agar proses background tidak mempengaruhi performa website.

### Cara menjalankan worker secara sederhana
1. Pastikan semua environment variables sudah diisi di `.env.local`.
2. Buka terminal baru.
3. Jalankan:
   ```bash
   npm run worker
   ```
4. Biarkan terminal ini tetap terbuka. Worker akan terus berjalan, menunggu selama interval, lalu menjalankan strategi lagi.

### Menjalankan worker di container atau server lain
1. Copy seluruh project ke server atau container.
2. Install dependensi dengan `npm install`.
3. Pastikan file environment sudah tersedia di sana.
4. Jalankan `npm run worker`.

## Deploy ke Vercel
- Deploy folder ini sebagai proyek Next.js.
- Tambahkan environment variables di Vercel dashboard.
- Untuk execute otomatis, gunakan scheduler eksternal atau fungsi cron yang memanggil `/api/trade`.

> Catatan: prototipe ini adalah starting point. Untuk trading live, lakukan audit keamanan, verifikasi API key, dan pahami risiko pasar.
