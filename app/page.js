'use client';

import { useEffect, useState } from 'react';

const defaultSettings = {
  targetBenchmarks: 'IHSG, S&P 500, Top 100 Crypto, Inflasi fiat',
  allocationPercent: 70,
  stablePercent: 30,
  riskProfile: 'balanced',
  watchlist: 'BTCUSDT, ETHUSDT, BNBUSDT',
  refreshMinutes: 15,
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
      setSettings({
        targetBenchmarks: data.settings.targetBenchmarks.join(', '),
        allocationPercent: data.settings.allocationPercent,
        stablePercent: data.settings.stablePercent,
        riskProfile: data.settings.riskProfile,
        watchlist: data.settings.watchlist.join(', '),
        refreshMinutes: data.settings.refreshMinutes,
      });
      setHistory(data.history || []);
    } catch (error) {
      setMessage('Gagal mengambil status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const saveSettings = async (event) => {
    event.preventDefault();
    setMessage('Menyimpan pengaturan...');
    const body = {
      targetBenchmarks: settings.targetBenchmarks,
      allocationPercent: Number(settings.allocationPercent),
      stablePercent: Number(settings.stablePercent),
      riskProfile: settings.riskProfile,
      watchlist: settings.watchlist,
      refreshMinutes: Number(settings.refreshMinutes),
    };

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Pengaturan tersimpan.');
      fetchStatus();
    } else {
      setMessage('Error: ' + data.error);
    }
  };

  const runTrade = async () => {
    setMessage('Memicu AI trading...');
    setLoading(true);
    const res = await fetch('/api/trade', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      setMessage('AI trade selesai. Lihat riwayat di bawah.');
      setHistory([data.result, ...history].slice(0, 10));
      fetchStatus();
    } else {
      setMessage('Error: ' + data.error);
    }
    setLoading(false);
  };

  return (
    <main>
      <header>
        <p className="status-badge">Baz-V AI Trading Dashboard</p>
        <h1>AI Institutional Crypto Asset Manager</h1>
        <p>Dashboard ini menampilkan performa, rekomendasi, dan kontrol AI trading Anda.</p>
      </header>

      <section className="card">
        <h2>Status Sistem</h2>
        {loading && <p>Memuat data...</p>}
        {!loading && status && (
          <div className="grid grid-2">
            <div>
              <h3>Rekomendasi AI</h3>
              <pre className="pre">{JSON.stringify(status.analysis ?? status.suggestions ?? {}, null, 2)}</pre>
            </div>
            <div>
              <h3>Saldo Akun</h3>
              <pre className="pre">{JSON.stringify(status.balances, null, 2)}</pre>
            </div>
          </div>
        )}
        {message && <p>{message}</p>}
      </section>

      <section className="card">
        <h2>Pengaturan AI</h2>
        <form onSubmit={saveSettings} className="grid">
          <label>
            Target Benchmark
            <textarea
              value={settings.targetBenchmarks}
              onChange={(e) => setSettings({ ...settings, targetBenchmarks: e.target.value })}
            />
          </label>
          <label>
            Watchlist Symbol
            <input
              value={settings.watchlist}
              onChange={(e) => setSettings({ ...settings, watchlist: e.target.value })}
            />
          </label>
          <label>
            Persentase Alokasi Utama
            <input
              type="number"
              min="0"
              max="100"
              value={settings.allocationPercent}
              onChange={(e) => setSettings({ ...settings, allocationPercent: e.target.value })}
            />
          </label>
          <label>
            Persentase Dana Stabil
            <input
              type="number"
              min="0"
              max="100"
              value={settings.stablePercent}
              onChange={(e) => setSettings({ ...settings, stablePercent: e.target.value })}
            />
          </label>
          <label>
            Profil Risiko
            <select
              value={settings.riskProfile}
              onChange={(e) => setSettings({ ...settings, riskProfile: e.target.value })}
            >
              <option value="conservative">Conservative</option>
              <option value="balanced">Balanced</option>
              <option value="growth">Growth</option>
            </select>
          </label>
          <label>
            Frekuensi Refresh (menit)
            <input
              type="number"
              min="1"
              value={settings.refreshMinutes}
              onChange={(e) => setSettings({ ...settings, refreshMinutes: e.target.value })}
            />
          </label>
          <button type="submit">Simpan Pengaturan</button>
        </form>
      </section>

      <section className="card">
        <div className="grid grid-2">
          <div>
            <h2>Tindakan</h2>
            <button onClick={runTrade} disabled={loading}>Jalankan AI Trade</button>
            <button onClick={fetchStatus} disabled={loading} style={{ marginLeft: 12 }}>Segarkan Status</button>
          </div>
          <div>
            <h2>Catatan</h2>
            <p>AI dapat menghasilkan rekomendasi berdasarkan target dan pasar, tetapi ini bukan nasihat keuangan yang dijamin.</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Riwayat Eksekusi</h2>
        {history.length === 0 ? (
          <p>Belum ada riwayat.</p>
        ) : (
          history.slice(0, 5).map((item, index) => (
            <div key={index} style={{ marginBottom: '18px' }}>
              <strong>{item.timestamp || item.createdAt}</strong>
              <pre className="pre">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
