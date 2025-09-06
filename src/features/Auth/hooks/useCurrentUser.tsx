import { useState, useEffect, useCallback } from 'react';
import type { User, Token, LoginResponse } from '../../../models/datamodels';
import {
  storeLoginData,
  getLoginData,
  getUser,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  updateAccessToken,
  updateUserData,
  clearLoginData,
  isAuthenticated,
  needsRefresh,
  hasRole,
  isVerifiedWriter
} from '../utils'; // Adjust import path as needed

interface UseCurrentUserReturn {
  // Data
  user: User | null;
  loginData: LoginResponse | null;
  accessToken: Token | null;
  refreshToken: Token | null;
  accessTokenString: string | null;
  refreshTokenString: string | null;
  
  // Status
  isAuthenticated: boolean;
  isLoading: boolean;
  needsTokenRefresh: boolean;
  isAccessTokenValid: boolean;
  isRefreshTokenValid: boolean;
  
  // User properties (convenience getters)
  userId: string | undefined;
  userRole: string | undefined;
  isAdmin: boolean;
  isWriter: boolean;
  isReader: boolean;
  isVerified: boolean;
  canMakeCommuniquer: boolean;
  
  // Actions
  login: (data: LoginResponse) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  updateToken: (newToken: Token) => void;
  refreshUserData: () => void;
  
  // Utilities
  hasRole: (role: string) => boolean;
  checkTokenExpiry: (token: Token) => boolean;
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [accessToken, setAccessToken] = useState<Token | null>(null);
  const [refreshToken, setRefreshToken] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial data from secure storage
  useEffect(() => {
    const loadUserData = () => {
      try {
        setIsLoading(true);
        const storedLoginData = getLoginData();
        const storedUser = getUser();
        const storedAccessToken = getAccessToken();
        const storedRefreshToken = getRefreshToken();

        setLoginData(storedLoginData);
        setUser(storedUser);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Login function
  const login = useCallback((data: LoginResponse) => {
    try {
      storeLoginData(data);
      setLoginData(data);
      setUser(data.user);
      setAccessToken(data.tokens.access);
      setRefreshToken(data.tokens.refresh);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    try {
      clearLoginData();
      setLoginData(null);
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  // Update user data
  const updateUser = useCallback((updatedUser: User) => {
    try {
      updateUserData(updatedUser);
      setUser(prevUser => ({ ...prevUser, ...updatedUser }));
      setLoginData(prevData => prevData ? { ...prevData, user: { ...prevData.user, ...updatedUser } } : null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, []);

  // Update access token
  const updateToken = useCallback((newToken: Token) => {
    try {
      updateAccessToken(newToken);
      setAccessToken(newToken);
      setLoginData(prevData => prevData ? { 
        ...prevData, 
        tokens: { ...prevData.tokens, access: newToken } 
      } : null);
    } catch (error) {
      console.error('Error updating token:', error);
    }
  }, []);

  // Refresh user data from storage
  const refreshUserData = useCallback(() => {
    try {
      const storedUser = getUser();
      const storedAccessToken = getAccessToken();
      const storedRefreshToken = getRefreshToken();

      setUser(storedUser);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }, []);

  // Convenience getters
  const userId = user?._id || user?.id || user?.user_id;
  const userRole = user?.role;
  const isAdmin = userRole === 'Admin';
  const isWriter = userRole === 'Writer';
  const isReader = userRole === 'Reader';
  const isVerified = isVerifiedWriter();
  const canMakeCommuniquer = user?.CanMakecommuniquer === true;

  const accessTokenString = accessToken?.token || null;
  const refreshTokenString = refreshToken?.token || null;
  const isAccessTokenValid = accessToken ? !isTokenExpired(accessToken) : false;
  const isRefreshTokenValid = refreshToken ? !isTokenExpired(refreshToken) : false;
  const isUserAuthenticated = isAuthenticated();
  const needsTokenRefresh = needsRefresh();

  return {
    // Data
    user,
    loginData,
    accessToken,
    refreshToken,
    accessTokenString,
    refreshTokenString,
    
    // Status
    isAuthenticated: isUserAuthenticated,
    isLoading,
    needsTokenRefresh,
    isAccessTokenValid,
    isRefreshTokenValid,
    
    // User properties
    userId,
    userRole,
    isAdmin,
    isWriter,
    isReader,
    isVerified,
    canMakeCommuniquer,
    
    // Actions
    login,
    logout,
    updateUser,
    updateToken,
    refreshUserData,
    
    // Utilities
    hasRole: (role: string) => hasRole(role),
    checkTokenExpiry: (token: Token) => isTokenExpired(token),
  };
};

// Additional specialized hooks that use useCurrentUser

export const useAuthStatus = (): {
  isAuthenticated: boolean;
  isLoading: boolean;
  needsTokenRefresh: boolean;
} => {
  const { isAuthenticated, isLoading, needsTokenRefresh } = useCurrentUser();
  return { isAuthenticated, isLoading, needsTokenRefresh };
};

export const useUserRole = (): {
  userRole: string | undefined;
  isAdmin: boolean;
  isWriter: boolean;
  isReader: boolean;
  hasRole: (role: string) => boolean;
} => {
  const { userRole, isAdmin, isWriter, isReader, hasRole } = useCurrentUser();
  return { userRole, isAdmin, isWriter, isReader, hasRole };
};

export const useAccessToken = (): {
  accessToken: Token | null;
  accessTokenString: string | null;
  isAccessTokenValid: boolean;
  updateToken: (newToken: Token) => void;
} => {
  const { accessToken, accessTokenString, isAccessTokenValid, updateToken } = useCurrentUser();
  return { accessToken, accessTokenString, isAccessTokenValid, updateToken };
};