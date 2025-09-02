import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Can be used for branding, images, or additional information */}
      <div className="w-1/2 bg-primary-500">
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Reepls</h1>
            <p className="text-xl">Your social platform for meaningful connections</p>
          </div>
        </div>
      </div>

      {/* Right Side - Authentication Forms */}
      <div className="w-1/2 bg-background">
        <div className="flex items-center justify-center h-full p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
