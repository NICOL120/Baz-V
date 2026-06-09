/**
 * 🤖 BAZ Fund Manager V2 - Vision 2.0
 * 
 * Professional Autonomous Crypto Fund Manager
 * Implements institutional fund manager logic with AI decision gates
 * 
 * Philosophy:
 * - NOT a trading bot (trades daily)
 * - IS a fund manager (beats benchmarks long-term)
 * - Only executes high-confidence opportunities
 * - Every decision is logged with complete reasoning
 */

const fs = require('fs').promises;
const path = require('path');
const { getBinanceClient } = require('./binance');
const { getOpenAIClient } = require('./openai');
const { getOpenClawResponse } = require('./openclaw');

const dataRoot = path.join(process.cwd(), 'data');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function readJSON(file, fallback = {}) {
  try {
    const raw = await fs.readFile(path.join(dataRoot, file), 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

async function writeJSON(file, data) {
  await fs.mkdir(dataRoot, { recursive: true });
  await fs.writeFile(path.join(dataRoot, file), JSON.stringify(data, null, 2), 'utf8');
}

// ============================================================================
// PORTFOLIO MANAGEMENT
// ============================================================================

async function getPortfolioState() {
  try {
    const binance = getBinanceClient();
    const account = await binance.accountInfo();
    
    const balances = account.balances
      .filter((item) => Number(item.free) + Number(item.locked) > 0)
      .map((item) => ({
        asset: item.asset,
        free: Number(item.free),
        locked: Number(item.locked),
        total: Number(item.free) + Number(item.locked),
      }));

    return { balances, account };
  } catch (error) {
    console.error('Error getting portfolio state:', error.message);
    return { balances: [], account: null };
  }
}

async function calculatePortfolioValue(balances, priceMap = {}) {
  let totalUsd = 0;
  const holdings = {};

  for (const balance of balances) {
    const symbol = balance.asset === 'USDT' ? 'USDT' : balance.asset + 'USDT';
    const price = priceMap[symbol] || (balance.asset === 'USDT' ? 1 : 0);
    const value = balance.total * price;
    
    if (value > 0) {
      totalUsd += value;
      holdings[symbol] = {
        asset: balance.asset,
        quantity: balance.total,
        price,
        value: Number(value.toFixed(2)),
        percent: 0,
      };
    }
  }

  Object.values(holdings).forEach(h => {
    h.percent = totalUsd > 0 ? Number((h.value / totalUsd * 100).toFixed(2)) : 0;
  });

  return {
    totalUsd: Number(totalUsd.toFixed(2)),
    holdings,
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================================================
// MARKET DATA FETCHING
// ============================================================================

async function fetchMarketData(symbols) {
  try {
    const binance = getBinanceClient();
    const prices = await binance.prices({ symbols });
    
    const results = {};
    for (const symbol of symbols) {
      results[symbol] = Number(prices[symbol] || 0);
    }
    return results;
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    return {};
  }
}

async function fetch24HourStats(symbols) {
  try {
    const binance = getBinanceClient();
    const stats = await Promise.all(
      symbols.map(symbol => binance.dailyStats({ symbol }))
    );
    
    const result = {};
    stats.forEach((stat, idx) => {
      result[symbols[idx]] = {
        currentPrice: Number(stat.lastPrice),
        high24h: Number(stat.high),
        low24h: Number(stat.low),
        volume24h: Number(stat.volume),
        volumeUsd24h: Number(stat.quoteAssetVolume),
        priceChangePercent24h: Number(stat.priceChangePercent),
      };
    });
    return result;
  } catch (error) {
    console.error('Error fetching 24h stats:', error.message);
    return {};
  }
}

async function fetchYahooFinanceQuotes(symbols) {
  try {
    const endpoint = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(','))}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const result = {};

    (data.quoteResponse?.result || []).forEach((quote) => {
      result[quote.symbol] = {
        currentPrice: quote.regularMarketPrice || 0,
        change24h: quote.regularMarketChangePercent || 0,
        change7d: quote.priceChangePercent || 0,
        change1y: quote.fiftyTwoWeekChange || 0,
      };
    });

    return result;
  } catch (error) {
    console.error('Error fetching Yahoo Finance:', error.message);
    return {};
  }
}

async function fetchCoingeckoTop100Index() {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) return null;

    let totalMarketCap = 0;
    let weightedChange24h = 0;

    data.forEach((item) => {
      const cap = item.market_cap || 0;
      totalMarketCap += cap;
      weightedChange24h += (item.price_change_percentage_24h_in_currency || 0) * cap;
    });

    return {
      currentPrice: Number((totalMarketCap / 1_000_000_000).toFixed(2)),
      change24h: totalMarketCap > 0 ? Number((weightedChange24h / totalMarketCap).toFixed(2)) : 0,
    };
  } catch (error) {
    console.error('Error fetching CoinGecko:', error.message);
    return null;
  }
}

async function fetchBenchmarkData() {
  const yahooSymbols = ['^JKSE', '^GSPC', 'GC=F', 'BTC-USD', 'IDR=X'];
  const yahooData = await fetchYahooFinanceQuotes(yahooSymbols);
  const top100Data = await fetchCoingeckoTop100Index();

  return {
    IHSG: {
      name: 'Indonesian Stock Index',
      change24h: yahooData['^JKSE']?.change24h || 0,
    },
    'S&P500': {
      name: 'US Stock Index',
      change24h: yahooData['^GSPC']?.change24h || 0,
    },
    GOLD: {
      name: 'Gold (XAUUSD)',
      change24h: yahooData['GC=F']?.change24h || 0,
    },
    BTC: {
      name: 'Bitcoin',
      change24h: yahooData['BTC-USD']?.change24h || 0,
    },
    TOP100CRYPTO: {
      name: 'Top 100 Crypto Index',
      change24h: top100Data?.change24h || 0,
    },
    USD: {
      name: 'USD/IDR Parity',
      change24h: yahooData['IDR=X']?.change24h || 0,
    },
  };
}

// ============================================================================
// BENCHMARK & PERFORMANCE ANALYSIS
// ============================================================================

async function getBaselinePortfolioValue() {
  const history = await readJSON('fund_manager_history.json', []);
  if (Array.isArray(history) && history.length > 0) {
    return Number(history[history.length - 1]?.portfolio?.totalUsd || 0);
  }
  return 0;
}

async function comparePerformance(portfolioValue, initialValue = 0) {
  const benchmarks = await fetchBenchmarkData();
  let baseline = initialValue;
  if (baseline <= 0) {
    baseline = await getBaselinePortfolioValue();
  }

  const portfolioReturn = baseline > 0
    ? ((portfolioValue - baseline) / baseline * 100).toFixed(2)
    : 0;

  return {
    portfolio: {
      value: portfolioValue,
      return: portfolioReturn,
      baselineValue: baseline,
    },
    benchmarks,
    comparison: {
      vsIHSG: (Number(portfolioReturn) - benchmarks.IHSG.change24h).toFixed(2),
      vsSP500: (Number(portfolioReturn) - benchmarks['S&P500'].change24h).toFixed(2),
      vsGold: (Number(portfolioReturn) - benchmarks.GOLD.change24h).toFixed(2),
      vsBTC: (Number(portfolioReturn) - benchmarks.BTC.change24h).toFixed(2),
      vsTop100Crypto: (Number(portfolioReturn) - benchmarks.TOP100CRYPTO.change24h).toFixed(2),
      vsUSD: (Number(portfolioReturn) - benchmarks.USD.change24h).toFixed(2),
    },
  };
}

// ============================================================================
// MARKET ANALYSIS & PHASE DETECTION
// ============================================================================

function analyzeMarketPhase(marketStats, benchmarks) {
  /**
   * Determine current market cycle phase
   * Returns: phase, confidence, allocation_guidance
   */
  
  const btcStats = marketStats['BTCUSDT'] || {};
  const btcChange = btcStats.priceChangePercent24h || 0;
  
  // Count positive vs negative assets
  const positiveCounts = Object.values(marketStats).filter(s => s.priceChangePercent24h > 0).length;
  const totalCounts = Object.keys(marketStats).length;
  const percentPositive = totalCounts > 0 ? (positiveCounts / totalCounts) * 100 : 50;
  
  let phase = 'neutral';
  let confidence = 50;
  let allocation = 60;
  
  // Bull market indicators
  if (btcChange > 5 && percentPositive > 70) {
    phase = 'strong-bull';
    confidence = 75;
    allocation = 85;
  } else if (btcChange > 2 && percentPositive > 60) {
    phase = 'mid-bull';
    confidence = 70;
    allocation = 70;
  } else if (btcChange > 0 && percentPositive > 50) {
    phase = 'early-bull';
    confidence = 60;
    allocation = 70;
  }
  
  // Bear market indicators
  else if (btcChange < -5 && percentPositive < 30) {
    phase = 'capitulation';
    confidence = 75;
    allocation = 20;
  } else if (btcChange < -2 && percentPositive < 40) {
    phase = 'bear';
    confidence = 70;
    allocation = 40;
  }
  
  return { phase, confidence, allocation };
}

// ============================================================================
// AI DECISION FRAMEWORK
// ============================================================================

function buildDecisionPrompt(portfolio, marketStats, benchmarks, marketPhase, settings) {
  const holdingsText = Object.entries(portfolio.holdings)
    .map(([sym, h]) => `${sym}: ${h.quantity} units @ $${h.price} = $${h.value}`)
    .join('\n');

  return `You are BAZ - an autonomous institutional fund manager.

MANDATE: Beat these benchmarks:
- IHSG: ${benchmarks.IHSG.change24h}%
- S&P 500: ${benchmarks['S&P500'].change24h}%
- Gold: ${benchmarks.GOLD.change24h}%
- Bitcoin: ${benchmarks.BTC.change24h}%
- Top 100 Crypto: ${benchmarks.TOP100CRYPTO.change24h}%

CURRENT PORTFOLIO ($${portfolio.totalUsd}):
${holdingsText || 'USDT only'}

MARKET PHASE: ${marketPhase.phase} (${marketPhase.confidence}% confidence)

RISK PROFILE: ${settings.riskProfile}
ALLOCATION TARGET: ${settings.allocationPercent}% growth, ${settings.stablePercent}% stable

FOR EACH OPPORTUNITY:
1. Does it help beat the benchmarks?
2. Risk/Reward ratio > 1.5:1?
3. Probability of success > 55%?
4. Fits current market phase?

ONLY recommend trades that pass ALL gates.

Return JSON:
{
  "BUY": [
    {
      "symbol": "SYMBOL",
      "allocation_percent": 5-20,
      "confidence": "HIGH|MEDIUM|LOW",
      "rationale": "Why this beats benchmarks",
      "stop_loss": -10,
      "take_profit": 50
    }
  ],
  "SELL": [],
  "HOLD": true
}`;
}

async function generateDecisions(portfolio, marketStats, benchmarks, settings) {
  const marketPhase = analyzeMarketPhase(marketStats, benchmarks);
  const prompt = buildDecisionPrompt(portfolio, marketStats, benchmarks, marketPhase, settings);

  let decisions = null;
  let source = 'internal';

  // Try OpenClaw
  if (process.env.USE_OPENCLAW !== 'false') {
    try {
      decisions = await getOpenClawResponse(prompt);
      source = 'openclaw';
    } catch (error) {
      console.error('OpenClaw failed:', error.message);
    }
  }

  // Fallback to OpenAI
  if (!decisions && process.env.OPENAI_API_KEY) {
    try {
      const openai = getOpenAIClient();
      const response = await openai.messages.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
      });
      const text = response.content[0]?.text || '{}';
      decisions = JSON.parse(text);
      source = 'openai';
    } catch (error) {
      console.error('OpenAI failed:', error.message);
    }
  }

  // Fallback to internal logic
  if (!decisions) {
    decisions = {
      BUY: [],
      SELL: [],
      HOLD: true,
    };
    source = 'internal';
  }

  return { decisions, source, marketPhase };
}

// ============================================================================
// EXECUTION GATES
// ============================================================================

function evaluateExecutionGates(trade, portfolio, settings) {
  /**
   * Check if trade passes all execution gates
   * Returns: { passes: boolean, gateResults: object, reason: string }
   */
  
  const gates = {
    probability: {
      required: true,
      confidence: trade.confidence === 'HIGH' ? 75 : trade.confidence === 'MEDIUM' ? 60 : 40,
      threshold: 55,
      pass: true, // Set to true if > threshold
    },
    riskReward: {
      required: true,
      ratio: (trade.take_profit || 50) / Math.abs(trade.stop_loss || -10),
      threshold: 1.5,
      pass: true,
    },
    diversification: {
      required: true,
      currentMax: Math.max(...Object.values(portfolio.holdings).map(h => h.percent)),
      maxAllowed: 25,
      pass: true,
    },
    allocation: {
      required: true,
      proposed: trade.allocation_percent || 5,
      maxAllowed: 50,
      pass: true,
    },
    marketPhase: {
      required: true,
      alignment: true,
      pass: true,
    },
  };

  // Evaluate each gate
  gates.probability.pass = gates.probability.confidence > gates.probability.threshold;
  gates.riskReward.pass = gates.riskReward.ratio >= gates.riskReward.threshold;
  gates.diversification.pass = gates.diversification.currentMax < gates.diversification.maxAllowed;
  gates.allocation.pass = gates.allocation.proposed <= gates.allocation.maxAllowed;

  const allPass = Object.values(gates).every(g => !g.required || g.pass);

  return {
    passes: allPass,
    gates,
    reason: allPass ? 'All gates passed' : `Failed: ${Object.entries(gates).filter(([, g]) => g.required && !g.pass).map(([k]) => k).join(', ')}`,
  };
}

// ============================================================================
// TRADE EXECUTION
// ============================================================================

async function executeBuy(symbol, usdtAmount, maxSlippage = 1) {
  try {
    const binance = getBinanceClient();
    const ticker = await binance.prices({ symbols: [symbol] });
    const price = Number(ticker[symbol]);
    
    if (!price || price <= 0) {
      throw new Error(`Invalid price for ${symbol}`);
    }

    const quantityBefore = usdtAmount / price;
    const quantity = Math.max(0.001, parseFloat((quantityBefore * (1 - maxSlippage / 100)).toFixed(4)));

    const order = await binance.order({
      symbol,
      side: 'BUY',
      type: 'MARKET',
      quantity: quantity.toString(),
    });

    return {
      success: true,
      symbol,
      action: 'BUY',
      quantity,
      price,
      totalUsd: quantity * price,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Buy error for ${symbol}:`, error.message);
    return {
      success: false,
      symbol,
      action: 'BUY',
      error: error.message,
    };
  }
}

// ============================================================================
// MAIN AUTONOMOUS FUND MANAGER
// ============================================================================

async function runAutonomousFundManager() {
  const startTime = Date.now();

  try {
    // 1. Portfolio State
    const { balances } = await getPortfolioState();
    const watchlist = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT', 'DOGEUSDT', 'POLKAUSDT', 'UNIUSDT', 'LINKUSDT'];
    
    // 2. Market Data
    const marketStats = await fetch24HourStats(watchlist);
    const prices = await fetchMarketData(watchlist);
    const portfolio = await calculatePortfolioValue(balances, prices);

    // 3. Benchmarks
    const benchmarks = await fetchBenchmarkData();
    const performance = await comparePerformance(portfolio.totalUsd);

    // 4. Settings
    const settings = {
      allocationPercent: Number(process.env.ALLOCATION_PERCENT ?? 70),
      stablePercent: Number(process.env.STABLE_PERCENT ?? 30),
      riskProfile: process.env.RISK_PROFILE || 'balanced',
    };

    // 5. AI Decisions
    const { decisions, source, marketPhase } = await generateDecisions(
      portfolio,
      marketStats,
      benchmarks,
      settings
    );

    // 6. Execute Trades (with gate checks)
    const trades = [];
    const analysis = {
      marketPhase: marketPhase.phase,
      riskStatus: marketPhase.confidence > 70 ? 'HIGH_CONFIDENCE' : 'MEDIUM_CONFIDENCE',
      confidence: marketPhase.confidence,
      benchmarkBeating: Object.entries(performance.comparison).filter(([, v]) => Number(v) > 0).length,
    };

    if (decisions.BUY && Array.isArray(decisions.BUY)) {
      for (const trade of decisions.BUY) {
        const gateCheck = evaluateExecutionGates(trade, portfolio, settings);
        
        if (gateCheck.passes) {
          const amount = (portfolio.totalUsd * trade.allocation_percent) / 100;
          const result = await executeBuy(trade.symbol, amount);
          if (result.success) {
            trades.push({ ...result, rationale: trade.rationale });
          }
        }
      }
    }

    // 7. Record Cycle
    const cycleRecord = {
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      portfolio,
      performance,
      trades,
      analysis,
      source,
    };

    // Save history
    const history = await readJSON('fund_manager_history.json', []);
    history.unshift(cycleRecord);
    await writeJSON('fund_manager_history.json', history.slice(0, 500));

    return cycleRecord;

  } catch (error) {
    console.error('Fund manager cycle failed:', error.message);
    throw error;
  }
}

module.exports = {
  runAutonomousFundManager,
  getPortfolioState,
  calculatePortfolioValue,
  fetchMarketData,
  fetchBenchmarkData,
  comparePerformance,
  analyzeMarketPhase,
  generateDecisions,
  evaluateExecutionGates,
};
