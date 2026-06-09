# BAZ HOLDING GROUP - AI Fund Manager Platform

BAZ HOLDING GROUP adalah dashboard fund-manager berbasis AI yang membantu mengelola portofolio terhadap benchmark utama seperti IHSG, S&P 500, Top 100 Crypto, Gold, USD, dan inflasi.

## 🎯 Ringkasan
Aplikasi ini dirancang untuk:
- menampilkan performa portofolio secara visual,
- membandingkan portfolio dengan benchmark utama,
- memberi rekomendasi trading berdasarkan profil risiko,
- dan menjalankan strategi fund manager yang lebih dekat ke kebutuhan aset management.

## ✨ Fitur utama

### Dashboard overview
- metrik utama: portfolio value, performance vs benchmark, risk profile, dan status sistem,
- chart perbandingan aset dengan benchmark,
- chart performa tren.

### Performance tab
- menampilkan rekomendasi AI terbaru,
- menampilkan history trading,
- menampilkan log eksekusi sistem.

### Assets tab
- visualisasi alokasi primary vs stable,
- daftar watchlist aktif,
- informasi posisi portofolio.

### Settings tab
- mengatur target benchmark,
- memilih engine AI (OpenClaw atau OpenAI),
- mengubah watchlist,
- mengatur persentase alokasi dan profil risiko.

## 🧠 Logika fund manager saat ini
Sistem memakai strategi benchmark-driven yang menyesuaikan rekomendasi dengan target:
- IHSG,
- S&P 500,
- Top 100 Crypto,
- Gold,
- USD,
- dan inflasi.

Jika API eksternal tidak tersedia, aplikasi tetap bisa menghasilkan rekomendasi melalui fallback engine internal. Jika kredensial Binance belum diset, eksekusi trading akan berjalan dalam mode simulasi/dry-run.

## 🛠️ Teknologi yang dipakai
- Next.js 14
- React 18
- Chart.js + react-chartjs-2
- Node.js
- OpenAI / OpenClaw (opsional)
- Binance API (opsional)

## 📦 Persyaratan
- Node.js 18+
- npm
- API key OpenAI (opsional)
- API key Binance (opsional)
- OpenClaw (opsional)

## 🚀 Cara running

### 1. Install dependensi
```bash
npm install
```

### 2. Siapkan environment
Buat file .env.local dan isi variabel yang diperlukan, misalnya:
```bash
OPENAI_API_KEY=your_openai_key
BINANCE_API_KEY=your_binance_key
BINANCE_API_SECRET=your_binance_secret
USE_OPENCLAW=false
```

### 3. Jalankan aplikasi
```bash
npm run dev
```

Buka http://localhost:3000

### 4. Build untuk produksi
```bash
npm run build
npm start
```

## 🧪 Testing dan validasi
```bash
node --test test/trading.test.js
npm run build
```

## 📁 Struktur proyek
```bash
/workspaces/Baz-V
├── app/
│   ├── page.js
│   ├── api/
│   │   ├── status/route.js
│   │   ├── settings/route.js
│   │   └── trade/route.js
├── components/
│   ├── AssetComparisonChart.js
│   └── PerformanceChart.js
├── lib/
│   ├── binance.js
│   ├── openai.js
│   ├── openclaw.js
│   └── trading.js
├── worker/
│   └── tradingWorker.js
├── test/
│   └── trading.test.js
└── data/
    ├── settings.json
    └── trades.json
```

## 🔐 Catatan penting
- Jangan commit file .env.local.
- Gunakan mode simulasi terlebih dahulu jika belum siap trading live.
- Jika tidak ada kredensial eksternal, sistem tetap bisa berjalan dengan strategi internal.

```

### VPS (Worker)
```bash
ssh user@vps-ip
git clone https://github.com/IDC1201/Baz-V.git
cd Baz-V && npm install
screen -S worker
npm run worker
# Ctrl+A then D to detach
```

## ⚙️ Maintenance

### Monitor Worker
```bash
screen -r worker
```

### View Settings
```bash
cat data/settings.json
```

### View Trade History
```bash
cat data/trades.json
```

### Logs
- Worker logs: Terminal/screen session
- API logs: Next.js console output
- Chart data: Browser console

## 🐛 Troubleshooting

### Charts not displaying?
- Check if Chart.js is installed: `npm list chart.js`
- Verify canvas elements in DevTools
- Check browser console for errors

### API calls failing?
- Verify environment variables are set
- Check API keys are valid
- Monitor network tab in DevTools

### Worker not executing?
- Verify `npm run worker` is running
- Check WORKER_INTERVAL_MINUTES setting
- Review worker logs in screen/tmux session

## 📝 License

Proprietary - BAZ HOLDING GROUP

## 💬 Support

For issues and questions, contact: support@bazholding.com

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
