import { useContext } from 'react';
import type { User } from '../models/datamodels'; 
import { AuthContext } from '../Context/AuthContext/authContext';


export const useUser = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return {
    authUser: user as User , 
    isLoggedIn,
    logout,
  };
};