import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllArticles, getArticleById, deleteArticle } from '../api';
import type { GetArticlesParams } from '../types';
import { handleMutationError } from '../../../shared/utils/mutationErrorHandler';
import { toast } from 'react-toastify';

/**
 * Hook to get all articles with infinite scroll pagination
 * @param filters - Optional filters for articles
 * @returns Infinite query result with articles
 */
export const useInfiniteArticles = (filters?: Omit<GetArticlesParams, 'page' | 'limit'>) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', filters] as const,
    queryFn: ({ pageParam = 1 }) => {
      return getAllArticles({
        ...filters,
        page: pageParam,
        limit: 20, // Load 20 articles per page
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
 * Hook to get all articles with pagination (non-infinite)
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Query result with articles
 */
export const useArticles = (params?: GetArticlesParams) => {
  return useQuery({
    queryKey: ['articles', params] as const,
    queryFn: () => getAllArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get a single article by ID
 * @param articleId - MongoDB ObjectId of the article
 * @param enabled - Whether the query should run (default: true)
 * @returns Query result with article details
 */
export const useArticleById = (articleId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => {
      if (!articleId) throw new Error('Article ID is required');
      return getArticleById(articleId);
    },
    enabled: enabled && !!articleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete an article by ID
 * @returns Mutation for deleting an article
 */
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: string) => deleteArticle(articleId),
    onSuccess: (data, articleId) => {
      // Invalidate and refetch articles queries
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      
      // Show success message
      toast.success(data.message || 'Article deleted successfully', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};

