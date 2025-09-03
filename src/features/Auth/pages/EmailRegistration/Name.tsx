

import React from 'react';
import { useNavigate } from 'react-router-dom';


const Name: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center justify-center p-4 ">
     

      <div className="w-full max-w-lg flex flex-col gap-4">
         <h1 className="text-4xl font-bold text-neutral-50 mb-2" >Enter your name</h1>
      <p className="text-neutral-50 mb-8">Almost there! Enter your legal name</p>
        <div className="mb-4 rounded-[8px] bg-primary-700 px-4 ">
          <label htmlFor="email" className="block text-neutral-100 text-sm font-bold ">Email</label>
          <input
            type="email"
            id="email"
            placeholder="placeholder"
            className="w-full py-3 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
          />
        </div>

        <button
        onClick={()=>navigate('/auth/signup/email/code-check')}
          className="w-full bg-primary-400  hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
        >
          Continue
        </button>

        

       
      </div>
    </div>
  );
};

export default Name;