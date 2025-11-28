import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPublications, getPublicationById, deletePublication } from '../api';
import type { GetPublicationsParams } from '../types';
import { handleMutationError } from '../../../shared/utils/mutationErrorHandler';
import { toast } from 'react-toastify';

/**
 * Hook to get all publications with infinite scroll pagination
 * @param filters - Optional filters for publications
 * @returns Infinite query result with publications
 */
export const useInfinitePublications = (filters?: Omit<GetPublicationsParams, 'page' | 'limit'>) => {
  return useInfiniteQuery({
    queryKey: ['publications', 'infinite', filters] as const,
    queryFn: ({ pageParam = 1 }) => {
      return getAllPublications({
        ...filters,
        page: pageParam,
        limit: 20, // Load 20 publications per page
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
 * Hook to get all publications with pagination (non-infinite)
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Query result with publications
 */
export const usePublications = (params?: GetPublicationsParams) => {
  return useQuery({
    queryKey: ['publications', params] as const,
    queryFn: () => getAllPublications(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get a single publication by ID
 * @param publicationId - MongoDB ObjectId of the publication
 * @param enabled - Whether the query should run (default: true)
 * @returns Query result with publication details
 */
export const usePublicationById = (publicationId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['publication', publicationId],
    queryFn: () => {
      if (!publicationId) throw new Error('Publication ID is required');
      return getPublicationById(publicationId);
    },
    enabled: enabled && !!publicationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete a publication by ID
 * @returns Mutation for deleting a publication
 */
export const useDeletePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (publicationId: string) => deletePublication(publicationId),
    onSuccess: (data, publicationId) => {
      // Invalidate and refetch publications queries
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      queryClient.invalidateQueries({ queryKey: ['publication', publicationId] });
      
      // Show success message
      toast.success(data.message || 'Publication deleted successfully', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};

