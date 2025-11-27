export interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

export type TimePeriod = 'Day' | 'Week' | 'Month' | 'Year';
