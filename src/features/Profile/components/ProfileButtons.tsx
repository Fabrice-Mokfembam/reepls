import React from 'react';
import { Edit3, BarChart3, Settings, UserPlus } from 'lucide-react';
import { useCurrentUser } from '../../Auth/hooks/useCurrentUser';
import type { User } from '../../../models/datamodels';

interface userProbs {
    user:User;
}

const ProfileButtons: React.FC<userProbs> = ({ user}) => {
const {user:authuser} = useCurrentUser() ;

const isCurrentUser = authuser?.username!.trim() === user?.username?.trim();

  return (
    <div className="md:relative flex justify-end gap-3 mt-6 text-[14px] w-full h-full">
      {/* For medium screens and above */}
      <div className="hidden md:flex gap-3">
        {isCurrentUser ? (
          <>
            <button className="flex cursor-pointer justify-center items-center h-14 gap-2 px-4 py-2 border border-neutral-200 rounded-full text-neutral-50 transition-colors">
              <Edit3 size={16} />
              <span>Edit profile</span>
            </button>
            <button className="flex cursor-pointer justify-center items-center h-14 gap-2 px-4 py-2 border border-neutral-200 rounded-full text-neutral-50 transition-colors">
              <BarChart3 size={16} />
              <span>View analytics</span>
            </button>
          </>
        ) : (
          <button className="flex cursor-pointer justify-center  items-center h-14 w-24 gap-2 px-4 py-2 bg-primary-400 text-white rounded-full transition-colors">
            <UserPlus size={16} />
            <span>Follow</span>
          </button>
        )}
      </div>
      
      {/* For small screens (md and below) */}
      <div className="absolute -top-10 right-2 flex gap-3 md:hidden">
        {isCurrentUser ? (
          <>
            <button className="flex cursor-pointer justify-center items-center h-10  gap-2 px-4 py-2 border border-neutral-200 rounded-full text-neutral-50 transition-colors">
              <Edit3  size={16} />
              <span className="sm:inline">Edit profile</span>
            </button>
            <button className="flex cursor-pointer justify-center items-center size-10 border border-neutral-200 rounded-full text-neutral-50 transition-colors">
              <Settings size={16} />
            </button>
          </>
        ) : (
          <button className="flex cursor-pointer justify-center items-center h-14 w-24 gap-2 px-4 py-2 bg-primary-400 text-white rounded-full transition-colors">
            <UserPlus size={16} />
            <span className="inline">Follow</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileButtons;