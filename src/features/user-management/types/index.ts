// User type definition
export interface User {
  _id: string;
  id?: string; // Alias for _id for convenience
  username: string;
  name: string;
  email: string;
  phone?: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  role: string;
  isAdmin: boolean;
  profile_picture?: string | null;
  banner_picture?: string | null;
  avatar?: string | null;
  interests: string[];
  searchHistory: string[];
  is_verified_writer: boolean;
  CanMakecommuniquer: boolean;
  interactionHistory: {
    categories: string[];
    likedArticles: string[];
    viewedArticles: string[];
    readArticles: string[];
  };
  repostHistory: {
    reposted_articles: string[];
    reposted_posts: string[];
  };
  subscribed_publications?: string[];
  notificationPreferences?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    inAppNotifications: boolean;
    newContent: boolean;
    reactions: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    reposts: boolean;
  };
  fcmToken?: string | null;
  fcmTokens?: string[];
  fcmPlatform?: string | null;
  fcmTokenUpdatedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  about?: string;
  address?: string;
  bio?: string | null;
  followersCount?: number;
  followingCount?: number;
}

// Query parameters for getting users
export interface GetUsersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  name?: string;
  role?: string;
  email?: string;
  isAdmin?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
}

// Actual API response structure
export interface GetUsersApiResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    page: number | string; // API may return as string
    limit: number | string; // API may return as string
    totalPages: number | string; // API may return as string
    totalResults: number;
  };
}

// Transformed response structure (what we use internally)
export interface GetUsersResponse {
  success: boolean;
  message: string;
  results: User[];
  page: number | string; // API may return as string
  limit: number | string; // API may return as string
  totalPages: number | string; // API may return as string
  totalResults: number;
}

// Response for get user by ID
export interface GetUserByIdResponse {
  success: boolean;
  message: string;
  user: User;
}

// Response for delete user
export interface DeleteUserResponse {
  success: boolean;
  message: string;
  user: User;
}

// UserStats type definition
export interface UserStats {
  articlesCount: number;
  postsCount: number;
  podcastsCount: number;
  repostsCount: number;
  commentsCount: number;
  reactionsCount: number;
  readArticlesCount: number;
  likedArticlesCount: number;
  viewedArticlesCount: number;
}
