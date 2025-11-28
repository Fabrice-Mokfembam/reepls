import React from 'react';
import { MetricsCards } from '../components/MetricsCards';
import { EngagementChart } from '../components/EngagementChart';
import { RecentUsers } from '../components/RecentUsers';
import { TimePeriodSelector } from '../components/TimePeriodSelector';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-neutral-300 mt-1">Overview of platform statistics and activity</p>
        </div>
        <TimePeriodSelector />
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts and Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart />
        <RecentUsers />
      </div>
    </div>
  );
};
