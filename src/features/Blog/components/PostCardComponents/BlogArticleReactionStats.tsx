import React from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Radio,
} from "lucide-react";

const BlogArticleReactionStats:React.FC = () => {
  return (
    <div className="flex items-center justify-between py-5 mt-2">
      {/* React Button */}
      <div className='flex gap-8'>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
        <ThumbsUp className="w-5 h-5" />
        <span className="text-sm font-medium">10</span>
      </button>

      {/* Comment Button */}
      <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium">9</span>
      </button>
      </div>
    

      {/* Repost Button */}
      <div  className='flex gap-8'>
         <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
        <Radio className="w-5 h-5" />
        <span className="text-sm font-medium">Repost</span>
      </button>
         <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
        <Bookmark className="w-5 h-5" />
        
      </button>

      </div>
     
    </div>
  );
};

export default BlogArticleReactionStats;