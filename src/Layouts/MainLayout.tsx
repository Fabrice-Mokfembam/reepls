import { Outlet } from 'react-router-dom';
import { Menu, Home, Search, Bell, Bookmark, UserCircle2, CircleChevronRight } from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';

export const MainLayout = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const navLinks = [
    { icon: Home, name: 'Home', link: '/app' },
    { icon: Search, name: 'Search', link: '/app/search' },
    { icon: Bookmark, name: 'Bookmarks', link: '/app/bookmarks' },
    { icon: Bell, name: 'Notifications', link: '/app/notifications' },
    { icon: UserCircle2, name: 'Profile', link: '/app/profile' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{
          backgroundColor: 'var(--color-primary-500)',
          color: 'var(--color-plain-b)'
        }}
      >
        <Menu size={24} />
      </button>

      <div className="relative sm:grid grid-cols-[auto_1fr]">
        {/* Sidebar */}
        <aside
          className={`
            fixed sm:sticky top-0 h-screen
            transition-all duration-300 ease-in-out border-r border-neutral-700
            z-40 flex flex-col
          `}
          style={{
            width: isOpen ? "20vw" : "8vw",
            backgroundColor: 'var(--color-neutral-800)',
            color: 'var(--color-plain-a)'
          }}
        >
          {/* Toggle Button */}
          <div
            onClick={toggleSidebar}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute -left-0.5 -top-4 w-2 h-8 bg-neutral-800" />
              <CircleChevronRight
                className={`w-6 h-6 transform transition-transform duration-300 text-neutral-400 hover:text-primary-400
                  ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {/* Logo Area */}
          <div className="h-20 flex items-center px-4">
            <span
              className={`font-bold text-xl whitespace-nowrap transition-all duration-300 overflow-hidden`}
              style={{
                maxWidth: isOpen ? "15vw" : "0",
              }}
            >
              Reepls
            </span>
            {!isOpen && <span className="text-2xl font-bold">R</span>}
          </div>

          {/* Nav Links */}
          <nav className="mt-8 flex flex-col gap-2">
            {navLinks.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-primary-500/10"
              >
                <item.icon size={24} />
                <span
                  className="ml-4 whitespace-nowrap transition-all duration-300 overflow-hidden"
                  style={{
                    maxWidth: isOpen ? "12vw" : "0",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isOpen && window.innerWidth < 640 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
