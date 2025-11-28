// Author information (populated from authorId)
export interface PodcastAuthor {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string | null;
}

// Post information (populated from postId)
export interface PodcastPost {
  _id: string;
  title: string;
  slug: string;
}

// Audio information
export interface PodcastAudio {
  url: string;
  storageKey?: string;
  duration: number;
  fileSize: number;
  mimeType?: string;
  fileHash?: string;
  bitrate?: number;
  sampleRate?: number;
  channels?: number;
  format?: string;
}

// Podcast type definition (matches API response)
export interface Podcast {
  _id: string;
  id?: string; // Alias for _id for convenience
  title: string;
  subtitle?: string;
  description: string;
  category?: string;
  status: 'processing' | 'ready' | 'failed' | 'archived';
  isPublic: boolean;
  authorId: PodcastAuthor | string; // Can be populated object or just ID string
  postId?: PodcastPost | string | null; // Can be populated object or just ID string
  audio: PodcastAudio;
  tags?: string[];
  playCount: number;
  downloadCount: number;
  commentsCount: number;
  savesCount?: number;
  sharesCount?: number;
  averageRating?: number;
  totalRatings?: number;
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  // Optional fields that may exist
  uniqueListeners?: string[];
  originalFileName?: string;
  __v?: number;
}

// Query parameters for getting podcasts
export interface GetPodcastsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  status?: 'processing' | 'ready' | 'failed' | 'archived';
  isPublic?: string; // "true" or "false" as string
  authorId?: string;
  category?: string;
}

// API response structure for get all podcasts
export interface GetPodcastsApiResponse {
  success: boolean;
  message: string;
  data: {
    podcasts: Podcast[];
    page: number | string;
    limit: number | string;
    totalPages: number | string;
    totalResults: number;
  };
}

// Transformed response structure (what we use internally)
export interface GetPodcastsResponse {
  success: boolean;
  message: string;
  results: Podcast[];
  page: number | string;
  limit: number | string;
  totalPages: number | string;
  totalResults: number;
}

// API response structure for get podcast by ID
export interface GetPodcastByIdResponse {
  success: boolean;
  message: string;
  podcast: Podcast;
}

// API response structure for delete podcast
export interface DeletePodcastResponse {
  success: boolean;
  message: string;
  podcast: Podcast;
}

