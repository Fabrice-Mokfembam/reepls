import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin, adminLogout, registerAdmin } from '../api';
import { encryptAndStoreLoginData, clearLoginData } from '../utils/Encryption';
import { handleMutationError } from '../../../shared/utils/mutationErrorHandler';
import { ROUTES } from '../../../shared/constants';
import type { LoginRequest, RegisterAdminRequest } from '../types';

/**
 * Hook for admin login
 * Handles login mutation and stores encrypted tokens
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => adminLogin(credentials),
    onSuccess: (data) => {
      // Encrypt and store login data
      encryptAndStoreLoginData({
        admin: data.admin,
        tokens: data.tokens,
      });

      // Show success message
      toast.success(data.message || 'Login successful', {
        autoClose: 2000,
      });

      // Navigate to dashboard
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};

/**
 * Hook for admin registration
 * Handles admin registration mutation
 * Note: Navigation should be handled in the component using this hook
 */
export const useRegisterAdmin = () => {
  return useMutation({
    mutationFn: (adminData: RegisterAdminRequest) => registerAdmin(adminData),
    onSuccess: (data) => {
      // Show success message
      toast.success(data.message || 'Admin created successfully', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });
};

/**
 * Hook for admin logout
 * Clears stored data and redirects to login
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => adminLogout(),
    onSuccess: () => {
      // Clear stored login data
      clearLoginData();

      // Clear all query cache
      queryClient.clear();

      // Show success message
      toast.success('Logged out successfully', {
        autoClose: 2000,
      });

      // Navigate to login page
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      // Even if logout API fails, clear local data
      clearLoginData();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
      handleMutationError(error);
    },
  });
};

