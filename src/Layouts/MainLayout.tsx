import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export const MainLayout = () => {
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("sm");
      } else if (width < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative grid grid-cols-[auto_1fr]">
        {/* Sidebar Component */}
        <div>
   <Sidebar screenSize={screenSize} />
        </div>
     

        {/* Main Content */}
        <main className="w-full min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
