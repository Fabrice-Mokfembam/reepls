import React, { useState } from "react";
import BlogProfile from "../PostCardComponents/BlogProfile";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import BlogArticleReactionStats from "../PostCardComponents/BlogArticleReactionStats";
import type { Article } from "../../../../models/datamodels";
import { LucideMic } from "lucide-react";
import { calculateReadTime } from "../../../../utils/articles";


interface ArticleCardprobs {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardprobs> = ({ article }) => {
  const isCognitiveMode = false;

  

    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const openComments = () => setIsCommentSectionOpen(true);

  const closeComments = () => setIsCommentSectionOpen(false);

  const toggleComments = () => setIsCommentSectionOpen(prev => !prev);

  return (
    <div className="w-full max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogProfile article={article} />
      <div>
        {isCognitiveMode && article?.media && (
          <BlogImagery media={article?.media} article={article} />
        )}
        <BlogMessage article={article} />
        <div className="flex py-3 gap-1 items-center">
          {article.hasPodcast && (
            <>
              <button className="p-2 rounded-full bg-primary-500">
                <LucideMic size={18} className="text-white" />
              </button>
              <div className="size-1 rounded-full bg-primary-400"></div>
            </>
          )}
          <div className="text-neutral-50 py-4 text-[13px] sm:text-[14px]">
            {calculateReadTime(article.content!, article.media || [])} mins Read
          </div>
        </div>
      </div>

      <BlogArticleReactionStats 
        openComments={openComments}
        closeComments={closeComments}
        toggleComments={toggleComments}
        isCommentSectionOpen={isCommentSectionOpen}
        article={article} />
    </div>
  );
};

export default ArticleCard;
