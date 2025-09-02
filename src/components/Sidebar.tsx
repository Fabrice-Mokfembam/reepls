import { Home, Search, Bell, Bookmark, UserCircle2, CircleChevronRight } from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
import { Link } from 'react-router-dom';

type SidebarProps = {
  screenSize: 'sm' | 'md' | 'lg';
};

export const Sidebar = ({ screenSize }: SidebarProps) => {
  const { isOpen, toggleSidebar } = useSidebar();

  const navLinks = [
    { icon: Home, name: 'Feed', link: '/feed' },
    { icon: Search, name: 'Search', link: '/search' },
    { icon: Bookmark, name: 'Saved', link: '/saved' },
    { icon: Bell, name: 'Notifications', link: '/notifications' },
    { icon: UserCircle2, name: 'Profile', link: '/profile' },
  ];

  return (
    <aside
      className={`
        transition-all duration-300 ease-in-out border-r border-neutral-700
        z-40 flex flex-col
        ${screenSize === 'sm' ? 'fixed' : 'sticky'} top-0 h-screen
        ${screenSize === 'sm' && !isOpen ? '-translate-x-full' : ''}
      `}
      style={{
        width: screenSize === 'md' || !isOpen ? "8vw" : "15vw",
        backgroundColor: 'var(--color-neutral-800)',
        color: 'var(--color-plain-a)'
      }}
    >
      {/* Toggle Button - Only visible on large screens */}
      {screenSize === 'lg' && (
        <div
          onClick={toggleSidebar}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute -left-0.5 -top-4 w-2 h-8 bg-neutral-800" />
            <CircleChevronRight
              className={`w-6 h-6 transform transition-transform duration-300 text-neutral-400 hover:text-primary-400
                ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      )}

      {/* Logo Area */}
      <div className="h-20 flex items-center px-4">
        <span
          className={`font-bold text-xl whitespace-nowrap transition-all duration-300 overflow-hidden`}
          style={{
            maxWidth: screenSize === 'lg' && isOpen ? "15vw" : "0",
          }}
        >
          Reepls
        </span>
        {(screenSize !== 'lg' || !isOpen) && <span className="text-2xl font-bold">R</span>}
      </div>

      {/* Nav Links */}
      <nav className="mt-8 flex flex-col gap-2">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-primary-500/10"
          >
            <item.icon size={24} />
            <span
              className="ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden"
              style={{
                maxWidth: screenSize === 'lg' && isOpen ? "12vw" : "0",
              }}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
