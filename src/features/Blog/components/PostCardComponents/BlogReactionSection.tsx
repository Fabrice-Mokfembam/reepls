import React from 'react';
import {  ThumbsUp, MessageSquare, Repeat } from 'lucide-react';
import type { Article } from '../../../../models/datamodels';

interface Articleprobs{
  article: Article
}

const BlogReactionSection:React.FC<Articleprobs> = ({article}) => {
  return (
    <div className="flex items-center text-neutral-50 justify-between py-5 border-t border-gray-200">
      {/* React Button */}
      <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
        <ThumbsUp className="w-5 h-5" />
        <span className="text-sm font-medium">React</span>
      </button>

      {/* Comment Button */}
      <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium">Comment</span>
      </button>

      {/* Repost Button */}
      <button className="flex items-center space-x-2  hover:text-primary-500 transition-colors">
        <Repeat className="w-5 h-5" />
        <span className="text-sm font-medium">Repost</span>
      </button>
    </div>
  );
};

export default BlogReactionSection;