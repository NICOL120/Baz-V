# BAZ HOLDING GROUP - Institutional Asset Management Platform

A professional institutional-style fund management platform built with Next.js, React, and Chart.js for real-time asset monitoring and performance analytics.

## 🎯 Overview
BAZ HOLDING GROUP platform adalah aplikasi profesional yang dirancang untuk:
- **Dashboard Premium** - Monitoring aset dan performa real-time dengan UI institusional
- **Asset Comparison** - Perbandingan performa portfolio vs benchmark major (IHSG, S&P 500, Crypto, Inflasi)
- **Performance Analytics** - Visualisasi trend performa 30-hari dengan chart interaktif
- **Risk Management** - Kontrol alokasi aset (Primary/Stable) dan risk profile
- **Automated Trading** - Integrasi AI (OpenAI/OpenClaw) untuk rekomendasi dan eksekusi trading
- **Real-time Monitoring** - Status system dan trading history tracking

## ✨ Fitur Utama

### 📊 Dashboard Overview
- Key metrics: Portfolio Value, Performance vs Benchmark, Risk Profile, System Status
- Asset comparison chart (Bar chart horizontal)
- Performance trend chart (Line chart dengan dual datasets)
- Quick access untuk semua fitur utama

### 📈 Performance Tab
- Current AI recommendations
- Trading history (latest 10 transactions)
- Real-time status monitoring

### 🏦 Assets Tab
- Allocation strategy visualization (Primary vs Stable assets)
- Active watchlist monitoring
- Allocation percentage tracking

### ⚙️ Settings Tab
- Configure target benchmarks
- Select AI engine (OpenClaw/OpenAI)
- Manage watchlist symbols
- Adjust allocation percentages
- Set risk profile (Conservative/Balanced/Aggressive)
- Configure refresh intervals

## 🏗️ Teknologi Stack
- **Framework**: Next.js 14.2.5
- **Frontend**: React 18.3.1
- **Charts**: Chart.js 4.4.0 + react-chartjs-2 5.2.0
- **APIs**: Binance, OpenAI, OpenClaw
- **Styling**: Professional dark theme dengan responsive design

## 📦 Persyaratan
- Node.js (v18+)
- npm atau yarn
- API key OpenAI (untuk AI recommendations)
- API key & secret Binance (untuk market data)
- OpenClaw CLI (opsional, untuk advanced AI features)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/IDC1201/Baz-V.git
cd Baz-V
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
OPENAI_API_KEY=sk-...
BINANCE_API_KEY=...
BINANCE_API_SECRET=...
ENABLE_LIVE_TRADING=false
USE_OPENCLAW=true
OPENCLAW_THINKING=high
WORKER_INTERVAL_MINUTES=15
```

### 3. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser

### 4. Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

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
