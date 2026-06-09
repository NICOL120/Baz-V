# 🤖 BAZ HOLDING GROUP - Autonomous Fund Manager V2

**Platform fund manager otomatis berbasis AI yang mengelola portfolio Anda 24/7 dengan target mengalahkan performa IHSG, S&P 500, Gold, Bitcoin, Top 100 Crypto, dan USD.**

---

## 🎯 Apa Itu Sistem Ini?

BAZ Fund Manager V2 adalah **autonomous fund manager** yang:

- ✅ **Berjalan Otomatis 24/7** - Mengelola portfolio tanpa intervensi manusia
- ✅ **Membuat Semua Keputusan Trading** - AI memilih aset, alokasi, risk management
- ✅ **User Hanya Funding** - Anda hanya deposit USDT, sistem yang trading
- ✅ **Target: Beat Benchmarks** - Mengalahkan performa IHSG, S&P 500, Gold, BTC, dll
- ✅ **Real-time Dashboard** - Monitor portfolio dan performance secara live
- ✅ **Complete History** - Setiap trade tercatat dan dapat dianalisis

---

## ⚡ Quick Start (60 Detik)

```bash
# 1. Setup environment
cat > .env.local << EOF
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_secret_here
USE_OPENCLAW=true
WORKER_INTERVAL_MINUTES=15
ALLOCATION_PERCENT=70
STABLE_PERCENT=30
RISK_PROFILE=balanced
EOF

# 2. Install dependencies
npm install

# 3. Terminal 1: Start Dashboard
npm run dev

# 4. Terminal 2: Start Fund Manager Worker
npm run worker

# 5. Buka http://localhost:3000 dan deposit USDT ke Binance
# Fund manager akan mulai trading dalam 15 menit
```

---

## 🏗️ Sistem Cara Kerja

### Autonomous Trading Cycle (Every 15 minutes)

```
1. 📊 CHECK PORTFOLIO
   → Ambil balance USDT dari Binance
   → Get semua holdings

2. 📈 FETCH MARKET DATA
   → Get harga real-time: BTC, ETH, BNB, SOL, ADA, dll
   → Analisis 24h momentum dan volume

3. 🎯 COMPARE BENCHMARKS
   → Ambil data benchmark live dari Yahoo Finance dan CoinGecko
   → IHSG, S&P 500, Gold, Bitcoin, Top 100 Crypto, USD/IDR

5. 🧠 AI ANALYSIS
   → OpenClaw/OpenAI generate trading recommendations
   → Cari the best assets to trade
   → Evaluate: BUY, HOLD, atau SELL

6. 💰 EXECUTE TRADES
   → Place order untuk BUY recommendation
   → Place order untuk SELL recommendation
   → Dengan risk management & slippage protection

7. 📝 RECORD DATA
   → Save semua trade details
   → Calculate performance vs benchmarks
   → Update dashboard

8. 🔄 REPEAT
   → Tunggu 15 menit, lalu cycle berikutnya
```

---

## 📚 Documentation

- 🎯 **[README.md](README.md)** - This file (overview & setup)

---

## 📊 Fitur Dashboard

### Overview Tab
- 💰 **Portfolio Value** - Total USD value (real-time)
- 📈 **Outperformance** - % vs S&P 500
- 📊 **Holdings** - Jumlah aset yang dipegang
- 🟢 **System Status** - Live indicator
- 📋 **Holdings Table** - Daftar lengkap dengan harga & %
- 🎯 **Benchmark Cards** - Live benchmark performance (Yahoo Finance + CoinGecko)

### Performance Tab
- 📊 Benchmark Indices - IHSG, S&P 500, Gold, BTC, dll
- 📈 Fund Performance - Total value & holdings
- 📉 Detailed Metrics - Return percentage

### History Tab
- ⏰ Recent Cycles - Last 10 cycles
- 📝 Trade Details - Timestamp, portfolio value, trades executed
- ⏱️ Duration - Berapa lama setiap cycle

---

## 🔧 Setup Lengkap

### Langkah 1: Persiapan Binance

1. Login ke [Binance.com](https://www.binance.com)
2. Settings → API Management
3. Create New Key dengan nama "BAZ Fund Manager"
4. **Enable Permissions:**
   - ✅ Enable Spot Trading
   - ✅ Enable Reading Account Trade History
   - ✅ Enable User Stream
   - ❌ Disable: Withdraw (keamanan)
5. Copy API Key dan Secret
6. Set IP Whitelist (recommended)

### Langkah 2: Environment Configuration

```bash
# Create .env.local di root folder
cat > .env.local << 'EOF'
# === REQUIRED ===
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_API_SECRET=your_binance_api_secret_here

# === AI ENGINE (pilih satu atau keduanya) ===
OPENAI_API_KEY=sk-your_openai_key_here
USE_OPENCLAW=true

# === CONFIGURATION ===
ENGINE=openclaw                    # atau 'openai'
WORKER_INTERVAL_MINUTES=15         # Frequency (5-60)
ALLOCATION_PERCENT=70              # Growth allocation
STABLE_PERCENT=30                  # Stable allocation
RISK_PROFILE=balanced              # balanced|conservative|aggressive
EOF
```

**Environment Variables:**

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `BINANCE_API_KEY` | (required) | Binance API authentication |
| `BINANCE_API_SECRET` | (required) | Binance API secret |
| `OPENAI_API_KEY` | (optional) | OpenAI GPT-4 access |
| `USE_OPENCLAW` | true | Enable OpenClaw AI |
| `ENGINE` | openclaw | Primary AI engine |
| `WORKER_INTERVAL_MINUTES` | 15 | Trading cycle frequency |
| `ALLOCATION_PERCENT` | 70 | % untuk growth/risky assets |
| `STABLE_PERCENT` | 30 | % untuk USDT/stablecoins |
| `RISK_PROFILE` | balanced | aggressive/balanced/conservative |

### Langkah 3: Install Dependencies

```bash
npm install
```

### Langkah 4: Verify Build

```bash
npm run build
```

Pastikan: "✓ Compiled successfully"

---

## 🚀 Menjalankan Sistem

### Development Mode (Recommended untuk Testing)

**Terminal 1: Dashboard**
```bash
npm run dev
```
Akses di: http://localhost:3000

**Terminal 2: Fund Manager Worker**
```bash
npm run worker
```

### Production Mode

```bash
# Build
npm run build

# Terminal 1: Start server
npm start

# Terminal 2: Start worker
npm run worker
```

### Production Deployment

Untuk deployment production, jalankan website di Vercel dan worker continuous di VPS.

#### 1. Website di Vercel
- Vercel cocok untuk Next.js frontend + API route `/api/status` dan `/api/trade`.
- Worker long-running tidak bisa dijalankan di Vercel, jadi deploy worker terpisah di VPS.

Langkah sederhana:

1. Push repository ke GitHub.
2. Buka https://vercel.com dan buat project baru dari repo `Baz-V`.
3. Atur Environment Variables di Vercel:
   - `BINANCE_API_KEY`
   - `BINANCE_API_SECRET`
   - `OPENAI_API_KEY` (jika menggunakan OpenAI)
   - `USE_OPENCLAW=true`
   - `ENGINE=openclaw` atau `openai`
   - `WORKER_INTERVAL_MINUTES=15`
   - `ALLOCATION_PERCENT=70`
   - `STABLE_PERCENT=30`
   - `RISK_PROFILE=balanced`
4. Deploy project. Vercel akan otomatis build dengan `npm run build`.

> Hasilnya: dashboard dan API route berjalan di Vercel.

#### 2. Worker di VPS (24/7)
Worker harus dijalankan di server/vps karena memerlukan proses yang terus hidup.

1. SSH ke VPS:
```bash
ssh user@your-vps
```
2. Clone repository:
```bash
git clone https://github.com/IDC1201/Baz-V.git
cd Baz-V
```
3. Setup environment dan install dependency:
```bash
cat > .env.local << 'EOF'
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_API_SECRET=your_binance_api_secret_here
OPENAI_API_KEY=your_openai_key_here
USE_OPENCLAW=true
ENGINE=openclaw
WORKER_INTERVAL_MINUTES=15
ALLOCATION_PERCENT=70
STABLE_PERCENT=30
RISK_PROFILE=balanced
EOF
npm install
npm run build
```
4. Install `pm2` dan jalankan worker:
```bash
npm install -g pm2
pm2 start "npm run worker" --name "baz-worker"
pm2 save
pm2 startup
```
5. Cek worker:
```bash
pm2 status
pm2 logs baz-worker
```

> Catatan: `npm start` hanya dibutuhkan jika website juga dijalankan di VPS. Untuk konfigurasi ideal, website di Vercel, worker di VPS.

#### 3. Memastikan workflow benar
- Website di Vercel menampilkan dashboard dan status API.
- Worker di VPS menjalankan `runAutonomousFundManager()` setiap interval.
- Worker menggunakan `.env.local` yang sama dengan variabel API binance dan AI.

---

## 📡 API Endpoints

### Status & Portfolio

```bash
# Get portfolio & benchmark data
curl http://localhost:3000/api/status

# Response:
# {
#   "success": true,
#   "portfolio": { "totalUsd": 1250.45, "holdings": {...} },
#   "benchmarks": { "IHSG": {...}, "S&P500": {...}, ... },
#   "performance": { "comparison": { "vsIHSG": "+12.5%", ... } }
# }
```

### Execute Fund Manager

```bash
# Trigger one manual cycle
curl -X POST http://localhost:3000/api/trade

# Response:
# {
#   "success": true,
#   "cycle": { "timestamp": "...", "portfolio": {...}, "trades": [...] }
# }
```

### History & Performance

```bash
# Get summary
curl http://localhost:3000/api/fund-manager?section=summary

# Get recent cycles
curl http://localhost:3000/api/fund-manager?section=history

# Get performance metrics
curl http://localhost:3000/api/fund-manager?section=performance
```

### Settings

```bash
# Get current settings
curl http://localhost:3000/api/settings

# Update settings
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "allocationPercent": 75,
    "stablePercent": 25,
    "riskProfile": "aggressive"
  }'
```

---

## 📁 Folder Structure

```
/workspaces/Baz-V/
├── 📄 Documentation
│   ├── README.md                  ← You are here
│   ├── QUICK_START.md
│   ├── SETUP_FUND_MANAGER.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── DEPLOYMENT_READY.md
│   └── DOCUMENTATION_INDEX.md
│
├── 🛠️ Core System
│   ├── lib/
│   │   ├── fundManagerV2.js       ← Main autonomous engine
│   │   ├── binance.js             ← Binance API wrapper
│   │   ├── openai.js              ← OpenAI integration
│   │   ├── openclaw.js            ← OpenClaw integration
│   │   └── trading.js             ← Legacy (fallback)
│   │
│   ├── worker/
│   │   └── tradingWorker.js       ← Runs every 15 minutes
│   │
│   ├── app/
│   │   ├── api/
│   │   │   ├── status/route.js
│   │   │   ├── trade/route.js
│   │   │   ├── fund-manager/route.js
│   │   │   └── settings/route.js
│   │   ├── page.js                ← Dashboard UI
│   │   ├── layout.js
│   │   └── globals.css
│   │
│   └── components/
│       ├── AssetComparisonChart.js
│       └── PerformanceChart.js
│
├── 📦 Configuration
│   ├── package.json
│   ├── next.config.js
│   ├── jsconfig.json
│   └── .env.local (create this!)
│
├── 🧪 Testing
│   └── test/
│       └── trading.test.js
│
└── 📊 Data (auto-created)
    └── data/
        ├── fund_manager_history.json
        ├── settings.json
        └── trades.json
```

---

## 🎛️ Configuration Options

### Risk Profiles

**Conservative** (50% growth, 50% stable)
```bash
ALLOCATION_PERCENT=50
STABLE_PERCENT=50
RISK_PROFILE=conservative
```
- Untuk risk-averse investors
- Slower gains, better protection
- Stop-loss: 7%, Take-profit: 25%

**Balanced** (70% growth, 30% stable) - DEFAULT
```bash
ALLOCATION_PERCENT=70
STABLE_PERCENT=30
RISK_PROFILE=balanced
```
- Recommended untuk most users
- Moderate risk & reward
- Stop-loss: 10%, Take-profit: 50%

**Aggressive** (85% growth, 15% stable)
```bash
ALLOCATION_PERCENT=85
STABLE_PERCENT=15
RISK_PROFILE=aggressive
```
- Maximum returns
- Higher risk
- Stop-loss: 15%, Take-profit: 100%

### Execution Speed

```bash
WORKER_INTERVAL_MINUTES=5      # Very fast (not recommended)
WORKER_INTERVAL_MINUTES=15     # Default (recommended)
WORKER_INTERVAL_MINUTES=30     # Slower (more stable)
WORKER_INTERVAL_MINUTES=60     # Daily execution
```

### AI Engine

```bash
ENGINE=openclaw   # Advanced reasoning (recommended)
ENGINE=openai     # GPT-4 Turbo (fallback)
# No engine = Internal logic only (no API needed)
```

---

## 📈 Expected Performance

| Timeline | Expected | Status |
|----------|----------|--------|
| **Week 1** | ±5% | System testing |
| **Month 1** | +5-15% | Strategy optimizing |
| **Quarter 1** | +15-40% | Maturing |
| **Year 1** | +50-200% | GOAL: Beat benchmarks |

**Benchmarks to Beat:**
- ✅ IHSG Index (8.3% yearly)
- ✅ S&P 500 (22.5% yearly)
- ✅ Gold (8.2% yearly)
- ✅ Bitcoin (125% yearly) - hard target
- ✅ Top 100 Crypto (95% yearly) - hard target
- ✅ USD/IDR (2.5% yearly)

---

## 🔒 Security Best Practices

### ✅ HARUS DILAKUKAN

1. **Use Separate Binance Account**
   - Jangan pakai main trading account
   - Create bot-only account

2. **API Key Restrictions**
   - ✅ Enable: Spot Trading
   - ✅ Enable: Read-only balance
   - ❌ Disable: Withdraw permissions
   - ✅ Set IP whitelist

3. **Account Protection**
   - ✅ Enable 2FA on Binance
   - ✅ Set withdrawal restrictions
   - ✅ Monitor account regularly

4. **Code Security**
   - ❌ NEVER commit .env.local
   - ✅ Add to .gitignore
   - ❌ NEVER share API keys
   - ✅ Use strong, unique keys

5. **Monitoring**
   - ✅ Check dashboard daily
   - ✅ Review weekly performance
   - ✅ Set up alerts

---

## 🐛 Troubleshooting

### Dashboard Not Loading

```bash
# Check if server running
curl http://localhost:3000

# Check process
lsof -i :3000

# Restart
Ctrl+C
npm run dev
```

### Worker Not Trading

```bash
# Check if running
ps aux | grep worker

# Check logs
npm run worker 2>&1 | head -50

# Verify API keys
echo $BINANCE_API_KEY
echo $BINANCE_API_SECRET
```

### API Errors

```bash
# Test status
curl http://localhost:3000/api/status

# Test with credentials
curl -v http://localhost:3000/api/status

# Check Binance API
curl -I https://api.binance.com/api/v3/ping
```

### No Balance/Holdings

```bash
# Verify Binance balance
# 1. Go to https://www.binance.com
# 2. Check Spot Wallet for USDT
# 3. Make sure funded

# Wait for first cycle
# Cycles run every 15 minutes
# Wait and refresh dashboard
```

### Permission Denied

```bash
# Fix file permissions
chmod +x worker/tradingWorker.js

# Or reinstall
rm -rf node_modules
npm install
```

---

## 📊 Data Storage

Fund manager menyimpan data di folder `/data/`:

```json
// fund_manager_history.json - Last 500 cycles
[
  {
    "timestamp": "2024-06-09T10:15:30Z",
    "duration": 2500,
    "portfolio": {
      "totalUsd": 1250.45,
      "holdings": {...}
    },
    "trades": [
      {
        "symbol": "BTCUSDT",
        "action": "BUY",
        "success": true
      }
    ],
    "performance": {
      "comparison": {
        "vsIHSG": "+12.5%",
        "vsSP500": "-10.2%"
      }
    }
  }
]

// settings.json - Configuration
{
  "allocationPercent": 70,
  "stablePercent": 30,
  "riskProfile": "balanced",
  "engine": "openclaw",
  "watchlist": ["BTCUSDT", "ETHUSDT", ...]
}
```

---

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail, lihat:

- 📖 **[QUICK_START.md](QUICK_START.md)** - 60-second reference
- 📘 **[SETUP_FUND_MANAGER.md](SETUP_FUND_MANAGER.md)** - Detailed setup
- 📕 **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details
- 📗 **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step verification
- 📙 **[DEPLOYMENT_READY.md](DEPLOYMENT_READY.md)** - Pre-deployment review
- 📓 **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Navigation guide

---

## 🛠️ Teknologi Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Next.js 14 |
| **Backend** | Next.js API Routes + Node.js |
| **Database** | JSON files (file-based) |
| **Real-time Data** | Binance API |
| **AI Engine** | OpenClaw + OpenAI GPT-4 |
| **Charts** | Chart.js + react-chartjs-2 |
| **Process Management** | PM2 (recommended) |

---

## 📋 Requirements

- **Node.js** 18+ (tested on 18, 20)
- **npm** 9+
- **Binance Account** with trading enabled
- **API Keys** dari Binance
- **OpenAI Key** (optional, fallback available)
- **OpenClaw Access** (optional, fallback available)

---

## 📝 License

**Proprietary** - BAZ HOLDING GROUP

---

## 💬 Support

Jika ada masalah atau pertanyaan:

1. Check [TROUBLESHOOTING](#-troubleshooting) section
2. Read relevant documentation file
3. Check system logs: `npm run dev` or `npm run worker`
4. Test API manually: `curl http://localhost:3000/api/status`

---

## ⚠️ Disclaimer

- ⚠️ Trading melibatkan risiko finansial
- ⚠️ Past performance ≠ future results
- ⚠️ Do your own research (DYOR)
- ⚠️ Start dengan small amount
- ⚠️ Never invest more than you can afford to lose
- ⚠️ This is for educational purposes

---

**🚀 Ready to start? Follow [Quick Start](#-quick-start-60-detik) above!**

**Last Updated:** 2024-06-09  
**Version:** BAZ Fund Manager V2  
**Status:** Production Ready ✅
