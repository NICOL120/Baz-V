import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

export default function AssetComparisonChart({ benchmarks }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    
    chartRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: benchmarks.map(b => b.name),
        datasets: [{
          label: 'Asset Value (USD)',
          data: benchmarks.map(b => b.value),
          backgroundColor: benchmarks.map(b => b.color),
          borderColor: benchmarks.map(b => b.color),
          borderWidth: 1,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return '$' + context.parsed.x.toLocaleString();
              }
            }
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 1500000,
            ticks: {
              color: '#9ca3af',
              callback: function(value) {
                return '$' + (value / 1000000).toFixed(1) + 'M';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)',
            }
          },
          y: {
            ticks: {
              color: '#e5e7eb',
              font: {
                weight: '500'
              }
            },
            grid: {
              display: false,
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [benchmarks]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
