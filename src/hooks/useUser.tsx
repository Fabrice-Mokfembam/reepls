import type { User } from '../models/datamodels'; 
import { useCurrentUser } from '../features/Auth/hooks/useCurrentUser';


export const useUser = () => {
  const { user, isAuthenticated, logout } = useCurrentUser()

  return {
    authUser: user as User , 
    isLoggedIn:isAuthenticated,
    logout,
  };
};