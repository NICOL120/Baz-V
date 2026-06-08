const { runStrategy } = require('../lib/trading');

const intervalMinutes = Number(process.env.WORKER_INTERVAL_MINUTES ?? 15);
const intervalMs = Math.max(5, intervalMinutes) * 60 * 1000;

async function main() {
  console.log('Worker trading dimulai, interval', intervalMinutes, 'menit');
  while (true) {
    try {
      const result = await runStrategy();
      console.log('Hasil eksekusi:', result.timestamp);
    } catch (error) {
      console.error('Worker gagal menjalankan strategi:', error.message);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

main().catch((error) => {
  console.error('Worker berhenti karena error:', error);
  process.exit(1);
});
