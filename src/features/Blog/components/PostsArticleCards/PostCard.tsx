import React, { useState } from "react";
import BlogProfile from "../PostCardComponents/BlogProfile";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import BlogReactionSection from "../PostCardComponents/BlogReactionSection";
import BlogReactionStats from "../PostCardComponents/BlogReactionStats";
import type { Article } from "../../../../models/datamodels";

interface ArticleCardprobs {
  article: Article
}

const PostCard: React.FC<ArticleCardprobs> = ({ article }) => {
  const isCognitiveMode = false;

  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const openComments = () => setIsCommentSectionOpen(true);

  const closeComments = () => setIsCommentSectionOpen(false);

  const toggleComments = () => setIsCommentSectionOpen(prev => !prev);

  return (
    <div className="w-full max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogProfile article={article} />
      <BlogMessage article={article} />
      {isCognitiveMode && article?.media && <BlogImagery media={article?.media} article={article} />}
      <BlogReactionStats openComments={openComments} article={article} />
      <BlogReactionSection
        article={article}
        openComments={openComments}
        closeComments={closeComments}
        toggleComments={toggleComments}
        isCommentSectionOpen={isCommentSectionOpen} 
      />
    </div>
  );
};

export default PostCard;
