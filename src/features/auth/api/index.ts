import { apiClient } from '../../../shared/services/apiClient';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterAdminRequest,
  RegisterAdminResponse,
  RefreshTokenResponse 
} from '../types';

/**
 * Admin login API call
 * @param credentials - Email and password
 * @returns Login response with admin data and tokens
 */
export const adminLogin = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/login', credentials);
  return data;
};

/**
 * Refresh authentication tokens
 * @param refreshToken - The refresh token to use
 * @returns New access and refresh tokens
 */
export const refreshAuthTokens = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const { data } = await apiClient.post<RefreshTokenResponse>('/refresh-token', {
    refreshToken,
  });
  return data;
};

/**
 * Admin registration API call
 * @param adminData - Admin registration data
 * @returns Registration response with admin data
 */
export const registerAdmin = async (adminData: RegisterAdminRequest): Promise<RegisterAdminResponse> => {
  const { data } = await apiClient.post<RegisterAdminResponse>('/register', adminData);
  return data;
};

/**
 * Admin logout API call
 * @returns Success response
 */
export const adminLogout = async (): Promise<{ success: boolean; message: string }> => {
  const { data } = await apiClient.post<{ success: boolean; message: string }>('/logout');
  return data;
};

