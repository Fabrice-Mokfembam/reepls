import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StaticSideAuthScreen from "../features/Auth/components/StaticSideAuthScreen";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { LucideArrowLeft } from "lucide-react";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBackArrowVisible = location.pathname.includes("/auth");

  // Function to navigate to the previous route
  const prevRoute = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden lg:block">
        <StaticSideAuthScreen />
      </div>

      <div className="w-full lg:w-1/2 bg-primary-800 relative ">
        <div className="py-8 px-12 items-center absolute top-0 left-0 w-full flex justify-between ">
          {isBackArrowVisible && (
            <LucideArrowLeft
              onClick={prevRoute}
              className="size-4 text-neutral-50"
            />
          )}
          <LanguageSwitcher />
        </div>
        <div className=" flex-1 h-full flex items-center justify-center ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
