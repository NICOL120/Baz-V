# 🚀 BAZ Fund Manager V2 - Setup & Configuration Guide

## Overview

BAZ Fund Manager V2 adalah sistem **autonomous fund manager** yang mengelola portfolio Anda di Binance dengan tujuan **mengalahkan performa benchmark utama**:

- **IHSG** (Indonesian Stock Index)
- **S&P 500** (US Stock Index)
- **Gold** (Safe Haven Asset)
- **Top 100 Crypto** (Crypto Market Index)
- **Bitcoin** (Leading Cryptocurrency)
- **USD/IDR** (Fiat Currency Parity)

## 🎯 Cara Kerja

### 1. **Autonomous Loop** (Berjalan otomatis setiap 15 menit)
```
Portfolio State Check
    ↓
Fetch Market Data
    ↓
Calculate Portfolio Value
    ↓
Compare vs Benchmarks
    ↓
Generate AI Recommendations
    ↓
Execute Trades Automatically
    ↓
Record Performance Metrics
    ↓
Repeat
```

### 2. **Anda Hanya Perlu**
- ✅ Deposit USDT ke Binance
- ✅ Set Binance API Keys
- ✅ Jalankan worker
- ✅ Monitor dashboard (opsional)

### 3. **Fund Manager yang Menangani**
- 🤖 Memilih asset mana yang akan dibeli/dijual
- 💰 Mengalokasikan dana berdasarkan confidence level
- 📊 Menyeimbangkan portfolio vs benchmarks
- ⚠️ Mengelola risk dan take-profit
- 📈 Optimasi untuk beat performa benchmark

---

## ⚙️ Setup

### Langkah 1: Environment Variables

Buat file `.env.local` di root folder:

```bash
# Binance API (REQUIRED)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_secret

# AI Engine (pilih salah satu atau keduanya)
OPENAI_API_KEY=your_openai_key
USE_OPENCLAW=true

# Worker Configuration
WORKER_INTERVAL_MINUTES=15

# Fund Manager Settings
ENGINE=openclaw  # atau 'openai'
ALLOCATION_PERCENT=70
STABLE_PERCENT=30
RISK_PROFILE=balanced  # aggressive, balanced, conservative
```

### Langkah 2: Install Dependencies

```bash
npm install
```

### Langkah 3: Generate Binance API Key

1. Login ke [Binance](https://www.binance.com)
2. Settings → API Management
3. Create New API Key
4. **Izin yang diperlukan:**
   - Enable Spot Trading
   - Enable Reading Account Trade History
   - Enable User Stream
5. Copy API Key dan Secret ke `.env.local`

### Langkah 4: Cek Portfolio

```bash
# Lihat portfolio status di dashboard
npm run dev

# Atau via API
curl http://localhost:3000/api/status
```

---

## 🚀 Menjalankan Fund Manager

### Option 1: Development (Dashboard + Worker)

```bash
# Terminal 1 - Start Dashboard
npm run dev

# Terminal 2 - Start Fund Manager Worker
npm run worker
```

Akses dashboard di: `http://localhost:3000`

### Option 2: Production (Worker Only)

```bash
npm run build
npm run worker
```

### Option 3: Manual Trigger

```bash
# Trigger satu cycle fund manager
curl -X POST http://localhost:3000/api/trade
```

---

## 📊 Monitoring & Reporting

### API Endpoints

**Status Portfolio:**
```bash
GET /api/status
```

**Fund Manager Data:**
```bash
GET /api/fund-manager?section=summary
GET /api/fund-manager?section=history
GET /api/fund-manager?section=performance
```

**Trigger Manual Cycle:**
```bash
POST /api/trade
```

### Dashboard Features

- 📈 Real-time portfolio value
- 🎯 Performance vs benchmarks
- 📊 Trade history
- 💼 Asset allocation
- ⚠️ Risk metrics

---

## 🧠 Fund Manager Strategy

### How It Works

1. **Data Collection**
   - Fetches real-time prices dari Binance
   - Gets 24h stats (momentum, volume, volatility)
   - Compares dengan 6 benchmark indices

2. **AI Analysis**
   - Menggunakan OpenClaw atau OpenAI GPT-4
   - Evaluasi setiap asset untuk beat benchmarks
   - Generate confidence scores
   - Alokasi percentage untuk setiap position

3. **Trade Execution**
   - Market orders dengan slippage protection
   - Position sizing berdasarkan allocation %
   - Automatic stops dan take-profits
   - Risk management built-in

4. **Performance Tracking**
   - Record setiap cycle ke history
   - Track cumulative performance
   - Compare vs benchmarks
   - Generate metrics

### Risk Management Built-in

- **Position Sizing:** Max 50% allocation per asset
- **Slippage Protection:** Max 1% slippage allowed
- **Stop Loss:** 7-15% based on risk profile
- **Take Profit:** 25-100% based on conviction
- **Rebalancing:** Auto-trigger if allocation drifts >5%

---

## 📈 Expected Performance

### Target Benchmarks

| Benchmark | 1-Year Return | Goal |
|-----------|--------------|------|
| IHSG | ~8.3% | **BEAT** |
| S&P 500 | ~22.5% | **BEAT** |
| Gold | ~8.2% | **BEAT** |
| Bitcoin | ~125.3% | **BEAT** (or exceed) |
| Top 100 Crypto | ~95.5% | **BEAT** (or exceed) |
| USD/IDR | ~2.5% | **BEAT** |

### Portfolio Allocation (Default)

- **70% Growth** → Bitcoin, Ethereum, high-conviction alt coins
- **30% Stable** → USDT reserves for dry powder

### Adjustment Based on Risk Profile

| Setting | Growth % | Stable % | Example |
|---------|----------|----------|---------|
| **Aggressive** | 80% | 20% | High conviction, high risk |
| **Balanced** | 70% | 30% | Mix of growth and safety |
| **Conservative** | 50% | 50% | Defensive, capital preservation |

---

## 🔧 Configuration Options

### Modify Fund Manager Strategy

Edit `.env.local`:

```bash
# Increase growth allocation
ALLOCATION_PERCENT=80
STABLE_PERCENT=20

# More conservative
ALLOCATION_PERCENT=50
STABLE_PERCENT=50

# Faster execution
WORKER_INTERVAL_MINUTES=5

# Slower execution
WORKER_INTERVAL_MINUTES=30

# Use different AI engine
ENGINE=openai  # Switch to OpenAI instead of OpenClaw
```

### Advanced: Watchlist Customization

Edit `lib/fundManagerV2.js`, function `runAutonomousFundManager()`:

```javascript
const watchlist = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT',  // Keep core
  'YOUR_CUSTOM_SYMBOL',             // Add custom
];
```

---

## 🐛 Troubleshooting

### "BINANCE_API_KEY not set"
→ Check `.env.local` file
→ Restart npm run dev/worker

### "OpenClaw/OpenAI failed"
→ Fallback ke internal fund manager logic
→ Check API keys and quotas
→ Monitor logs untuk error details

### "No balance found"
→ Deposit USDT ke Binance account
→ Wait for confirmation
→ Run `/api/status` to refresh

### "Trades not executing"
→ Check Binance account restrictions
→ Verify API permissions
→ Check available balance (gas fees needed)
→ Monitor logs for execution errors

---

## 📊 Database Structure

Fund Manager saves data di folder `/data/`:

```
data/
├── fund_manager_history.json    # Setiap cycle record (limit 500)
├── settings.json                # Settings configuration
└── trades.json                  # Detailed trade records (from V1, legacy)
```

---

## 🔐 Security Best Practices

⚠️ **PENTING:**

1. **NEVER** commit `.env.local` ke git
2. **NEVER** share API keys
3. Use **IP Whitelist** di Binance API settings
4. Enable **2FA** di Binance account
5. Use **separate Binance account** untuk bot
6. Monitor account activity regularly
7. Set **withdrawal restrictions** sebagai safety

---

## 🎓 Learning More

- [Binance API Documentation](https://binance-docs.github.io/apidocs/)
- [OpenAI API Reference](https://platform.openai.com/docs/)
- [Crypto Trading Best Practices](https://www.investopedia.com/crypto)

---

## 📞 Support

Jika ada issues:

1. Check logs: `npm run worker 2>&1 | tee logs.txt`
2. Test API: `curl http://localhost:3000/api/status`
3. Verify environment: `echo $BINANCE_API_KEY`

---

**Good luck! 🚀 Let the fund manager work for you!**
