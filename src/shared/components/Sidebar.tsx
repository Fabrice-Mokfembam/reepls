import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  ActivityIcon, 
  FileText,
  Mic,
  Radio,
  UserIcon, 
  SettingsIcon,
  X
} from 'lucide-react';
import { ROUTES } from '../constants';

const navigationItems = [
  { name: 'Dashboard', icon: HomeIcon, href: ROUTES.DASHBOARD },
  { name: 'User Accounts', icon: UsersIcon, href: ROUTES.USERS },
  { name: 'Activity Log', icon: ActivityIcon, href: ROUTES.ACTIVITY },
  { name: 'Articles', icon: FileText, href: ROUTES.ARTICLES },
  { name: 'Podcast', icon: Mic, href: ROUTES.PODCAST },
  { name: 'Streams', icon: Radio, href: ROUTES.STREAMS },
  { name: 'Profile', icon: UserIcon, href: ROUTES.PROFILE },
  { name: 'Settings', icon: SettingsIcon, href: ROUTES.SETTINGS },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-neutral-800 p-6 z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-8 lg:justify-start">
          <Link to={ROUTES.DASHBOARD} className="flex items-center" onClick={() => {
            if (window.innerWidth < 1024) {
              onClose();
            }
          }}>
            <div className="w-8 h-8 bg-primary-400 rounded-full mr-3"></div>
            <span className="text-foreground text-xl font-bold">Reepls</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-neutral-300 hover:text-foreground hover:bg-neutral-700 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
              (item.href === ROUTES.USERS && location.pathname.startsWith(ROUTES.USERS));
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  // Close sidebar on mobile when navigation item is clicked
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-400 text-neutral-800'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
