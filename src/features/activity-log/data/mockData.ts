// Mock data for Activity Log analytics

export interface PlatformAnalytics {
  totalUsers: number;
  totalPosts: number;
  totalArticles: number;
  totalPodcasts: number;
  activeUsers: number;
  newUsers: number;
  postsByDay: { date: string; count: number }[];
  articlesByDay: { date: string; count: number }[];
  usersByDay: { date: string; count: number }[];
  contentByCategory: { category: string; count: number }[];
  engagementByType: { type: string; count: number }[];
  topUsers: { username: string; posts: number; articles: number; total: number }[];
}

export interface UserAnalytics {
  username: string;
  name: string;
  postingTrend: { date: string; posts: number; articles: number }[];
  engagementTrend: { date: string; likes: number; comments: number; reposts: number }[];
  contentBreakdown: { type: string; count: number }[];
  activityByHour: { hour: number; count: number }[];
  weeklyActivity: { day: string; count: number }[];
}

// Generate dates for the last 30 days
const generateDates = (days: number) => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Platform-wide analytics
export const platformAnalytics: PlatformAnalytics = {
  totalUsers: 12543,
  totalPosts: 89432,
  totalArticles: 12345,
  totalPodcasts: 2341,
  activeUsers: 3421,
  newUsers: 234,
  postsByDay: generateDates(30).map(date => ({
    date,
    count: Math.floor(Math.random() * 500) + 200
  })),
  articlesByDay: generateDates(30).map(date => ({
    date,
    count: Math.floor(Math.random() * 150) + 50
  })),
  usersByDay: generateDates(30).map(date => ({
    date,
    count: Math.floor(Math.random() * 50) + 10
  })),
  contentByCategory: [
    { category: 'Technology', count: 3421 },
    { category: 'Science', count: 2890 },
    { category: 'Politics', count: 2341 },
    { category: 'Health & Wellness', count: 1987 },
    { category: 'Art', count: 1654 },
    { category: 'Sports', count: 1432 },
    { category: 'Music', count: 1234 },
    { category: 'Literature', count: 987 }
  ],
  engagementByType: [
    { type: 'Likes', count: 234567 },
    { type: 'Comments', count: 45678 },
    { type: 'Reposts', count: 34567 },
    { type: 'Shares', count: 23456 }
  ],
  topUsers: [
    { username: 'mokfembam', posts: 234, articles: 45, total: 279 },
    { username: 'techwriter', posts: 189, articles: 67, total: 256 },
    { username: 'scienceguru', posts: 156, articles: 89, total: 245 },
    { username: 'artlover', posts: 198, articles: 34, total: 232 },
    { username: 'sportsexpert', posts: 167, articles: 52, total: 219 }
  ]
};

// Individual user analytics
export const userAnalyticsData: Record<string, UserAnalytics> = {
  mokfembam: {
    username: 'mokfembam',
    name: 'Mokfembam🕞⚽',
    postingTrend: generateDates(30).map(date => ({
      date,
      posts: Math.floor(Math.random() * 10) + 2,
      articles: Math.floor(Math.random() * 3)
    })),
    engagementTrend: generateDates(30).map(date => ({
      date,
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      reposts: Math.floor(Math.random() * 30) + 5
    })),
    contentBreakdown: [
      { type: 'Posts', count: 234 },
      { type: 'Articles', count: 45 },
      { type: 'Podcasts', count: 12 },
      { type: 'Reposts', count: 67 }
    ],
    activityByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: Math.floor(Math.random() * 50) + (i >= 8 && i <= 22 ? 20 : 5)
    })),
    weeklyActivity: [
      { day: 'Monday', count: 45 },
      { day: 'Tuesday', count: 52 },
      { day: 'Wednesday', count: 38 },
      { day: 'Thursday', count: 61 },
      { day: 'Friday', count: 48 },
      { day: 'Saturday', count: 34 },
      { day: 'Sunday', count: 28 }
    ]
  },
  techwriter: {
    username: 'techwriter',
    name: 'Tech Writer',
    postingTrend: generateDates(30).map(date => ({
      date,
      posts: Math.floor(Math.random() * 8) + 1,
      articles: Math.floor(Math.random() * 4) + 1
    })),
    engagementTrend: generateDates(30).map(date => ({
      date,
      likes: Math.floor(Math.random() * 300) + 100,
      comments: Math.floor(Math.random() * 80) + 20,
      reposts: Math.floor(Math.random() * 50) + 10
    })),
    contentBreakdown: [
      { type: 'Posts', count: 189 },
      { type: 'Articles', count: 67 },
      { type: 'Podcasts', count: 8 },
      { type: 'Reposts', count: 45 }
    ],
    activityByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: Math.floor(Math.random() * 40) + (i >= 9 && i <= 18 ? 25 : 3)
    })),
    weeklyActivity: [
      { day: 'Monday', count: 38 },
      { day: 'Tuesday', count: 42 },
      { day: 'Wednesday', count: 35 },
      { day: 'Thursday', count: 48 },
      { day: 'Friday', count: 41 },
      { day: 'Saturday', count: 29 },
      { day: 'Sunday', count: 24 }
    ]
  },
  scienceguru: {
    username: 'scienceguru',
    name: 'Science Guru',
    postingTrend: generateDates(30).map(date => ({
      date,
      posts: Math.floor(Math.random() * 6) + 1,
      articles: Math.floor(Math.random() * 5) + 2
    })),
    engagementTrend: generateDates(30).map(date => ({
      date,
      likes: Math.floor(Math.random() * 250) + 80,
      comments: Math.floor(Math.random() * 60) + 15,
      reposts: Math.floor(Math.random() * 40) + 8
    })),
    contentBreakdown: [
      { type: 'Posts', count: 156 },
      { type: 'Articles', count: 89 },
      { type: 'Podcasts', count: 15 },
      { type: 'Reposts', count: 52 }
    ],
    activityByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: Math.floor(Math.random() * 35) + (i >= 10 && i <= 20 ? 18 : 4)
    })),
    weeklyActivity: [
      { day: 'Monday', count: 32 },
      { day: 'Tuesday', count: 41 },
      { day: 'Wednesday', count: 37 },
      { day: 'Thursday', count: 44 },
      { day: 'Friday', count: 39 },
      { day: 'Saturday', count: 26 },
      { day: 'Sunday', count: 22 }
    ]
  }
};

// Get user analytics by username
export const getUserAnalytics = (username: string): UserAnalytics | null => {
  return userAnalyticsData[username] || null;
};

// Get list of available users for selection
export const getAvailableUsers = () => {
  return Object.values(userAnalyticsData).map(user => ({
    username: user.username,
    name: user.name
  }));
};

