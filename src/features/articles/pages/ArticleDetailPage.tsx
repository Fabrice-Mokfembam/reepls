import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  MessageSquare,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  Flag,
  User,
  TrendingUp,
  AlertTriangle,
  Mic,
  Trash2,
  X,
  Loader2
} from 'lucide-react';
import { useArticleById, useDeleteArticle } from '../hooks/useArticles';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Use slug as articleId (assuming the route passes the article ID as slug)
  const { data, isLoading, isError, error } = useArticleById(slug);
  const article = data?.article;
  const deleteArticleMutation = useDeleteArticle();

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
    if (slug) {
      deleteArticleMutation.mutate(slug, {
        onSuccess: () => {
          navigate('/articles');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/articles')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Articles</span>
        </button>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
          <span className="ml-3 text-neutral-300">Loading article...</span>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/articles')}
          className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Articles</span>
        </button>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">
            {error instanceof Error ? error.message : 'Article not found'}
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Views',
      value: article.views_count,
      icon: Eye,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Reactions',
      value: article.reaction_count,
      icon: Heart,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Comments',
      value: article.comment_count,
      icon: MessageCircle,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Reposts',
      value: article.shares_count || 0,
      icon: Repeat2,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Impressions',
      value: article.impression_count || 0,
      icon: TrendingUp,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    },
    {
      title: 'Engagement',
      value: article.engagement_count || 0,
      icon: Share2,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-400/20'
    },
    {
      title: 'Reports',
      value: article.reports_count || 0,
      icon: Flag,
      color: (article.reports_count || 0) > 0 ? 'text-red-400' : 'text-neutral-400',
      bgColor: (article.reports_count || 0) > 0 ? 'bg-red-400/20' : 'bg-neutral-600/20'
    },
    {
      title: 'Author Followers',
      value: article.author_follower_count || 0,
      icon: User,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/articles')}
        className="flex items-center gap-2 text-neutral-300 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Articles</span>
      </button>

      {/* Thumbnail/Banner */}
      {article.thumbnail && (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              {article.isArticle ? (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400 text-neutral-800 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Article
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-400 text-neutral-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Post
                </span>
              )}
              {article.flagged && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400 flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Flagged
                </span>
              )}
              {article.hasPodcast && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400 flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Has Podcast
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                article.status === 'Published' 
                  ? 'bg-primary-400/20 text-primary-400' 
                  : article.status === 'Draft'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-neutral-600 text-neutral-300'
              }`}>
                {article.status}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{article.title}</h1>
            {article.subtitle && (
              <p className="text-xl text-neutral-200">{article.subtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Article Header (if no thumbnail) */}
      {!article.thumbnail && (
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            {article.isArticle ? (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400 text-neutral-800 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Article
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-400 text-neutral-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Post
              </span>
            )}
            {article.flagged && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Flagged
              </span>
            )}
            {article.hasPodcast && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-400/20 text-primary-400 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Has Podcast
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              article.status === 'Published' 
                ? 'bg-primary-400/20 text-primary-400' 
                : article.status === 'Draft'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-neutral-600 text-neutral-300'
            }`}>
              {article.status}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{article.title}</h1>
          {article.subtitle && (
            <p className="text-xl text-neutral-300 mb-4">{article.subtitle}</p>
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
                <p className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Content */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Content</h3>
            <div 
              className="prose prose-invert max-w-none text-neutral-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
            />
          </div>

          {/* Keywords/Tags */}
          {((article.keywords && article.keywords.length > 0) || (article.tags && article.tags.length > 0)) && (
            <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Keywords & Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(article.tags || article.keywords || []).map((tag, index) => (
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

          {/* Media */}
          {article.media && article.media.length > 0 && (
            <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Media</h3>
              <div className="grid grid-cols-2 gap-4">
                {article.media.map((mediaUrl, index) => (
                  <img
                    key={index}
                    src={mediaUrl}
                    alt={`Media ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Article Info */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Article Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-300 mb-1">Type</p>
                <p className="text-foreground font-medium capitalize">{article.type}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Created</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Last Updated</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.updatedAt)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Slug</p>
                <p className="text-foreground font-mono text-sm break-all">{article.slug}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Article ID</p>
                <p className="text-foreground font-mono text-sm break-all">{article._id}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-300 mb-1">Author</p>
                {typeof article.author_id === 'object' && article.author_id !== null ? (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">{article.author_id.name}</p>
                    <p className="text-neutral-400 text-sm">@{article.author_id.username}</p>
                    <p className="text-foreground font-mono text-xs break-all">{article.author_id._id}</p>
                  </div>
                ) : (
                  <p className="text-foreground font-mono text-sm break-all">{article.author_id}</p>
                )}
              </div>
              {article.category && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Category</p>
                  <p className="text-foreground font-medium">{article.category}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Is Communiquer</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  article.is_communiquer 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {article.is_communiquer ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Has Podcast</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  article.hasPodcast 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {article.hasPodcast ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Text to Speech</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  article.text_to_speech 
                    ? 'bg-primary-400/20 text-primary-400' 
                    : 'bg-neutral-600 text-neutral-300'
                }`}>
                  {article.text_to_speech ? 'Available' : 'Not Available'}
                </span>
              </div>
              {article.publication_id && (
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Publication ID</p>
                  <p className="text-foreground font-mono text-sm break-all">{article.publication_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Warning if Flagged */}
          {article.flagged && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-red-400">Flagged Content</h3>
              </div>
              <p className="text-sm text-neutral-300">
                This content has been flagged and may require review.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Danger Zone</h3>
            <p className="text-sm text-neutral-300">Permanently delete this article. This action cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Article
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
              <h3 className="text-xl font-semibold text-foreground">Delete Article</h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete "<strong className="text-foreground">{article?.title}</strong>"? 
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
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deleteArticleMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteArticleMutation.isPending ? (
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
                disabled={deleteArticleMutation.isPending}
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


