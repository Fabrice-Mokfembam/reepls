import React, { useMemo } from 'react';
import { Users, FileText, Mic, Radio, Loader2 } from 'lucide-react';
import { useUsers } from '../../user-management/hooks/useUsers';
import { useArticles } from '../../articles/hooks/useArticles';
import { usePodcasts } from '../../podcast/hooks/usePodcasts';
import { usePublications } from '../../streams/hooks/usePublications';

export const MetricsCards: React.FC = () => {
  // Fetch data for all metrics
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, limit: 1 });
  const { data: articlesData, isLoading: articlesLoading } = useArticles({ page: 1, limit: 1 });
  const { data: podcastsData, isLoading: podcastsLoading } = usePodcasts({ page: 1, limit: 1 });
  const { data: publicationsData, isLoading: publicationsLoading } = usePublications({ page: 1, limit: 1 });

  const metrics = useMemo(() => {
    const totalUsers = typeof usersData?.totalResults === 'string' 
      ? parseInt(usersData.totalResults, 10) 
      : usersData?.totalResults || 0;
    
    const totalArticles = typeof articlesData?.totalResults === 'string' 
      ? parseInt(articlesData.totalResults, 10) 
      : articlesData?.totalResults || 0;
    
    const totalPodcasts = typeof podcastsData?.totalResults === 'string' 
      ? parseInt(podcastsData.totalResults, 10) 
      : podcastsData?.totalResults || 0;
    
    const totalPublications = typeof publicationsData?.totalResults === 'string' 
      ? parseInt(publicationsData.totalResults, 10) 
      : publicationsData?.totalResults || 0;

    return [
      {
        title: 'Total Users',
        value: totalUsers.toLocaleString(),
        change: 'All registered users',
        icon: Users,
        isLoading: usersLoading
      },
      {
        title: 'Total Articles',
        value: totalArticles.toLocaleString(),
        change: 'All published articles',
        icon: FileText,
        isLoading: articlesLoading
      },
      {
        title: 'Total Podcasts',
        value: totalPodcasts.toLocaleString(),
        change: 'All podcast episodes',
        icon: Mic,
        isLoading: podcastsLoading
      },
      {
        title: 'Total Streams',
        value: totalPublications.toLocaleString(),
        change: 'All publications/streams',
        icon: Radio,
        isLoading: publicationsLoading
      }
    ];
  }, [usersData, articlesData, podcastsData, publicationsData, usersLoading, articlesLoading, podcastsLoading, publicationsLoading]);

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
            {metric.isLoading ? (
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                <span className="text-2xl font-bold text-foreground">Loading...</span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
            )}
            <p className="text-sm text-primary-400">{metric.change}</p>
          </div>
        );
      })}
    </div>
  );
};
