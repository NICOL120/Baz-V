'use client';

import { useEffect, useState } from 'react';
import AssetComparisonChart from '@/components/AssetComparisonChart';
import PerformanceChart from '@/components/PerformanceChart';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const [benchmarks, setBenchmarks] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const [statusRes, historyRes] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/fund-manager?section=history'),
      ]);

      const statusData = await statusRes.json();
      const historyData = await historyRes.json();

      if (statusData.success) {
        setPortfolio(statusData.portfolio);
        setBenchmarks(statusData.benchmarks);
        setPerformance(statusData.performance);
      }

      if (historyData.success) {
        setHistory(historyData.latest || []);
      }

      setMessage('');
    } catch (error) {
      setMessage('❌ Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const runFundManagerCycle = async () => {
    setMessage('🤖 Starting fund manager cycle...');
    setLoading(true);
    try {
      const res = await fetch('/api/trade', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setMessage('✅ Fund manager cycle completed successfully!');
        setTimeout(() => fetchStatus(), 1000);
      } else {
        setMessage('⚠️ Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <main>
      {/* Header */}
      <header>
        <div style={{ marginBottom: '24px' }}>
          <div className="badge badge-info">🤖 AUTONOMOUS FUND MANAGER</div>
          <h1 style={{ marginTop: '16px' }}>BAZ HOLDING GROUP</h1>
          <p>AI-powered asset management targeting: IHSG | S&P 500 | Gold | Bitcoin | Top 100 Crypto | USD</p>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-4">
        <div className="metric-card card-highlight">
          <div className="metric-label">💰 Portfolio Value</div>
          <div className="metric-value">
            ${portfolio ? (portfolio.totalUsd / 1000000).toFixed(2) : '0.00'}M
          </div>
          <div className="metric-subtext">Assets Under Management</div>
        </div>
        <div className="metric-card card-highlight">
          <div className="metric-label">📈 Outperformance</div>
          <div className={`metric-value ${performance && performance.comparison.vsSP500 > 0 ? 'positive' : 'negative'}`}>
            {performance ? (performance.comparison.vsSP500 > 0 ? '+' : '') + performance.comparison.vsSP500 : '0'}%
          </div>
          <div className="metric-subtext">vs S&P 500</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">🎯 Holdings</div>
          <div className="metric-value">
            {portfolio ? Object.keys(portfolio.holdings).length : 0}
          </div>
          <div className="metric-subtext">Active Positions</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">🚀 Status</div>
          <div className="metric-value" style={{ fontSize: '18px', color: '#10b981' }}>
            {loading ? '⏳ Sync' : '✅ Live'}
          </div>
          <div className="metric-subtext">System Active</div>
        </div>
      </section>

      {/* Control Button */}
      <section style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={runFundManagerCycle}
          disabled={loading}
          className="primary"
          style={{ padding: '12px 24px', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? '⏳ Running...' : '🤖 Execute Fund Manager Cycle'}
        </button>
        <button
          onClick={fetchStatus}
          disabled={loading}
          className="secondary"
          style={{ padding: '12px 24px', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          🔄 Refresh
        </button>
      </section>

      {/* Message */}
      {message && (
        <section className="card" style={{
          borderColor: message.includes('✅') ? '#10b981' : message.includes('⚠️') ? '#f59e0b' : '#ef4444',
          background: message.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : message.includes('⚠️') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          marginBottom: '24px'
        }}>
          <p>{message}</p>
        </section>
      )}

      {/* Tabs */}
      <section style={{ marginBottom: '32px', display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
        {['overview', 'performance', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="secondary"
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
            <h2>📊 Benchmark Comparison</h2>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
              Portfolio performance vs target benchmarks
            </p>
            {performance ? (
              <div className="grid grid-3">
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs IHSG</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsIHSG > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsIHSG > 0 ? '+' : ''}{performance.comparison.vsIHSG}%
                  </div>
                </div>
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs S&P 500</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsSP500 > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsSP500 > 0 ? '+' : ''}{performance.comparison.vsSP500}%
                  </div>
                </div>
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs Gold</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsGold > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsGold > 0 ? '+' : ''}{performance.comparison.vsGold}%
                  </div>
                </div>
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs Bitcoin</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsBTC > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsBTC > 0 ? '+' : ''}{performance.comparison.vsBTC}%
                  </div>
                </div>
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs Top 100 Crypto</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsTop100Crypto > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsTop100Crypto > 0 ? '+' : ''}{performance.comparison.vsTop100Crypto}%
                  </div>
                </div>
                <div className="card">
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>vs USD</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: performance.comparison.vsUSD > 0 ? '#10b981' : '#ef4444', marginTop: '8px' }}>
                    {performance.comparison.vsUSD > 0 ? '+' : ''}{performance.comparison.vsUSD}%
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading performance data...</p>
            )}
          </section>

          <section className="card">
            <h2>💼 Current Holdings</h2>
            {portfolio && Object.keys(portfolio.holdings).length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#9ca3af' }}>Asset</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af' }}>Quantity</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af' }}>Price</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af' }}>Value</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#9ca3af' }}>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(portfolio.holdings).map(([symbol, holding]) => (
                      <tr key={symbol} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px', fontWeight: '600' }}>{symbol}</td>
                        <td style={{ textAlign: 'right', padding: '12px' }}>{holding.quantity.toFixed(4)}</td>
                        <td style={{ textAlign: 'right', padding: '12px' }}>${holding.price.toFixed(2)}</td>
                        <td style={{ textAlign: 'right', padding: '12px' }}>${holding.value.toFixed(2)}</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: '#60a5fa' }}>{holding.percentOfPortfolio}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No holdings yet. Fund the account with USDT to begin.</p>
            )}
          </section>
        </>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <section className="card">
          <h2>📈 Performance History</h2>
          {benchmarks ? (
            <div className="grid grid-2">
              <div>
                <h3>Benchmark Indices</h3>
                <div style={{ marginTop: '16px' }}>
                  {Object.entries(benchmarks).map(([key, bench]) => (
                    <div key={key} className="card" style={{ marginBottom: '12px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{bench.name}</div>
                          <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>
                            ${bench.currentPrice.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', color: bench.change1y > 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                            {bench.change1y > 0 ? '+' : ''}{bench.change1y}%
                          </div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>1Y Return</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3>Fund Performance</h3>
                <div style={{ marginTop: '16px' }}>
                  <div className="card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Value</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>
                      ${portfolio ? portfolio.totalUsd : 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                      {portfolio ? Object.keys(portfolio.holdings).length : 0} assets held
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading performance data...</p>
          )}
        </section>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <section className="card">
          <h2>⏰ Recent Cycles</h2>
          {history.length > 0 ? (
            <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
              {history.map((cycle, idx) => (
                <div key={idx} className="card" style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600' }}>Cycle {history.length - idx}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      {new Date(cycle.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <div style={{ color: '#9ca3af' }}>Portfolio</div>
                      <div style={{ fontWeight: '600', marginTop: '4px' }}>${cycle.portfolio.totalUsd}</div>
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af' }}>Trades</div>
                      <div style={{ fontWeight: '600', marginTop: '4px', color: '#60a5fa' }}>
                        {cycle.trades.filter(t => t.success).length}/{cycle.trades.length}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af' }}>Duration</div>
                      <div style={{ fontWeight: '600', marginTop: '4px' }}>
                        {(cycle.duration / 1000).toFixed(1)}s
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No cycles yet. Run the fund manager to generate data.</p>
          )}
        </section>
      )}
    </main>
  );
}
