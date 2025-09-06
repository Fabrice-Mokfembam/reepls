import React from 'react';
import {  CheckCircle} from 'lucide-react';

interface AuthorComponentProps {
  avatarSrc: string;
  username: string;
  occupation: string;
  isVerified: boolean;
}

const AuthorSuggestionComponent: React.FC<AuthorComponentProps> = ({
  avatarSrc,
  username,
  occupation,
  isVerified,
}) => {

  return (
    <div className="flex items-center justify-between p-4 text-[14px]">
      <div className="flex items-center gap-3">
        <img src={avatarSrc} alt="Avatar" className="w-10 h-10 rounded-full" />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-neutral-50 text-[16px]">{username}</span>
            {isVerified && <CheckCircle size={16} className="text-green-500" />}
            <span className='text-primary-400 px-2'>following</span>
          </div>
          <p className="text-neutral-100 text-sm line-clamp-1 text-ellipsis ">{occupation}</p>
        </div>
      </div>
    
    </div>
  );
};

export default AuthorSuggestionComponent;