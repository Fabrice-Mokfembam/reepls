import React  from 'react';
import CountryList from 'country-list-with-dial-code-and-flag';
import { Link, useNavigate } from 'react-router-dom';

const Phone: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center p-4 ">
      <h1 className="text-4xl font-bold text-neutral-50 mb-2" >Get on the informed side!</h1>
      <p className="text-neutral-50 mb-8">Enter your phone number to create account.<br/>Note that doing this with email offers you more personalisation<br/>and other benefits</p>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="mb-4 rounded-2xl bg-primary-700 px-4 py-3 flex items-center">
          {/* Placeholder for country code selector */}
          <select
            className="bg-primary-700 text-neutral-100 py-3 px-2 rounded-lg focus:outline-none focus:shadow-outline"
          >
            {/* Placeholder for country codes */}
            {CountryList.getAll().sort().map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.dial_code} 
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            placeholder="Phone number"
            className="w-full py-3 pr-4 leading-tight focus:outline-none focus:shadow-outline bg-primary-700 text-primary-200"
          />
        </div>

        <button
         onClick={()=>navigate('/auth/signup/phone/password')}
          className="w-full bg-primary-400  hover:bg-primary-300 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline mb-4"
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