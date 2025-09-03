import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Email: React.FC = () => {
const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center p-4 ">
      <h1 className="text-4xl font-bold text-neutral-50 mb-2" >Get on the informed side!</h1>
      <p className="text-neutral-50 mb-8">Enter your email to create account</p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="mb-4 rounded-2xl bg-primary-700 px-4 ">
          <label htmlFor="email" className="block text-neutral-100 text-sm font-bold ">Email</label>
          <input
            type="email"
            id="email"
            placeholder="placeholder"
            className="w-full py-3 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
          />
        </div>

        <button
         onClick={()=>navigate('/auth/signup/email/password')}
          className="w-full bg-primary-400  hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
        >
          Continue
        </button>

        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-neutral-500" />
          <span className="mx-4 text-neutral-50">or</span>
          <hr className="flex-grow border-neutral-500" />
        </div>

        <button
          className="w-full bg-white cursor-pointer  text-neutral-100 font-bold py-3 px-3 rounded-full border border-neutral-100 focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
        >
          <img src="/reepls.svg?url" alt="Google Logo" className="w-5 h-5 mr-2" />
          Create account with Google
        </button>
         <Link to="/auth/signup/phone" className="mt-8 text-center text-neutral-50 cursor-pointer hover:underline hover:text-neutral-100 transition-colors">
        sign up with phone 
      </Link>
      </div>
    </div>
  );
};

export default Email;