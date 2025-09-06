import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useCurrentUser } from '../../hooks/useCurrentUser';



const LoginWithEmail: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, error } = useLoginUser();
  const {login} = useCurrentUser()
  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password }, {
      onSuccess: (data) => {
         login(data)
        navigate('/feed');
      },
      onError: (err) => {
        console.error('Login failed:', err);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-4 w-full max-w-xl flex flex-col ">
        <h1 className="text-4xl font-bold text-neutral-50 mb-2">Get on the informed side!</h1>
        <p className="text-neutral-50 mb-8">Enter your email and password to sign in</p>

        <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="rounded-[8px] bg-primary-700 px-4">
            <label htmlFor="email" className="block text-neutral-100 text-sm font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g mongobeti@gmail.com"
              className="w-full py-3 pr-4 text-neutral-100 leading-tight focus:outline-none focus:shadow-outline bg-primary-700"
            />
          </div>
          <div className="rounded-[8px] bg-primary-700 px-4">
            <label htmlFor="password" className="block text-neutral-100 text-sm font-bold">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g dfwni8y5*inikfmn"
                className="w-full py-3 pr-4 text-neutral-100 leading-tight focus:outline-none focus:shadow-outline bg-primary-700"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {/* Placeholder for the visibility icon */}
                <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-400 hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4 flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
          </button>
          {error && <p className='text-red-500 text-center mt-2'>{error.message}</p>}
        </form>

        <div className="flex items-center justify-center mb-4 w-full max-w-md">
          <hr className="flex-grow border-neutral-500" />
          <span className="mx-4 text-neutral-50">or</span>
          <hr className="flex-grow border-neutral-500" />
        </div>

        <button
          className="w-full max-w-md bg-white cursor-pointer text-neutral-100 font-bold py-3 px-3 rounded-full border border-neutral-100 focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
        >
          {/* Placeholder for Google Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000" className="w-5 h-5 mr-2">
            <path d="M12.000 4.800C14.735 4.800 16.969 5.926 18.571 7.429L21.000 5.000C18.232 2.232 15.150 1 12.000 1C7.500 1 3.758 3.036 1.000 6L3.900 8.356C5.160 5.918 8.448 4.800 12.000 4.800Z" fill="#EA4335" /><path d="M1.000 6L3.900 8.356C3.900 8.356 3.900 8.356 3.900 8.356C3.732 8.799 3.593 9.259 3.493 9.731C3.125 11.231 3.000 12.800 3.000 14.400C3.000 16.000 3.125 17.569 3.493 19.069C3.593 19.541 3.732 20.001 3.900 20.444L1.000 22.800C1.352 23.364 1.761 23.900 2.222 24.400C4.957 27.232 8.525 28.999 12.000 28.999C15.475 28.999 19.043 27.232 21.778 24.400C22.239 23.900 22.648 23.364 23.000 22.800L20.100 20.444C19.932 20.001 19.793 19.541 19.693 19.069C19.325 17.569 19.200 16.000 19.200 14.400C19.200 12.800 19.325 11.231 19.693 9.731C19.793 9.259 19.932 8.799 20.100 8.356Z" fill="#FBBC05" /><path d="M21.000 5.000L18.571 7.429C16.969 5.926 14.735 4.800 12.000 4.800V1C15.150 1 18.232 2.232 21.000 5.000Z" fill="#4285F4" /><path d="M20.100 20.444C19.793 19.541 19.325 17.569 19.200 16.000V14.400H12.000V24.400C15.150 24.400 18.232 23.168 21.000 20.400L20.100 20.444Z" fill="#34A853" /><path d="M12.000 24.400V14.400H19.200V16.000C19.200 17.569 19.325 19.069 19.693 20.444C20.100 21.681 20.640 22.800 21.282 23.800C22.030 24.965 22.859 25.900 23.778 26.600L20.100 20.444Z" fill="#4285F4" opacity="0.1" /><path d="M12.000 24.400V14.400H19.200V16.000C19.200 17.569 19.325 19.069 19.693 20.444C20.100 21.681 20.640 22.800 21.282 23.800C22.030 24.965 22.859 25.900 23.778 26.600L20.100 20.444Z" fill="#4285F4" opacity="0.1" /><path d="M12.000 24.400V14.400H19.200V16.000C19.200 17.569 19.325 19.069 19.693 20.444C20.100 21.681 20.640 22.800 21.282 23.800C22.030 24.965 22.859 25.900 23.778 26.600L20.100 20.444Z" fill="#4285F4" opacity="0.1" /><path d="M12.000 24.400V14.400H19.200V16.000C19.200 17.569 19.325 19.069 19.693 20.444C20.100 21.681 20.640 22.800 21.282 23.800C22.030 24.965 22.859 25.900 23.778 26.600L20.100 20.444Z" fill="#4285F4" opacity="0.1" />
          </svg>
          Sign in with Google
        </button>
        <div className='flex justify-between px-2 items-center'>
          <p className="mt-4 text-center text-neutral-50 cursor-pointer hover:underline hover:text-neutral-100 transition-colors">
            <a href="#" onClick={() => navigate('/auth/signup/phone')}>
              Sign in with Phone
            </a>
          </p>

          <p className="mt-2 text-center text-neutral-50 cursor-pointer hover:underline hover:text-neutral-100 transition-colors">
            <a href="#">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;