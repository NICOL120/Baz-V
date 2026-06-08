# Baz-V AI Trading Dashboard

A starter institutional-style AI crypto trading dashboard built with Next.js and React.

## Ringkasan
Baz-V adalah aplikasi demo yang terdiri dari:
- Dashboard web untuk melihat status, pengaturan, dan hasil analisis.
- API backend sederhana untuk menyimpan pengaturan dan memicu trading.
- Worker terpisah yang menjalankan strategi trading otomatis.
- Integrasi Binance untuk data pasar dan order.
- Integrasi OpenAI / OpenClaw untuk rekomendasi trading.

## Persyaratan
- Node.js
- npm
- API key OpenAI
- API key dan secret Binance

## Setup lokal
Ikuti langkah berikut untuk menjalankan aplikasi di komputer lokal.

### 1. Clone repository
```bash
git clone https://github.com/IDC1201/Baz-V.git
cd Baz-V
```

### 2. Install dependensi
```bash
npm install
```

### 3. Buat file environment
```bash
cp .env.example .env.local
```

### 4. Isi `.env.local`
Edit file `.env.local` dan isi nilai berikut:
- `OPENAI_API_KEY` = API key OpenAI
- `BINANCE_API_KEY` = API key Binance
- `BINANCE_API_SECRET` = secret Binance
- `ENABLE_LIVE_TRADING` = `true` untuk order live, `false` untuk analisis saja
- `USE_OPENCLAW` = `true` untuk menggunakan OpenClaw sebagai AI engine
- `OPENCLAW_PROFILE` = nama profil OpenClaw (opsional)
- `OPENCLAW_CLI_PATH` = path/command OpenClaw (opsional, default `npx`)
- `OPENCLAW_THINKING` = prioritas OpenClaw (opsional, default `high`)
- `WORKER_INTERVAL_MINUTES` = interval worker dalam menit (opsional, default `15`)

> Pastikan `OPENAI_API_KEY`, `BINANCE_API_KEY`, dan `BINANCE_API_SECRET` sudah terisi.

## Menjalankan aplikasi lokal

### Dashboard
Jalankan aplikasi Next.js:
```bash
npm run dev
```

Buka browser ke `http://localhost:3000`.

### Worker
Worker menjalankan strategi trading secara otomatis. Buka terminal baru:
```bash
npm run worker
```

Worker akan terus berjalan dan mengeksekusi trading setiap `WORKER_INTERVAL_MINUTES`.

## Deployment

### Option 1: Dashboard di Vercel + Worker di VPS

**Untuk dashboard di Vercel:**
1. Deploy project ini ke Vercel sebagai aplikasi Next.js.
2. Tambahkan environment variables di Vercel dashboard.

**Untuk worker di VPS:**
1. SSH ke VPS:
   ```bash
   ssh user@your-vps-ip
   ```
2. Clone repository:
   ```bash
   git clone https://github.com/IDC1201/Baz-V.git
   cd Baz-V
   ```
3. Install dependensi:
   ```bash
   npm install
   ```
4. Buat file environment:
   ```bash
   cp .env.example .env.local
   ```
5. Isi `.env.local` dengan data yang sama.
6. Jalankan worker menggunakan `screen` atau `tmux` agar tetap berjalan:
   ```bash
   screen -S trading-worker
   npm run worker
   # Tekan Ctrl+A lalu D untuk detach dari screen
   ```
7. Untuk merekam session worker, gunakan:
   ```bash
   screen -r trading-worker
   ```

### Option 2: Semua lokal
Jalankan dashboard dan worker di komputer lokal atau server yang sama.

```bash
# Terminal 1 - Dashboard
npm run dev

# Terminal 2 - Worker
npm run worker
```

## Catatan penting
- Proyek ini adalah prototipe.
- Untuk trading live, lakukan audit keamanan.
- Verifikasi API key dan pahami risiko pasar.
- Jika menggunakan worker di VPS, pastikan terminal tetap terbuka atau gunakan `screen`/`tmux`/process manager.
