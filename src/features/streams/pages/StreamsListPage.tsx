import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Radio, Calendar, FileText, Users, Tag, User as UserIcon, Loader2, Trash2 } from 'lucide-react';
import { useInfinitePublications, useDeletePublication } from '../hooks/usePublications';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import type { Publication } from '../types';

export const StreamsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [deleteConfirm, setDeleteConfirm] = useState<{ publicationId: string; publicationTitle: string } | null>(null);
  const deletePublicationMutation = useDeletePublication();

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
  } = useInfinitePublications(filters);

  // Flatten all publications from all pages
  const allPublications = useMemo(() => {
    if (!data?.pages) return [];
    
    const publications = data.pages
      .flatMap((page) => {
        if (page?.results && Array.isArray(page.results)) {
          return page.results;
        }
        // Handle raw API structure
        const rawPage = page as { data?: { publications?: Publication[] } };
        if (rawPage?.data?.publications && Array.isArray(rawPage.data.publications)) {
          return rawPage.data.publications
            .filter((publication: Publication) => publication != null && publication._id != null)
            .map((publication: Publication) => ({
              ...publication,
              id: publication._id,
            }));
        }
        return [];
      })
      .filter((publication): publication is Publication => publication != null && publication._id != null);
    
    return publications;
  }, [data]);

  // Total count from the first page
  const totalPublications = useMemo(() => {
    if (!data?.pages?.[0]) return 0;
    const firstPage = data.pages[0];
    const rawPage = firstPage as { totalResults?: number | string; data?: { totalResults?: number | string } };
    const total = rawPage.totalResults || rawPage.data?.totalResults;
    return typeof total === 'string' ? parseInt(total, 10) : total || 0;
  }, [data]);

  const handleStreamClick = (id: string) => {
    navigate(`/streams/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, publication: Publication) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setDeleteConfirm({ publicationId: publication.id || publication._id, publicationTitle: publication.title });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deletePublicationMutation.mutate(deleteConfirm.publicationId, {
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
            <h2 className="text-3xl font-bold text-foreground">Streams & Publications</h2>
            <p className="text-neutral-300 mt-1">Manage and view all streams and publication collections</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">Error loading publications: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Streams & Publications</h2>
          <p className="text-neutral-300 mt-1">Manage and view all streams and publication collections</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search publications by title, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Publications</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : totalPublications.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Articles</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPublications.reduce((sum, p) => sum + p.articles_count, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Subscribers</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPublications.reduce((sum, p) => sum + p.subscribers_count, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Public Publications</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : allPublications.filter(p => p.is_public).length.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Publications List */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading publications...</span>
        </div>
      ) : allPublications.length === 0 ? (
        <div className="p-12 text-center bg-neutral-800 rounded-lg border border-neutral-700">
          <Radio className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-300">No publications found</p>
          {debouncedSearch && (
            <p className="text-sm text-neutral-400 mt-2">Try adjusting your search query</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPublications.map((publication) => {
              const owner = typeof publication.owner_id === 'object' && publication.owner_id !== null
                ? publication.owner_id
                : null;
              return (
                <div
                  key={publication._id}
                  onClick={() => handleStreamClick(publication.id || publication._id)}
                  className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-primary-400/50 transition-all cursor-pointer group"
                >
                {/* Cover Image */}
                {publication.cover_image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={publication.cover_image}
                      alt={publication.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400 text-neutral-800 flex items-center gap-1">
                        <Radio className="w-3 h-3" />
                        Publication
                      </span>
                      <button
                        onClick={(e) => handleDeleteClick(e, publication)}
                        className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete publication"
                        disabled={deletePublicationMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {!publication.is_public && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-700/90 text-neutral-200">
                          Private
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-neutral-700 flex items-center justify-center relative">
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400 text-neutral-800 flex items-center gap-1">
                        <Radio className="w-3 h-3" />
                        Publication
                      </span>
                      <button
                        onClick={(e) => handleDeleteClick(e, publication)}
                        className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete publication"
                        disabled={deletePublicationMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {!publication.is_public && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-700/90 text-neutral-200">
                          Private
                        </span>
                      </div>
                    )}
                    <Radio className="w-16 h-16 text-neutral-500" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                      {publication.title}
                    </h3>
                    {publication.short_description && (
                      <p className="text-sm text-neutral-300 line-clamp-1">{publication.short_description}</p>
                    )}
                  </div>

                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                    {publication.description}
                  </p>

                  {/* Category */}
                  <div className="mb-3">
                    <span className="px-2 py-1 rounded text-xs bg-primary-400/20 text-primary-400">
                      {publication.category}
                    </span>
                  </div>

                  {/* Tags */}
                  {publication.tags && publication.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {publication.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300 flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {publication.tags.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300">
                          +{publication.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-neutral-400 border-t border-neutral-700 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{publication.articles_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{publication.subscribers_count.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(publication.createdAt)}</span>
                    </div>
                  </div>

                  {/* Owner Info */}
                  {owner && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                      <UserIcon className="w-3 h-3" />
                      <span className="truncate">{owner.name}</span>
                      <span className="text-neutral-600">@{owner.username}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>

          {/* Load More Button / Loading Indicator */}
          {hasNextPage && (
            <div className="mt-6 text-center">
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center gap-2 text-neutral-300">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more publications...</span>
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
            <h3 className="text-xl font-semibold text-foreground mb-2">Delete Publication</h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirm.publicationTitle}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all publication data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>All subscriptions to the publication</li>
              <li>All publication collaborators</li>
              <li>Publication references from articles (articles will be unlinked)</li>
              <li>The publication itself</li>
            </ul>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deletePublicationMutation.isPending}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletePublicationMutation.isPending}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deletePublicationMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Publication'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

