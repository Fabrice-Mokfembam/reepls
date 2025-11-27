import React from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  ActivityIcon, 
  UserIcon, 
  SettingsIcon 
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: HomeIcon, href: '/dashboard', active: true },
  { name: 'User Accounts', icon: UsersIcon, href: '/users' },
  { name: 'Activity Log', icon: ActivityIcon, href: '/activity' },
  { name: 'Profile', icon: UserIcon, href: '/profile' },
  { name: 'Settings', icon: SettingsIcon, href: '/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-neutral-800 min-h-screen p-6">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-primary-400 rounded-full mr-3"></div>
        <span className="text-foreground text-xl font-bold">Reepls</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-primary-400 text-neutral-800'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
