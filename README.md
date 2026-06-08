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

```
/workspaces/Baz-V
├── app/
│   ├── page.js                 # Main dashboard page (professional UI)
│   ├── layout.js               # Root layout with navigation
│   ├── globals.css             # Professional dark theme styling
│   ├── api/
│   │   ├── status/route.js      # System status endpoint
│   │   ├── settings/route.js    # Settings management
│   │   └── trade/route.js       # Trading execution
│
├── components/
│   ├── AssetComparisonChart.js  # Asset comparison bar chart
│   └── PerformanceChart.js      # Performance trend line chart
│
├── lib/
│   ├── binance.js              # Binance API integration
│   ├── openai.js               # OpenAI integration
│   ├── openclaw.js             # OpenClaw integration
│   └── trading.js              # Trading logic
│
├── worker/
│   └── tradingWorker.js        # Background trading worker
│
├── data/
│   ├── settings.json           # Persisted settings
│   └── trades.json             # Trade history
│
└── jsconfig.json               # Path aliases configuration
```

## 🎨 UI Features

### Professional Design
- **Dark Theme**: Institutional dark blue gradient background
- **Glassmorphism**: Semi-transparent cards dengan backdrop blur
- **Modern Charts**: Interactive Chart.js visualization
- **Responsive**: Mobile-friendly responsive layout
- **Accessibility**: Proper color contrast dan semantic HTML

### Key Metrics Display
```
┌─────────────────────────────────────────────────────┐
│  Portfolio Value  │  Performance vs  │  Risk Profile │
│   $1.5M AUM      │   Benchmark +25% │  Balanced     │
└─────────────────────────────────────────────────────┘
```

### Tab Navigation
- **Overview**: Dashboard dengan asset comparison dan performance charts
- **Performance**: AI recommendations dan trading history
- **Assets**: Asset allocation strategy dan watchlist
- **Settings**: Configuration untuk semua parameters

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Background Trading Worker
```bash
npm run worker
```

### Production Mode
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables (.env.local)
```bash
# AI & Trading
OPENAI_API_KEY=sk-...                    # OpenAI API key
USE_OPENCLAW=true                        # Use OpenClaw for AI
OPENCLAW_THINKING=high                   # Thinking depth

# Binance Exchange
BINANCE_API_KEY=...
BINANCE_API_SECRET=...
ENABLE_LIVE_TRADING=false                # Demo mode vs Live trading

# Worker Settings
WORKER_INTERVAL_MINUTES=15               # How often worker runs
```

### Default Trading Settings
```javascript
{
  targetBenchmarks: 'IHSG, S&P 500, Top 100 Crypto, Inflasi fiat',
  allocationPercent: 70,        // Primary assets allocation
  stablePercent: 30,            // Stable assets allocation
  riskProfile: 'balanced',      // conservative, balanced, aggressive
  watchlist: 'BTCUSDT, ETHUSDT, BNBUSDT',
  refreshMinutes: 15,
  engine: 'openclaw'
}
```

## 📊 Dashboard Features Explained

### Asset Comparison Chart
Horizontal bar chart menampilkan:
- **BAZ Portfolio**: Nilai total portfolio Anda (biru)
- **IHSG Index**: Indonesian stock market benchmark (hijau)
- **S&P 500**: US market benchmark (kuning)
- **Crypto Top 100**: Top cryptocurrencies index (ungu)
- **Inflation Target**: Inflation rate target (merah)

### Performance Trend Chart
Line chart dengan:
- **BAZ Portfolio**: Solid line dengan area fill (biru)
- **Benchmark Average**: Dashed line comparison (kuning)
- 30-day historical data
- Interactive tooltips dan legend

### Performance Metrics
- **Portfolio Value**: Total AUM (Assets Under Management)
- **Outperformance**: % difference vs benchmark average
- **Risk Profile**: Current risk setting
- **System Status**: Active/Loading

## 🤖 AI Integration

### OpenAI
```bash
USE_OPENCLAW=false
OPENAI_API_KEY=sk-...
```

### OpenClaw (Recommended)
```bash
USE_OPENCLAW=true
OPENCLAW_THINKING=high
OPENCLAW_CLI_PATH=npx          # or local path
```

## 📱 API Endpoints

### GET /api/status
Mengembalikan current system status, balances, dan recommendations

### POST /api/settings
Menyimpan atau update trading settings

### POST /api/trade
Memicu trading execution berdasarkan current recommendations

## 🔐 Security Notes

- **Never commit .env.local** - Add to .gitignore
- **Use demo mode first** - Set `ENABLE_LIVE_TRADING=false` initially
- **API keys should be in environment** - Not in code
- **Monitor worker logs** - Check trading history regularly

## 📈 Deployment

### Vercel (Dashboard)
```bash
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Auto-deploy on push
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
