import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mic,
  Calendar,
  Play,
  Download,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Volume2,
  Star,
  Users,
  TrendingUp,
  Trash2,
  X,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { usePodcastById, useDeletePodcast } from '../hooks/usePodcasts';
import { formatDuration, formatFileSize } from '../utils';

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { data, isLoading, isError, error } = usePodcastById(id);
  const podcast = data?.podcast;
  const deletePodcastMutation = useDeletePodcast();

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

  const handleDelete = () => {
    if (id) {
      deletePodcastMutation.mutate(id, {
        onSuccess: () => {
          navigate('/podcast');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/podcast')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Podcasts</span>
        </button>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading podcast...</span>
        </div>
      </div>
    );
  }

  if (isError || !podcast) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/podcast')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Podcasts</span>
        </button>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Podcast not found'}
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Plays',
      value: podcast.playCount,
      icon: Play,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Downloads',
      value: podcast.downloadCount,
      icon: Download,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Comments',
      value: podcast.commentsCount,
      icon: MessageCircle,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Shares',
      value: podcast.sharesCount || 0,
      icon: Share2,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Saves',
      value: podcast.savesCount || 0,
      icon: Heart,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Unique Listeners',
      value: podcast.uniqueListeners?.length || 0,
      icon: Users,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Average Rating',
      value: podcast.averageRating && podcast.averageRating > 0 ? podcast.averageRating.toFixed(1) : 'N/A',
      icon: Star,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Total Ratings',
      value: podcast.totalRatings || 0,
      icon: TrendingUp,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/podcast')}
        className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Podcasts</span>
      </button>

      {/* Thumbnail/Banner */}
      {podcast.thumbnailUrl ? (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src={podcast.thumbnailUrl}
            alt={podcast.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400 text-neutral-800 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Podcast
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                podcast.status === 'ready' 
                  ? 'bg-primary-400/20 text-primary-400' 
                  : podcast.status === 'processing'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : podcast.status === 'failed'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-neutral-600 text-neutral-300'
              }`}>
                {podcast.status}
              </span>
              {podcast.isPublic ? (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400">
                  Public
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-600 text-neutral-300">
                  Private
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{podcast.title}</h1>
            {podcast.subtitle && (
              <p className="text-xl text-neutral-200">{podcast.subtitle}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400 text-neutral-800 flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Podcast
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              podcast.status === 'ready' 
                ? 'bg-primary-400/20 text-primary-400' 
                : podcast.status === 'processing'
                ? 'bg-yellow-500/20 text-yellow-400'
                : podcast.status === 'failed'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-neutral-600 text-neutral-300'
            }`}>
              {podcast.status}
            </span>
            {podcast.isPublic ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400">
                Public
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-600 text-neutral-300">
                Private
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{podcast.title}</h1>
          {podcast.subtitle && (
            <p className="text-xl text-neutral-300 mb-4">{podcast.subtitle}</p>
          )}
        </div>
      )}

      {/* Audio Player Section */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-primary-400/20 rounded-lg">
            <Volume2 className="w-8 h-8 text-primary-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">Audio File</h3>
            <p className="text-sm text-neutral-300">{podcast.originalFileName || 'Audio file'}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-neutral-300 mb-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(podcast.audio.duration)}</span>
            </div>
            <p className="text-xs text-neutral-400">{formatFileSize(podcast.audio.fileSize)}</p>
          </div>
        </div>
        <audio
          controls
          className="w-full"
          src={podcast.audio.url}
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Statistics</h3>
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
                <p className="text-2xl font-bold text-foreground">
                  {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Description</h3>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {podcast.description}
            </p>
          </div>

          {/* Tags */}
          {podcast.tags && podcast.tags.length > 0 && (
            <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {podcast.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg text-sm bg-neutral-700 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Podcast Info */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Podcast Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-300 mb-1">Duration</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(podcast.audio.duration)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">File Size</p>
                <p className="text-foreground">{formatFileSize(podcast.audio.fileSize)}</p>
              </div>
              {podcast.audio.format && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Format</p>
                  <p className="text-foreground font-mono text-sm uppercase">{podcast.audio.format}</p>
                </div>
              )}
              {podcast.audio.bitrate && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Bitrate</p>
                  <p className="text-foreground">{podcast.audio.bitrate.toLocaleString()} bps</p>
                </div>
              )}
              {podcast.audio.sampleRate && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Sample Rate</p>
                  <p className="text-foreground">{podcast.audio.sampleRate.toLocaleString()} Hz</p>
                </div>
              )}
              {podcast.audio.channels && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Channels</p>
                  <p className="text-foreground">{podcast.audio.channels === 1 ? 'Mono' : 'Stereo'}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-neutral-300 mb-1">Created</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(podcast.createdAt)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Last Updated</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(podcast.updatedAt)}</span>
                </div>
              </div>
              {podcast.category && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Category</p>
                  <p className="text-foreground font-medium">{podcast.category}</p>
                </div>
              )}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Technical Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-300 mb-1">Podcast ID</p>
                <p className="text-foreground font-mono text-sm break-all">{podcast._id}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Author</p>
                {typeof podcast.authorId === 'object' && podcast.authorId !== null ? (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">{podcast.authorId.name}</p>
                    <p className="text-neutral-400 text-sm">@{podcast.authorId.username}</p>
                    <p className="text-foreground font-mono text-xs break-all">{podcast.authorId._id}</p>
                  </div>
                ) : (
                  <p className="text-foreground font-mono text-sm break-all">{podcast.authorId}</p>
                )}
              </div>
              {podcast.postId && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Related Article</p>
                  {typeof podcast.postId === 'object' && podcast.postId !== null ? (
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">{podcast.postId.title}</p>
                      <p className="text-foreground font-mono text-xs break-all">{podcast.postId.slug}</p>
                    </div>
                  ) : (
                    <p className="text-foreground font-mono text-sm break-all">{podcast.postId}</p>
                  )}
                </div>
              )}
              {podcast.audio.storageKey && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Storage Key</p>
                  <p className="text-foreground font-mono text-sm break-all">{podcast.audio.storageKey}</p>
                </div>
              )}
              {podcast.audio.fileHash && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">File Hash</p>
                  <p className="text-foreground font-mono text-xs break-all">{podcast.audio.fileHash}</p>
                </div>
              )}
              {podcast.audio.mimeType && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">MIME Type</p>
                  <p className="text-foreground font-mono text-sm">{podcast.audio.mimeType}</p>
                </div>
              )}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Visibility</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Public</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  podcast.isPublic 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {podcast.isPublic ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Status</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  podcast.status === 'ready' 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : podcast.status === 'processing'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : podcast.status === 'failed'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {podcast.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Danger Zone</h3>
            <p className="text-sm text-neutral-300">Permanently delete this podcast. This action cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Podcast
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Delete Podcast</h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{podcast?.title}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all podcast data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>Audio file from Cloudinary storage</li>
              <li>Related article references (if attached)</li>
              <li>All related data</li>
              <li>The podcast itself</li>
            </ul>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deletePodcastMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletePodcastMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deletePodcastMutation.isPending}
                className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


