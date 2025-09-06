import React, { useState }  from 'react';
import CountryList from 'country-list-with-dial-code-and-flag';
import { Link, useNavigate } from 'react-router-dom';
import { useUserValues } from '../../../../hooks/useUserValues';

const Phone: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserValues();
  const [phoneInput, setPhoneInput] = useState(userData.phonenumber || '');
  const [countryCode, setCountryCode] = useState('+237');

  const handleContinue = () => {
    updateUserData({ phonenumber: `${countryCode}${phoneInput}` });
    navigate('/auth/signup/phone/password');
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <h1 className="text-4xl font-bold text-neutral-50 mb-2">Get on the informed side!</h1>
      <p className="text-neutral-50 mb-8">
        Enter your phone number to create an account.<br />
        Note that doing this with email offers you more personalization<br />
        and other benefits.
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="mb-4 rounded-2xl bg-primary-700 px-4 py-3 flex items-center">
          <select
            className="bg-primary-700 text-neutral-100 py-3 px-2 rounded-lg focus:outline-none focus:shadow-outline"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {CountryList.getAll().map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.dial_code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            placeholder="Phone number"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            className="w-full py-3 pr-4 leading-tight focus:outline-none focus:shadow-outline bg-primary-700 text-primary-200"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-primary-400 hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
        >
          Continue
        </button>

        <Link to="/auth/signup/email" className="mt-8 text-center text-neutral-50 cursor-pointer hover:underline hover:text-neutral-100 transition-colors">
          Create account with Email instead
        </Link>
      </div>
    </div>
  );
};

export default Phone;
