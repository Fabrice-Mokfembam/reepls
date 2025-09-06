import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../index.css'; // Ensure this path is correct for your global styles
import { useUserValues } from '../../../../hooks/useUserValues';

const interestsList = [
  'politics', 'education', 'tech', 'art',
  'history', 'international affairs',
  'agriculture', 'crime', 'health', 'business'
];

const Interests: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserValues();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userData.interests || []);

  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prevSelected =>
      prevSelected.includes(interest)
        ? prevSelected.filter(item => item !== interest)
        : [...prevSelected, interest]
    );
  };

  const handleSignUp = () => {
    updateUserData({ interests: selectedInterests });
    navigate('/feed');
  };

  const handleSkip = () => {
    navigate('/feed');
  };

  return (
    <div className="flex flex-col justify-center min-h-screen p-4">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-neutral-50 mb-2">Enow, you're in! Select your interests</h1>
        <p className="text-md text-gray-600 mb-6">Last! Pick at least one topic that you are interested in</p>

        <p className="text-lg font-semibold text-neutral-50 mb-4">{selectedInterests.length} selected</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {interestsList.map(interest => (
            <button
              key={interest}
              className={`px-5 py-2 rounded-full border-2 ${selectedInterests.includes(interest) ? 'bg-primary-500 text-white border-primary-500' : 'border-neutral-300 text-neutral-50 hover:bg-neutral-700'}`}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          className={`w-full py-3 rounded-lg text-white font-semibold ${selectedInterests.length > 0 ? 'bg-primary-400 hover:bg-primary-300' : 'bg-primary-300 cursor-not-allowed'}`}
          onClick={handleSignUp}
          disabled={selectedInterests.length === 0}
        >
          Sign up
        </button>

        <button
          className="mt-4 w-full text-neutral-50 hover:underline text-center"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Interests;