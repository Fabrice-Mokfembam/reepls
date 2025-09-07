// components/ProfileEditSkeleton.tsx
import React from 'react';
import { MainContent } from '../../../components/MainContent';
import Topbar from '../../../components/Topbar';
import { RightBar } from '../../../components/RightBar';
import ProfileConfigurations from './ProfileConfigurations';

const ProfileEditSkeleton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (

      <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Profile</div>
        </Topbar>
      <div className="max-w-3xl m-auto animate-pulse select-none" aria-busy="true" aria-live="polite">
      {/* Banner skeleton */}
      <div className="w-full h-36 bg-neutral-700 rounded-md mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 opacity-50 animate-gradient-x" />
      </div>

      {/* Profile image skeleton */}
      <div className="size-34 rounded-full bg-neutral-700 border-4 border-neutral-800 shadow-none absolute left-[4%] -bottom-[50%] flex items-center justify-center mb-20">
        <div className="w-16 h-16 bg-neutral-600 rounded-full animate-pulse" />
      </div>

      {/* Form controls skeleton */}
      <div className="mt-24 p-4 space-y-6">
        {['', ''].map((_, i) => (
          <div key={i} className="bg-neutral-700 p-4 rounded-md gap-2 flex flex-col">
            <div className="h-4 w-1/3 bg-neutral-600 rounded animate-pulse" />
            <div className={`h-12 bg-neutral-600 rounded ${i >= 2 ? 'h-24' : 'h-12'} animate-pulse`} />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            disabled
            className="px-6 py-3 bg-neutral-600 text-neutral-500 rounded-full cursor-not-allowed w-28"
          >
            
          </button>
        </div>
      </div>
    </div>
      </MainContent>

      <RightBar>
        <ProfileConfigurations />
      </RightBar>
    </div>
   
  );
};

export default ProfileEditSkeleton;
