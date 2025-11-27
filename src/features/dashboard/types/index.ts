export interface DashboardMetrics {
  users: {
    total: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  connections: {
    total: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  reviews: {
    average: number;
    total: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  reports: {
    total: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
}

export interface EngagementData {
  date: string;
  engagement: number;
  views: number;
}
