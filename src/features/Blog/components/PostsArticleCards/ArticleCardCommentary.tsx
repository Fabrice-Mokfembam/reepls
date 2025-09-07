import React from "react";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import BlogReactionSection from "../PostCardComponents/BlogReactionSection";
import BlogReactionStats from "../PostCardComponents/BlogReactionStats";
import BlogProfileNoEllipsis from "../PostCardComponents/BlogProfileNoEllipsis";
import BlogProfileRepost from "../PostCardComponents/BlogProfileRepost";
import type { Article } from "../../../../models/datamodels";

interface ArticleCardCommentaryprobs{
  article: Article
}



const ArticleCardCommentary: React.FC<ArticleCardCommentaryprobs> = ({article}) => {
  const isCognitiveMode = false;
  return (
    <div className="w-full max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogProfileRepost article={article} />
      <div className="w-full text-[14px] text-neutral-50/90 line-clamp-3 text-ellipsis p-3">
        Lorem, ipsum repellat quasi inventore dolores? animi officia voluptate
        distinctio!
      </div>
      <div className="border border-neutral-500 p-4 rounded-md">
        <BlogProfileNoEllipsis article={article} />
       {isCognitiveMode && article?.media && <BlogImagery media={article.media} article={article} />}
        <BlogMessage
       article={article}
      />
      <div className="text-neutral-50 py-4 text-[14px]">4 mins Read</div>
      </div>

      <BlogReactionStats article={article} />
      <BlogReactionSection article={article} />
    </div>
  );
};

export default ArticleCardCommentary;
