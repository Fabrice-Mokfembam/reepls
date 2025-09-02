import React from 'react';
import { Home, Search, PlusCircle, Bookmark, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {


  return (
    <div className='w-full bg-background'>
      {children}

      {/* {(screenSize === 'sm' || screenSize === 'md') && ( */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-neutral-700 p-2 flex md:hidden justify-around items-center z-50">
          <Link to="/feed" className="flex flex-col items-center text-neutral-400 hover:text-primary-500">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center text-neutral-400 hover:text-primary-500">
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link to="/post" className="flex flex-col items-center text-neutral-400 hover:text-primary-500">
            <PlusCircle size={24} />
            <span className="text-xs mt-1">Post</span>
          </Link>
          <Link to="/saved" className="flex flex-col items-center text-neutral-400 hover:text-primary-500">
            <Bookmark size={24} />
            <span className="text-xs mt-1">Saved</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-neutral-400 hover:text-primary-500">
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      {/* )} */}
    </div>
  );
};