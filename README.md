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
2. Tambahkan environment variables:
   - `OPENAI_API_KEY`
   - `BINANCE_API_KEY`
   - `BINANCE_API_SECRET`
   - `ENABLE_LIVE_TRADING` (opsional, `true` untuk order live)
   - `USE_OPENCLAW` (opsional, `true` untuk menggunakan OpenClaw sebagai AI engine)
   - `OPENCLAW_PROFILE` (opsional, nama profil OpenClaw)
   - `WORKER_INTERVAL_MINUTES` (opsional, default 15)
   - `OPENCLAW_CLI_PATH` (opsional, default `npx`)

   Copy `.env.example` ke `.env.local` dan isi nilai yang benar:
   ```bash
   cp .env.example .env.local
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

## Menjalankan worker trading
Worker ini dapat dijalankan di server terpisah atau container untuk proses yang berjalan terus menerus:
```bash
npm run worker
```

## Deploy ke Vercel
- Deploy folder ini sebagai proyek Next.js.
- Tambahkan environment variables di Vercel dashboard.
- Untuk execute otomatis, gunakan scheduler eksternal atau fungsi cron yang memanggil `/api/trade`.

> Catatan: prototipe ini adalah starting point. Untuk trading live, lakukan audit keamanan, verifikasi API key, dan pahami risiko pasar.
