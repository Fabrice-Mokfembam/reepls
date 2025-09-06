import React from "react";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import images from "../../../../assets/images/femaleAuth.png";
import BlogReactionSection from "../PostCardComponents/BlogReactionSection";
import BlogReactionStats from "../PostCardComponents/BlogReactionStats";
import BlogProfileNoEllipsis from "../PostCardComponents/BlogProfileNoEllipsis";
import BlogProfileRepost from "../PostCardComponents/BlogProfileRepost";

const article = {
  id: "1",
  title: "My Blog Post",
  content: "This is the content of my blog post...",
  thumbnail: "https://example.com/thumbnail.jpg",
  // ... other article properties
};

const media = [
  {
    url: images,
    type: "image" as const,
  },
  {
    url: images,
    type: "image" as const,
  },
  {
    url: images,
    type: "video" as const,
  },
];

const ArticleCardCommentary: React.FC = () => {
  const isCognitiveMode = false;
  return (
    <div className="w-full max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogProfileRepost />
      <div className="w-full text-[14px] text-neutral-50/90 line-clamp-3 text-ellipsis p-3">
        Lorem, ipsum repellat quasi inventore dolores? animi officia voluptate
        distinctio!
      </div>
      <div className="border border-neutral-500 p-4 rounded-md">
        <BlogProfileNoEllipsis />
       {isCognitiveMode &&  <BlogImagery media={media} article={article} />}
        <BlogMessage
        title="Advanced React Patterns"
        content="When building React applications, you'll encounter situations where you need to share state between multiple components. In this article, we'll explore various advanced patterns like render props, higher-order components, and the compound component pattern. We'll also discuss when to use each pattern and their trade-offs. By the end of this article, you'll have a better understanding of how to structure complex React applications."
        isArticle={false}
      />
      <div className="text-neutral-50 py-4 text-[14px]">4 mins Read</div>
      </div>

      <BlogReactionStats />
      <BlogReactionSection />
    </div>
  );
};

export default ArticleCardCommentary;
