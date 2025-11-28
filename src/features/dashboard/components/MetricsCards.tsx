import React from 'react';
import { Users, FileText, Mic, Radio } from 'lucide-react';

const metrics = [
  {
    title: 'Total Users',
    value: '12,543',
    change: '+234 new this month',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Total Articles',
    value: '89,432',
    change: '+1,234 this month',
    icon: FileText,
    trend: 'up'
  },
  {
    title: 'Total Podcasts',
    value: '2,341',
    change: '+89 this month',
    icon: Mic,
    trend: 'up'
  },
  {
    title: 'Total Streams',
    value: '456',
    change: '+23 this month',
    icon: Radio,
    trend: 'up'
  }
];

export const MetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-400/20 rounded-lg">
                <Icon className="w-6 h-6 text-primary-400" />
              </div>
            </div>
            <h3 className="text-sm text-neutral-300 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
            <p className="text-sm text-primary-400">{metric.change}</p>
          </div>
        );
      })}
    </div>
  );
};
