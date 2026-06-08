import { NextResponse } from 'next/server';
import { getSettings, getAccountBalances, fetchMarketData, readJSON, analyzeAndSuggest } from '../../../lib/trading';

export async function GET() {
  try {
    const settings = await getSettings();
    const watchlist = settings.watchlist;
    const symbols = watchlist.map((symbol) => symbol.trim()).filter(Boolean);
    const balances = await getAccountBalances();
    const market = await fetchMarketData(symbols);
    const history = await readJSON('trades.json', []);
    const analysis = await analyzeAndSuggest(symbols);

    return NextResponse.json({ settings, balances, market, analysis, history });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
