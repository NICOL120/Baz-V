const { runAutonomousFundManager } = require('../lib/fundManagerV2');

const intervalMinutes = Number(process.env.WORKER_INTERVAL_MINUTES ?? 15);
const intervalMs = Math.max(5, intervalMinutes) * 60 * 1000;

async function main() {
  console.log('🚀 BAZ Fund Manager Worker dimulai');
  console.log(`⏱️  Interval: ${intervalMinutes} menit`);
  console.log('='.repeat(50));

  let cycleCount = 0;

  while (true) {
    cycleCount++;
    try {
      console.log(`\n[Cycle ${cycleCount}] Starting at ${new Date().toISOString()}`);
      const result = await runAutonomousFundManager();
      
      console.log(`\n[Cycle ${cycleCount}] Selesai dalam ${(result.duration / 1000).toFixed(2)} detik`);
      console.log(`📊 Portfolio: $${result.portfolio.totalUsd}`);
      console.log(`🎯 Trades executed: ${result.trades.length}`);
      
    } catch (error) {
      console.error(`\n[Cycle ${cycleCount}] ❌ Error:`, error.message);
    }

    console.log(`\n⏳ Waiting ${intervalMinutes} minutes for next cycle...`);
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

main().catch((error) => {
  console.error('🔴 Worker crash:', error);
  process.exit(1);
});
