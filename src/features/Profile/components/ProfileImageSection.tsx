import { X } from 'lucide-react';
import React, { useState } from 'react'
import type { User } from '../../../models/datamodels';
import { Pics } from '../../../assets/images';

interface userProbs {
    user:User;
}

const ProfileImageSection:React.FC<userProbs> = ({user}) => {
const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Sample image URLs - replace with your actual image paths
  const bannerImageUrl = user?.banner_picture;
  const profileImageUrl = user?.profile_picture;

  return (
          <div className="w-full relative mb-20">
            {/* Banner image */}
            <div className="w-full h-36 overflow-hidden">
              <img 
                src={bannerImageUrl? bannerImageUrl:Pics.banner} 
                alt="Banner" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* Profile image */}
            <div 
              className="size-34 rounded-full bg-primary-300 absolute left-[4%] -bottom-[50%] overflow-hidden border-4 border-white shadow-lg cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              <img 
                src={profileImageUrl?profileImageUrl:Pics.profile} 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>


               {/* Profile Image Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setShowProfileModal(false)}>
          <div className="relative max-w-2xl max-h-screen" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setShowProfileModal(false)}
              aria-label="Close profile image"
            >
              <X size={32} />
            </button>
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
          </div>
  )
}

export default ProfileImageSection