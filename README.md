# Baz-V AI Trading Dashboard

A starter institutional-style AI crypto trading dashboard built with Next.js and React.

## Fitur utama
- Dashboard React untuk melihat status, pengaturan, dan hasil analisis AI.
- API backend sederhana untuk menyimpan pengaturan dan memicu trading.
- Integrasi dengan Binance untuk data pasar dan eksekusi order.
- Integrasi OpenAI untuk membuat rekomendasi trading otomatis.
- Worker script untuk menjalankan strategi di luar Vercel.

## Instalasi
1. Instal dependensi:
   ```bash
   npm install
   ```
2. Tambahkan environment variables, atau salin terlebih dahulu file contoh:
   ```bash
   cp .env.example .env.local
   ```
   - `OPENAI_API_KEY`
   - `BINANCE_API_KEY`
   - `BINANCE_API_SECRET`
   - `ENABLE_LIVE_TRADING` (opsional, `true` untuk order live)
   - `USE_OPENCLAW` (opsional, `true` untuk menggunakan OpenClaw sebagai AI engine)
   - `OPENCLAW_PROFILE` (opsional, nama profil OpenClaw)
   - `OPENCLAW_CLI_PATH` (opsional, default `npx`)
   - `OPENCLAW_THINKING` (opsional, default `high`)
   - `WORKER_INTERVAL_MINUTES` (opsional, default `15`)
3. Jalankan development server:
   ```bash
   npm run dev
   ```

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
