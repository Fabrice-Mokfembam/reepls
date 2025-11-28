import { apiClient } from '../../../shared/services/apiClient';
import type { GetUsersParams, GetUsersResponse, GetUsersApiResponse, GetUserByIdResponse, DeleteUserResponse } from '../types';

/**
 * Get all users with pagination and filtering
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of users
 */
export const getAllUsers = async (params?: GetUsersParams): Promise<GetUsersResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.name) queryParams.append('name', params.name);
  if (params?.role) queryParams.append('role', params.role);
  if (params?.email) queryParams.append('email', params.email);
  if (params?.isAdmin !== undefined) queryParams.append('isAdmin', params.isAdmin.toString());
  if (params?.is_email_verified !== undefined) queryParams.append('is_email_verified', params.is_email_verified.toString());
  if (params?.is_phone_verified !== undefined) queryParams.append('is_phone_verified', params.is_phone_verified.toString());

  const queryString = queryParams.toString();
  const url = `/users${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<GetUsersApiResponse>(url);
  
  // Transform the response to match our expected structure
  // API returns: { success, message, data: { users, page, limit, totalPages, totalResults } }
  // We transform to: { success, message, results, page, limit, totalPages, totalResults }
  const transformedData = {
    success: response.data.success,
    message: response.data.message,
    results: (response.data.data?.users || [])
      .filter(user => user != null && user._id != null)
      .map(user => ({
        ...user,
        id: user._id,
      })),
    page: response.data.data?.page || 1,
    limit: response.data.data?.limit || 20,
    totalPages: response.data.data?.totalPages || 0,
    totalResults: response.data.data?.totalResults || 0,
  };
  
  return transformedData;
};

/**
 * Get user by ID
 * @param userId - MongoDB ObjectId of the user
 * @returns User details
 */
export const getUserById = async (userId: string): Promise<GetUserByIdResponse> => {
  const { data } = await apiClient.get<GetUserByIdResponse>(`/users/${userId}`);
  
  // Map _id to id for convenience
  if (data.user) {
    data.user = {
      ...data.user,
      id: data.user._id,
    };
  }
  
  return data;
};

/**
 * Delete user by ID
 * @param userId - MongoDB ObjectId of the user to delete
 * @returns Deleted user details
 */
export const deleteUser = async (userId: string): Promise<DeleteUserResponse> => {
  const { data } = await apiClient.delete<DeleteUserResponse>(`/users/${userId}`);
  
  // Map _id to id for convenience
  if (data.user) {
    data.user = {
      ...data.user,
      id: data.user._id,
    };
  }
  
  return data;
};


