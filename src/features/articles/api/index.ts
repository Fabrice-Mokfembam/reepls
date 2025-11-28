import { apiClient } from '../../../shared/services/apiClient';
import type { 
  GetArticlesParams, 
  GetArticlesResponse, 
  GetArticlesApiResponse, 
  GetArticleByIdResponse,
  DeleteArticleResponse
} from '../types';

/**
 * Get all articles with pagination and filtering
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of articles
 */
export const getAllArticles = async (params?: GetArticlesParams): Promise<GetArticlesResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.isArticle) queryParams.append('isArticle', params.isArticle);
  if (params?.authorId) queryParams.append('authorId', params.authorId);
  if (params?.category) queryParams.append('category', params.category);

  const queryString = queryParams.toString();
  const url = `/articles${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<GetArticlesApiResponse>(url);
  
  // Transform the response to match our expected structure
  // API returns: { success, message, data: { articles, page, limit, totalPages, totalResults } }
  // We transform to: { success, message, results, page, limit, totalPages, totalResults }
  const transformedData = {
    success: response.data.success,
    message: response.data.message,
    results: (response.data.data?.articles || [])
      .filter(article => article != null && article._id != null)
      .map(article => ({
        ...article,
        id: article._id,
      })),
    page: response.data.data?.page || 1,
    limit: response.data.data?.limit || 10,
    totalPages: response.data.data?.totalPages || 0,
    totalResults: response.data.data?.totalResults || 0,
  };
  
  return transformedData;
};

/**
 * Get article by ID
 * @param articleId - MongoDB ObjectId of the article
 * @returns Article details
 */
export const getArticleById = async (articleId: string): Promise<GetArticleByIdResponse> => {
  const { data } = await apiClient.get<GetArticleByIdResponse>(`/articles/${articleId}`);
  
  // Map _id to id for convenience
  if (data.article) {
    data.article = {
      ...data.article,
      id: data.article._id,
    };
  }
  
  return data;
};

/**
 * Delete article by ID
 * @param articleId - MongoDB ObjectId of the article to delete
 * @returns Deleted article details
 */
export const deleteArticle = async (articleId: string): Promise<DeleteArticleResponse> => {
  const { data } = await apiClient.delete<DeleteArticleResponse>(`/articles/${articleId}`);
  
  // Map _id to id for convenience
  if (data.article) {
    data.article = {
      ...data.article,
      id: data.article._id,
    };
  }
  
  return data;
};

