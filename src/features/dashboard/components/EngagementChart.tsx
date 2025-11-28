import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const EngagementChart: React.FC = () => {
  // Generate last 30 days labels
  const labels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Engagements',
        data: labels.map(() => Math.floor(Math.random() * 500) + 200),
        borderColor: '#57c016',
        backgroundColor: 'rgba(87, 192, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Views',
        data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
        borderColor: '#ffcd29',
        backgroundColor: 'rgba(255, 205, 41, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#dedede',
        },
      },
      tooltip: {
        backgroundColor: '#333333',
        titleColor: '#fefefe',
        bodyColor: '#dedede',
        borderColor: '#57c016',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#868686',
          maxTicksLimit: 10,
        },
        grid: {
          color: '#414141',
        },
      },
      y: {
        ticks: {
          color: '#868686',
        },
        grid: {
          color: '#414141',
        },
      },
    },
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Engagement Rate</h3>
        <p className="text-sm text-neutral-300">Monthly evaluation of the ratio of engagements vs views</p>
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
