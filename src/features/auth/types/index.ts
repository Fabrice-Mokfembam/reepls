/**
 * Admin user interface
 */
export interface Admin {
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
}

/**
 * Token structure
 */
export interface Token {
  token: string;
  expires: string;
}

/**
 * Tokens structure
 */
export interface Tokens {
  access: Token;
  refresh: Token;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response from API
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  admin: Admin;
  tokens: Tokens;
}

/**
 * Admin registration request payload
 */
export interface RegisterAdminRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

/**
 * Admin registration response from API
 */
export interface RegisterAdminResponse {
  success: boolean;
  message: string;
  admin: Admin;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Refresh token response
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
