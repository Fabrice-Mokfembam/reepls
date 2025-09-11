import { MoreVertical, UserPlus, X, Bookmark, Flag, Share, MessageCircle, Trash2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react'
import type { Article } from '../../../../models/datamodels';
import { useGetUserById } from '../../../Profile/hooks/useProfile';
import { useCurrentUser } from '../../../Auth/hooks/useCurrentUser';

interface Articleprobs{
  article: Article
}


const BlogNoCommentaryHeader:React.FC<Articleprobs> = ({article}) => {
const [isPopupOpen, setIsPopupOpen] = useState(false);
const popupRef = useRef<HTMLDivElement>(null);

const {user:authuser} = useCurrentUser();
const {user} = useGetUserById(article?.repost?.repost_user?._id || '')

const isCurrentUser = authuser?.id!.trim() === article?.repost?.repost_user?._id;

const handleEllipsisClick = () => {
    setIsPopupOpen(!isPopupOpen);
};

// Close popup when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  if (isPopupOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isPopupOpen]);

  return (
    <div className='flex justify-between text-neutral-50 text-[14px] my-6'>
        <div className='space-x-2'>
            <span className='font-semibold'>{user?.name}</span>
            <span>Reposted</span>
        </div>
         <div className="relative" ref={popupRef}>
        {isPopupOpen ? (
          <X
            size={20}
            className="text-neutral-200 cursor-pointer hover:text-neutral-100"
            onClick={handleEllipsisClick}
          />
        ) : (
          <MoreVertical
            size={20}
            className="text-neutral-200 cursor-pointer hover:text-neutral-100"
            onClick={handleEllipsisClick}
          />
        )}
        {isPopupOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-background rounded-md shadow-lg z-10">
            {isCurrentUser ? (
              // Current user's repost menu
              <>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700 rounded-t-md">
                  <MessageCircle size={16} className="text-neutral-100" /> Add Commentary
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700">
                  <Share size={16} className="text-neutral-100" /> Share
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-b-md">
                  <Trash2 size={16} className="text-red-500" /> Delete Repost
                </button>
              </>
            ) : (
              // Other user's repost menu
              <>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700 rounded-t-md">
                  <Bookmark size={16} className="text-green-500" /> Unsave Post
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700">
                  <Flag size={16} /> Report post
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700">
                  <UserPlus size={16} /> Follow author
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-700 rounded-b-md">
                  <Share size={16} /> Share
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogNoCommentaryHeader