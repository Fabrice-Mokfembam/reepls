import React, { useState } from "react";
import { ThumbsUp, Bookmark, Radio, MessageCircle } from "lucide-react";
import type { Article } from "../../../../models/datamodels";
import Reactionmodal from "../../../Reactions/components/Reactionmodal";
import { useReactions } from "../../../Reactions/hooks/useReaction";
import ReactionsPopup from "../../../Reactions/components/ReactionsPopup";
interface Articleprobs {
  article: Article;
}

const BlogArticleReactionStats: React.FC<Articleprobs> = ({ article }) => {
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const isRepost = article?.type === "Repost" && !!article?.repost?.repost_id;
  const repostId = article?.repost?.repost_id;

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

  return (
    <div className="flex items-center justify-between py-5 text-neutral-50 mt-2">
      {/* React Button */}
      <div className="flex gap-8">
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
        <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm font-medium">9</span>
        </button>
      </div>

      {/* Repost Button */}
      <div className="flex gap-8">
        <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
          <Radio className="w-5 h-5" />
          <span className="text-sm font-medium">Repost</span>
        </button>
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
  );
};

export default BlogArticleReactionStats;
