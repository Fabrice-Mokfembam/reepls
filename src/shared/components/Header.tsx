import React from 'react';
import { BellIcon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-neutral-800 border-b border-neutral-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-neutral-300 hover:text-foreground hover:bg-neutral-700 rounded-lg transition-colors">
            <BellIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-400 rounded-full"></div>
            <span className="text-foreground font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};
