# 🎯 Portfolio Rebalancing Strategy

## Tujuan
BAZ Fund Manager menggunakan **portfolio rebalancing** untuk mengalahkan semua benchmark target:
- IHSG (Indonesian Stock Index)
- S&P 500 (US Stock Market)
- Gold (Safe Haven Asset)
- Bitcoin (Crypto Leader)
- Top 100 Crypto (Crypto Market Aggregate)
- USD/IDR (Currency Parity)

---

## 🔄 Cara Kerja Rebalancing

### 1. Hitung Current Allocation
Sistem mengecek komposisi portfolio saat ini:
```
Current:
  BTCUSDT: 45.5%
  ETHUSDT: 28.3%
  USDT: 26.2%
```

### 2. Tentukan Target Allocation
Berdasarkan strategi benchmark-beating:
```
Target:
  BTCUSDT: 35%    (50% dari 70% growth)
  ETHUSDT: 21%    (30% dari 70% growth)
  BNBUSDT: 10.5%  (15% dari 70% growth)
  SOLUSDT: 3.5%   (5% dari 70% growth)
  USDT: 30%       (Stable allocation)
```

**Logika:**
- 70% untuk growth assets (crypto yang berpotensi beat benchmark)
- 30% untuk stable assets (USDT untuk safety)

### 3. Deteksi Rebalancing Needs
Bandingkan current vs target dengan threshold 5%:
```
BTCUSDT: Current 45.5% → Target 35% → Deviation +10.5% → ACTION: SELL
ETHUSDT: Current 28.3% → Target 21% → Deviation +7.3% → ACTION: SELL
BNBUSDT: Current 0% → Target 10.5% → Deviation -10.5% → ACTION: BUY
```

### 4. AI Decision on Rebalancing
Sistem mengirim rebalancing needs ke AI untuk validasi:
- OpenClaw atau OpenAI evaluate rebalancing plan
- AI bisa suggest adjustments berdasarkan market conditions
- Fallback: execute rebalancing needs langsung jika AI tidak tersedia

### 5. Execute Rebalancing
Untuk setiap asset yang perlu rebalancing:
- **SELL**: jual porsi yang overweight
- **BUY**: beli untuk mencapai target weight

Contoh eksekusi:
```
SELL BTCUSDT: from $4,550 (45.5%) to $3,500 (35%)
BUY BNBUSDT: from $0 to $1,050 (10.5%)
```

---

## 🎪 Alur Trading Setiap Cycle

### Sebelum Rebalancing Update
```
1. Get portfolio state
2. Fetch market data & benchmarks
3. Calculate portfolio value
4. Compare performance vs benchmarks
```

### New: Rebalancing Phase
```
5. Calculate current allocation
6. Calculate target allocation
7. Detect rebalancing needs (threshold 5%)
8. Get AI decision on rebalancing
9. Execute rebalancing trades
```

### Setelah Rebalancing (Opportunistic Trading)
```
10. Generate opportunistic trading recommendations
11. Execute opportunistic trades
12. Record cycle with both rebalancing & opportunistic trades
```

---

## 📊 Hasil Cycle yang Disimpan

Setiap cycle sekarang mencatat:

```json
{
  "rebalancing": {
    "currentAllocation": { "BTCUSDT": 45.5, "ETHUSDT": 28.3, ... },
    "targetAllocation": { "BTCUSDT": 35, "ETHUSDT": 21, ... },
    "rebalancingNeeds": { "BTCUSDT": { "action": "SELL", "amount": 10.5 }, ... },
    "trades": [...]
  },
  "opportunistic": {
    "recommendation": { ... },
    "trades": [...]
  },
  "trades": [... all trades combined ...]
}
```

---

## 🎯 Kenapa Ini Lebih Baik untuk Beat Benchmark

### Sebelumnya (Hanya Opportunistic Trading)
- Beli asset yang sedang naik
- Tidak ada target komposisi portfolio
- Bisa terjadi overweight di satu asset
- Risiko tinggi jika market crash

### Sekarang (Rebalancing + Opportunistic)
- Maintain target allocation untuk diversifikasi
- Reduce concentration risk
- Konsisten mengalahkan multiple benchmarks
- Lebih stabil dan predictable
- Tetap bisa ambil opportunity trading

---

## 🔧 Konfigurasi

### Allocation Settings (di `.env.local`)
```
ALLOCATION_PERCENT=70      # % untuk growth crypto assets
STABLE_PERCENT=30          # % untuk USDT/stablecoins
RISK_PROFILE=balanced      # balanced|conservative|aggressive
```

### Target Allocation (di `calculateTargetAllocation()`)
```javascript
BTCUSDT: 35%     // 50% dari growth
ETHUSDT: 21%     // 30% dari growth
BNBUSDT: 10.5%   // 15% dari growth
SOLUSDT: 3.5%    // 5% dari growth
USDT: 30%        // Stable
```

Untuk mengubah target, edit logic di `calculateTargetAllocation()`.

---

## 📈 Contoh Skenario

### Skenario 1: Portfolio Sudah Seimbang
```
Current: BTC 35%, ETH 21%, BNB 10.5%, SOL 3.5%, USDT 30%
Target:  BTC 35%, ETH 21%, BNB 10.5%, SOL 3.5%, USDT 30%
Result: No rebalancing needed, proceed to opportunistic trading
```

### Skenario 2: Portfolio Overweight Bitcoin
```
Current: BTC 55%, ETH 20%, BNB 5%, SOL 0%, USDT 20%
Target:  BTC 35%, ETH 21%, BNB 10.5%, SOL 3.5%, USDT 30%
Result: 
  - SELL BTC (55% → 35%)
  - BUY ETH, BNB, SOL to reach targets
  - TOP UP USDT to 30%
```

### Skenario 3: Portfolio Underweight All Growth
```
Current: BTC 20%, ETH 15%, BNB 5%, SOL 2%, USDT 58%
Target:  BTC 35%, ETH 21%, BNB 10.5%, SOL 3.5%, USDT 30%
Result:
  - BUY all growth assets to reach targets
  - REDUCE USDT to 30%
```

---

## 🚀 Next Steps untuk Improvement

1. **Dynamic Target Allocation**: Adjust target weights based on benchmark momentum
2. **Risk Scoring**: Weight allocation by volatility metrics
3. **Sector Rotation**: Rotate between asset categories based on market conditions
4. **ML-based Optimization**: Use machine learning to optimize allocation weights
5. **Benchmark Tracking**: Compare actual vs target for each benchmark separately

