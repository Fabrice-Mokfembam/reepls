import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Radio,
  Calendar,
  FileText,
  Users,
  Tag,
  User as UserIcon,
  Globe,
  Lock,
  Trash2,
  X,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { usePublicationById, useDeletePublication } from '../hooks/usePublications';

export const StreamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { data, isLoading, isError, error } = usePublicationById(id);
  const publication = data?.publication;
  const deletePublicationMutation = useDeletePublication();

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
      deletePublicationMutation.mutate(id, {
        onSuccess: () => {
          navigate('/streams');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/streams')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Streams</span>
        </button>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading publication...</span>
        </div>
      </div>
    );
  }

  if (isError || !publication) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/streams')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Streams</span>
        </button>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Publication not found'}
          </p>
        </div>
      </div>
    );
  }

  const owner = typeof publication.owner_id === 'object' && publication.owner_id !== null
    ? publication.owner_id
    : null;

  const statCards = [
    {
      title: 'Articles',
      value: publication.articles_count,
      icon: FileText,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20',
      description: 'Total articles in this publication'
    },
    {
      title: 'Subscribers',
      value: publication.subscribers_count,
      icon: Users,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20',
      description: 'People following this publication'
    },
    {
      title: 'Category',
      value: publication.category,
      icon: Tag,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20',
      description: 'Publication category'
    },
    {
      title: 'Tags',
      value: publication.tags?.length || 0,
      icon: Tag,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20',
      description: 'Number of tags'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/streams')}
        className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Streams</span>
      </button>

      {/* Cover Image/Banner */}
      {publication.cover_image || publication.banner_image ? (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src={publication.banner_image || publication.cover_image || ''}
            alt={publication.title}
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
                <Radio className="w-4 h-4" />
                Publication
              </span>
              {publication.is_public ? (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Public
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-600 text-neutral-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Private
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400">
                {publication.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{publication.title}</h1>
            {publication.short_description && (
              <p className="text-xl text-neutral-200">{publication.short_description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400 text-neutral-800 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Publication
            </span>
            {publication.is_public ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Public
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-600 text-neutral-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400">
              {publication.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{publication.title}</h1>
          {publication.short_description && (
            <p className="text-xl text-neutral-300 mb-4">{publication.short_description}</p>
          )}
        </div>
      )}

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
                {stat.description && (
                  <p className="text-xs text-neutral-400 mt-1">{stat.description}</p>
                )}
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
              {publication.description}
            </p>
          </div>

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg text-sm bg-neutral-700 text-neutral-300 flex items-center gap-2"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section (placeholder for future articles list) */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Articles in this Publication</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-primary-400/20 text-primary-400">
                {publication.articles_count} {publication.articles_count === 1 ? 'Article' : 'Articles'}
              </span>
            </div>
            {publication.articles_count > 0 ? (
              <p className="text-neutral-300">Articles will be displayed here. (To be implemented)</p>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                <p className="text-neutral-400">No articles in this publication yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Owner/Author Info */}
          {owner && (
            <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Owner / Author</h3>
              <div className="flex items-center gap-4 mb-4">
                {owner.avatar ? (
                  <img
                    src={owner.avatar}
                    alt={owner.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-600"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div className="w-16 h-16 rounded-full bg-neutral-600 flex items-center justify-center border-2 border-neutral-600" style={{ display: owner.avatar ? 'none' : 'flex' }}>
                  <UserIcon className="w-8 h-8 text-neutral-300" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold">{owner.name}</p>
                  <p className="text-sm text-neutral-300">@{owner.username}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-700">
                <p className="text-sm text-neutral-300 mb-1">Owner ID</p>
                <p className="text-foreground font-mono text-sm break-all">{owner._id}</p>
              </div>
            </div>
          )}

          {/* Publication Info */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Publication Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-300 mb-1">Category</p>
                <p className="text-foreground font-medium">{publication.category}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Created</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(publication.createdAt)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Last Updated</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(publication.updatedAt)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Publication ID</p>
                <p className="text-foreground font-mono text-sm break-all">{publication._id}</p>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Visibility & Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Public</span>
                <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                  publication.is_public 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {publication.is_public ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {publication.is_public ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Deleted</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  publication.is_deleted 
                    ? 'bg-red-400/20 text-red-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {publication.is_deleted ? 'Yes' : 'No'}
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
            <p className="text-sm text-neutral-300">Permanently delete this stream. This action cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Stream
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
              <h3 className="text-xl font-semibold text-foreground">Delete Stream</h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-foreground">{publication?.title}</strong>? 
              This action is <strong className="text-red-400">irreversible</strong> and will permanently delete all publication data including:
            </p>
            <ul className="text-sm text-neutral-400 mb-6 list-disc list-inside space-y-1">
              <li>All subscriptions to the publication</li>
              <li>All publication collaborators</li>
              <li>Publication references from articles (articles will be unlinked)</li>
              <li>The publication itself</li>
            </ul>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deletePublicationMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletePublicationMutation.isPending ? (
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
                disabled={deletePublicationMutation.isPending}
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

