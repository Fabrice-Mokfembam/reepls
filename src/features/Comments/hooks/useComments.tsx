import { useState } from 'react';
import { useDeleteComment, useGetCommentsByArticleId, useUpdateComment } from ".";
import type { Article, Comment} from "../../../models/datamodels";
import { useAddCommentToRepost, useGetCommentsTreeForRepost } from "../../Repost/hooks/useRepost";

import { toast } from 'react-toastify'; 
import { useUser } from '../../../hooks/useUser';
import { useSendCommentNotification } from '../../Notifications/hooks/useNotification';


export function useComments(article: Article) {
  const article_id = article._id || '';

  // Fetch comments logic
  const {
    data: articleComments,
    isLoading: isArticleCommentsLoading,
    isError: isArticleCommentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommentsByArticleId(article_id);

  const {
    data: repostComments,
    isLoading: isRepostCommentsLoading,
    isError: isRepostCommentsError,
  } = useGetCommentsTreeForRepost(article.repost?.repost_id || '');

  const isLoading = article.type === 'Repost' ? isRepostCommentsLoading : isArticleCommentsLoading;
  const isError = article.type === 'Repost' ? isRepostCommentsError : isArticleCommentsError;

  const commentsToRender =
    article.type === 'Repost' && repostComments
      ? repostComments.commentsTree
      : articleComments?.pages?.flatMap(page => page.data.commentsTree) || [];


     const totalComments = article.type === 'Repost' 
    ? repostComments?.totalComments || 0
    : articleComments?.pages?.[0]?.data?.totalComments || 0;

  // Local state for pending repost comment submission
  const [isPendingRepost, setIsPendingRepost] = useState(false);

  // Mutation hooks
  const { mutate: sendCommentNotification, isPending: isSendCommentNotificationPending } = useSendCommentNotification();
  const { mutate: deleteComment, isPending: isDeletePending } = useDeleteComment();
  const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment();
  const { authUser } = useUser();
    const { mutate: addCommentToRepost, isPending: isAddCommentToRepostPending } = useAddCommentToRepost();


  
  const validateCommentData = (commentData: Comment): boolean =>
    Boolean(commentData.article_id && commentData.content?.trim());

  const validateRepostCommentData = (commentData: { repostId: string; content: string }): boolean =>
    Boolean(commentData.repostId && commentData.content?.trim());

  const createComment = (comment: string) => {
    if (!authUser) return;

    if (article.type === 'Repost') {
      const repostId = article.repost?.repost_id;
      if (!repostId) return;

      const commentValuesRepost = {
        repostId,
        content: comment,
      };

      if (!validateRepostCommentData(commentValuesRepost)) return;

      setIsPendingRepost(true);
      addCommentToRepost(commentValuesRepost, {
        onSuccess: () => {
        
          toast.success("You added 1 comment.");
          setIsPendingRepost(false);
        },
        onError: () => {
          toast.error("Failed to post comment. Please try again later.");
          setIsPendingRepost(false);
        },
      });
    } else {
      const commentValues = {
        article_id,
        content: comment,
      };

      if (!validateCommentData(commentValues)) return;

      sendCommentNotification(commentValues, {
        onSuccess: () => {
          toast.success("You added 1 comment.");
        },
        onError: () => toast.error("Failed to post comment. Please try again later."),
      });
    }
  };

  // Delete comment
  const removeComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted successfully")
      },
      onError: (error: Error) => {
        toast.error("Failed to delete comment");
        console.error("Delete comment error:", error.message);
      },
    });
  };

  // Update comment
  const editComment = (commentId: string, editedContent: string) => {
    updateComment(
      { commentId, content: editedContent },
      {
        onSuccess: () => {
          toast.success("Comment updated successfully");
        },
        onError: (error: Error) => {
          toast.error("Failed to update comment");
          console.error("Update comment error:", error.message);
        },
      }
    );
  };

  return {
    Comments: commentsToRender,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    createComment,
    removeComment,
    editComment,
    isPendingRepost,
    isSendingComment: isAddCommentToRepostPending || isSendCommentNotificationPending,
    isDeletePending,
    isUpdatePending,
    authUser,
    totalComments,
    articleComments,
    repostComments
  };
}
