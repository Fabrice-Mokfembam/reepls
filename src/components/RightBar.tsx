import React from 'react';

interface RightBarProps {
  children: React.ReactNode;
}

export const RightBar: React.FC<RightBarProps> = ({ children }) => {
  return (
    <div className='bg-background hidden lg:block min-h-screen '>
      {children}
    </div>
  );
};