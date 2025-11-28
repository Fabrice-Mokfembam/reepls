import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  FileText,
  MessageSquare,
  Repeat2,
  Heart,
  Eye,
  BookOpen,
  Mic,
  User as UserIcon,
  Users,
  UserPlus,
  Shield,
  Loader2,
  Trash2
} from 'lucide-react';
import { useUserById, useDeleteUser } from '../hooks/useUsers';
import type { UserStats } from '../types';

export const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, isError, error } = useUserById(userId);
  const user = data?.user;
  const deleteUserMutation = useDeleteUser();
  
  // State for Can Make Communiquer toggle
  const [canMakeCommuniquer, setCanMakeCommuniquer] = useState(user?.CanMakecommuniquer ?? false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Update state when user data loads
  React.useEffect(() => {
    if (user) {
      setCanMakeCommuniquer(user.CanMakecommuniquer);
    }
  }, [user]);
  
  // Calculate stats
  const stats: UserStats = {
    articlesCount: 0, // Would come from API
    postsCount: 0, // Would come from API
    podcastsCount: 0, // Would come from API
    repostsCount: (user?.repostHistory?.reposted_articles?.length || 0) + (user?.repostHistory?.reposted_posts?.length || 0),
    commentsCount: 0, // Would come from API
    reactionsCount: user?.interactionHistory?.likedArticles?.length || 0,
    readArticlesCount: user?.interactionHistory?.readArticles?.length || 0,
    likedArticlesCount: user?.interactionHistory?.likedArticles?.length || 0,
    viewedArticlesCount: user?.interactionHistory?.viewedArticles?.length || 0
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Handle toggle for Can Make Communiquer
  const handleToggleCanMakeCommuniquer = async () => {
    setIsUpdating(true);
    try {
      // TODO: Replace with actual API call
      // await updateUserCanMakeCommuniquer(userId, !canMakeCommuniquer);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCanMakeCommuniquer(!canMakeCommuniquer);
    } catch (error) {
      console.error('Failed to update Can Make Communiquer:', error);
      // In a real app, show an error toast/notification
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (userId) {
      deleteUserMutation.mutate(userId, {
        onSuccess: () => {
          navigate('/users');
        },
      });
    }
  };

  const statCards = [
    {
      title: 'Articles Posted',
      value: stats.articlesCount,
      icon: FileText,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Posts Posted',
      value: stats.postsCount,
      icon: MessageSquare,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Podcasts',
      value: stats.podcastsCount,
      icon: Mic,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Reposts',
      value: stats.repostsCount,
      icon: Repeat2,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Comments',
      value: stats.commentsCount,
      icon: MessageSquare,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Reactions',
      value: stats.reactionsCount,
      icon: Heart,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Articles Read',
      value: stats.readArticlesCount,
      icon: BookOpen,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Articles Viewed',
      value: stats.viewedArticlesCount,
      icon: Eye,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Users</span>
        </button>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Users</span>
        </button>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'User not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button and Delete Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Users</span>
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={deleteUserMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete User</span>
        </button>
      </div>

      {/* Banner */}
      {user.banner_picture && (
        <div className="relative h-48 rounded-lg overflow-hidden">
          <img
            src={user.banner_picture}
            alt="Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            {user.profile_picture || user.avatar ? (
              <img
                src={user.profile_picture || user.avatar || ''}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div className="w-24 h-24 rounded-full bg-neutral-600 flex items-center justify-center border-4 border-neutral-700" style={{ display: (user.profile_picture || user.avatar) ? 'none' : 'flex' }}>
              <UserIcon className="w-12 h-12 text-neutral-300" />
            </div>
            {user.isAdmin && (
              <div className="absolute -bottom-2 -right-2 bg-primary-400 rounded-full p-1.5 border-2 border-neutral-800">
                <Shield className="w-5 h-5 text-neutral-800" />
              </div>
            )}
            {user.is_verified_writer && (
              <div className={`absolute -bottom-2 ${user.isAdmin ? '-left-2' : '-right-2'} bg-primary-400 rounded-full p-1 border-2 border-neutral-800`}>
                <CheckCircle2 className="w-5 h-5 text-neutral-800" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
              {user.isAdmin && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
              {user.is_verified_writer && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400">
                  Verified Writer
                </span>
              )}
            </div>
            <p className="text-neutral-300 mb-4">@{user.username}</p>
            {user.bio && (
              <p className="text-foreground mb-4">{user.bio}</p>
            )}
            
            {/* Followers and Following Stats */}
            {(user.followersCount !== undefined || user.followingCount !== undefined) && (
              <div className="flex items-center gap-6 mb-4">
                {user.followersCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-400" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{user.followersCount.toLocaleString()}</p>
                      <p className="text-sm text-neutral-300">Followers</p>
                    </div>
                  </div>
                )}
                {user.followingCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-secondary-400" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{user.followingCount.toLocaleString()}</p>
                      <p className="text-sm text-neutral-300">Following</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* User Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
                {user.is_email_verified ? (
                  <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                )}
              </div>
              {user.address && (
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <MapPin className="w-4 h-4" />
                  <span>{user.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      {user.about && (
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
          <p className="text-neutral-300 leading-relaxed">{user.about}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Activity Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-neutral-800 rounded-lg p-6 border border-neutral-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h4 className="text-sm text-neutral-300 mb-1">{stat.title}</h4>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Repost History */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Repost History</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-neutral-300 mb-1">Reposted Articles</p>
              <p className="text-2xl font-bold text-foreground">
                {user.repostHistory?.reposted_articles?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Reposted Posts</p>
              <p className="text-2xl font-bold text-foreground">
                {user.repostHistory?.reposted_posts?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Interaction History */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Interaction History</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-neutral-300 mb-1">Read Articles</p>
              <p className="text-2xl font-bold text-foreground">
                {user.interactionHistory?.readArticles?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Liked Articles</p>
              <p className="text-2xl font-bold text-foreground">
                {user.interactionHistory?.likedArticles?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Viewed Articles</p>
              <p className="text-2xl font-bold text-foreground">
                {user.interactionHistory?.viewedArticles?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-neutral-300 mb-1">Email Verified</p>
            <div className="flex items-center gap-2">
              {user.is_email_verified ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600 text-neutral-300 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  Not Verified
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-300 mb-1">Phone Verified</p>
            <div className="flex items-center gap-2">
              {user.is_phone_verified ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600 text-neutral-300 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  Not Verified
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-300 mb-2">Can Make Communiquer</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleCanMakeCommuniquer}
                disabled={isUpdating}
                className={`
                  relative inline-flex h-7 w-14 items-center rounded-full transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-neutral-800
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${canMakeCommuniquer ? 'bg-primary-400' : 'bg-neutral-600'}
                `}
                role="switch"
                aria-checked={canMakeCommuniquer}
                aria-label="Toggle Can Make Communiquer"
              >
                <span
                  className={`
                    inline-block h-5 w-5 transform rounded-full bg-white transition-transform
                    ${canMakeCommuniquer ? 'translate-x-8' : 'translate-x-1'}
                  `}
                />
              </button>
              <span className={`text-sm font-medium ${
                canMakeCommuniquer ? 'text-primary-400' : 'text-neutral-400'
              }`}>
                {canMakeCommuniquer ? 'Enabled' : 'Disabled'}
              </span>
              {isUpdating && (
                <span className="text-xs text-neutral-400">Updating...</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-300 mb-1">Last Updated</p>
            <p className="text-foreground">{formatDate(user.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-foreground mb-2">Delete User</h3>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{user?.name}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all user data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>User's articles and posts</li>
              <li>Comments and reactions</li>
              <li>Reposts and podcasts</li>
              <li>Follow relationships and subscriptions</li>
              <li>All related data</li>
            </ul>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteUserMutation.isPending}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
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
