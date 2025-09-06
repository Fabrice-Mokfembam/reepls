import React, { useState } from 'react';
import { MoreVertical, UserPlus, Eye, CheckCircle, X } from 'lucide-react';

interface AuthorComponentProps {
  avatarSrc: string;
  username: string;
  occupation: string;
  isVerified: boolean;
}

const AuthorComponent: React.FC<AuthorComponentProps> = ({
  avatarSrc,
  username,
  occupation,
  isVerified,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEllipsisClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <img src={avatarSrc} alt="Avatar" className="w-10 h-10 rounded-full" />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-neutral-50">{username}</span>
            {isVerified && <CheckCircle size={16} className="text-green-500" />}
          </div>
          <p className="text-neutral-100 text-sm">{occupation}</p>
        </div>
      </div>
      <div className="relative">
   {  showPopup? <X size={20}
          className="text-neutral-200 cursor-pointer hover:text-neutral-100"
          onClick={handleEllipsisClick}/>:    <MoreVertical
          size={20}
          className="text-neutral-200 cursor-pointer hover:text-neutral-100"
          onClick={handleEllipsisClick}
        />}
        {showPopup && (
          <div className="absolute right-0 mt-2 w-40 bg-neutral-700 rounded-md shadow-lg z-10">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-600 rounded-t-md">
              <UserPlus size={16} /> Following
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-neutral-100 hover:bg-neutral-600 rounded-b-md">
              <Eye size={16} /> View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorComponent;