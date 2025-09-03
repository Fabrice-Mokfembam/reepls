import { Home, Search, Bell, Bookmark, UserCircle2, CircleChevronRight, PlusCircle, Pencil, Mic } from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { favicon } from '../assets/icons';
import { useTheme } from '../Context/ThemeContext/themeContext';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type SidebarProps = {
  screenSize: 'sm' | 'md' | 'lg';
};

export const Sidebar = ({ screenSize }: SidebarProps) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const navLinks = [
    { icon: Home, name: 'Feed', link: '/feed', hasNotifications: false },
    { icon: Search, name: 'Search', link: '/search', hasNotifications: false },
    { icon: Bookmark, name: 'Saved', link: '/saved', hasNotifications: false },
    { icon: Bell, name: 'Notifications', link: '/notifications', hasNotifications: true },
    { icon: UserCircle2, name: 'Profile', link: '/profile', hasNotifications: false },
  ];

  const responsivesize = window.innerWidth >= 769 && window.innerWidth <= 1023;

  return (
    <aside
      className={`hidden
        transition-all duration-300 ease-in-out border-r border-neutral-500 bg-background
        z-40 md:flex flex-col
        ${screenSize === 'sm' ? 'fixed' : 'sticky'} top-0 h-screen
        ${screenSize === 'sm' && !isOpen ? '-translate-x-full' : ''}
      `}
      style={{
        width: screenSize === 'md' || screenSize === 'lg' && !isOpen ? '9vw' : '16vw',
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

      {/* Nav Links */}
      <nav className="mt-8 flex w-full h-full items-center">
        <div className={`h-full flex flex-col gap-6 mx-auto`}>
          <div 
            className={`flex gap-1 items-center px-4 cursor-pointer mb-10 ${isOpen ? '' : 'justify-center'}`}
            onClick={() => navigate("/feed")}
          >
            <img
              src={favicon}
              alt="favicon"
              className="object-contain h-full w-8"
            />
            {(isOpen || responsivesize) && (
              <span
                className={`md:hidden lg:flex
                  text-2xl font-semibold transition-colors duration-300
                  ${theme === "dark" ? "text-white" : "text-neutral-50"}
                `}
              >
                Reepls
              </span>
            )}
          </div>
          
          {navLinks.map((item, index) => {
            const isActive = currentPath === item.link;

            return (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center justify-start px-4 py-3 cursor-pointer transition-colors duration-200 ${
                  isActive ? 'text-primary-400' : 'text-neutral-100 hover:text-primary-400'
                } ${isOpen ? '' : 'justify-center'}`}
              >
                <div className='relative'>
                  <item.icon size={24} className={`transition-colors duration-200`} />
                  {item.hasNotifications && item.name === 'Notifications' && (
                    <span className="absolute top-0 right-0 text-[13px] flex justify-center items-center -mt-3 -mr-3 size-6 text-white rounded-full bg-red-500">9</span>
                  )}
                </div>
                {isOpen && (
                  <span
                    className="ml-4 whitespace-nowrap transition-all duration-300 md:hidden lg:block overflow-hidden"
                    style={{
                      maxWidth: screenSize === 'lg' && isOpen ? '12vw' : '0',
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Create Post Button with Popover */}
          <div className="mt-12 self-center">
            <Popover className="relative">
            { !isCreatingPost ? <PopoverButton
                className={`
                  flex items-center justify-center gap-2
                  border border-neutral-100 rounded-full
                  text-sm text-neutral-100
                  hover:border-primary-400 hover:text-primary-400
                  transition-all duration-300
                  cursor-pointer
                  ${isOpen ? 'px-1 py-4 lg:px-6 lg:py-5' : 'left-2 size-10 self-center'}
                `}
              >
                <PlusCircle size={20} />
                {isOpen && (
                  <span
                    className="whitespace-nowrap transition-all duration-300 md:hidden lg:flex overflow-hidden"
                    style={{
                      maxWidth: screenSize === 'lg' && isOpen ? '12vw' : '0',
                    }}
                  >
                    Create Post
                  </span>
                )}
              </PopoverButton>: "creating post"}
              
              <PopoverPanel
                anchor="bottom"
                className={`
                  flex flex-col z-50 mt-2 rounded-lg border border-neutral-500 
                  bg-background shadow-lg
                  ${isOpen ? 'w-40' : 'w-32'}
                `}
              >
                {({ close }) => (
                  <div className="text-center">
                    <button
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 hover:bg-neutral-700 hover:text-primary-400"
                      onClick={() => {
                        // Add your post creation logic here
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
                        // Add your article creation logic here
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
                        // Add your podcast creation logic here
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
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;