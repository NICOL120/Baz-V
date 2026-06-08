import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend, Filler);

export default function PerformanceChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    
    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: 'BAZ Portfolio',
            data: data.map(d => d.baz),
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#60a5fa',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
          },
          {
            label: 'Benchmark Average',
            data: data.map(d => d.benchmark),
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#e5e7eb',
              font: {
                size: 13,
                weight: '500'
              },
              padding: 20,
              boxWidth: 12,
              boxHeight: 12,
              usePointStyle: true,
              pointStyle: 'circle',
            }
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
                return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: false,
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
          x: {
            ticks: {
              color: '#9ca3af',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)',
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
  }, [data]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
