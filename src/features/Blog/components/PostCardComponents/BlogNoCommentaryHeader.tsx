import { EyeIcon, MoreVertical, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react'
import type { Article } from '../../../../models/datamodels';

interface Articleprobs{
  article: Article
}


const BlogNoCommentaryHeader:React.FC<Articleprobs> = ({article}) => {
const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleEllipsisClick = () => {
        setIsPopupOpen(!isPopupOpen);
      };

  return (
    <div className='flex justify-between text-neutral-50 text-[14px] my-6'>
        <div className='space-x-2'>
            <span className='font-semibold'>Mokfembam</span>
            <span>Reposted</span>
        </div>
         <div className="relative">
   {  isPopupOpen? <X size={20}
          className="text-neutral-200 cursor-pointer hover:text-neutral-100"
          onClick={handleEllipsisClick}/>:    <MoreVertical
          size={20}
          className="text-neutral-200 cursor-pointer hover:text-neutral-100"
          onClick={handleEllipsisClick}
        />}
        {isPopupOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-neutral-700 rounded-md shadow-lg z-10">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-600 rounded-t-md">
              <UserPlus size={16} /> Following
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-600 rounded-b-md">
              <EyeIcon size={16} /> View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogNoCommentaryHeader