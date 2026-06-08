'use client';

import { useEffect, useState } from 'react';
import AssetComparisonChart from '@/components/AssetComparisonChart';
import PerformanceChart from '@/components/PerformanceChart';

const defaultSettings = {
  targetBenchmarks: 'IHSG, S&P 500, Top 100 Crypto, Inflasi fiat',
  allocationPercent: 70,
  stablePercent: 30,
  riskProfile: 'balanced',
  watchlist: 'BTCUSDT, ETHUSDT, BNBUSDT',
  refreshMinutes: 15,
  engine: 'openclaw',
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

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
        engine: data.settings.engine || 'openclaw',
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
      engine: settings.engine,
    };

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('✓ Pengaturan tersimpan.');
      setTimeout(() => setMessage(''), 3000);
      fetchStatus();
    } else {
      setMessage('⚠ Error: ' + data.error);
    }
  };

  const runTrade = async () => {
    setMessage('Memicu trading execution...');
    setLoading(true);
    const res = await fetch('/api/trade', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      setMessage('✓ Trading execution selesai.');
      setHistory([data.result, ...history].slice(0, 10));
      setTimeout(() => setMessage(''), 3000);
      fetchStatus();
    } else {
      setMessage('⚠ Error: ' + data.error);
    }
    setLoading(false);
  };

  // Sample data for demonstration
  const mockPortfolioValue = status?.balances?.total || 1500000;
  const mockBenchmarkValue = 1200000;
  const performancePercent = ((mockPortfolioValue - mockBenchmarkValue) / mockBenchmarkValue * 100).toFixed(2);

  return (
    <main>
      {/* Header Section */}
      <header>
        <div style={{ marginBottom: '24px' }}>
          <div className="badge badge-info">INSTITUTIONAL ASSET MANAGEMENT</div>
          <h1 style={{ marginTop: '16px' }}>BAZ HOLDING GROUP</h1>
          <p>Professional Investment Management & Real-time Performance Monitoring</p>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-4">
        <div className="metric-card card-highlight">
          <div className="metric-label">Portfolio Value</div>
          <div className="metric-value">${(mockPortfolioValue / 1000000).toFixed(2)}M</div>
          <div className="metric-subtext">Assets Under Management</div>
        </div>
        <div className="metric-card card-highlight">
          <div className="metric-label">Performance vs Benchmark</div>
          <div className={`metric-value ${performancePercent > 0 ? 'positive' : 'negative'}`}>
            {performancePercent > 0 ? '+' : ''}{performancePercent}%
          </div>
          <div className="metric-subtext">Outperformance</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Risk Profile</div>
          <div className="metric-value" style={{ fontSize: '20px', textTransform: 'capitalize' }}>
            {settings.riskProfile}
          </div>
          <div className="metric-subtext">Asset Allocation</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">System Status</div>
          <div className="metric-value" style={{ fontSize: '18px', color: '#10b981' }}>
            {loading ? 'Loading' : 'Active'}
          </div>
          <div className="metric-subtext">Engine: {settings.engine.toUpperCase()}</div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ marginBottom: '32px', display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        {['overview', 'performance', 'assets', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`secondary`}
            style={{
              borderBottom: activeTab === tab ? '2px solid #60a5fa' : 'none',
              background: activeTab === tab ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
              paddingBottom: '12px',
              marginBottom: '-16px',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </section>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <section className="card">
            <h2>📊 Asset Comparison with Benchmarks</h2>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Real-time comparison of portfolio performance against major market benchmarks</p>
            <AssetComparisonChart 
              portfolioValue={mockPortfolioValue}
              benchmarks={[
                { name: 'BAZ Portfolio', value: mockPortfolioValue, color: '#60a5fa' },
                { name: 'IHSG Index', value: 1100000, color: '#10b981' },
                { name: 'S&P 500', value: 1200000, color: '#f59e0b' },
                { name: 'Crypto Top 100', value: 900000, color: '#a78bfa' },
                { name: 'Inflation Target', value: 1050000, color: '#ef4444' },
              ]}
            />
          </section>

          <section className="card">
            <h2>📈 Performance Trend</h2>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>30-day performance history and trend analysis</p>
            <PerformanceChart 
              data={[
                { date: 'Day 1', baz: 1400000, benchmark: 1180000 },
                { date: 'Day 5', baz: 1420000, benchmark: 1190000 },
                { date: 'Day 10', baz: 1440000, benchmark: 1195000 },
                { date: 'Day 15', baz: 1460000, benchmark: 1205000 },
                { date: 'Day 20', baz: 1480000, benchmark: 1210000 },
                { date: 'Day 25', baz: 1500000, benchmark: 1200000 },
              ]}
            />
          </section>

          {message && (
            <section className="card" style={{ borderColor: message.includes('✓') ? '#10b981' : '#ef4444', background: message.includes('✓') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
              <p>{message}</p>
            </section>
          )}
        </>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <section className="card">
          <h2>Performance Analytics</h2>
          {loading && <p>Loading performance data...</p>}
          {!loading && status && (
            <div className="grid">
              <div>
                <h3>Current Recommendations</h3>
                <pre className="pre">{JSON.stringify(status.analysis ?? status.suggestions ?? {}, null, 2)}</pre>
              </div>
              <div>
                <h3>Trading History (Latest 10)</h3>
                {history.length > 0 ? (
                  <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {history.map((trade, i) => (
                      <div key={i} className="card" style={{ marginBottom: '12px', padding: '16px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong>{trade.symbol || 'SYSTEM'}</strong>
                          <span className={trade.action === 'BUY' ? 'positive' : 'negative'}>{trade.action || 'LOG'}</span>
                        </div>
                        <p style={{ margin: '4px 0', color: '#9ca3af' }}>{trade.details || trade.message || 'Event recorded'}</p>
                        <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '12px' }}>{new Date(trade.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No trading history yet</p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Assets Tab */}
      {activeTab === 'assets' && (
        <section className="card">
          <h2>Asset Allocation</h2>
          <div className="grid grid-2">
            <div>
              <h3>Allocation Strategy</h3>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Primary Assets</span>
                    <strong>{settings.allocationPercent}%</strong>
                  </div>
                  <div style={{ background: 'rgba(96, 165, 250, 0.2)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#60a5fa', height: '100%', width: `${settings.allocationPercent}%` }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Stable Assets</span>
                    <strong>{settings.stablePercent}%</strong>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#10b981', height: '100%', width: `${settings.stablePercent}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>Watchlist</h3>
              <div style={{ marginTop: '20px' }}>
                {settings.watchlist.split(',').map((symbol, i) => (
                  <div key={i} className="badge badge-info" style={{ marginRight: '8px', marginBottom: '8px' }}>
                    {symbol.trim()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <section className="card">
          <h2>Configuration Management</h2>
          <form onSubmit={saveSettings} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Target Benchmarks
              </label>
              <textarea
                value={settings.targetBenchmarks}
                onChange={(e) => setSettings({ ...settings, targetBenchmarks: e.target.value })}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                AI Engine
              </label>
              <select
                value={settings.engine}
                onChange={(e) => setSettings({ ...settings, engine: e.target.value })}
                style={{ marginTop: '8px' }}
              >
                <option value="openclaw">OpenClaw</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Watchlist Symbols
              </label>
              <input
                value={settings.watchlist}
                onChange={(e) => setSettings({ ...settings, watchlist: e.target.value })}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Primary Allocation (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.allocationPercent}
                onChange={(e) => setSettings({ ...settings, allocationPercent: e.target.value })}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Stable Allocation (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.stablePercent}
                onChange={(e) => setSettings({ ...settings, stablePercent: e.target.value })}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Risk Profile
              </label>
              <select
                value={settings.riskProfile}
                onChange={(e) => setSettings({ ...settings, riskProfile: e.target.value })}
                style={{ marginTop: '8px' }}
              >
                <option value="conservative">Conservative</option>
                <option value="balanced">Balanced</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Refresh Interval (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={settings.refreshMinutes}
                onChange={(e) => setSettings({ ...settings, refreshMinutes: e.target.value })}
                style={{ marginTop: '8px' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : '💾 Save Settings'}
                </button>
                <button type="button" onClick={runTrade} disabled={loading} className="secondary">
                  {loading ? 'Executing...' : '🚀 Execute Trading'}
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
