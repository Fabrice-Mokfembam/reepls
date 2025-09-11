import { CheckCircle } from 'lucide-react'
import React from 'react'
import type { Article } from '../../../../models/datamodels'
import { timeAgo } from '../../../../utils/dateFormater'
import { useRoute } from '../../../../hooks/useRoute'
import { useFollowUser } from '../../../Follow/hooks/useFollowUser'
import { useGetUserById } from '../../../Profile/hooks/useProfile'
interface Articleprobs{
  article: Article
}

const BlogProfileNoEllipsis:React.FC<Articleprobs> = ({article}) => {

 const {user} = useGetUserById(article?.repost?.repost_user?._id || '')

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
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
          {user?.banner_picture ? (
          <img
            src={article.author_id?.profile_picture}
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
                routeToUseProfile(article.author_id?.username || "")
              } className="font-semibold text-neutral-50">{article.author_id?.name}</span>
            {article.author_id?.is_verified_writer && <CheckCircle size={16} className="text-primary-400" />}
                 <span
                className="text-primary-400 px-2 text-sm cursor-pointer"
                onClick={() => toggleFollow()}
              >
                {buttonText}
              </span>
          </div>
          <p className="text-neutral-100 text-sm">{article.author_id?.bio}</p>
          <p className="text-neutral-200 text-sm">{timeAgo(article?.createdAt || '')}</p>
        </div>
      </div>
    
    </div>
  )
}

export default BlogProfileNoEllipsis