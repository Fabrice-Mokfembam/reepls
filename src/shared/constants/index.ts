export const APP_NAME = 'Reepls';
export const APP_VERSION = '1.0.0';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://reepls-api.onrender.com';
const API_VERSION = import.meta.env.VITE_API_VERSION || '/api-v1';
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// Storage Key for encrypted login data
export const STORAGE_KEY = 'reepls_admin_auth';

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ACTIVITY: '/activity',
  ARTICLES: '/articles',
  PODCAST: '/podcast',
  STREAMS: '/streams',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const TIME_PERIODS = ['Day', 'Week', 'Month', 'Year'] as const;
