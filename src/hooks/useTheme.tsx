import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext/themeContext";


// Create a custom hook to use the context
export const useUserValues = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};