const fs = require('fs').promises;
const path = require('path');
const { getOpenAIClient } = require('./openai');
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

async function analyzeAndSuggest(symbols) {
  const openai = getOpenAIClient();
  const market = await fetchMarketData(symbols);

  const prompt = `You are an institutional crypto asset manager responsible for beating IHSG, S&P 500, top 100 crypto assets, and inflation. Based on the market data below, return a JSON object where each symbol is mapped to an action BUY, HOLD, or SELL, plus a reason and orderSizePercent. Only return valid JSON.

Market data: ${JSON.stringify(market, null, 2)}`;

  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
    max_tokens: 600,
  });

  const raw = response.output_text || response.output?.[0]?.content?.[0]?.text || '';
  try {
    const suggestion = JSON.parse(raw);
    return { suggestion, raw };
  } catch (error) {
    return { suggestion: null, raw };
  }
}

async function executeTrade(symbol, side, quantity) {
  const binance = getBinanceClient();
  return binance.order({ symbol, side, type: 'MARKET', quantity: quantity.toString() });
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
