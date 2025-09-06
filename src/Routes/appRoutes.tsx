import Feed from "../features/Feed/pages/Feed";
import Notifications from "../features/Notifications/pages/Notifications";
import Profile from "../features/Profile/pages/Profile";
import Saved from "../features/Saved/pages/Saved";
import Search from "../features/Search/pages/Search";
import MainLayout from "../Layouts/MainLayout";


export const appRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/feed',
      element: <Feed />
    },
    {
      path: '/search',
      element: <Search />
    },
    {
      path: '/saved',
      element: <Saved />
    },
    {
      path: '/notifications',
      element: <Notifications />
    },
    {
      path: '/profile/:username',
      element: <Profile />
    }
  ]
};
