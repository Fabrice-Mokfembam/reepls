import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, MessageSquare, Calendar, Eye, Heart, MessageCircle, Flag, Loader2, Trash2 } from 'lucide-react';
import { useInfiniteArticles, useDeleteArticle } from '../hooks/useArticles';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import type { Article } from '../types';

export const ArticlesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Build filters from search query
  const filters = useMemo(() => {
    if (!debouncedSearch.trim()) return undefined;
    return {
      search: debouncedSearch,
    };
  }, [debouncedSearch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteArticles(filters);

  const [deleteConfirm, setDeleteConfirm] = useState<{ articleId: string; articleTitle: string } | null>(null);
  const deleteArticleMutation = useDeleteArticle();

  // Flatten all articles from all pages
  const allArticles = useMemo(() => {
    if (!data?.pages) return [];
    
    const articles = data.pages
      .flatMap((page) => {
        if (page?.results && Array.isArray(page.results)) {
          return page.results;
        }
        // Handle raw API structure
        const rawPage = page as { data?: { articles?: Article[] } };
        if (rawPage?.data?.articles && Array.isArray(rawPage.data.articles)) {
          return rawPage.data.articles
            .filter((article: Article) => article != null && article._id != null)
            .map((article: Article) => ({
              ...article,
              id: article._id,
            }));
        }
        return [];
      })
      .filter((article): article is Article => article != null && article._id != null);
    
    return articles;
  }, [data]);

  // Total count from the first page
  const totalArticles = useMemo(() => {
    if (!data?.pages?.[0]) return 0;
    const firstPage = data.pages[0];
    const rawPage = firstPage as { totalResults?: number | string; data?: { totalResults?: number | string } };
    const total = rawPage.totalResults || rawPage.data?.totalResults;
    return typeof total === 'string' ? parseInt(total, 10) : total || 0;
  }, [data]);

  const handleArticleClick = (articleId: string, slug?: string) => {
    // Use articleId if available, otherwise fall back to slug
    navigate(`/articles/${articleId || slug}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setDeleteConfirm({ articleId: article.id || article._id, articleTitle: article.title });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteArticleMutation.mutate(deleteConfirm.articleId, {
        onSuccess: () => {
          setDeleteConfirm(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getContentPreview = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  // Load more when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Articles & Posts</h2>
            <p className="text-neutral-300 mt-1">Manage and view all published content</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">Error loading articles: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Articles & Posts</h2>
          <p className="text-neutral-300 mt-1">Manage and view all published content</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search articles and posts by title, content, or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Content</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : totalArticles.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Articles</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allArticles.filter(a => a.isArticle).length.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Posts</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allArticles.filter(a => !a.isArticle).length.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Flagged</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allArticles.filter(a => a.flagged).length.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Articles/Posts List */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading articles...</span>
        </div>
      ) : allArticles.length === 0 ? (
        <div className="p-12 text-center bg-neutral-800 rounded-lg border border-neutral-700">
          <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-300">No articles or posts found</p>
          {debouncedSearch && (
            <p className="text-sm text-neutral-400 mt-2">Try adjusting your search query</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => (
              <div
                key={article._id}
                onClick={() => handleArticleClick(article.id || article._id, article.slug)}
                className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-primary-400/50 transition-all cursor-pointer group"
              >
              {/* Thumbnail */}
              {article.thumbnail ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {article.isArticle ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400 text-neutral-800 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Article
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-400 text-neutral-800 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Post
                      </span>
                    )}
                    <button
                      onClick={(e) => handleDeleteClick(e, article)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      title="Delete article"
                      disabled={deleteArticleMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {article.flagged && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        Flagged
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-neutral-700 flex items-center justify-center relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {article.isArticle ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400 text-neutral-800 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Article
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-400 text-neutral-800 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Post
                      </span>
                    )}
                    <button
                      onClick={(e) => handleDeleteClick(e, article)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      title="Delete article"
                      disabled={deleteArticleMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {article.flagged && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        Flagged
                      </span>
                    </div>
                  )}
                  <FileText className="w-16 h-16 text-neutral-500" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  {article.subtitle && (
                    <p className="text-sm text-neutral-300 line-clamp-2">{article.subtitle}</p>
                  )}
                </div>

                <p className="text-sm text-neutral-400 mb-4 line-clamp-3">
                  {getContentPreview(article.content)}
                </p>

                {/* Keywords/Tags */}
                {((article.keywords && article.keywords.length > 0) || (article.tags && article.tags.length > 0)) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(article.tags || article.keywords || []).slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {(article.tags || article.keywords || []).length > 3 && (
                      <span className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300">
                        +{(article.tags || article.keywords || []).length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-400 border-t border-neutral-700 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{article.reaction_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{article.comment_count}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    {article.hasPodcast && (
                      <span className="px-2 py-1 rounded bg-primary-400/20 text-primary-400">
                        Has Podcast
                      </span>
                    )}
                    {article.is_communiquer && (
                      <span className="px-2 py-1 rounded bg-secondary-400/20 text-secondary-400">
                        Communiquer
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded ${
                    article.status === 'Published' 
                      ? 'bg-primary-400/20 text-primary-400' 
                      : article.status === 'Draft'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-neutral-600 text-neutral-300'
                  }`}>
                    {article.status}
                  </span>
                </div>
              </div>
            </div>
            ))}
          </div>

          {/* Load More Button / Loading Indicator */}
          {hasNextPage && (
            <div className="mt-6 text-center">
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center gap-2 text-neutral-300">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more articles...</span>
                </div>
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-neutral-800 font-medium rounded-lg transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-foreground mb-2">Delete Article</h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirm.articleTitle}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all article data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>Related notifications</li>
              <li>All comments</li>
              <li>All reactions</li>
              <li>All reports</li>
              <li>Saved article entries</li>
              <li>The article itself</li>
            </ul>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleteArticleMutation.isPending}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteArticleMutation.isPending}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteArticleMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Article'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

