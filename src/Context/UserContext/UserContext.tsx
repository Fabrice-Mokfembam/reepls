import { createContext} from 'react';

// Define the type for the user data
export type UserData = {
  name: string;
  email: string;
  phonenumber: string;
  password?: string;
  interests: string[];
};

// Define the type for the context value
type UserContextType = {
  userData: UserData;
  // This function allows for updating only parts of the user data
  updateUserData: (updates: Partial<UserData>) => void; 
};

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

