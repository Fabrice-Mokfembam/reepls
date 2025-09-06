import React from 'react';
import testimg from '../../../assets/images/maleAuth.png'
import AuthorSuggestionComponent from './AuthorSuggestionComponent';

const AuthorSuggestionsList:React.FC = () => {
// Sample author data
const topAuthors = [
  {
    avatarSrc: testimg, // Placeholder image
    username: "John Doe",
    occupation: "Software Engineer",
    isVerified: true,
  },
  {
    avatarSrc: testimg,
    username: "Jane Smith",
    occupation: "Content Creator",
    isVerified: false,
  },
  {
    avatarSrc: testimg,
    username: "Alex Johnson",
    occupation: "Designer",
    isVerified: true,
  },
];

  return (
    <div className="p-4  flex justify-center items-center font-sans sticky top-0">
      <div className="w-full max-w-sm rounded-lg overflow-hidden space-y-4">
        <h2 className="text-lg font-bold text-neutral-50 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffcd29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          REEPLS SUGGESTIONS
        </h2>
       <div className='mt-4 '>
          <div className="space-y-2">
            {topAuthors.map((author, index) => (
              <AuthorSuggestionComponent
                key={index}
                avatarSrc={author.avatarSrc}
                username={author.username}
                occupation={author.occupation}
                isVerified={author.isVerified}
              />
            ))}
          </div>
       </div>
      </div>
    </div>
  );
};

export default AuthorSuggestionsList;