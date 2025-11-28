import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, getUserById, deleteUser } from '../api';
import type { GetUsersParams } from '../types';
import { handleMutationError } from '../../../shared/utils/mutationErrorHandler';
import { toast } from 'react-toastify';

/**
 * Hook to get all users with infinite scroll pagination
 * @param filters - Optional filters for users
 * @returns Infinite query result with users
 */
export const useInfiniteUsers = (filters?: Omit<GetUsersParams, 'page' | 'limit'>) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', filters] as const,
    queryFn: ({ pageParam = 1 }) => {
      return getAllUsers({
        ...filters,
        page: pageParam,
        limit: 20, // Load 20 users per page
      });
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      // Based on the API response structure: {success: true, page: "1", totalPages: 2, totalResults: 32, results: [...]}
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
 * Hook to get all users with pagination (non-infinite)
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Query result with users
 */
export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ['users', params] as const,
    queryFn: () => getAllUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get a single user by ID
 * @param userId - MongoDB ObjectId of the user
 * @param enabled - Whether the query should run (default: true)
 * @returns Query result with user details
 */
export const useUserById = (userId: string | undefined, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => {
      if (!userId) throw new Error('User ID is required');
      return getUserById(userId);
    },
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete a user by ID
 * @returns Mutation for deleting a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (data, userId) => {
      // Invalidate and refetch users queries
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      
      // Show success message
      toast.success(data.message || 'User deleted successfully', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};


