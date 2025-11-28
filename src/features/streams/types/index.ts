// Owner information (populated from owner_id)
export interface PublicationOwner {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string | null;
}

// Publication/Stream type definition (matches API response)
export interface Publication {
  _id: string;
  id?: string; // Alias for _id for convenience
  title: string;
  short_description?: string;
  description: string;
  category: string;
  is_public: boolean;
  is_deleted: boolean;
  owner_id: PublicationOwner | string; // Can be populated object or just ID string
  articles_count: number;
  subscribers_count: number;
  tags?: string[];
  cover_image?: string | null;
  banner_image?: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Alias for backward compatibility
export type Stream = Publication;

// Query parameters for getting publications
export interface GetPublicationsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  isDeleted?: string; // "true" or "false" as string
  isPublic?: string; // "true" or "false" as string
  ownerId?: string;
  category?: string;
}

// API response structure for get all publications
export interface GetPublicationsApiResponse {
  success: boolean;
  message: string;
  data: {
    publications: Publication[];
    page: number | string;
    limit: number | string;
    totalPages: number | string;
    totalResults: number;
  };
}

// Transformed response structure (what we use internally)
export interface GetPublicationsResponse {
  success: boolean;
  message: string;
  results: Publication[];
  page: number | string;
  limit: number | string;
  totalPages: number | string;
  totalResults: number;
}

// API response structure for get publication by ID
export interface GetPublicationByIdResponse {
  success: boolean;
  message: string;
  publication: Publication;
}

// API response structure for delete publication
export interface DeletePublicationResponse {
  success: boolean;
  message: string;
  publication: Publication;
}

