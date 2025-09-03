import React, { useState } from 'react';
import { Home, Search, PlusCircle, Bookmark, User, Pencil, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { toast } from 'react-toastify';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  return (
    <div className='w-full'>
      {children}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-neutral-700 p-2 flex md:hidden justify-around items-center z-50">
        <Link to="/feed" className="flex flex-col items-center text-neutral-100 hover:text-primary-500">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className="flex flex-col items-center text-neutral-100 hover:text-primary-500">
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        
        {/* Create Post Button with Popover */}
        <div className="relative">
          <Popover>
            <PopoverButton className="flex flex-col items-center text-neutral-100 hover:text-primary-500">
              <PlusCircle size={24} />
              <span className="text-xs mt-1">Post</span>
            </PopoverButton>
            
            <PopoverPanel className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
              {({ close }) => (
                <div className="flex flex-col rounded-lg border border-neutral-500 bg-background shadow-lg w-40">
                  <button
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 hover:bg-neutral-700 hover:text-primary-400"
                    onClick={() => {
                      setIsCreatingPost(true);
                      close();
                      toast.info("Create Post clicked");
                    }}
                  >
                    <PlusCircle size={16} />
                    <span className="text-sm">Create Post</span>
                  </button>
                  
                  <hr className="border-neutral-500 w-3/4 mx-auto" />
                  
                  <button
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 hover:bg-neutral-700 hover:text-primary-400"
                    onClick={() => {
                      navigate("/posts/create");
                      close();
                      toast.info("Write Article clicked");
                    }}
                  >
                    <Pencil size={16} />
                    <span className="text-sm">Write Article</span>
                  </button>
                  
                  <hr className="border-neutral-500 w-3/4 mx-auto" />
                  
                  <button
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 hover:bg-neutral-700 hover:text-primary-400"
                    onClick={() => {
                      navigate("/podcast/create");
                      close();
                      toast.info("Create Podcast clicked");
                    }}
                  >
                    <Mic size={16} />
                    <span className="text-sm">Create Podcast</span>
                  </button>
                </div>
              )}
            </PopoverPanel>
          </Popover>
        </div>
        
        <Link to="/saved" className="flex flex-col items-center text-neutral-100 hover:text-primary-500">
          <Bookmark size={24} />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-neutral-100 hover:text-primary-500">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};