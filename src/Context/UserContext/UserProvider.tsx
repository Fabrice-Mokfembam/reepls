import { useState } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './UserContext';
import type {  UserData } from './UserContext';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    interests: [],
  });

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
