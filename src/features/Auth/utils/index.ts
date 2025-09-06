import secureLocalStorage from 'react-secure-storage';
import type { LoginResponse, User,  Token } from "../../../models/datamodels";

// Keys for secure storage
const LOGIN_DATA_KEY = 'loginData';
const USER_KEY = 'userData';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const storeLoginData = (data: LoginResponse): void => {
  try {
    // Store complete login data
    secureLocalStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(data));
    
    // Store individual components for easier access
    if (data.user) {
      secureLocalStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    
    if (data.tokens?.access) {
      secureLocalStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data.tokens.access));
    }
    
    if (data.tokens?.refresh) {
      secureLocalStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(data.tokens.refresh));
    }
  } catch (error) {
    console.error('Error storing login data securely:', error);
  }
};

export const getLoginData = (): LoginResponse | null => {
  try {
    const data = secureLocalStorage.getItem(LOGIN_DATA_KEY);
    return data ? JSON.parse(data as string) : null;
  } catch (error) {
    console.error('Error retrieving login data:', error);
    return null;
  }
};

export const getUser = (): User | null => {
  try {
    const userData = secureLocalStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData as string) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export const getAccessToken = (): Token | null => {
  try {
    const tokenData = secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
    return tokenData ? JSON.parse(tokenData as string) : null;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

export const getRefreshToken = (): Token | null => {
  try {
    const tokenData = secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
    return tokenData ? JSON.parse(tokenData as string) : null;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const getAccessTokenString = (): string | null => {
  try {
    const token = getAccessToken();
    return token ? token.token : null;
  } catch (error) {
    console.error('Error retrieving access token string:', error);
    return null;
  }
};

export const getRefreshTokenString = (): string | null => {
  try {
    const token = getRefreshToken();
    return token ? token.token : null;
  } catch (error) {
    console.error('Error retrieving refresh token string:', error);
    return null;
  }
};

export const isTokenExpired = (token: Token): boolean => {
  try {
    const expires = new Date(token.expires);
    return expires < new Date();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

export const isAccessTokenExpired = (): boolean => {
  try {
    const token = getAccessToken();
    return token ? isTokenExpired(token) : true;
  } catch (error) {
    console.error('Error checking access token expiration:', error);
    return true;
  }
};

export const isRefreshTokenExpired = (): boolean => {
  try {
    const token = getRefreshToken();
    return token ? isTokenExpired(token) : true;
  } catch (error) {
    console.error('Error checking refresh token expiration:', error);
    return true;
  }
};

export const updateAccessToken = (newToken: Token): void => {
  try {
    secureLocalStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(newToken));
    
    // Also update in the complete login data
    const loginData = getLoginData();
    if (loginData) {
      loginData.tokens.access = newToken;
      secureLocalStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(loginData));
    }
  } catch (error) {
    console.error('Error updating access token:', error);
  }
};

export const updateUserData = (updatedUser: User): void => {
  try {
    secureLocalStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    
    // Also update in the complete login data
    const loginData = getLoginData();
    if (loginData) {
      loginData.user = { ...loginData.user, ...updatedUser };
      secureLocalStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(loginData));
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

export const clearLoginData = (): void => {
  try {
    // Remove all stored data
    secureLocalStorage.removeItem(LOGIN_DATA_KEY);
    secureLocalStorage.removeItem(USER_KEY);
    secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
    secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing login data:', error);
  }
};

export const isAuthenticated = (): boolean => {
  try {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    
    return !!(accessToken && refreshToken && !isAccessTokenExpired());
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

export const needsRefresh = (): boolean => {
  try {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    
    // Need refresh if access token is expired but refresh token is still valid
    return !!(accessToken && refreshToken && 
              isAccessTokenExpired() && 
              !isRefreshTokenExpired());
  } catch (error) {
    console.error('Error checking if refresh is needed:', error);
    return false;
  }
};

// Utility function to check if user has specific role
export const hasRole = (role: string): boolean => {
  try {
    const user = getUser();
    return user?.role === role;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

// Utility function to check if user is verified writer
export const isVerifiedWriter = (): boolean => {
  try {
    const user = getUser();
    return user?.is_verified_writer === true;
  } catch (error) {
    console.error('Error checking verified writer status:', error);
    return false;
  }
};