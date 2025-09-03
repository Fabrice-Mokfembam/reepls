import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react'; 

const LoginWithPhone: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 w-full max-w-lg flex flex-col ">
        <h1 className="text-4xl font-bold text-neutral-50 mb-2">Get on the informed side!</h1>
        <p className="text-neutral-50 mb-8">Enter the phone number associated with your account to sign in</p>

        <form className="w-full max-w-md flex flex-col gap-4">
          <div className="flex space-x-2">
            <div className="w-1/3">
              <button className="w-full py-3 px-4 rounded-[8px] border border-neutral-500 bg-primary-700 text-neutral-50 flex justify-center items-center">
                {/* Placeholder for the flag icon */}
                <span className="mr-2">🇨🇲</span>
                <span className="text-neutral-50">▼</span>
              </button>
            </div>
            <div className="w-2/3">
              <div className="rounded-[8px] bg-primary-700 px-4">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+237"
                  className="w-full py-3 pr-4 text-neutral-100 leading-tight focus:outline-none focus:shadow-outline bg-primary-700"
                />
              </div>
            </div>
          </div>
          <div className="rounded-[8px] bg-primary-700 px-4">
            <label htmlFor="password" className="block text-neutral-100 text-sm font-bold">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="e.g dfwni8y5*inikfmn"
                className="w-full py-3 pr-4 text-neutral-100 leading-tight focus:outline-none focus:shadow-outline bg-primary-700"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <EyeOff className="h-5 w-5 text-neutral-500" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-400 hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 flex justify-between items-center px-2 text-center w-full max-w-md">
          <p className="mt-4">
            <a href="#" onClick={() => navigate('/auth/login')} className="font-medium text-neutral-50 hover:underline hover:text-neutral-100 transition-colors">Login with Email</a>
          </p>
          <p className="mt-2">
            <a href="#" className="font-medium text-neutral-50 hover:underline hover:text-neutral-100 transition-colors">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithPhone;