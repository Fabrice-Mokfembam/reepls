import React, { useState, useMemo,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User as UserIcon, Mail, Calendar, CheckCircle2, XCircle, Shield, Loader2, Trash2 } from 'lucide-react';
import { useInfiniteUsers, useDeleteUser } from '../hooks/useUsers';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import type { User } from '../types';

export const UserAccountsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [deleteConfirm, setDeleteConfirm] = useState<{ userId: string; userName: string } | null>(null);
  const deleteUserMutation = useDeleteUser();

  // Fetch all users without filters (no HTTP request for search)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteUsers();

  // Flatten all users from all pages and filter out undefined/null values
  const allUsers = useMemo(() => {
    if (!data?.pages) return [];
    
    const users = data.pages
      .flatMap((page) => {
        // Handle both structures: page.results (transformed) or page.data?.users (raw API)
        if (page?.results && Array.isArray(page.results)) {
          return page.results;
        }
        // Handle raw API structure with data.users
        const rawPage = page as { data?: { users?: User[] } };
        if (rawPage?.data?.users && Array.isArray(rawPage.data.users)) {
          // Transform raw API structure: map _id to id
          return rawPage.data.users
            .filter((user: User) => user != null && user._id != null)
            .map((user: User) => ({
              ...user,
              id: user._id,
            }));
        }
        return [];
      })
      .filter((user): user is User => user != null && user._id != null);
    
    return users;
  }, [data]);

  // Client-side filtering by name and username
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch.trim()) return allUsers;
    
    const searchLower = debouncedSearch.toLowerCase().trim();
    return allUsers.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(searchLower);
      const usernameMatch = user.username?.toLowerCase().includes(searchLower);
      return nameMatch || usernameMatch;
    });
  }, [allUsers, debouncedSearch]);

  // Total count from the first page (handle both string and number)
  const totalUsers = useMemo(() => {
    if (!data?.pages?.[0]) return 0;
    const firstPage = data.pages[0];
    // Handle both structures: transformed (totalResults) or raw API (data.totalResults)
    const rawPage = firstPage as { totalResults?: number | string; data?: { totalResults?: number | string } };
    const total = rawPage.totalResults || rawPage.data?.totalResults;
    return typeof total === 'string' ? parseInt(total, 10) : total || 0;
  }, [data]);

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, user: User) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    setDeleteConfirm({ userId: user.id || user._id, userName: user.name });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteUserMutation.mutate(deleteConfirm.userId, {
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
            <h2 className="text-3xl font-bold text-foreground">User Accounts</h2>
            <p className="text-neutral-300 mt-1">Manage and view all user accounts</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">User Accounts</h2>
          <p className="text-neutral-300 mt-1">Manage and view all user accounts</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search users by name, email, or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : totalUsers.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Verified Writers</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : filteredUsers.filter(u => u?.is_verified_writer).length.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <p className="text-sm text-neutral-300 mb-1">Email Verified</p>
          <p className="text-2xl font-bold text-foreground">
            {isLoading ? '...' : filteredUsers.filter(u => u?.is_email_verified).length.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
        <div className="p-6 border-b border-neutral-700">
          <h3 className="text-lg font-semibold text-foreground">
            All Users {!isLoading && `(${filteredUsers.length.toLocaleString()}${totalUsers > allUsers.length ? ` of ${totalUsers.toLocaleString()}` : ''})`}
          </h3>
        </div>
        
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto mb-4" />
            <p className="text-neutral-300">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <UserIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-300">No users found</p>
            {debouncedSearch && (
              <p className="text-sm text-neutral-400 mt-2">Try adjusting your search query</p>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-neutral-700">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user.id || user._id)}
                  className="p-6 hover:bg-neutral-700/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {/* Profile Picture */}
                      <div className="flex-shrink-0 relative">
                        {user.profile_picture || user.avatar ? (
                          <img
                            src={user.profile_picture || user.avatar || ''}
                            alt={user.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-neutral-600"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className="w-14 h-14 rounded-full bg-neutral-600 flex items-center justify-center border-2 border-neutral-600" style={{ display: (user.profile_picture || user.avatar) ? 'none' : 'flex' }}>
                          <UserIcon className="w-7 h-7 text-neutral-300" />
                        </div>
                        {/* Admin Badge */}
                        {user.isAdmin && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-400 rounded-full flex items-center justify-center border-2 border-neutral-800">
                            <Shield className="w-3 h-3 text-neutral-800" />
                          </div>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-lg font-semibold text-foreground truncate">
                            {user.name}
                          </h4>
                          {user.isAdmin && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1 flex-shrink-0">
                              <Shield className="w-3 h-3" />
                              Admin
                            </span>
                          )}
                          {user.is_verified_writer && (
                            <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-300 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-neutral-400">@</span>
                            <span>{user.username}</span>
                          </div>
                          {user.role && (
                            <span className="px-2 py-0.5 rounded text-xs bg-neutral-700 text-neutral-300 capitalize">
                              {user.role}
                            </span>
                          )}
                        </div>
                        {user.bio && (
                          <p className="text-sm text-neutral-400 mt-1 truncate">{user.bio}</p>
                        )}
                      </div>

                      {/* Status and Date */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          {user.is_email_verified ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600 text-neutral-300 flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Unverified
                            </span>
                          )}
                          <button
                            onClick={(e) => handleDeleteClick(e, user)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                            title="Delete user"
                            disabled={deleteUserMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-400">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button / Loading Indicator */}
            {hasNextPage && (
              <div className="p-6 border-t border-neutral-700 text-center">
                {isFetchingNextPage ? (
                  <div className="flex items-center justify-center gap-2 text-neutral-300">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more users...</span>
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
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-foreground mb-2">Delete User</h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirm.userName}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all user data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>User's articles and posts</li>
              <li>Comments and reactions</li>
              <li>Reposts and podcasts</li>
              <li>All related data</li>
            </ul>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleteUserMutation.isPending}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteUserMutation.isPending}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteUserMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
