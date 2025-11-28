import CryptoJS from 'crypto-js';
import { STORAGE_KEY } from '../../../shared/constants';

/**
 * Encryption key for storing sensitive data
 * In production, this should be more secure
 */
const ENCRYPTION_KEY = 'reepls-admin-secret-key-2024';

/**
 * Interface for login data structure
 */
export interface LoginData {
  admin: {
    _id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    isAdmin: boolean;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    avatar: string | null;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

/**
 * Encrypts and stores login data in localStorage
 * @param data - The login data to encrypt and store
 */
export const encryptAndStoreLoginData = (data: LoginData): void => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    localStorage.setItem(STORAGE_KEY, encrypted);
  } catch (error) {
    console.error('Error encrypting login data:', error);
    throw new Error('Failed to store login data');
  }
};

/**
 * Decrypts and retrieves login data from localStorage
 * @returns The decrypted login data or null if not found
 */
export const decryptLoginData = (): LoginData | null => {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) {
      return null;
    }

    const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      return null;
    }

    return JSON.parse(decryptedString) as LoginData;
  } catch (error) {
    console.error('Error decrypting login data:', error);
    return null;
  }
};

/**
 * Retrieves the decrypted access token
 * @returns The access token or null if not found
 */
export const getDecryptedAccessToken = (): string | null => {
  const loginData = decryptLoginData();
  return loginData?.tokens?.access?.token || null;
};

/**
 * Retrieves the decrypted refresh token
 * @returns The refresh token or null if not found
 */
export const getDecryptedRefreshToken = (): string | null => {
  const loginData = decryptLoginData();
  return loginData?.tokens?.refresh?.token || null;
};

/**
 * Clears the stored login data
 */
export const clearLoginData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Checks if user is authenticated
 * @returns true if valid login data exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const loginData = decryptLoginData();
  if (!loginData) {
    return false;
  }

  // Check if access token exists and is not expired
  const accessToken = loginData.tokens?.access?.token;
  if (!accessToken) {
    return false;
  }

  // Check token expiration
  const expiresAt = loginData.tokens?.access?.expires;
  if (expiresAt) {
    const expirationDate = new Date(expiresAt);
    if (expirationDate < new Date()) {
      return false;
    }
  }

  return true;
};

