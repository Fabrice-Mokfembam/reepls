import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginPage } from './features/auth/pages/LoginPage';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { UserAccountsPage } from './features/user-management/pages/UserAccountsPage';
import { UserDetailsPage } from './features/user-management/pages/UserDetailsPage';
import { ActivityLogPage } from './features/activity-log/pages/ActivityLogPage';
import { ArticlesListPage } from './features/articles/pages/ArticlesListPage';
import { ArticleDetailPage } from './features/articles/pages/ArticleDetailPage';
import { PodcastListPage } from './features/podcast/pages/PodcastListPage';
import { PodcastDetailPage } from './features/podcast/pages/PodcastDetailPage';
import { StreamsListPage } from './features/streams/pages/StreamsListPage';
import { StreamDetailPage } from './features/streams/pages/StreamDetailPage';
import { ProfilePage } from './features/profile/pages/ProfilePage';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { CreateAdminPage } from './features/settings/pages/CreateAdminPage';
import { ROUTES } from './shared/constants';
import { isAuthenticated } from './features/auth/utils/Encryption';

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: isAuthenticated() ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.USERS,
        element: <UserAccountsPage />,
      },
      {
        path: `${ROUTES.USERS}/:userId`,
        element: <UserDetailsPage />,
      },
      {
        path: ROUTES.ACTIVITY,
        element: <ActivityLogPage />,
      },
      {
        path: ROUTES.ARTICLES,
        element: <ArticlesListPage />,
      },
      {
        path: `${ROUTES.ARTICLES}/:slug`,
        element: <ArticleDetailPage />,
      },
      {
        path: ROUTES.PODCAST,
        element: <PodcastListPage />,
      },
      {
        path: `${ROUTES.PODCAST}/:id`,
        element: <PodcastDetailPage />,
      },
      {
        path: ROUTES.STREAMS,
        element: <StreamsListPage />,
      },
      {
        path: `${ROUTES.STREAMS}/:id`,
        element: <StreamDetailPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: `${ROUTES.SETTINGS}/create-admin`,
        element: <CreateAdminPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
