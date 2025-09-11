import React, { useRef, useState } from "react";
import { ThumbsUp, Bookmark, Radio, MessageCircle, PenLine, LucideLoader } from "lucide-react";
import type { Article } from "../../../../models/datamodels";
import Reactionmodal from "../../../Reactions/components/Reactionmodal";
import { useReactions } from "../../../Reactions/hooks/useReaction";
import ReactionsPopup from "../../../Reactions/components/ReactionsPopup";
import CommentSection from "../../../Comments/components/CommentSection";
import { useComments } from "../../../Comments/hooks/useComments";
import { useRepostArticle } from "../../../Repost/hooks/useRepost";
import { useUser } from "../../../../hooks/useUser";
import BlogRepostModal from "../../../Repost/components/BlogRepostModal";
interface Articleprobs {
  article: Article;
}

const BlogArticleReactionStats: React.FC<Articleprobs & {
  openComments: () => void;
  closeComments: () => void;
  toggleComments: () => void;
  isCommentSectionOpen: boolean;
}> = ({ article,  closeComments, toggleComments, isCommentSectionOpen }) => {
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const isRepost = article?.type === "Repost" && !!article?.repost?.repost_id;
  const repostId = article?.repost?.repost_id;
  const { isLoading, totalComments } = useComments(article)
    const { mutate: repost, isPending: isReposting } = useRepostArticle();
    const {isLoggedIn}=useUser()

  const { hasUserReacted, totalReactions } = useReactions(
    `${isRepost ? "Repost" : "Article"}`,
    `${isRepost ? repostId : article?._id}`
  );

  const onThumbMouseEnter = () => {
    setIsReactionOpen(true);
  };

  const onThumbMouseLeave = () => {
    setIsReactionOpen(false);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNoReactionsTip, setShowNoReactionsTip] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);
    const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);
      const repostRef = useRef<HTMLDivElement>(null);

  const handleReactionsClick = () => {
    if (totalReactions && totalReactions > 0) {
      setIsPopupOpen(true);
      setShowNoReactionsTip(false);
    } else {
      setShowNoReactionsTip(true);
      // Hide the tip after a short delay (e.g., 2 seconds)
      setTimeout(() => setShowNoReactionsTip(false), 2000);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
 const isSmallScreen = window.innerWidth <=640;

   const handleRepostOnly = () => {
    repost(
      { articleId: article._id!, comment: "" },
      {
        onSuccess: () => {
          setShowRepostModal(false);
        
        },
        onError: () => {
          setShowRepostModal(false);
          
        },
      }
    );
  };

   const handleRepostClick = () => {
    if (!isLoggedIn) {
      alert('Please login to repost');
      return;
    };
    setShowRepostModal(!showRepostModal);
  };

    const handleRepostWithThought = () => {
    setIsRepostModalOpen(true);
    setShowRepostModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 text-neutral-50 mt-2">
      {/* React Button */}
      <div className="flex gap-2 md:gap-8">
        <button className="flex cursor-pointer items-center space-x-2 hover:text-primary-500 transition-colors relative">
          <ThumbsUp
            onMouseEnter={onThumbMouseEnter}
            className={`w-5 h-5 ${
              hasUserReacted ? "fill-primary-400 text-primary-400" : ""
            }`}
          />
          <span
            onClick={handleReactionsClick}
            className="text-sm font-medium hover:underline"
          >
            {totalReactions || 0}
          </span>
            {showNoReactionsTip && (
          <div className="absolute top-full mt-1 left-0 w-[100px] bg-background text-white text-xs rounded px-2 py-1 shadow-lg z-20">
            No reactions to view
          </div>
        )}
          {isReactionOpen && (
            <div
              onMouseEnter={() => setIsReactionOpen(true)}
              className="absolute -top-14 z-[9000px] left-8"
            >
              <Reactionmodal
                article={article}
                onmouseleave={onThumbMouseLeave}
              />
            </div>
          )}
        </button>
      
        {/* Comment Button */}
          <div
            className="ml-4 text-neutral-50 text-sm hover:text-primary-500 hover:underline underline-offset-1 flex items-center gap-1 min-w-[120px]"
            onClick={toggleComments}
          >
            {isLoading ? (
              <div className="flex items-center gap-1 ">
                <div className="w-4 h-4 bg-neutral-500 rounded-full animate-pulse" />
                <div className="w-20 h-4 bg-neutral-500 rounded-md animate-pulse" />
              </div>
            ) : totalComments > 0 ? (
              <div className="flex items-center gap-1">
                <MessageCircle className="size-4" />
                {totalComments}
              </div>
            ) : (
              <>
                <PenLine size={16} />
                {isSmallScreen ? "Your thoughts?" : "What are your thoughts"}
              </>
            )}
          </div>
      </div>

      {/* Repost Button */}
      <div className="flex gap-8">
         <div
            className="relative flex items-center gap-1 text-neutral-50 cursor-pointer"
            ref={repostRef}
          >
            <button
              onClick={handleRepostClick}
              className="flex hover:text-primary-500 text-sm items-center gap-1 cursor-pointer"
              disabled={isReposting}
            >
              
              {isReposting ? (
                <>
                  <LucideLoader className="animate-spin inline-block mr-1" />{" "}
                  Reposting...
                </>
              ) : (
                <>
                  <Radio className="size-4" /> Repost
                </>
              )}
            </button>

            {showRepostModal && (
              <div className="absolute bg-background bottom-full right-0 mt- border border-neutral-700 rounded-md shadow-lg z-50 min-w-[190px] p-2">
                <div className="py-1">
                  <button
                    onClick={handleRepostOnly}
                    className="py-2 text-s hover:text-primary-400 transition-colors w-full text-left"
                    disabled={isReposting}
                  >
                    {isReposting ? (
                      <>
                        <LucideLoader className="animate-spin inline-block mr-1" />{" "}
                        Reposting...
                      </>
                    ) : (
                      "Repost only"
                    )}
                  </button>
                  <div className="w-full h-[.5px] bg-neutral-500"></div>
                  <button
                    onClick={handleRepostWithThought}
                    className="py-2 text-s hover:text-primary-400 transition-colors w-full text-left"
                  >
                    Repost with your thought
                  </button>
                </div>
              </div>
            )}
          </div>

            <BlogRepostModal
            isOpen={isRepostModalOpen}
            onClose={() => setIsRepostModalOpen(false)}
            article_id={article._id!}
            author_of_post={article?.author_id || {}}
            article={article}
          />
        <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {isPopupOpen && (
        <ReactionsPopup
          article={article}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </div>
       { isCommentSectionOpen && <CommentSection oncloseCommentsection={closeComments} article={article} />}
    </>
  
  );
};

export default BlogArticleReactionStats;
