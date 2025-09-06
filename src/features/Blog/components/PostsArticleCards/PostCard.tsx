import React from "react";
import BlogProfile from "../PostCardComponents/BlogProfile";
import BlogMessage from "../PostCardComponents/BlogMessage";
import BlogImagery from "../PostCardComponents/BlogImageSection";
import images from "../../../../assets/images/femaleAuth.png";
import BlogReactionSection from "../PostCardComponents/BlogReactionSection";
import BlogReactionStats from "../PostCardComponents/BlogReactionStats";

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

const PostCard: React.FC = () => {
    const isCognitiveMode = false
  return (
    <div className="w-full max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 bg-background shadow-sm rounded-md">
      <BlogProfile />
      <BlogMessage
        title="Advanced React Patterns"
        content="When building React applications, you'll encounter situations where you need to share state between multiple components. In this article, we'll explore various advanced patterns like render props, higher-order components, and the compound component pattern. We'll also discuss when to use each pattern and their trade-offs. By the end of this article, you'll have a better understanding of how to structure complex React applications."
        isArticle={false}
      />
    {isCognitiveMode &&  <BlogImagery media={media} article={article} />}
      <BlogReactionStats />
      <BlogReactionSection />
    </div>
  );
};

export default PostCard;
