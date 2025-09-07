import { CheckCircle, EyeIcon, MoreVertical, UserPlus, X } from 'lucide-react'
import React, { useState } from 'react'
import avatarSrc from '../../../../assets/images/maleAuth.png'
import type { Article } from '../../../../models/datamodels'
interface Articleprobs{
  article: Article
}

const BlogProfileRepost:React.FC<Articleprobs> = ({article}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleEllipsisClick = () => {
        setIsPopupOpen(!isPopupOpen);
      };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <img src={avatarSrc} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div className='flex flex-col '>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-neutral-50">STARUTH</span>
            {<CheckCircle size={16} className="text-primary-400" />}
            <span className="text-primary-400 px-2 text-sm">following</span>
          </div>
          <p className="text-neutral-100 text-sm">Web Developer</p>
          <p className="text-neutral-200 text-sm">6 days ago</p>
        </div>
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

export default BlogProfileRepost