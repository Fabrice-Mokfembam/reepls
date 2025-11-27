import React from 'react';
import { Users, Link, Star, FileText } from 'lucide-react';

const metrics = [
  {
    title: 'Number of Users',
    value: '+2,301',
    change: '+30% from last month',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Connections',
    value: '+10,972',
    change: '+102% from last month',
    icon: Link,
    trend: 'up'
  },
  {
    title: 'Reviews',
    value: '4.5/300',
    change: '+10% from last month',
    icon: Star,
    trend: 'up'
  },
  {
    title: 'Reports',
    value: '+93',
    change: '+10% from last month',
    icon: FileText,
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
