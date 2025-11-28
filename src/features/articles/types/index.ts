// Author information (populated from author_id)
export interface ArticleAuthor {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string | null;
}

// Article type definition (matches API response)
export interface Article {
  _id: string;
  id?: string; // Alias for _id for convenience
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  htmlContent?: string;
  category?: string;
  status: 'Draft' | 'Published' | 'Archived';
  isArticle: boolean;
  type?: string;
  author_id: ArticleAuthor | string; // Can be populated object or just ID string
  views_count: number;
  reaction_count: number;
  comment_count: number;
  thumbnail?: string | null;
  tags?: string[];
  keywords?: string[];
  media?: string[];
  createdAt: string;
  updatedAt: string;
  // Optional fields that may exist
  is_communiquer?: boolean;
  flagged?: boolean;
  reports_count?: number;
  shares_count?: number;
  impression_count?: number;
  engagement_count?: number;
  author_follower_count?: number;
  author_profile_views_count?: number;
  hasPodcast?: boolean;
  publication_id?: string | null;
  __v?: number;
  text_to_speech?: string;
}

// Query parameters for getting articles
export interface GetArticlesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  status?: 'Draft' | 'Published' | 'Archived';
  isArticle?: string; // "true" or "false" as string
  authorId?: string;
  category?: string;
}

// API response structure for get all articles
export interface GetArticlesApiResponse {
  success: boolean;
  message: string;
  data: {
    articles: Article[];
    page: number | string;
    limit: number | string;
    totalPages: number | string;
    totalResults: number;
  };
}

// Transformed response structure (what we use internally)
export interface GetArticlesResponse {
  success: boolean;
  message: string;
  results: Article[];
  page: number | string;
  limit: number | string;
  totalPages: number | string;
  totalResults: number;
}

// API response structure for get article by ID
export interface GetArticleByIdResponse {
  success: boolean;
  message: string;
  article: Article;
}

// API response structure for delete article
export interface DeleteArticleResponse {
  success: boolean;
  message: string;
  article: Article;
}
