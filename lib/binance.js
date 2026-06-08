const Binance = require('binance-api-node').default;

function getBinanceClient() {
  const apiKey = process.env.BINANCE_API_KEY;
  const apiSecret = process.env.BINANCE_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('BINANCE_API_KEY atau BINANCE_API_SECRET belum disetel');
  }

  return Binance({ apiKey, apiSecret });
}

module.exports = { getBinanceClient };
