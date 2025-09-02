import { Outlet } from 'react-router-dom';
// import { Menu } from 'lucide-react';
// import { useSidebar } from '../hooks/useSidebar';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export const MainLayout = () => {
  // const { isOpen, toggleSidebar } = useSidebar();
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg'>('lg');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Mobile Menu Button - Only visible on small screens */}
      {/* {screenSize === 'sm' && (
        <button
          // onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg"
          style={{
            backgroundColor: 'var(--color-primary-500)',
            color: 'var(--color-plain-b)'
          }}
        >
          <Menu size={24} />
        </button>
      )} */}

      <div className="relative grid grid-cols-[auto_1fr]">
        {/* Sidebar Component */}
        <Sidebar screenSize={screenSize} />

       
  

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          
            <Outlet />
         
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
