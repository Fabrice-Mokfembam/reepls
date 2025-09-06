import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserValues } from '../../../../hooks/useUserValues';
import { Eye, EyeOff } from 'lucide-react';

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserValues();
  const [passwordInput, setPasswordInput] = useState(userData.password || '');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleContinue = () => {
    if (!validatePassword(passwordInput)) {
      setPasswordError('Password must be at least 8 characters long and include a letter, a digit, and a special character');
      return;
    }
    setPasswordError('');
    updateUserData({ password: passwordInput });
    navigate('/auth/signup/email/name');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <h1 className="text-4xl font-bold text-neutral-50 mb-2">Create your password</h1>
      <p className="text-neutral-50 max-w-md mb-8">Create a strong password comprising letters, at least one digit and one special character</p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className={`mb-4 rounded-2xl bg-primary-700 px-4  ${
                passwordError ? 'border-2 border-red-500' : ''
              }`}>
          <label htmlFor="password" className="block text-neutral-100 text-sm font-bold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError('');
              }}
              className={`w-full py-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-100"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
     
        </div>
     {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        <button
          onClick={handleContinue}
          className="w-full bg-primary-400 hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Password;