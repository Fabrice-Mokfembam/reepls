import { apiClient } from '../../../shared/services/apiClient';
import type { 
  GetPodcastsParams, 
  GetPodcastsResponse, 
  GetPodcastsApiResponse, 
  GetPodcastByIdResponse,
  DeletePodcastResponse
} from '../types';

/**
 * Get all podcasts with pagination and filtering
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of podcasts
 */
export const getAllPodcasts = async (params?: GetPodcastsParams): Promise<GetPodcastsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.isPublic) queryParams.append('isPublic', params.isPublic);
  if (params?.authorId) queryParams.append('authorId', params.authorId);
  if (params?.category) queryParams.append('category', params.category);

  const queryString = queryParams.toString();
  const url = `/podcasts${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<GetPodcastsApiResponse>(url);
  
  // Transform the response to match our expected structure
  // API returns: { success, message, data: { podcasts, page, limit, totalPages, totalResults } }
  // We transform to: { success, message, results, page, limit, totalPages, totalResults }
  const transformedData = {
    success: response.data.success,
    message: response.data.message,
    results: (response.data.data?.podcasts || [])
      .filter(podcast => podcast != null && podcast._id != null)
      .map(podcast => ({
        ...podcast,
        id: podcast._id,
      })),
    page: response.data.data?.page || 1,
    limit: response.data.data?.limit || 10,
    totalPages: response.data.data?.totalPages || 0,
    totalResults: response.data.data?.totalResults || 0,
  };
  
  return transformedData;
};

/**
 * Get podcast by ID
 * @param podcastId - MongoDB ObjectId of the podcast
 * @returns Podcast details
 */
export const getPodcastById = async (podcastId: string): Promise<GetPodcastByIdResponse> => {
  const { data } = await apiClient.get<GetPodcastByIdResponse>(`/podcasts/${podcastId}`);
  
  // Map _id to id for convenience
  if (data.podcast) {
    data.podcast = {
      ...data.podcast,
      id: data.podcast._id,
    };
  }
  
  return data;
};

/**
 * Delete podcast by ID
 * @param podcastId - MongoDB ObjectId of the podcast to delete
 * @returns Deleted podcast details
 */
export const deletePodcast = async (podcastId: string): Promise<DeletePodcastResponse> => {
  const { data } = await apiClient.delete<DeletePodcastResponse>(`/podcasts/${podcastId}`);
  
  // Map _id to id for convenience
  if (data.podcast) {
    data.podcast = {
      ...data.podcast,
      id: data.podcast._id,
    };
  }
  
  return data;
};

