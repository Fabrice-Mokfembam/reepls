import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Calendar, Play, Download, Heart, MessageCircle, Volume2, Loader2, Trash2 } from 'lucide-react';
import { useInfinitePodcasts, useDeletePodcast } from '../hooks/usePodcasts';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { formatDuration, formatFileSize } from '../utils';
import type { Podcast } from '../types';

export const PodcastListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [deleteConfirm, setDeleteConfirm] = useState<{ podcastId: string; podcastTitle: string } | null>(null);
  const deletePodcastMutation = useDeletePodcast();

  // Build filters from search query
  const filters = useMemo(() => {
    if (!debouncedSearch.trim()) return undefined;
    return {
      search: debouncedSearch,
    };
  }, [debouncedSearch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePodcasts(filters);

  // Flatten all podcasts from all pages
  const allPodcasts = useMemo(() => {
    if (!data?.pages) return [];
    
    const podcasts = data.pages
      .flatMap((page) => {
        if (page?.results && Array.isArray(page.results)) {
          return page.results;
        }
        // Handle raw API structure
        const rawPage = page as { data?: { podcasts?: Podcast[] } };
        if (rawPage?.data?.podcasts && Array.isArray(rawPage.data.podcasts)) {
          return rawPage.data.podcasts
            .filter((podcast: Podcast) => podcast != null && podcast._id != null)
            .map((podcast: Podcast) => ({
              ...podcast,
              id: podcast._id,
            }));
        }
        return [];
      })
      .filter((podcast): podcast is Podcast => podcast != null && podcast._id != null);
    
    return podcasts;
  }, [data]);

  // Total count from the first page
  const totalPodcasts = useMemo(() => {
    if (!data?.pages?.[0]) return 0;
    const firstPage = data.pages[0];
    const rawPage = firstPage as { totalResults?: number | string; data?: { totalResults?: number | string } };
    const total = rawPage.totalResults || rawPage.data?.totalResults;
    return typeof total === 'string' ? parseInt(total, 10) : total || 0;
  }, [data]);

  const handlePodcastClick = (id: string) => {
    navigate(`/podcast/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, podcast: Podcast) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setDeleteConfirm({ podcastId: podcast.id || podcast._id, podcastTitle: podcast.title });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deletePodcastMutation.mutate(deleteConfirm.podcastId, {
        onSuccess: () => {
          setDeleteConfirm(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Load more when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Podcasts</h2>
            <p className="text-neutral-300 mt-1">Manage and view all published podcasts</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">Error loading podcasts: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Podcasts</h2>
          <p className="text-neutral-300 mt-1">Manage and view all published podcasts</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search podcasts by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Podcasts</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : totalPodcasts.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Plays</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPodcasts.reduce((sum, p) => sum + p.playCount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Downloads</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPodcasts.reduce((sum, p) => sum + p.downloadCount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Public Podcasts</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPodcasts.filter(p => p.isPublic).length.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Podcasts List */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading podcasts...</span>
        </div>
      ) : allPodcasts.length === 0 ? (
        <div className="p-12 text-center bg-neutral-800 rounded-lg border border-neutral-700">
          <Mic className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-300">No podcasts found</p>
          {debouncedSearch && (
            <p className="text-sm text-neutral-400 mt-2">Try adjusting your search query</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPodcasts.map((podcast) => (
              <div
                key={podcast._id}
                onClick={() => handlePodcastClick(podcast.id || podcast._id)}
                className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-primary-400/50 transition-all cursor-pointer group"
              >
              {/* Thumbnail */}
              {podcast.thumbnailUrl ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteClick(e, podcast)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      title="Delete podcast"
                      disabled={deletePodcastMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-primary-400/90 rounded-full">
                        <Play className="w-4 h-4 text-neutral-800" />
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-neutral-800/80 text-neutral-200">
                        {formatDuration(podcast.audio.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-neutral-700 flex items-center justify-center relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteClick(e, podcast)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      title="Delete podcast"
                      disabled={deletePodcastMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary-400 rounded-full">
                        <Play className="w-4 h-4 text-neutral-800" />
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-neutral-800 text-neutral-200">
                        {formatDuration(podcast.audio.duration)}
                      </span>
                    </div>
                  </div>
                  <Volume2 className="w-16 h-16 text-neutral-500" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {podcast.title}
                  </h3>
                  {podcast.subtitle && (
                    <p className="text-sm text-neutral-300 line-clamp-1">{podcast.subtitle}</p>
                  )}
                </div>

                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                  {podcast.description}
                </p>

                {/* Tags */}
                {podcast.tags && podcast.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {podcast.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {podcast.tags.length > 3 && (
                      <span className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300">
                        +{podcast.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-400 border-t border-neutral-700 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{podcast.playCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{podcast.downloadCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{podcast.commentsCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(podcast.createdAt)}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    {podcast.averageRating && podcast.averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-secondary-400" />
                        <span className="text-secondary-400">{podcast.averageRating.toFixed(1)}</span>
                        <span>({podcast.totalRatings || 0})</span>
                      </div>
                    )}
                    <span className="px-2 py-1 rounded bg-neutral-700 text-neutral-300">
                      {formatFileSize(podcast.audio.fileSize)}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded ${
                    podcast.status === 'ready' 
                      ? 'bg-primary-400/20 text-primary-400' 
                      : podcast.status === 'processing'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : podcast.status === 'failed'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-neutral-600 text-neutral-300'
                  }`}>
                    {podcast.status}
                  </span>
                </div>
              </div>
            </div>
            ))}
          </div>

          {/* Load More Button / Loading Indicator */}
          {hasNextPage && (
            <div className="mt-6 text-center">
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center gap-2 text-neutral-300">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more podcasts...</span>
                </div>
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-neutral-800 font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-foreground mb-2">Delete Podcast</h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirm.podcastTitle}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all podcast data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>Audio file from Cloudinary storage</li>
              <li>Related article references (if attached)</li>
              <li>All related data</li>
              <li>The podcast itself</li>
            </ul>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deletePodcastMutation.isPending}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletePodcastMutation.isPending}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deletePodcastMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Podcast'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

