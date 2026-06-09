import { NextResponse } from 'next/server';
import {
  getPortfolioState,
  calculatePortfolioValue,
  fetchMarketData,
  fetch24HourStats,
  fetchBenchmarkData,
  comparePerformance,
} from '../../../lib/fundManagerV2';

export async function GET() {
  try {
    // Get portfolio state
    const { balances } = await getPortfolioState();
    
    // Fetch market data for key assets
    const watchlist = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT'];
    const marketStats = await fetch24HourStats(watchlist);
    const prices = await fetchMarketData(watchlist);
    
    // Calculate portfolio value
    const portfolio = await calculatePortfolioValue(balances, prices);
    
    // Get benchmark comparison
    const benchmarks = await fetchBenchmarkData();
    const performance = await comparePerformance(portfolio.totalUsd);

    return NextResponse.json({
      success: true,
      portfolio,
      marketStats,
      benchmarks,
      performance,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

