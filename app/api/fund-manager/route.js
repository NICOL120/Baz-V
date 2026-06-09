import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataRoot = path.join(process.cwd(), 'data');

async function readJSON(file, fallback = {}) {
  try {
    const raw = await fs.readFile(path.join(dataRoot, file), 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'summary';

    switch (section) {
      case 'history':
        const history = await readJSON('fund_manager_history.json', []);
        const latestCycles = history.slice(0, 10);
        return NextResponse.json({
          success: true,
          cycles: latestCycles.length,
          latest: latestCycles,
        });

      case 'performance':
        const fullHistory = await readJSON('fund_manager_history.json', []);
        const performanceData = fullHistory.map(cycle => ({
          timestamp: cycle.timestamp,
          portfolioValue: cycle.portfolio.totalUsd,
          tradesExecuted: cycle.trades.filter(t => t.success).length,
          vs_IHSG: cycle.performance?.comparison.vsIHSG,
          vs_S_P500: cycle.performance?.comparison.vsSP500,
          vs_Gold: cycle.performance?.comparison.vsGold,
          vs_Bitcoin: cycle.performance?.comparison.vsBTC,
        }));
        return NextResponse.json({
          success: true,
          performance: performanceData.slice(0, 50),
        });

      case 'summary':
      default:
        const latestHistory = await readJSON('fund_manager_history.json', []);
        const latest = latestHistory[0] || null;
        
        const summary = {
          success: true,
          lastCycle: latest ? {
            timestamp: latest.timestamp,
            portfolioValue: latest.portfolio.totalUsd,
            holdings: Object.keys(latest.portfolio.holdings).length,
            tradesExecuted: latest.trades.filter(t => t.success).length,
            performance: latest.performance.comparison,
            beatsAllBenchmarks: latest.performance.beatsAll,
          } : null,
          totalCycles: latestHistory.length,
        };

        return NextResponse.json(summary);
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
