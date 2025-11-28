import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Users, FileText, MessageSquare, Mic, TrendingUp, User as UserIcon } from 'lucide-react';
import { platformAnalytics, getUserAnalytics, getAvailableUsers } from '../data/mockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ActivityLogPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const availableUsers = getAvailableUsers();
  const userAnalytics = selectedUser ? getUserAnalytics(selectedUser) : null;

  // Chart options
  const lineChartOptions = {
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

  const barChartOptions = {
    ...lineChartOptions,
    plugins: {
      ...lineChartOptions.plugins,
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#dedede',
          padding: 15,
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
  };

  // Platform-wide charts data
  const postsOverTimeData = {
    labels: platformAnalytics.postsByDay.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Posts',
        data: platformAnalytics.postsByDay.map(item => item.count),
        borderColor: '#57c016',
        backgroundColor: 'rgba(87, 192, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const contentComparisonData = {
    labels: platformAnalytics.postsByDay.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Posts',
        data: platformAnalytics.postsByDay.map(item => item.count),
        backgroundColor: '#57c016',
      },
      {
        label: 'Articles',
        data: platformAnalytics.articlesByDay.map(item => item.count),
        backgroundColor: '#ffcd29',
      },
    ],
  };

  const contentByCategoryData = {
    labels: platformAnalytics.contentByCategory.map(item => item.category),
    datasets: [
      {
        data: platformAnalytics.contentByCategory.map(item => item.count),
        backgroundColor: [
          '#57c016',
          '#ffcd29',
          '#469117',
          '#e9b50c',
          '#aefd7d',
          '#ffd95c',
          '#7ef038',
          '#ffe58f',
        ],
        borderWidth: 0,
      },
    ],
  };

  const engagementData = {
    labels: platformAnalytics.engagementByType.map(item => item.type),
    datasets: [
      {
        data: platformAnalytics.engagementByType.map(item => item.count),
        backgroundColor: [
          '#57c016',
          '#ffcd29',
          '#469117',
          '#e9b50c',
        ],
        borderWidth: 0,
      },
    ],
  };

  // User-specific charts data
  const userPostingTrendData = userAnalytics ? {
    labels: userAnalytics.postingTrend.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Posts',
        data: userAnalytics.postingTrend.map(item => item.posts),
        borderColor: '#57c016',
        backgroundColor: 'rgba(87, 192, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Articles',
        data: userAnalytics.postingTrend.map(item => item.articles),
        borderColor: '#ffcd29',
        backgroundColor: 'rgba(255, 205, 41, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const userEngagementTrendData = userAnalytics ? {
    labels: userAnalytics.engagementTrend.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Likes',
        data: userAnalytics.engagementTrend.map(item => item.likes),
        borderColor: '#57c016',
        backgroundColor: 'rgba(87, 192, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: userAnalytics.engagementTrend.map(item => item.comments),
        borderColor: '#ffcd29',
        backgroundColor: 'rgba(255, 205, 41, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Reposts',
        data: userAnalytics.engagementTrend.map(item => item.reposts),
        borderColor: '#469117',
        backgroundColor: 'rgba(70, 145, 23, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const userContentBreakdownData = userAnalytics ? {
    labels: userAnalytics.contentBreakdown.map(item => item.type),
    datasets: [
      {
        data: userAnalytics.contentBreakdown.map(item => item.count),
        backgroundColor: [
          '#57c016',
          '#ffcd29',
          '#469117',
          '#e9b50c',
        ],
        borderWidth: 0,
      },
    ],
  } : null;

  const userActivityByHourData = userAnalytics ? {
    labels: userAnalytics.activityByHour.map(item => `${item.hour}:00`),
    datasets: [
      {
        label: 'Activity Count',
        data: userAnalytics.activityByHour.map(item => item.count),
        backgroundColor: '#57c016',
        borderRadius: 4,
      },
    ],
  } : null;

  const userWeeklyActivityData = userAnalytics ? {
    labels: userAnalytics.weeklyActivity.map(item => item.day),
    datasets: [
      {
        label: 'Activity',
        data: userAnalytics.weeklyActivity.map(item => item.count),
        backgroundColor: '#ffcd29',
        borderRadius: 4,
      },
    ],
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Activity Log</h2>
          <p className="text-neutral-300 mt-1">Platform analytics and user activity insights</p>
        </div>
      </div>

      {/* Platform Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-400/20 rounded-lg">
              <Users className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-sm text-neutral-300 mb-1">Total Users</h3>
          <p className="text-2xl font-bold text-foreground">{platformAnalytics.totalUsers.toLocaleString()}</p>
          <p className="text-sm text-primary-400 mt-2">+{platformAnalytics.newUsers} new this month</p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-400/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-sm text-neutral-300 mb-1">Total Posts</h3>
          <p className="text-2xl font-bold text-foreground">{platformAnalytics.totalPosts.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-400/20 rounded-lg">
              <FileText className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-sm text-neutral-300 mb-1">Total Articles</h3>
          <p className="text-2xl font-bold text-foreground">{platformAnalytics.totalArticles.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-400/20 rounded-lg">
              <Mic className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-sm text-neutral-300 mb-1">Total Podcasts</h3>
          <p className="text-2xl font-bold text-foreground">{platformAnalytics.totalPodcasts.toLocaleString()}</p>
        </div>
      </div>

      {/* Platform Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts Over Time */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Posts Over Time (30 Days)</h3>
            <p className="text-sm text-neutral-300">Daily post creation trend</p>
          </div>
          <div className="h-64">
            <Line data={postsOverTimeData} options={lineChartOptions} />
          </div>
        </div>

        {/* Content Comparison */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Content Comparison</h3>
            <p className="text-sm text-neutral-300">Posts vs Articles over time</p>
          </div>
          <div className="h-64">
            <Bar data={contentComparisonData} options={barChartOptions} />
          </div>
        </div>

        {/* Content by Category */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Content by Category</h3>
            <p className="text-sm text-neutral-300">Distribution of content across categories</p>
          </div>
          <div className="h-64">
            <Pie data={contentByCategoryData} options={pieChartOptions} />
          </div>
        </div>

        {/* Engagement Types */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Engagement Types</h3>
            <p className="text-sm text-neutral-300">Breakdown of user engagements</p>
          </div>
          <div className="h-64">
            <Doughnut data={engagementData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* User Selection */}
      <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Individual User Analytics</h3>
            <p className="text-sm text-neutral-300">Select a user to view their detailed activity</p>
          </div>
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-neutral-300" />
            <select
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value || null)}
              className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent min-w-[200px]"
            >
              <option value="">Select a user...</option>
              {availableUsers.map(user => (
                <option key={user.username} value={user.username}>
                  {user.name} (@{user.username})
                </option>
              ))}
            </select>
          </div>
        </div>

        {userAnalytics ? (
          <div className="space-y-6">
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neutral-700 rounded-lg p-4">
                <p className="text-sm text-neutral-300 mb-1">Total Posts</p>
                <p className="text-xl font-bold text-foreground">
                  {userAnalytics.contentBreakdown.find(c => c.type === 'Posts')?.count || 0}
                </p>
              </div>
              <div className="bg-neutral-700 rounded-lg p-4">
                <p className="text-sm text-neutral-300 mb-1">Total Articles</p>
                <p className="text-xl font-bold text-foreground">
                  {userAnalytics.contentBreakdown.find(c => c.type === 'Articles')?.count || 0}
                </p>
              </div>
              <div className="bg-neutral-700 rounded-lg p-4">
                <p className="text-sm text-neutral-300 mb-1">Total Podcasts</p>
                <p className="text-xl font-bold text-foreground">
                  {userAnalytics.contentBreakdown.find(c => c.type === 'Podcasts')?.count || 0}
                </p>
              </div>
              <div className="bg-neutral-700 rounded-lg p-4">
                <p className="text-sm text-neutral-300 mb-1">Total Reposts</p>
                <p className="text-xl font-bold text-foreground">
                  {userAnalytics.contentBreakdown.find(c => c.type === 'Reposts')?.count || 0}
                </p>
              </div>
            </div>

            {/* User Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Posting Trend */}
              <div className="bg-neutral-700 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-foreground mb-1">Posting Trend</h4>
                  <p className="text-sm text-neutral-300">Posts and articles over time</p>
                </div>
                <div className="h-64">
                  {userPostingTrendData && (
                    <Line data={userPostingTrendData} options={lineChartOptions} />
                  )}
                </div>
              </div>

              {/* Engagement Trend */}
              <div className="bg-neutral-700 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-foreground mb-1">Engagement Trend</h4>
                  <p className="text-sm text-neutral-300">Likes, comments, and reposts over time</p>
                </div>
                <div className="h-64">
                  {userEngagementTrendData && (
                    <Line data={userEngagementTrendData} options={lineChartOptions} />
                  )}
                </div>
              </div>

              {/* Content Breakdown */}
              <div className="bg-neutral-700 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-foreground mb-1">Content Breakdown</h4>
                  <p className="text-sm text-neutral-300">Distribution of content types</p>
                </div>
                <div className="h-64">
                  {userContentBreakdownData && (
                    <Pie data={userContentBreakdownData} options={pieChartOptions} />
                  )}
                </div>
              </div>

              {/* Activity by Hour */}
              <div className="bg-neutral-700 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-foreground mb-1">Activity by Hour</h4>
                  <p className="text-sm text-neutral-300">Peak activity times throughout the day</p>
                </div>
                <div className="h-64">
                  {userActivityByHourData && (
                    <Bar data={userActivityByHourData} options={barChartOptions} />
                  )}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-neutral-700 rounded-lg p-6 lg:col-span-2">
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-foreground mb-1">Weekly Activity</h4>
                  <p className="text-sm text-neutral-300">Activity distribution across the week</p>
                </div>
                <div className="h-64">
                  {userWeeklyActivityData && (
                    <Bar data={userWeeklyActivityData} options={barChartOptions} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-300">Select a user to view their detailed analytics</p>
          </div>
        )}
      </div>
    </div>
  );
};

