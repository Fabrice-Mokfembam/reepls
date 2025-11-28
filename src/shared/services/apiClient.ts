import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { API_URL, STORAGE_KEY } from '../constants';
import {
  decryptLoginData,
  encryptAndStoreLoginData,
  getDecryptedAccessToken,
  getDecryptedRefreshToken,
} from '../../features/auth/utils/Encryption';
import { refreshAuthTokens } from '../../features/auth/api';

/**
 * Main API client for JSON requests
 * Base URL: API_URL (includes /api-v1/admin)
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API client for multipart/form-data requests (file uploads)
 */
const apiClient1: AxiosInstance = axios.create({
  baseURL: `${API_URL}/admin`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Request interceptor to add Authorization header
 * Adds Bearer token to all requests except login and refresh-token
 * Note: Admin registration requires authentication
 */
const addAuthHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getDecryptedAccessToken();
  // Don't add Authorization header for login or refresh-token endpoints
  // Admin registration requires authentication, so it's not in the public list
  const publicEndpoints = ['/login', '/refresh-token'];
  const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
  
  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

/**
 * Response interceptor for handling token expiration
 * Automatically refreshes tokens on 401 errors
 */
const handleTokenRefresh = async (error: any) => {
  const originalRequest = error.config;

  // If error is 401 and we haven't retried yet
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = getDecryptedRefreshToken();

    if (refreshToken) {
      try {
        const data = await refreshAuthTokens(refreshToken);
        if (!data.accessToken) {
          throw new Error('No access token received');
        }

        // Decrypt existing login data to update it
        const decryptedData = decryptLoginData();
        if (!decryptedData) {
          throw new Error('No login data found');
        }

        // Update tokens in decrypted data
        decryptedData.tokens.access.token = data.accessToken;
        decryptedData.tokens.refresh.token = data.refreshToken;

        // Re-encrypt and store updated login data
        encryptAndStoreLoginData(decryptedData);

        // Update headers before retrying the request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return apiClient(originalRequest);
      } catch (e) {
        toast.info('Please login again', {
          autoClose: 3000,
        });

        // Clear encrypted login data on token refresh failure
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
  }

  return Promise.reject(error);
};

// Apply interceptors to apiClient (JSON)
apiClient.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));
apiClient.interceptors.response.use((response) => response, handleTokenRefresh);

// Apply interceptors to apiClient1 (multipart/form-data)
apiClient1.interceptors.request.use(addAuthHeader, (error) => Promise.reject(error));
apiClient1.interceptors.response.use((response) => response, handleTokenRefresh);

export { apiClient, apiClient1 };

