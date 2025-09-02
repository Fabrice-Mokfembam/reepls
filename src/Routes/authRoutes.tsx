import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../features/Auth/pages/LoginPage";

export const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <LoginPage />  // Using LoginPage temporarily for testing
    },
    {
      path: 'forgot-password',
      element: <LoginPage />  // Using LoginPage temporarily for testing
    }
  ]
};
