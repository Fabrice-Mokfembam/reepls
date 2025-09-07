
import React from 'react';
import { MainContent } from '../../../components/MainContent';
import Topbar from '../../../components/Topbar';
import { RightBar } from '../../../components/RightBar';
import ProfileRightBarLoader from './ProfileRightBarLoader';

const ProfileSkeleton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (

      <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Profile</div>
        </Topbar>
      <div className="max-w-3xl m-auto animate-pulse select-none" aria-busy="true" aria-live="polite">
   <div className="w-full bg-background dark:bg-background-dark p-4 shadow-sm">
     
      <div className="w-full h-28 bg-neutral-600 dark:bg-neutral-700 animate-pulse rounded-lg mb-4"></div>
  
      <div className="size-28 rounded-full bg-neutral-500 -mt-16 ml-3  animate-pulse flex items-center justify-center">
   
        <div className="size-24 rounded-full bg-neutral-500 dark:bg-neutral-600 animate-pulse"></div>
      </div>

      {/* Profile Content */}
      <div className=" max-w-4xl mx-auto mt-2">
    
        <div className="flex-1 flex flex-col-reverse gap-2">
        
          <div className="h-6 w-[60%] bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>
        
          <div className="h-4 w-1/2 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>

          <div className="h-4 w-[40%] bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-[30%] bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"></div>

    
          
        </div>
      </div>

      {/* Navigation Tabs Skeleton */}
      <div className="mt-12 flex justify-between max-w-4xl mx-auto">
        {["About", "Posts", "Articles", "Media"].map((_, index) => (
          <div
            key={index}
            className="h-8 w-1/4 bg-neutral-500 dark:bg-neutral-600 animate-pulse rounded"
          ></div>
        ))}
      </div>
    </div>
    </div>
      </MainContent>

      <RightBar>
       <ProfileRightBarLoader/>
      </RightBar>
    </div>
   
  );
};

export default ProfileSkeleton;
