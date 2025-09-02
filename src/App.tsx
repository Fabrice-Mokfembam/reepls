import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { presentationRoutes } from './Routes/presentationRoutes';
import { appRoutes } from './Routes/appRoutes';
import { authRoutes } from './Routes/authRoutes';

const router = createBrowserRouter([
  presentationRoutes,
  appRoutes,
  authRoutes
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
