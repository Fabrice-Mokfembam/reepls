import { Outlet } from 'react-router-dom';

const PresentationLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default PresentationLayout;
