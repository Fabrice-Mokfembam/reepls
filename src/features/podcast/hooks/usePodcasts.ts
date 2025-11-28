import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPodcasts, getPodcastById, deletePodcast } from '../api';
import type { GetPodcastsParams } from '../types';
import { handleMutationError } from '../../../shared/utils/mutationErrorHandler';
import { toast } from 'react-toastify';

/**
 * Hook to get all podcasts with infinite scroll pagination
 * @param filters - Optional filters for podcasts
 * @returns Infinite query result with podcasts
 */
export const useInfinitePodcasts = (filters?: Omit<GetPodcastsParams, 'page' | 'limit'>) => {
  return useInfiniteQuery({
    queryKey: ['podcasts', 'infinite', filters] as const,
    queryFn: ({ pageParam = 1 }) => {
      return getAllPodcasts({
        ...filters,
        page: pageParam,
        limit: 20, // Load 20 podcasts per page
      });
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      // Based on the API response structure
      const currentPage = allPages.length;
      const totalPages = typeof lastPage?.totalPages === 'string' 
        ? parseInt(lastPage.totalPages, 10) 
        : lastPage?.totalPages;
      
      if (totalPages && currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined; // No more pages
    },
  });
};

/**
 * Hook to get all podcasts with pagination (non-infinite)
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Query result with podcasts
 */
export const usePodcasts = (params?: GetPodcastsParams) => {
  return useQuery({
    queryKey: ['podcasts', params] as const,
    queryFn: () => getAllPodcasts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get a single podcast by ID
 * @param podcastId - MongoDB ObjectId of the podcast
 * @param enabled - Whether the query should run (default: true)
 * @returns Query result with podcast details
 */
export const usePodcastById = (podcastId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['podcast', podcastId],
    queryFn: () => {
      if (!podcastId) throw new Error('Podcast ID is required');
      return getPodcastById(podcastId);
    },
    enabled: enabled && !!podcastId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete a podcast by ID
 * @returns Mutation for deleting a podcast
 */
export const useDeletePodcast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (podcastId: string) => deletePodcast(podcastId),
    onSuccess: (data, podcastId) => {
      // Invalidate and refetch podcasts queries
      queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      queryClient.invalidateQueries({ queryKey: ['podcast', podcastId] });
      
      // Show success message
      toast.success(data.message || 'Podcast deleted successfully', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};

