import React, { useState, useRef, useEffect } from 'react';
import { Ellipsis, MessageCircle, ThumbsUp, Edit, Trash2, LucideLoader, Send } from 'lucide-react';
import type { Article, Comment } from '../../../models/datamodels';
import { timeAgo } from '../../../utils/dateFormater';
import { useRoute } from '../../../hooks/useRoute';
import CommentSectionLevel2 from './CommentSectionLevel2';
import { useCommentContext } from '../../../hooks/useCommentContext';
import { useUser } from '../../../hooks/useUser';
import { useComments } from '../hooks/useComments';

interface commentprobs {
  comment: Comment;
  article: Article;
  setIsLevel2Open: (isOpen: boolean) => void;
}

const CommentMessage: React.FC<commentprobs> = ({ comment, setIsLevel2Open, article }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const { routeToUseProfile } = useRoute();
  const { openReplyId, setOpenReplyId } = useCommentContext();
  const { authUser } = useUser();
  const [editedContent, setEditedContent] = useState(comment.content);
  const { removeComment, isDeletePending, editComment, isUpdatePending } = useComments(article);

  const isLevel2Open = openReplyId === comment._id;
  
  // Notify parent about level 2 open state
  useEffect(() => {
    setIsLevel2Open(isLevel2Open);
  }, [isLevel2Open, setIsLevel2Open]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    if (comment._id && editedContent?.trim() !== '') {
      await editComment(comment._id, editedContent!.trim());
      setIsEditing(false);
      setShowMenu(false);
    }
  };

  const handleDelete = async () => {
    if (comment._id) {
      await removeComment(comment._id);
      setShowMenu(false);
    }
  };

  const startEditing = () => {
    setEditedContent(comment.content);
    setIsEditing(true);
    setShowMenu(false);
  };

  const cancelEditing = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  // Close the popup if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const closeLevel2 = () => {
    setOpenReplyId(null);
  };

  const toggleComments = () => {
    setOpenReplyId(isLevel2Open ? null : comment._id!);
  };

  const currentUser = authUser?.username || 'Anonymous';
  const isAuthor = currentUser === comment.author?.username;

  // Handle Enter key to save edit
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <>
      <div className="text-neutral-100 font-sans">
        <div className="bg-background">
          <div className="bg-neutral-700 p-4 rounded-md relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {comment.author?.profile_picture ? (
                  <img
                    src={comment.author?.profile_picture}
                    alt={comment.author?.username}
                    className="size-6 rounded-full object-cover"
                    onClick={() => routeToUseProfile(comment.author?.username || '')}
                  />
                ) : (
                  <div
                    className="size-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[13px]"
                    onClick={() => routeToUseProfile(comment.author?.username || '')}
                  >
                    {comment.author?.name?.charAt(0)}
                  </div>
                )}
                <span onClick={() => routeToUseProfile(comment.author?.username || '')} className="font-semibold text-[15px] hover:underline cursor-pointer">
                  {comment.author?.name}
                </span>
              </div>
              <div className="flex items-center gap-1 relative">
                <span className="text-xs text-neutral-300">{timeAgo(comment?.createdAt?.toString() || '')}</span>
                {isAuthor && !isEditing && (
                  <Ellipsis
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                  />
                )}
                {showMenu && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-0 mt-2 w-28 bg-neutral-800 rounded-md shadow-lg z-50 text-neutral-50"
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-left rounded-t-md"
                      onClick={startEditing}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-left rounded-b-md text-red-500"
                      onClick={handleDelete}
                      disabled={isDeletePending}
                    >
                      {isDeletePending ? (
                        <LucideLoader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <div className="mt-2 mb-1 flex items-center gap-2">
                <input
                  ref={editInputRef}
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-neutral-600 text-neutral-50 text-[13px] p-2 rounded outline-none caret-neutral-50"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleEdit} 
                    disabled={isUpdatePending || editedContent?.trim() === ''}
                    className="p-1 hover:text-primary-400 disabled:opacity-50"
                  >
                    {isUpdatePending ? (
                      <LucideLoader className="animate-spin size-4" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                  <button 
                    onClick={cancelEditing}
                    className="p-1 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 mb-1 text-neutral-50 text-[13px]">{comment?.content}</p>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-6 text-xs text-neutral-50 p-2">
              <button className="flex items-center gap-1 hover:text-primary-400 transition-colors cursor-pointer">
                <ThumbsUp className="w-4 h-4" />
                <span>React • 0 </span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary-400 transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span onClick={toggleComments}>Reply • </span>
                <span className="text-primary-400">{comment.replies?.length || 0} replies</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isLevel2Open && (
        <CommentSectionLevel2 
          articleid={comment.targetId!} 
          commentid={comment._id!} 
          comments={comment.replies || []} 
          oncloseCommentsection={closeLevel2} 
        />
      )}
    </>
  );
};

export default CommentMessage;