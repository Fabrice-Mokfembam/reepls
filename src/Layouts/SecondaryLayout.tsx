import { Outlet } from 'react-router-dom';

const SecondaryLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SecondaryLayout;
