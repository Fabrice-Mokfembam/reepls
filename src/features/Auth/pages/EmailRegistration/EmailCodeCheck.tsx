import React, { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailCodeCheck: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    console.log('Verifying code:', fullCode);
    // Here you would typically send the code to your backend for verification
    // For now, navigate to the interests page after successful verification
    navigate('/auth/signup/interests');
  };

  const handleResendCode = () => {
    console.log('Resending code...');
    // Logic to resend the code
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const newCode = [...code];
    for (let i = 0; i < newCode.length; i++) {
      if (pastedData[i]) {
        newCode[i] = pastedData[i];
      } else {
        break;
      }
    }
    setCode(newCode);
    // Focus the last filled input or the next empty one
    const lastFilledIndex = newCode.findIndex((digit, i) => !digit && i > 0) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else if (newCode[5]) {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    
      <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        <div className="w-full max-w-lg p-8 ">
          <h1 className="text-3xl font-bold text-neutral-50 mb-2">Check your mail</h1>
          <p className="text-md text-gray-600 mb-6">We have sent a six-digit code to your email. Input the code here</p>

          <div className="flex justify-center gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el as HTMLInputElement; }}
                className="w-16 h-18 text-center text-2xl font-bold border-2 border-primary-400 rounded-lg focus:outline-none focus:border-primary-500 bg-primary-700 text-primary-200"
              />
            ))}
          </div>

          <button
            className="w-full py-3 rounded-lg text-white font-semibold bg-primary-400 hover:bg-primary-300 focus:outline-none focus:shadow-outline mb-4"
            onClick={handleVerify}
            disabled={code.join('').length !== 6}
          >
            Verify
          </button>

          <button
            className="mt-4 text-neutral-50 hover:underline w-full text-center"
            onClick={handleResendCode}
          >
            Didn't receive code. Resend
          </button>
        </div>
      </div>
   
  );
};

export default EmailCodeCheck;