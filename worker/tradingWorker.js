/**
 * 🤖 BAZ Autonomous Fund Manager Worker - Vision 2.0
 * 
 * Runs autonomous trading cycles every N minutes
 * Implements professional fund manager logic, not day-trader tactics
 * 
 * Philosophy:
 * - NOT all cycles produce trades
 * - Only trade when probability > 55% & risk/reward > 1.5:1
 * - Holding cash is a valid investment decision
 * - Every decision is logged with complete reasoning
 */

const { runAutonomousFundManager } = require('../lib/fundManagerV2');
const fs = require('fs');
const path = require('path');

// Configuration
const intervalMinutes = Number(process.env.WORKER_INTERVAL_MINUTES ?? 15);
const intervalMs = Math.max(5, intervalMinutes) * 60 * 1000;

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Worker statistics file
const statsFile = path.join(dataDir, 'worker_stats.json');

/**
 * Get or initialize worker statistics
 */
function getWorkerStats() {
  try {
    if (fs.existsSync(statsFile)) {
      return JSON.parse(fs.readFileSync(statsFile, 'utf-8'));
    }
  } catch (error) {
    console.error('Error reading worker stats:', error.message);
  }
  
  return {
    startTime: new Date().toISOString(),
    cycleCount: 0,
    tradesExecuted: 0,
    tradesSkipped: 0,
    totalDuration: 0,
    averageDuration: 0,
    errors: 0,
    lastCycle: null,
    lastError: null,
  };
}

/**
 * Save worker statistics
 */
function saveWorkerStats(stats) {
  try {
    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Error saving worker stats:', error.message);
  }
}

/**
 * Log cycle details
 */
function logCycle(cycleNumber, result) {
  const timestamp = new Date().toISOString();
  
  console.log('\n' + '='.repeat(70));
  console.log(`🔄 CYCLE #${cycleNumber} COMPLETED`);
  console.log('='.repeat(70));
  
  console.log(`⏱️  Time: ${timestamp}`);
  console.log(`⏱️  Duration: ${(result.duration / 1000).toFixed(2)}s`);
  
  if (result.portfolio) {
    console.log(`\n💰 PORTFOLIO STATE:`);
    console.log(`   Total Value: $${result.portfolio.totalUsd.toFixed(2)}`);
    console.log(`   Holdings: ${Object.keys(result.portfolio.holdings || {}).length} assets`);
    
    if (result.portfolio.holdings) {
      Object.entries(result.portfolio.holdings).forEach(([symbol, holding]) => {
        console.log(`   ├─ ${symbol}: $${holding.value.toFixed(2)} (${holding.percent.toFixed(1)}%)`);
      });
    }
  }
  
  if (result.trades && result.trades.length > 0) {
    console.log(`\n📊 TRADES EXECUTED: ${result.trades.length}`);
    result.trades.forEach((trade, idx) => {
      console.log(`   ${idx + 1}. ${trade.action} ${trade.symbol}: ${trade.quantity.toFixed(6)} @ $${trade.price.toFixed(2)}`);
      if (trade.rationale) {
        console.log(`      Rationale: ${trade.rationale.substring(0, 60)}...`);
      }
    });
  } else {
    console.log(`\n📊 TRADES EXECUTED: 0 (HOLD - No viable opportunities)`);
    console.log(`   This is a valid investment decision.`);
  }
  
  if (result.performance) {
    console.log(`\n📈 PERFORMANCE:`);
    console.log(`   vs IHSG: ${result.performance.vsIHSG}`);
    console.log(`   vs S&P 500: ${result.performance.vsSP500}`);
    console.log(`   vs Gold: ${result.performance.vsGold}`);
    console.log(`   vs Bitcoin: ${result.performance.vsBTC}`);
  }
  
  if (result.analysis) {
    console.log(`\n🧠 AI ANALYSIS:`);
    console.log(`   Market Phase: ${result.analysis.marketPhase || 'Unknown'}`);
    console.log(`   Risk Status: ${result.analysis.riskStatus || 'Unknown'}`);
    console.log(`   Overall Confidence: ${result.analysis.confidence || '0'}%`);
  }
  
  console.log('\n' + '='.repeat(70));
}

/**
 * Handle cycle errors
 */
function handleError(cycleNumber, error) {
  const timestamp = new Date().toISOString();
  
  console.error('\n' + '!'.repeat(70));
  console.error(`❌ CYCLE #${cycleNumber} ERROR`);
  console.error('!'.repeat(70));
  console.error(`⏱️  Time: ${timestamp}`);
  console.error(`📝 Error: ${error.message}`);
  console.error(`📋 Stack: ${error.stack}`);
  console.error('!'.repeat(70));
}

/**
 * Main worker loop
 */
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 BAZ AUTONOMOUS FUND MANAGER - VISION 2.0');
  console.log('='.repeat(70));
  console.log(`Started: ${new Date().toISOString()}`);
  console.log(`Cycle Interval: ${intervalMinutes} minutes`);
  console.log(`Philosophy: Professional Fund Manager (NOT Day Trader)`);
  console.log('='.repeat(70) + '\n');
  
  let stats = getWorkerStats();
  let cycleCount = stats.cycleCount || 0;
  
  while (true) {
    cycleCount++;
    const cycleStartTime = Date.now();
    
    try {
      // Run the autonomous fund manager cycle
      const result = await runAutonomousFundManager();
      
      // Calculate duration
      const duration = Date.now() - cycleStartTime;
      result.duration = duration;
      
      // Log cycle details
      logCycle(cycleCount, result);
      
      // Update statistics
      stats.cycleCount = cycleCount;
      stats.tradesExecuted += (result.trades && result.trades.length) || 0;
      if (!result.trades || result.trades.length === 0) {
        stats.tradesSkipped += 1;
      }
      stats.totalDuration += duration;
      stats.averageDuration = stats.totalDuration / cycleCount;
      stats.lastCycle = {
        number: cycleCount,
        timestamp: new Date().toISOString(),
        portfolioValue: result.portfolio?.totalUsd || 0,
        tradesCount: (result.trades && result.trades.length) || 0,
        duration: duration,
      };
      
      // Clear any previous error
      stats.lastError = null;
      
    } catch (error) {
      stats.errors += 1;
      stats.lastError = {
        cycle: cycleCount,
        timestamp: new Date().toISOString(),
        message: error.message,
      };
      
      handleError(cycleCount, error);
    }
    
    // Save statistics
    saveWorkerStats(stats);
    
    // Wait for next cycle
    console.log(`\n⏳ Waiting ${intervalMinutes} minute(s) for next cycle...`);
    console.log(`📊 Stats: ${stats.cycleCount} cycles | ${stats.tradesExecuted} trades executed | ${stats.tradesSkipped} cycles skipped (HOLD)`);
    console.log(`⏱️  Avg duration: ${(stats.averageDuration / 1000).toFixed(2)}s`);
    
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

/**
 * Handle process termination
 */
process.on('SIGINT', () => {
  console.log('\n\n' + '='.repeat(70));
  console.log('🛑 WORKER SHUTTING DOWN');
  console.log('='.repeat(70));
  
  let stats = getWorkerStats();
  console.log(`Total Cycles: ${stats.cycleCount}`);
  console.log(`Trades Executed: ${stats.tradesExecuted}`);
  console.log(`Cycles Skipped (HOLD): ${stats.tradesSkipped}`);
  console.log(`Total Duration: ${(stats.totalDuration / 1000 / 60).toFixed(2)} minutes`);
  console.log(`Errors: ${stats.errors}`);
  
  console.log('='.repeat(70) + '\n');
  process.exit(0);
});

/**
 * Start the worker
 */
main().catch((error) => {
  console.error('🔴 FATAL WORKER ERROR:', error);
  process.exit(1);
});
