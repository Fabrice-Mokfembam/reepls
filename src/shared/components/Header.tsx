import React from 'react';
import { BellIcon, Menu, LogOut } from 'lucide-react';
import { useLogout } from '../../features/auth/hooks/useAuth';
import { decryptLoginData } from '../../features/auth/utils/Encryption';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const logoutMutation = useLogout();
  const loginData = decryptLoginData();
  const adminName = loginData?.admin?.name || 'Admin User';

  return (
    <header className="bg-neutral-800 border-b border-neutral-700 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Hamburger menu button - visible on mobile and tablet */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-neutral-300 hover:text-foreground hover:bg-neutral-700 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-neutral-300 hover:text-foreground hover:bg-neutral-700 rounded-lg transition-colors">
            <BellIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-400 rounded-full"></div>
            <span className="text-foreground font-medium hidden sm:inline">{adminName}</span>
          </div>
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="p-2 text-neutral-300 hover:text-red-400 hover:bg-neutral-700 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
