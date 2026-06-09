const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFundManagerRecommendation } = require('../lib/trading');

test('buildFundManagerRecommendation favors growth for balanced profiles', () => {
  const settings = {
    targetBenchmarks: ['IHSG', 'S&P 500', 'Top 100 Crypto', 'Gold', 'USD', 'Inflasi'],
    allocationPercent: 70,
    stablePercent: 30,
    riskProfile: 'balanced',
    watchlist: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'],
  };

  const recommendation = buildFundManagerRecommendation(settings, [], {});

  assert.equal(recommendation.BTCUSDT.action, 'BUY');
  assert.equal(recommendation.ETHUSDT.action, 'BUY');
  assert.match(recommendation.BTCUSDT.reason, /IHSG|S&P 500|crypto|inflasi/i);
  assert.ok(recommendation.BTCUSDT.weight >= 20);
});

test('buildFundManagerRecommendation shifts to defensive posture for conservative profiles', () => {
  const settings = {
    targetBenchmarks: ['IHSG', 'Gold', 'USD', 'Inflasi'],
    allocationPercent: 60,
    stablePercent: 40,
    riskProfile: 'conservative',
    watchlist: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'],
  };

  const recommendation = buildFundManagerRecommendation(settings, [], {});

  assert.equal(recommendation.BTCUSDT.action, 'HOLD');
  assert.equal(recommendation.ETHUSDT.action, 'HOLD');
  assert.equal(recommendation.BNBUSDT.action, 'HOLD');
  assert.match(recommendation.BTCUSDT.reason, /defensive|gold|usd|inflasi/i);
});
