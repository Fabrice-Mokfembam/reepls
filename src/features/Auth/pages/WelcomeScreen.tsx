import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-foreground">
      <h1 className="text-4xl font-bold mb-8 text-neutral-800">Welcome, this is SAAH</h1>
      <Link to="/auth/signin/email" className="w-96 cursor-pointer px-6 py-3 border border-neutral-50 text-neutral-50 rounded-full hover:bg-neutral-100 transition-colors text-center">
        Sign in
      </Link>
      <div className="flex items-center w-96 my-4">
        <div className="flex-grow border-t border-neutral-300"></div>
        <span className="mx-4 text-neutral-50">or</span>
        <div className="flex-grow border-t border-neutral-300"></div>
      </div>
      <Link to="/auth/signup/email" className="w-96 cursor-pointer px-6 py-3 bg-primary-400 text-white rounded-full hover:bg-primary-300 transition-colors text-center">
        Create account
      </Link>
      <Link to="/feed" className="mt-8 text-neutral-50 cursor-pointer hover:underline hover:text-neutral-100 transition-colors">
        Continue without signing in
      </Link>
    </div>
  );
};

export default WelcomeScreen;