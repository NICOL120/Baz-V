# 🧠 BAZ Decision Framework - Vision 2.0

**Complete framework for AI decision-making in the BAZ Autonomous Fund Manager.**

---

## Core Philosophy

The BAZ decision framework is built on **professional fund manager logic**, not daily trader tactics.

### Decision Principles

```
1. NOT ALL CYCLES PRODUCE TRADES
   • Holding cash is a valid investment decision
   • Doing nothing is a valid investment decision
   • Passing on trades protects capital

2. PROBABILITY FIRST
   • Only trade when P(Success) > 55%
   • Require Risk/Reward ratio > 1.5:1
   • Never chase low-probability opportunities

3. BENCHMARK AWARE
   • Every trade must contribute to beating benchmarks
   • If trade doesn't help beat benchmarks → skip it
   • Portfolio must outperform across multiple benchmarks

4. TRANSPARENT REASONING
   • Every decision is documented
   • AI must explain "why" not just "what"
   • Users understand the logic

5. LONG-TERM FOCUS
   • Optimize for 1-year+ performance
   • Accept short-term volatility
   • Focus on real wealth growth
```

---

## Decision Framework Architecture

### Level 1: Macro Environment Analysis

**Input:** Global economic and market conditions  
**Output:** Risk On/Off determination + allocation guidance

```
┌──────────────────────────────────────────────────────┐
│ MACRO ENVIRONMENT ANALYSIS                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Check 1: Economic Indicators                        │
│ ├─ Fed Fund Rate & Policy Direction                │
│ ├─ Inflation data & expectations                   │
│ ├─ Employment data                                 │
│ ├─ GDP growth & forecasts                          │
│ └─ Credit conditions                               │
│                                                      │
│ Check 2: Global Liquidity                          │
│ ├─ Central bank balance sheets                     │
│ ├─ Money supply trends                             │
│ ├─ Interbank lending rates                         │
│ ├─ Credit spreads                                  │
│ └─ Yield curve shape                               │
│                                                      │
│ Check 3: Risk Sentiment                            │
│ ├─ VIX Index (Volatility)                          │
│ ├─ MOVE Index (Bond volatility)                    │
│ ├─ Credit default swaps                            │
│ ├─ Risk asset performance                          │
│ └─ Safe haven flows                                │
│                                                      │
│ Check 4: Systemic Risk                             │
│ ├─ Banking sector health                           │
│ ├─ Geopolitical events                             │
│ ├─ Energy/commodity prices                         │
│ ├─ Currency stability                              │
│ └─ Black swan probabilities                        │
│                                                      │
│ OUTPUT DECISION:                                    │
│ ├─ Risk Status: ON / NEUTRAL / OFF                │
│ ├─ Allocation Guidance:                            │
│ │  • Risk ON: 80% growth, 20% stable             │
│ │  • NEUTRAL: 60% growth, 40% stable             │
│ │  • Risk OFF: 30% growth, 70% stable            │
│ │  • EXTREME: 10% growth, 90% stable             │
│ ├─ Tactical Changes: YES / NO                     │
│ └─ Confidence: 60-95%                             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Level 2: Crypto Market Cycle Analysis

**Input:** Crypto market structure and cycle phase  
**Output:** Market phase identification + tactical positioning

```
┌──────────────────────────────────────────────────────┐
│ CRYPTO MARKET CYCLE ANALYSIS                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Data Collection:                                    │
│ ├─ Bitcoin Price & Dominance                       │
│ ├─ Altcoin Performance Distribution                │
│ ├─ Stablecoin Flows (In/Out)                       │
│ ├─ Trading Volume Trends                           │
│ ├─ Leverage & Funding Rates                        │
│ ├─ Options Market Signals                          │
│ └─ Long/Short Ratio                                │
│                                                      │
│ Market Cycle Scoring (0-100):                      │
│                                                      │
│ 🟢 EARLY BULL (0-20 accumulation phase)           │
│    • BTC dominance: Stabilizing/Rising             │
│    • Altcoin: Underperforming BTC                  │
│    • Volume: Recovering from lows                  │
│    • Sentiment: Fear/Indifference                  │
│    • Positioning: Long setup building              │
│    • Action: Begin accumulating high-quality       │
│                                                      │
│ 🟡 MID BULL (40-60 strong uptrend)                 │
│    • BTC dominance: Stable or declining            │
│    • Altcoin: Strong performance                   │
│    • Volume: High and growing                      │
│    • Sentiment: Greed emerging                     │
│    • Positioning: Longs heavily established        │
│    • Action: Hold core, selective increases        │
│                                                      │
│ 🔴 LATE BULL (70-80 euphoria)                      │
│    • BTC dominance: Declining rapidly              │
│    • Altcoin: Explosive, parabolic                 │
│    • Volume: Extreme & unsustainable               │
│    • Sentiment: Euphoria/FOMO                      │
│    • Positioning: Overleveraged longs              │
│    • Action: Begin profit taking                   │
│                                                      │
│ 🔵 EARLY BEAR (60-40 momentum loss)                │
│    • BTC dominance: Rising                         │
│    • Altcoin: Declining faster than BTC            │
│    • Volume: Declining from peaks                  │
│    • Sentiment: Caution/Fear                       │
│    • Positioning: Margin calls begin               │
│    • Action: Reduce risk, move to BTC/USDT        │
│                                                      │
│ ⚫ CAPITULATION (20-0 panic)                        │
│    • BTC dominance: Very high (>60%)               │
│    • Altcoin: Down 70-90% from peaks               │
│    • Volume: Low, one-way selling                  │
│    • Sentiment: Fear/Despair                       │
│    • Positioning: Longs liquidated                 │
│    • Action: Hold cash, scan for value             │
│                                                      │
│ 🟣 ACCUMULATION (0-20 base building)               │
│    • BTC dominance: Stabilizing high               │
│    • Altcoin: Dead (no buyers)                     │
│    • Volume: Very low                              │
│    • Sentiment: Desperation                        │
│    • Positioning: Capitulation flush               │
│    • Action: Accumulate best assets                │
│                                                      │
│ OUTPUT DECISION:                                    │
│ ├─ Current Phase: [PHASE]                         │
│ ├─ Confidence: 70-95%                             │
│ ├─ Trend Duration Estimate: X days                │
│ ├─ Tactical Positioning:                          │
│ │  • Growth exposure: [XX%]                       │
│ │  • Cash reserve: [XX%]                          │
│ │  • Asset focus: [Narrative]                     │
│ ├─ Key Reversal Signals: [List]                   │
│ └─ Next Phase Probability: [XX%]                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Level 3: Sentiment & On-Chain Analysis

**Input:** Market sentiment from multiple sources  
**Output:** Conviction level + timing signals

```
┌──────────────────────────────────────────────────────┐
│ SENTIMENT & ON-CHAIN ANALYSIS                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Sentiment Vectors (Each 0-100):                     │
│                                                      │
│ 📱 Social Sentiment:                               │
│    ├─ Twitter/X mentions & sentiment               │
│    ├─ Reddit discussions & mood                    │
│    ├─ Google search trends                         │
│    ├─ Media coverage & tone                        │
│    └─ Influencer positioning                       │
│    → Weighted Score: [XX/100]                      │
│                                                      │
│ ⛓️ On-Chain Signals:                               │
│    ├─ Exchange inflows vs outflows                 │
│    ├─ Whale transaction patterns                   │
│    ├─ Active addresses & transactions              │
│    ├─ Realized price & MVRV ratio                  │
│    ├─ Long-term holder accumulation                │
│    └─ Exchange reserve changes                     │
│    → Weighted Score: [XX/100]                      │
│                                                      │
│ 🎯 Technical Sentiment:                            │
│    ├─ RSI (Overbought/Oversold)                    │
│    ├─ MACD & Moving averages                       │
│    ├─ Support/Resistance levels                    │
│    ├─ Volume profile & POC                         │
│    └─ Divergence signals                           │
│    → Weighted Score: [XX/100]                      │
│                                                      │
│ 💰 Futures/Derivatives:                            │
│    ├─ Funding rates (positive/negative)            │
│    ├─ Long/Short ratio on exchanges                │
│    ├─ Open Interest trends                         │
│    ├─ Options implied volatility                   │
│    └─ Put/Call ratios                              │
│    → Weighted Score: [XX/100]                      │
│                                                      │
│ 🎲 Institutional Positioning:                      │
│    ├─ Grayscale/Coinbase flows                     │
│    ├─ GBTC premium/discount                        │
│    ├─ CME futures open interest                    │
│    ├─ ETF inflows/outflows                         │
│    └─ Large wallet movements                       │
│    → Weighted Score: [XX/100]                      │
│                                                      │
│ AGGREGATED SENTIMENT SCORE:                        │
│ (Weighted average of above)                        │
│                                                      │
│ 🟢 VERY BULLISH (75-100):                         │
│    → Increase allocation, add to winners            │
│    → Confidence: +15%                              │
│                                                      │
│ 🟡 BULLISH (50-75):                               │
│    → Neutral stance, hold positions                │
│    → Confidence: +10%                              │
│                                                      │
│ ⚪ NEUTRAL (40-60):                                │
│    → Wait for clarity, hold cash                   │
│    → Confidence: 0%                                │
│                                                      │
│ 🔴 BEARISH (25-50):                               │
│    → Reduce exposure, take profits                 │
│    → Confidence: -10%                              │
│                                                      │
│ ⚫ VERY BEARISH (0-25):                            │
│    → Defensive positions, max cash                 │
│    → Confidence: -15%                              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Level 4: Fundamental Analysis

**Input:** Project fundamentals and quality scores  
**Output:** Asset ranking and quality assessment

```
┌──────────────────────────────────────────────────────┐
│ FUNDAMENTAL ANALYSIS                                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│ For Each Asset (Score 1-100):                      │
│                                                      │
│ 📊 NETWORK HEALTH (20 points)                      │
│    ├─ Active addresses: [XX/20]                    │
│    ├─ Transaction volume: [XX/20]                  │
│    ├─ Network growth rate: [XX/20]                 │
│    └─ Daily active users: [XX/20]                  │
│    → Subtotal: [XX/80]                             │
│                                                      │
│ 💰 TOKENOMICS (15 points)                          │
│    ├─ Emission schedule quality: [XX/15]           │
│    ├─ Vesting period health: [XX/15]               │
│    ├─ Holder distribution: [XX/15]                 │
│    └─ Inflation rate: [XX/15]                      │
│    → Subtotal: [XX/60]                             │
│                                                      │
│ 💵 REVENUE & ECONOMICS (20 points)                │
│    ├─ Protocol revenue: [XX/20]                    │
│    ├─ Fee mechanics: [XX/20]                       │
│    ├─ Token utility: [XX/20]                       │
│    └─ Revenue growth: [XX/20]                      │
│    → Subtotal: [XX/80]                             │
│                                                      │
│ 🏗️ ECOSYSTEM (15 points)                           │
│    ├─ Developer activity: [XX/15]                  │
│    ├─ dApps & usage: [XX/15]                       │
│    ├─ Partnerships: [XX/15]                        │
│    └─ Ecosystem growth: [XX/15]                    │
│    → Subtotal: [XX/60]                             │
│                                                      │
│ 🔐 SECURITY (15 points)                            │
│    ├─ Network validation: [XX/15]                  │
│    ├─ Audit history: [XX/15]                       │
│    ├─ Hack history: [XX/15]                        │
│    └─ Code quality: [XX/15]                        │
│    → Subtotal: [XX/60]                             │
│                                                      │
│ 🏢 ADOPTION (15 points)                            │
│    ├─ Institutional support: [XX/15]               │
│    ├─ Exchange listings: [XX/15]                   │
│    ├─ Regulatory clarity: [XX/15]                  │
│    └─ User growth rate: [XX/15]                    │
│    → Subtotal: [XX/60]                             │
│                                                      │
│ TOTAL FUNDAMENTAL SCORE: [XX/100]                  │
│                                                      │
│ Interpretation:                                     │
│ ├─ 85-100: Excellent (Core holding quality)       │
│ ├─ 70-85:  Good (Secondary/Supporting)            │
│ ├─ 55-70:  Fair (Tactical/Narrative play)         │
│ ├─ 40-55:  Poor (Speculation only)                │
│ └─ 0-40:   Avoid (Too risky)                      │
│                                                      │
│ WEIGHTED PORTFOLIO DISTRIBUTION:                    │
│ ├─ 85+: 50% max allocation                        │
│ ├─ 70-85: 25% max allocation                      │
│ ├─ 55-70: 15% max allocation                      │
│ ├─ 40-55: 7% max allocation                       │
│ └─ 0-40: 0% (Not eligible)                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Decision Execution Gate

All trades must pass through this gate before execution:

```
┌──────────────────────────────────────────────────────┐
│ EXECUTION GATE - FINAL CHECK                         │
└──────────────────────────────────────────────────────┘

GATE 1: PROBABILITY ANALYSIS
├─ Historical win rate for similar setups: [XX%]
├─ AI model confidence: [XX%]
├─ Combined probability: [XX%]
└─ REQUIREMENT: > 55% → ✅ / ❌ FAIL

GATE 2: RISK/REWARD RATIO
├─ Expected upside: [XX%]
├─ Expected downside: [XX%]
├─ Risk/Reward ratio: [XX:1]
└─ REQUIREMENT: > 1.5:1 → ✅ / ❌ FAIL

GATE 3: PORTFOLIO RISK
├─ Current max drawdown: [XX%]
├─ Projected drawdown after trade: [XX%]
├─ Tolerance limit: 25%
└─ REQUIREMENT: Within limit → ✅ / ❌ FAIL

GATE 4: DIVERSIFICATION
├─ Current position: [XX%]
├─ Would be after trade: [XX%]
├─ Max position limit: 20%
└─ REQUIREMENT: Within limit → ✅ / ❌ FAIL

GATE 5: CORRELATION CHECK
├─ Correlation with portfolio: [XX]
├─ Diversification benefit: [XX%]
└─ REQUIREMENT: Not increasing correlation → ✅ / ❌ FAIL

GATE 6: BENCHMARK CONTRIBUTION
├─ Trade helps beat which benchmarks? [List]
├─ Trade hurts which benchmarks? [List]
├─ Net benchmark impact: [POSITIVE/NEGATIVE/NEUTRAL]
└─ REQUIREMENT: Positive or neutral → ✅ / ❌ FAIL

GATE 7: ALLOCATION GUIDANCE
├─ Macro phase allocation: [XX%]
├─ Current allocation: [XX%]
├─ Trade alignment: [ALIGNED/MISALIGNED]
└─ REQUIREMENT: Aligned → ✅ / ❌ FAIL

IF ALL GATES PASS:
├─ Probability: ✅
├─ Risk/Reward: ✅
├─ Portfolio Risk: ✅
├─ Diversification: ✅
├─ Correlation: ✅
├─ Benchmark: ✅
├─ Allocation: ✅
→ EXECUTE TRADE

IF ANY GATE FAILS:
→ PASS (No trade - this is a valid decision)
```

---

## Trade Sizing Algorithm

For approved trades:

```
BASE POSITION SIZE = Portfolio Value × Allocation %

Example (Conservative):
├─ Portfolio: $1,000
├─ Allocation for new trades: 10%
├─ Base size: $100

CONFIDENCE SCALING:
├─ HIGH (>70%): 100% of base size = $100
├─ MEDIUM (50-70%): 50% of base size = $50
├─ LOW (40-50%): 25% of base size = $25

MAXIMUM RISK CONSTRAINT:
├─ No single trade > 2% portfolio risk
├─ Example: $1,000 portfolio = max $20 risk
├─ If stop-loss at 10%, max position = $200

FINAL POSITION SIZE:
= Min(Confidence Scaled Size, Risk Constraint)
```

---

## Stop-Loss & Take-Profit Logic

```
FOR EACH TRADE:

ENTRY: 
├─ Market order (immediate execution)
├─ Record entry price and time
└─ Calculate stop-loss and take-profit

STOP-LOSS (Protective):
├─ By Risk Profile:
│  ├─ Conservative: -7%
│  ├─ Balanced: -10%
│  └─ Aggressive: -15%
│
├─ By Market Phase:
│  ├─ Strong Bull: -7% (easier to recover)
│  ├─ Late Bull: -8% (caution rising)
│  ├─ Early Bear: -10% (more volatility)
│  ├─ Late Bear: -12% (noise higher)
│  └─ Capitulation: -15% (protect capital)
│
└─ AUTOMATIC EXECUTION:
   When price hits stop-loss → Sell immediately

TAKE-PROFIT (Opportunistic):
├─ By Conviction Level:
│  ├─ HIGH conviction: +50-100%
│  ├─ MEDIUM conviction: +25-50%
│  └─ LOW conviction: +10-25%
│
├─ By Market Phase:
│  ├─ Strong Bull: +75-100% (plenty of room)
│  ├─ Late Bull: +25-50% (take profits rising)
│  ├─ Early Bear: +15-25% (market turns fast)
│  ├─ Late Bear: +8-15% (any win is good)
│  └─ Capitulation: +10-20% (best entries)
│
└─ AUTOMATIC EXECUTION:
   When price hits take-profit → Sell immediately

TRAILING STOP:
├─ After +20% gain: Trail at -5%
├─ After +50% gain: Trail at -10%
├─ After +100% gain: Trail at -15%
├─ Locks in gains while giving room for more
└─ Executes on first close below trail

MANUAL OVERRIDE:
├─ Can close partially at any price
├─ Can adjust stop-loss (only to better levels)
├─ Can adjust take-profit (only to better levels)
├─ Cannot force a losing position to stay open
```

---

## Rebalancing Strategy

```
QUARTERLY REBALANCING:
Every 90 days, review and rebalance portfolio

TACTICAL REBALANCING:
├─ When any asset > 25% → Trim to 20%
├─ When cash < 20% → Reduce growth exposure
├─ When cash > 50% → Increase growth exposure
├─ When correlation > 0.8 → Diversify

BENCHMARK REBALANCING:
├─ If lagging all benchmarks → Increase risk
├─ If beating all benchmarks → Maintain course
├─ If mixed results → Focus on underperformers
├─ Review quarterly and adjust allocation

PHASE-BASED REBALANCING:
├─ Bull Market → 70-80% growth allocation
├─ Late Bull → 50-60% growth allocation
├─ Bear Market → 20-40% growth allocation
├─ Capitulation → 10-20% growth allocation
```

---

## Example: Complete Decision Cycle

```
CYCLE #52 - BUY ETHEREUM

1. MACRO CHECK:
   ├─ Fed: Dovish signals
   ├─ Liquidity: Abundant
   ├─ Risk Status: ON
   ├─ VIX: 15 (Low)
   └─ Result: ✅ Supportive for risk-on

2. CRYPTO CYCLE:
   ├─ BTC Dominance: 42% (Declining)
   ├─ Altcoins: Strong performance
   ├─ Stablecoins: Large inflows
   ├─ Phase: Mid Bull (Score: 65/100)
   └─ Result: ✅ Favorable for altcoins

3. SENTIMENT:
   ├─ On-chain: Bullish (Whale buying)
   ├─ Social: Bullish (Growing mentions)
   ├─ Futures: Neutral (Balanced longs)
   ├─ Aggregated Score: 72/100
   └─ Result: ✅ Bullish

4. FUNDAMENTAL:
   ├─ ETH Network: Very healthy
   ├─ DeFi TVL: Growing +8% MoM
   ├─ Developer activity: Strong
   ├─ Score: 78/100
   └─ Result: ✅ Quality asset

5. DECISION MATRIX:
   ├─ Macro: +15 points
   ├─ Technical: +18 points
   ├─ Sentiment: +15 points
   ├─ Fundamental: +16 points
   └─ Total: 80/100 (STRONG SIGNAL)

6. PROBABILITY ANALYSIS:
   ├─ Historical accuracy: 68%
   ├─ Model confidence: 75%
   ├─ Combined: 72% (HIGH)
   └─ Gate 1: ✅ PASS (>55%)

7. RISK/REWARD:
   ├─ Entry: $3,000
   ├─ Stop-loss: -10% = $2,700
   ├─ Take-profit: +50% = $4,500
   ├─ Ratio: 3:1
   └─ Gate 2: ✅ PASS (>1.5:1)

8. PORTFOLIO RISK:
   ├─ Current DD: -5%
   ├─ After trade: -7%
   ├─ Limit: 25%
   └─ Gate 3: ✅ PASS

9. DIVERSIFICATION:
   ├─ Current position: 32%
   ├─ After trade: 40%
   ├─ Limit: 20%
   └─ Gate 4: ❌ FAIL

RESULT: ONE GATE FAILED → POSITION SIZE REDUCED

Adjusted Decision:
├─ Full position would violate diversification
├─ Reduce to maintain 20% max per asset
├─ New position: $400 (instead of $700)
├─ Ratio: 1.5:1 (still acceptable)
└─ EXECUTE: Buy 0.13 ETH

TRADE EXECUTED:
├─ Entry: $3,001
├─ Amount: $400
├─ Quantity: 0.133 ETH
├─ Stop-loss: -10% ($2,701)
├─ Take-profit: +50% ($4,501)
├─ Reason: "Mid-bull altseason + DeFi recovery"
├─ Confidence: 72%
└─ Timestamp: 2026-06-09 14:35:00 UTC
```

---

## Performance Monitoring

After trade execution, AI continuously monitors:

```
DAILY MONITORING:
├─ Price vs Entry & targets
├─ Portfolio drawdown
├─ Benchmark performance
├─ Market cycle changes
└─ Risk parameter changes

WEEKLY REVIEW:
├─ Trade performance vs expectations
├─ Win rate tracking
├─ Benchmark comparison
├─ Risk metrics
└─ Strategy adjustments

MONTHLY REVIEW:
├─ Performance vs benchmarks
├─ Portfolio rebalancing needs
├─ Strategy effectiveness
├─ Risk profile assessment
└─ Parameters adjustment

QUARTERLY REVIEW:
├─ Complete strategy review
├─ Benchmark beating analysis
├─ Risk model validation
├─ Market cycle assessment
├─ Allocation changes
└─ Long-term goal progress
```

---

**Decision Framework Version:** 2.0 (Vision 2.0)  
**Status:** Complete & Production Ready  
**Last Updated:** 2026-06-09
