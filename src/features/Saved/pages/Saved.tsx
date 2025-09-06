import { useState } from "react";
import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import AuthorComponent from "../../Profile/components/AuthorComponent";
import testimg from '../../../assets/images/maleAuth.png'


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

export const Saved = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-800 rounded-lg">
                <p className="text-neutral-300">Your latest posts will appear here.</p>
              </div>
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Articles</h3>
            <p className="text-neutral-300">Your published articles will be displayed here.</p>
          </div>
        );
      case 'readinghistory':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Media</h3>
            <p className="text-neutral-300">Your photos and videos will appear in this section.</p>
          </div>
        );
      case 'reposts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Reposts</h3>
            <p className="text-neutral-300">Content you've reposted will be shown here.</p>
          </div>
        );
      case 'podcasts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Podcasts</h3>
            <p className="text-neutral-300">Your podcast episodes and series will be displayed here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-[3fr_1fr] xl:grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="flex items-center gap-2">
            <div className="text-neutral-100 text-base sm:text-lg">Saved</div>
          </div>
        </Topbar>
        <div className="w-full max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6">
          {/* Tabs section */}
          <div className="w-full sm:px-4 my-8">
            <Tabs
              tabs={[
                { id: 'posts', title: 'Posts' },
                { id: 'articles', title: 'Articles' },
                { id: 'readinghistory', title: 'Reading History' },
                { id: 'reposts', title: 'Reposts' },
                { id: 'podcasts', title: 'Podcasts' },
              ]}
              activeTab={activeTab}
              setActiveTab={(tabId) => setActiveTab(String(tabId))}
              borderBottom={true}
            />
            {/* Tab content */}
            {renderTabContent()}
          </div>
        </div>
      </MainContent>

      <RightBar >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Your Top Authors</h3>
          <div className="space-y-4">
            {topAuthors.map((author, index) => (
              <AuthorComponent
                key={index}
                avatarSrc={author.avatarSrc}
                username={author.username}
                occupation={author.occupation}
                isVerified={author.isVerified}
              />
            ))}
          </div>
        </div>
      </RightBar>
    </div>
  );
};

export default Saved;