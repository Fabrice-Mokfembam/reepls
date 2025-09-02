import MainLayout from "../Layouts/MainLayout";
import DashboardPage from "../features/Home/pages/DashboardPage";

export const appRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <DashboardPage />
    },

  ]
};
