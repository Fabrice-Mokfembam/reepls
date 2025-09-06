import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetEmailCode, useVerifyEmailCode } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const EmailCodeCheck: React.FC = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const { mutate, isPending: isGetCodePending, error: getCodeError } = useGetEmailCode();
  const { mutate: verifyMutate, isPending: isVerifyPending, error: verifyError } = useVerifyEmailCode();

  const location = useLocation();
  const { email } = location.state as { email: string };

  useEffect(() => {
    mutate({
      email,
    });
  }, [email, mutate]);

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
    verifyMutate({
      email,
      code: fullCode,
    }, {
      onSuccess: () => {
        navigate('/auth/signup/interests');
      }
    });
  };

  const handleResendCode = () => {
    mutate({
      email,
    });
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-neutral-50 mb-2">Check your mail</h1>
        <p className="text-md text-gray-600 mb-6">
          We have sent a six-digit code to your email. Input the code here
        </p>

        {isGetCodePending && (
          <div className="flex items-center justify-center mb-4 text-primary-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span>Processing code...</span>
          </div>
        )}

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
              className="w-10 h-12 sm:w-16 sm:h-18 text-center text-2xl font-bold border-2 border-primary-400 rounded-lg focus:outline-none focus:border-primary-500 bg-primary-700 text-primary-200"
              disabled={isGetCodePending || isVerifyPending}
            />
          ))}
        </div>

        {/* Error messages */}
        {(getCodeError || verifyError) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {getCodeError?.message || verifyError?.message || "An error occurred"}
          </div>
        )}

        <button
          className="w-full py-3 rounded-lg text-white font-semibold bg-primary-400 hover:bg-primary-300 focus:outline-none focus:shadow-outline mb-4 flex items-center justify-center"
          onClick={handleVerify}
          disabled={code.join('').length !== 6 || isGetCodePending || isVerifyPending}
        >
          {isVerifyPending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </button>

        <button
          className="mt-4 text-neutral-50 hover:underline w-full text-center flex items-center justify-center"
          onClick={handleResendCode}
          disabled={isGetCodePending || isVerifyPending}
        >
          {isGetCodePending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Sending code...
            </>
          ) : (
            "Didn't receive code. Resend"
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailCodeCheck;