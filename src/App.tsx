import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { presentationRoutes } from './Routes/presentationRoutes';
import { appRoutes } from './Routes/appRoutes';
import { authRoutes } from './Routes/authRoutes';
import { Bounce, ToastContainer } from 'react-toastify';
import { useTheme } from './Context/ThemeContext/themeContext';

const router = createBrowserRouter([
  presentationRoutes,
  appRoutes,
  authRoutes
]);

function App() {
const {theme} = useTheme()


   return (
    <>

      <RouterProvider router={router} />
      <ToastContainer
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce} 
      />

    
      
    </>
  );
  
}

export default App;
