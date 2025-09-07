import React from "react";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import BlogReactionSection from "../PostCardComponents/BlogReactionSection";
import BlogReactionStats from "../PostCardComponents/BlogReactionStats";
import BlogProfileNoEllipsis from "../PostCardComponents/BlogProfileNoEllipsis";
import BlogNoCommentaryHeader from "../PostCardComponents/BlogNoCommentaryHeader";
import type { Article } from "../../../../models/datamodels";

interface ArticleCardprobs{
  article: Article
}



const PostCardNoCommentary: React.FC<ArticleCardprobs> = ({article}) => {
    const isCognitiveMode = false
  return (
    <div className="w-full max-w-full  sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogNoCommentaryHeader article={article} />
      <div className="border border-neutral-500 p-4 rounded-md">
        <BlogProfileNoEllipsis article={article} />
        <BlogMessage
          article={article}
        />
       {isCognitiveMode && article?.media && <BlogImagery media={article?.media} article={article} />}
      </div>

      <BlogReactionStats article={article} />
      <BlogReactionSection article={article} />
    </div>
  );
};

export default PostCardNoCommentary;
