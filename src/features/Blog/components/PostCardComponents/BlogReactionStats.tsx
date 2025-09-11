import React, { useEffect, useState } from "react";
import { heart, thumb, clap } from "../../../../assets/icons";
import type { Article } from "../../../../models/datamodels";
import { useReactions } from "../../../Reactions/hooks/useReaction";
import ReactionsPopup from "../../../Reactions/components/ReactionsPopup";
import { useComments } from "../../../Comments/hooks/useComments";
import { PenLine } from "lucide-react";
import { t } from "i18next";


interface ArticleProps {
  article: Article;
}

const BlogReactionStats: React.FC<ArticleProps & { openComments: () => void;} > = ({ article , openComments}) => {
  const isRepost = article?.type === "Repost" && !!article?.repost?.repost_id;
  const repostId = article?.repost?.repost_id;
  const { allReactions, isLoadingAllReactions, totalReactions } = useReactions(
    `${isRepost ? "Repost" : "Article"}`,
    `${isRepost ? repostId : article?._id}`
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNoReactionsTip, setShowNoReactionsTip] = useState(false);
   const {isLoading,totalComments} = useComments(article);

  useEffect(() => {
    console.log("all reactions", allReactions);
  }, [allReactions]);

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

  return (
    <div className="flex items-center justify-between py-5 relative">
      {/* React Button */}
      {isLoadingAllReactions ? (
        <div className="flex gap-1 -ml-1">
          <div className="w-5 h-5 bg-neutral-500 rounded-full animate-pulse" />
          <div className="w-5 h-5 bg-neutral-500 rounded-full animate-pulse -ml-2" />
          <div className="w-5 h-5 bg-neutral-500 rounded-full animate-pulse -ml-2" />
        </div>
      ) : (
        <button
          className="flex items-center space-x-2 text-neutral-50 hover:text-primary-500 transition-colors"
          onClick={handleReactionsClick}
        >
          <div className="flex">
            <img
              src={heart}
              alt="heart"
              className="w-5 h-5 rounded-full shadow-md transform transition-transform relative z-50 -ml-1"
            />
            <img
              src={thumb}
              alt="thumb"
              className="w-5 h-5 rounded-full shadow-md transform transition-transform relative z-30 -ml-2"
            />
            <img
              src={clap}
              alt="hand"
              className="w-5 h-5 rounded-full shadow-md transform transition-transform relative z-20 -ml-2"
            />
          </div>
          <span className="text-sm cursor-pointer hover:underline font-medium">
            {totalReactions || 0}
          </span>
        </button>
      )}

      {/* No reactions tip */}
      {showNoReactionsTip && (
        <div className="absolute top-full mt-1 left-0 bg-gray-700 text-white text-xs rounded px-2 py-1 shadow-lg z-20">
          No reactions to view
        </div>
      )}

      {/* Comment Button */}
       <div
          className='flex items-center gap-1 group cursor-pointer text-sm'
          onClick={openComments}
        >
          {isLoading ? (
            <div className='flex items-center gap-1'>
              <div className='w-4 h-4 bg-neutral-500 rounded-full animate-pulse' />
              <div className='w-20 h-4 bg-neutral-500 rounded-md animate-pulse' />
            </div>
          ) : (
            <>
              {totalComments > 0 ? (
                <span className="group-hover:text-primary-500 group-hover:underline underline-offset-1">
                  {totalComments} {t("Comments", { count: totalComments })}
                </span>
              ) : (
                <span className="group-hover:text-primary-500 group-hover:underline underline-offset-1">
                  <PenLine size={16} className="inline-block mr-1 group-hover:text-primary-500" />
                  {isSmallScreen ? t("Your thoughts?") : t("What are your thoughts")}
                </span>
              )}
            </>
          )}
        </div>

      {/* Reactions Popup */}
      {isPopupOpen && (
        <ReactionsPopup
          article={article}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default BlogReactionStats;
