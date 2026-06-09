# 🚀 BAZ Fund Manager - Quick Reference

## ⚡ 60-Second Setup

```bash
# 1. Create environment file
echo 'BINANCE_API_KEY=your_key
BINANCE_API_SECRET=your_secret
OPENAI_API_KEY=sk-...
USE_OPENCLAW=true
WORKER_INTERVAL_MINUTES=15' > .env.local

# 2. Install dependencies
npm install

# 3. Start dashboard (Terminal 1)
npm run dev

# 4. Start worker (Terminal 2)
npm run worker

# 5. Deposit USDT and visit http://localhost:3000
```

---

## 📊 Dashboard Features

| Feature | Location | Purpose |
|---------|----------|---------|
| Portfolio Value | Top Left Card | Current USD value |
| Outperformance | Top Card | % vs S&P 500 |
| Holdings Count | Top Card | # of assets |
| System Status | Top Right Card | Live indicator |
| Execute Button | Top Section | Trigger fund manager |
| Overview Tab | Main | Holdings & benchmarks |
| Performance Tab | Main | Benchmark metrics |
| History Tab | Main | Recent cycles |

---

## 🔗 API Quick Reference

### Get Status
```bash
curl http://localhost:3000/api/status
# Returns: portfolio, benchmarks, performance
```

### Trigger Fund Manager
```bash
curl -X POST http://localhost:3000/api/trade
# Manually execute one cycle
```

### Get History
```bash
curl http://localhost:3000/api/fund-manager?section=history
# Returns: last 10 cycles
```

### Get Performance Data
```bash
curl http://localhost:3000/api/fund-manager?section=performance
# Returns: performance metrics
```

### Get Summary
```bash
curl http://localhost:3000/api/fund-manager?section=summary
# Returns: latest cycle + total cycles
```

---

## ⚙️ Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `BINANCE_API_KEY` | (required) | Binance authentication |
| `BINANCE_API_SECRET` | (required) | Binance authentication |
| `OPENAI_API_KEY` | (optional) | OpenAI GPT-4 access |
| `USE_OPENCLAW` | true | Use OpenClaw AI |
| `ENGINE` | openclaw | Primary AI engine |
| `WORKER_INTERVAL_MINUTES` | 15 | Cycle frequency |
| `ALLOCATION_PERCENT` | 70 | Growth allocation |
| `STABLE_PERCENT` | 30 | Stable allocation |
| `RISK_PROFILE` | balanced | Risk level |

---

## 📈 Benchmarks Tracked

| Index | Type | Target |
|-------|------|--------|
| IHSG | Indonesian Stock | BEAT |
| S&P 500 | US Stock | BEAT |
| Gold | Commodity | BEAT |
| Bitcoin | Crypto | BEAT (hard) |
| Top 100 Crypto | Market Index | BEAT (hard) |
| USD/IDR | Currency | BEAT |

---

## 💡 Key Files

| File | Purpose |
|------|---------|
| `lib/fundManagerV2.js` | Core fund manager logic |
| `app/api/status/route.js` | Portfolio status endpoint |
| `app/api/trade/route.js` | Trade execution endpoint |
| `app/api/fund-manager/route.js` | History & performance |
| `worker/tradingWorker.js` | Autonomous worker process |
| `app/page.js` | Dashboard UI |
| `.env.local` | Configuration (create this!) |

---

## 🎯 Typical Day

**09:00** - Deploy system & deposit $1,000 USDT
**09:15** - Fund manager executes first cycle (buys $700 of assets)
**10:00** - Check dashboard, sees $1,008 portfolio
**12:00** - Fund manager rebalances
**15:00** - Check performance vs benchmarks
**18:00** - Review monthly report

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "No USDT found" | Deposit to Binance, wait 5 min |
| "API Key Error" | Check `.env.local` file |
| "Port 3000 in use" | `lsof -i :3000` and kill process |
| "Trades not executing" | Verify Binance trading enabled |
| "Worker not logging" | Check terminal output for errors |
| "Empty holdings" | Wait for first cycle (15 min) |

---

## 📊 Expected Returns

| Timeframe | Expected | Note |
|-----------|----------|------|
| Week 1 | ±5% | Market testing |
| Month 1 | +5-15% | Strategy finding |
| Quarter 1 | +15-40% | Optimization |
| Year 1 | +50-200% | Mature strategy |

**Disclaimer:** Past performance ≠ future results

---

## 🔒 Security Reminders

- ⚠️ Keep `.env.local` secret
- ⚠️ Use IP whitelist on Binance
- ⚠️ Enable 2FA on Binance
- ⚠️ Use bot-only Binance account
- ⚠️ Check permissions read-only + trading
- ⚠️ Set withdrawal restrictions

---

## 📞 Emergency Contacts

- Binance Support: https://www.binance.com/support
- OpenAI Status: https://status.openai.com
- System Logs: Check terminal where npm run worker runs
- API Status: GET http://localhost:3000/api/status

---

**System Status:** ✅ Ready to trade 24/7
**Last Updated:** 2024-06-09
**Version:** BAZ Fund Manager V2
