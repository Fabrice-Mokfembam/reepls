import React from 'react';
import { MapPin, Users, UserPlus,  Lightbulb } from 'lucide-react';
import type { User } from '../../../models/datamodels';

interface userProbs {
    user:User;
}

const ProfileInfoSection: React.FC<userProbs> = ({user}) => {
  
  return (
    <div className="md:px-4 text-[14px] text-neutral-50">
      {/* Name and title */}
      <div className="mb-2">
        <h1 className="text-lg font-bold">{user?.name}</h1>
        <p className="text-neutral-50">{user?.bio}</p>
      </div>

      {/* Location and role */}
      <div className="flex items-center gap-4 mb-2 ">
        <div className="flex items-center gap-1">
          <Lightbulb size={16} className='text-neutral-200' />
          <span>Writer</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} className='text-neutral-200' />
          <span>{user?.address}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-neutral-50">
        <div className="flex items-center gap-1">
          <Users size={16} className='text-neutral-200' />
          <span className="font-semibold">120k</span>
          <span>followers</span>
        </div>
        <div className="flex items-center gap-1">
          <UserPlus size={16} className='text-neutral-200' />
          <span className="font-semibold">134</span>
          <span>following</span>
        </div>
      </div>

     
    </div>
  );
};

export default ProfileInfoSection;