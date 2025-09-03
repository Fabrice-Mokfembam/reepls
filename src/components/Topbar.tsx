import React, { useState } from 'react';
import { Bell, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopbarProps {
  children?: React.ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {
  const [isBrainActive, setIsBrainActive] = useState(false);

  const toggleBrainActive = () => {
    setIsBrainActive(!isBrainActive);
  };



  return (
    <div className="w-full h-[90px] border-b border-neutral-500 sticky top-0 bg-background flex items-center justify-between px-4">
    <div>{children}
      </div>  
      <div className='flex items-center gap-2'>
   <div onClick={toggleBrainActive} className="cursor-pointer">
          <Brain
            size={24}
            className={`${isBrainActive ? 'text-primary-500 fill' : 'text-neutral-100'}`}
          />
        </div>
      <Link to="/notifications" className="relative md:hidden">
        <Bell size={24} className="text-neutral-100 cursor-pointer hover:text-primary-400" />
        <span className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full bg-red-500 text-white size-5 flex justify-center items-center text-xs">9</span>
      </Link>
      </div>
      
    </div>
  );
};

export default Topbar;
