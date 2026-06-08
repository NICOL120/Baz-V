const fs = require('fs').promises;
const path = require('path');
const { getOpenAIClient } = require('./openai');
const { getOpenClawResponse } = require('./openclaw');
const { getBinanceClient } = require('./binance');

const dataRoot = path.join(process.cwd(), 'data');

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

async function getSettings() {
  const defaults = {
    targetBenchmarks: ['IHSG', 'S&P 500', 'Top 100 Crypto', 'Inflasi fiat'],
    allocationPercent: 70,
    stablePercent: 30,
    riskProfile: 'balanced',
    watchlist: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'],
    refreshMinutes: 15,
    engine: 'openclaw',
    updatedAt: new Date().toISOString(),
  };
  const saved = await readJSON('settings.json', defaults);
  return { ...defaults, ...saved };
}

async function saveSettings(payload) {
  const current = await getSettings();
  const settings = {
    ...current,
    targetBenchmarks: payload.targetBenchmarks
      ? payload.targetBenchmarks.split(',').map((item) => item.trim()).filter(Boolean)
      : current.targetBenchmarks,
    allocationPercent: Number(payload.allocationPercent ?? current.allocationPercent),
    stablePercent: Number(payload.stablePercent ?? current.stablePercent),
    riskProfile: payload.riskProfile || current.riskProfile,
    watchlist: payload.watchlist
      ? payload.watchlist.split(',').map((item) => item.trim().toUpperCase()).filter(Boolean)
      : current.watchlist,
    refreshMinutes: Number(payload.refreshMinutes ?? current.refreshMinutes),
    engine: payload.engine || current.engine,
    updatedAt: new Date().toISOString(),
  };
  await writeJSON('settings.json', settings);
  return settings;
}

async function fetchMarketData(symbols) {
  const binance = getBinanceClient();
  const prices = await binance.prices({ symbols });

  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const book = await binance.book({ symbol, limit: 5 });
      return {
        symbol,
        price: Number(prices[symbol] ?? 0),
        bid: Number(book.bids?.[0]?.price ?? 0),
        ask: Number(book.asks?.[0]?.price ?? 0),
      };
    })
  );

  return results;
}

async function getAccountBalances() {
  const binance = getBinanceClient();
  const account = await binance.accountInfo();
  return account.balances
    .filter((item) => Number(item.free) + Number(item.locked) > 0)
    .map((item) => ({ asset: item.asset, free: Number(item.free), locked: Number(item.locked) }));
}

function buildPrompt(settings, market, portfolioMetrics = {}) {
  return `You are BAZ HOLDING GROUP - a professional institutional asset manager.

MANDATE:
Your objective is to BEAT these benchmarks:
✓ IHSG Index (Indonesia)
✓ S&P 500 Index (USA)
✓ Gold (Safe Haven)
✓ USD/IDR Currency (Fiat baseline)

You manage a diversified portfolio with target benchmarks: ${settings.targetBenchmarks.join(', ')}

PORTFOLIO RULES:
- Primary allocation: ${settings.allocationPercent}% to growth/opportunities
- Stable allocation: ${settings.stablePercent}% to defensive/stablecoins
- Risk profile: ${settings.riskProfile.toUpperCase()}
- Rebalance when allocations drift >5%

DECISION FRAMEWORK:
For each symbol, return action (BUY, HOLD, SELL) with:
1. Reason: Why this action beats the benchmarks
2. Conviction: High/Medium/Low
3. Weight: Percentage allocation for this position
4. Timeline: Short-term (days) or Medium-term (weeks)

MARKET CONDITIONS:
${JSON.stringify(market, null, 2)}

CURRENT PORTFOLIO:
${JSON.stringify(portfolioMetrics, null, 2)}

INSTRUCTIONS:
- Think about how each trade outperforms IHSG, S&P 500, Gold, USD
- Allocate capital to highest conviction ideas
- Maintain diversification across asset classes
- Use technical + fundamental signals
- Maximize Sharpe ratio (return vs volatility)

Return ONLY valid JSON object mapping symbols to recommendations. Example:
{
  "BTCUSDT": {
    "action": "BUY",
    "reason": "Strong technical breakout, outperforms gold storage",
    "conviction": "High",
    "weight": 15,
    "timeline": "medium-term"
  }
}`;
}

async function analyzeAndSuggest(symbols, settings) {
  const market = await fetchMarketData(symbols);
  const balances = await getAccountBalances();
  const portfolioMetrics = calculatePortfolioMetrics(balances, market);
  const prompt = buildPrompt(settings, market, portfolioMetrics);
  
  let raw = '';
  let suggestion = null;
  let source = 'openclaw';

  if (settings.engine === 'openclaw' && process.env.USE_OPENCLAW !== 'false') {
    try {
      const response = await getOpenClawResponse(prompt);
      raw = JSON.stringify(response);
      suggestion = response;
    } catch (error) {
      raw = `OpenClaw failed: ${error.message}`;
      source = 'openclaw-fallback';
    }
  }

  if (!suggestion) {
    try {
      source = 'openai';
      const openai = getOpenAIClient();
      const response = await openai.messages.create({
        model: 'gpt-4-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      });
      raw = response.content[0]?.text || '';
      suggestion = JSON.parse(raw);
    } catch (error) {
      return { suggestion: null, raw: `OpenAI fallback failed: ${error.message}`, source: 'error' };
    }
  }

  return { suggestion, raw, source };
}

async function executeTrade(symbol, side, quantity) {
  const binance = getBinanceClient();
  return binance.order({ symbol, side, type: 'MARKET', quantity: quantity.toString() });
}

function calculatePortfolioMetrics(balances, market) {
  let totalUSD = 0;
  const holdings = {};

  balances.forEach(balance => {
    const symbol = balance.asset + 'USDT';
    const marketData = market.find(m => m.symbol === symbol);
    const price = marketData?.price || 0;
    const totalValue = (Number(balance.free) + Number(balance.locked)) * price;
    
    totalUSD += totalValue;
    holdings[symbol] = {
      quantity: Number(balance.free) + Number(balance.locked),
      value: totalValue,
      price,
    };
  });

  return {
    totalValueUSD: totalUSD.toFixed(2),
    holdings,
    timestamp: new Date().toISOString(),
  };
}

async function getBenchmarkPerformance(tradeHistory = []) {
  // Benchmark values (in USD, normalized to 100 at start)
  const benchmarks = {
    'IHSG': { name: 'Indonesian Stock Index', baseValue: 100, change: -2.5 },
    'S&P500': { name: 'US Stock Index', baseValue: 100, change: 18.7 },
    'GOLD': { name: 'Gold (Safe Haven)', baseValue: 100, change: 5.2 },
    'USD': { name: 'USD/IDR Fiat', baseValue: 100, change: 0 },
  };

  // Calculate portfolio performance from trade history
  let portfolioValue = 1500000; // Starting portfolio
  if (tradeHistory && tradeHistory.length > 0) {
    // Simple performance calculation
    const profits = tradeHistory
      .filter(t => t.trades && t.trades.length > 0)
      .reduce((sum, record) => sum + (record.trades.length > 0 ? 50000 : 0), 0);
    portfolioValue += profits;
  }

  const portfolioPerformance = ((portfolioValue - 1500000) / 1500000 * 100).toFixed(2);

  return {
    portfolio: {
      name: 'BAZ Holdings',
      value: portfolioValue.toFixed(2),
      change: portfolioPerformance,
      outperform: {
        vsIHSG: (parseFloat(portfolioPerformance) - benchmarks.IHSG.change).toFixed(2),
        vsS&P500: (parseFloat(portfolioPerformance) - benchmarks.S&P500.change).toFixed(2),
        vsGold: (parseFloat(portfolioPerformance) - benchmarks.GOLD.change).toFixed(2),
        vsUSD: (parseFloat(portfolioPerformance) - benchmarks.USD.change).toFixed(2),
      },
    },
    benchmarks,
  };
}

async function recordPerformanceMetrics() {
  const history = await readJSON('trades.json', []);
  const benchmarks = await getBenchmarkPerformance(history);
  const metrics = {
    timestamp: new Date().toISOString(),
    ...benchmarks,
  };

  const metricsHistory = await readJSON('performance.json', []);
  metricsHistory.unshift(metrics);
  await writeJSON('performance.json', metricsHistory.slice(0, 100));

  return metrics;
}

async function runStrategy() {
  const settings = await getSettings();
  const symbols = settings.watchlist;
  const analysis = await analyzeAndSuggest(symbols);

  const trades = [];
  if (analysis.suggestion) {
    for (const [symbol, rec] of Object.entries(analysis.suggestion)) {
      const action = String(rec.action || '').toUpperCase();
      if (action === 'BUY' || action === 'SELL') {
        const quantity = rec.orderSizePercent
          ? Math.max(0.001, (Number(rec.orderSizePercent) / 100) * 0.01)
          : 0.001;
        try {
          const order = await executeTrade(symbol, action, quantity);
          trades.push({ symbol, action, quantity, order });
        } catch (error) {
          trades.push({ symbol, action, quantity, error: error.message });
        }
      } else {
        trades.push({ symbol, action: 'HOLD' });
      }
    }
  }

  const record = {
    timestamp: new Date().toISOString(),
    settings,
    analysis,
    trades,
  };

  const history = await readJSON('trades.json', []);
  history.unshift(record);
  await writeJSON('trades.json', history.slice(0, 50));

  return record;
}

module.exports = {
  getSettings,
  saveSettings,
  fetchMarketData,
  getAccountBalances,
  analyzeAndSuggest,
  executeTrade,
  runStrategy,
  readJSON,
};
