import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { User } from '../../../models/datamodels';
import { useRoute } from '../../../hooks/useRoute';
import { useFollowUser } from '../../Follow/hooks/useFollowUser';

interface AuthorComponentProps {
  user: User;
}

const AuthorSuggestionComponent: React.FC<AuthorComponentProps> = ({ user }) => {
  const { routeToUseProfile } = useRoute();

  // Use follow hook with targetUserId as the user in the item (not auth user)
  const {
    isFollowing,
    isFollowPending,
    isUnfollowPending,
    toggleFollow
  } = useFollowUser({ targetUserId: user?._id });

  // Helper: get initial from username or name
  const getInitial = () => {
    const str = user.username || user.name || '';
    if (!str) return '';
    return str.charAt(0).toUpperCase();
  };

  // Determine button text and disabled state
  let buttonText = 'Follow';

  if (isFollowPending) {
    buttonText = 'Following...';

  } else if (isUnfollowPending) {
    buttonText = 'Unfollowing...';
  
  } else if (isFollowing) {
    buttonText = 'Following';
  
  }

  return (
    <div className="flex items-center justify-between p-4 text-[14px]">
      <div className="flex items-center gap-3">
        {user?.banner_picture ? (
          <img
            src={user.banner_picture}
            alt={`${user.username || user.name} avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center text-neutral-100 font-semibold text-lg select-none">
            {getInitial()}
          </div>
        )}

        <div>
          <div className="flex items-center gap-1">
            <span
              onClick={() => routeToUseProfile(user.username!)}
              className="font-semibold text-neutral-50 text-[16px] line-clamp-1 text-ellipsis hover:underline cursor-pointer"
            >
              {user?.name}
            </span>
            {user?.is_verified_writer && <CheckCircle size={16} className="text-green-500" />}
            <span onClick={toggleFollow}
         className="text-primary-400 px-2 cursor-pointer">{buttonText}</span>
          </div>
          <p  className="text-neutral-100 text-sm line-clamp-1 text-ellipsis">{user?.bio}</p>
        </div>
      </div>

   
    </div>
  );
};

export default AuthorSuggestionComponent;
