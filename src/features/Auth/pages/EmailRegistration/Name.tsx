

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserValues } from '../../../../hooks/useUserValues';
import { useRegisterUser } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useCurrentUser } from '../../hooks/useCurrentUser';


const Name: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserValues();
  const [nameInput, setNameInput] = useState(userData.name || '');
  const {login} = useCurrentUser()

  const {mutate,isPending,error} = useRegisterUser()

  const handleContinue = () => {
    updateUserData({ name: nameInput });
   console.log({...userData, name: nameInput})
   
   mutate({...userData, name: nameInput},{
    onSuccess: (data) => {
      console.log(data)
      login(data)
      navigate('/auth/signup/email/code-check',{
        state: {
          email: userData.email,
        }
      });
    },
    onError: (err) => {
      console.log(err)
    }
   })    
  };

  return (
    <div className="flex flex-col w-full items-center justify-center p-4 ">
      <div className="w-full max-w-lg flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-neutral-50 mb-2" >Enter your name</h1>
        <p className="text-neutral-50 mb-8">Almost there! Enter your legal name</p>
        <div className="mb-4 rounded-[8px] bg-primary-700 px-4 ">
          <label htmlFor="name" className="block text-neutral-100 text-sm font-bold ">Name</label>
          <input
            type="text"
            id="name"
            placeholder="e.g. John Doe"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full py-3 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleContinue}
          className="w-full bg-primary-400 hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
        >
         {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
        </button>
        {error && <p className='text-red-500'>{error.message}</p>}
      </div>
    </div>
  );
};

export default Name;