import { apiClient } from '../../../shared/services/apiClient';
import type { 
  GetPublicationsParams, 
  GetPublicationsResponse, 
  GetPublicationsApiResponse, 
  GetPublicationByIdResponse,
  DeletePublicationResponse
} from '../types';

/**
 * Get all publications with pagination and filtering
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of publications
 */
export const getAllPublications = async (params?: GetPublicationsParams): Promise<GetPublicationsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.isDeleted) queryParams.append('isDeleted', params.isDeleted);
  if (params?.isPublic) queryParams.append('isPublic', params.isPublic);
  if (params?.ownerId) queryParams.append('ownerId', params.ownerId);
  if (params?.category) queryParams.append('category', params.category);

  const queryString = queryParams.toString();
  const url = `/publications${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<GetPublicationsApiResponse>(url);
  
  // Transform the response to match our expected structure
  // API returns: { success, message, data: { publications, page, limit, totalPages, totalResults } }
  // We transform to: { success, message, results, page, limit, totalPages, totalResults }
  const transformedData = {
    success: response.data.success,
    message: response.data.message,
    results: (response.data.data?.publications || [])
      .filter(publication => publication != null && publication._id != null)
      .map(publication => ({
        ...publication,
        id: publication._id,
      })),
    page: response.data.data?.page || 1,
    limit: response.data.data?.limit || 10,
    totalPages: response.data.data?.totalPages || 0,
    totalResults: response.data.data?.totalResults || 0,
  };
  
  return transformedData;
};

/**
 * Get publication by ID
 * @param publicationId - MongoDB ObjectId of the publication
 * @returns Publication details
 */
export const getPublicationById = async (publicationId: string): Promise<GetPublicationByIdResponse> => {
  const { data } = await apiClient.get<GetPublicationByIdResponse>(`/publications/${publicationId}`);
  
  // Map _id to id for convenience
  if (data.publication) {
    data.publication = {
      ...data.publication,
      id: data.publication._id,
    };
  }
  
  return data;
};

/**
 * Delete publication by ID
 * @param publicationId - MongoDB ObjectId of the publication to delete
 * @returns Deleted publication details
 */
export const deletePublication = async (publicationId: string): Promise<DeletePublicationResponse> => {
  const { data } = await apiClient.delete<DeletePublicationResponse>(`/publications/${publicationId}`);
  
  // Map _id to id for convenience
  if (data.publication) {
    data.publication = {
      ...data.publication,
      id: data.publication._id,
    };
  }
  
  return data;
};

