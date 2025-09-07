import React, { useEffect } from 'react';
import AuthorSuggestionComponent from './AuthorSuggestionComponent';
import type { User } from '../../../models/datamodels';
import { useGetRecommendedUsersById } from '../hooks/useProfile';
import { useCurrentUser } from '../../Auth/hooks/useCurrentUser';
import ProfileRightBarLoader from './ProfileRightBarLoader';

const AuthorSimilarProfiles: React.FC = () => {
  const { user: authUser } = useCurrentUser();

  const {
    data: recommendedUsers,
    isLoading,
    error,
  } = useGetRecommendedUsersById(authUser?.id || '');

  useEffect(() => {
    console.log('recommended users:', recommendedUsers);
  }, [recommendedUsers]);

  if (isLoading) {
    // Return a loading spinner or skeleton placeholder while loading
    return (
     <ProfileRightBarLoader/>
    );
  }

  if (error) {
    // Display an error message if fetching fails
    return (
      <div className="p-4 flex justify-center items-center font-sans sticky top-0">
        <div className="w-full max-w-sm rounded-lg overflow-hidden space-y-4 bg-red-700 text-red-100 p-4">
          Failed to load suggestions.
        </div>
      </div>
    );
  }

  if (!recommendedUsers || recommendedUsers.length === 0) {
    // Show message if no suggestions available
    return (
      <div className="p-4 flex justify-center items-center font-sans sticky top-0">
        <div className="w-full max-w-sm rounded-lg overflow-hidden space-y-4 bg-neutral-700 text-neutral-400 p-4">
          No suggestions available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex justify-center items-center font-sans sticky top-0">
      <div className="w-full max-w-sm rounded-lg overflow-hidden space-y-4">
        <h2 className="text-lg font-bold text-neutral-50 mb-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffcd29"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx={9} cy={7} r={4} />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          REEPLS SUGGESTIONS
        </h2>
        <div className="mt-4">
          <div className="space-y-2">
            {recommendedUsers.map((author: User, index: number) => (
              <AuthorSuggestionComponent key={index} user={author} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSimilarProfiles;
