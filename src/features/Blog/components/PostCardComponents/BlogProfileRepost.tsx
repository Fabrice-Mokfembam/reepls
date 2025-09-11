import { CheckCircle, MoreVertical, UserPlus, X, Bookmark, Flag, Share, MessageCircle, Trash2 } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import type { Article } from '../../../../models/datamodels'
import { useRoute } from '../../../../hooks/useRoute'
import { useFollowUser } from '../../../Follow/hooks/useFollowUser'
import { timeAgo } from '../../../../utils/dateFormater'
import { useGetUserById } from '../../../Profile/hooks/useProfile'
import { useCurrentUser } from '../../../Auth/hooks/useCurrentUser'
interface Articleprobs{
  article: Article
}

const BlogProfileRepost:React.FC<Articleprobs> = ({article}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    
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
      const {user:authuser} = useCurrentUser();

      const {user} = useGetUserById(article?.repost?.repost_user?._id || '')

         const isCurrentUser = authuser?.id!.trim() === article?.repost?.repost_user?._id  ;

  const { routeToUseProfile } = useRoute();

  // Use follow hook with targetUserId as the user in the item (not auth user)
  const { isFollowing, isFollowPending, isUnfollowPending, toggleFollow } =
    useFollowUser({ targetUserId: user?._id });

  // Helper: get initial from username or name
  const getInitial = () => {
    const str = user?.username || user?.name || "";
    if (!str) return "";
    return str.charAt(0).toUpperCase();
  };

  // Determine button text and disabled state
  let buttonText = "Follow";

  if (isFollowPending) {
    buttonText = "Following...";
  } else if (isUnfollowPending) {
    buttonText = "Unfollowing...";
  } else if (isFollowing) {
    buttonText = "Following";
  }

  return (
    <div className="flex  items-center justify-between py-4">
          <div className="flex items-center gap-3">
          {user?.banner_picture ? (
          <img
            src={user.banner_picture}
            alt={`${user.username || user.name} avatar`}
            className="w-12 h-12 rounded-full "
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center text-neutral-100 font-semibold text-lg select-none">
            {getInitial()}
          </div>
        )}
        <div className='flex flex-col '>
          <div className="flex items-center gap-1">
            <span   onClick={() =>
                routeToUseProfile(user?.username || "")
              } className="font-semibold text-neutral-50">{user?.name}</span>
              {user?.is_verified_writer && <CheckCircle size={16} className="text-primary-400" />}
                 <span
                className="text-primary-400 px-2 text-sm cursor-pointer"
                onClick={() => toggleFollow()}
              >
                {buttonText}
              </span>
          </div>
          <p className="text-neutral-100 text-sm">{user?.bio}</p>
          <p className="text-neutral-200 text-sm">{timeAgo(article?.repost?.repost_date || '')}</p>
        </div>
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
          <div className="absolute right-0 mt-2 w-52  bg-background rounded-md shadow-lg z-10">
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

export default BlogProfileRepost