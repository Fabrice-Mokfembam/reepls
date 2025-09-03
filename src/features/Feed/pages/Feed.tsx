import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import { useState } from "react";

export const Feed = () => {
  const [activeTab, setActiveTab] = useState('for_you');
  return (
    <div className="w-full lg:grid grid-cols-[4fr_1.65fr]">
      {/* Main Content */}
      <MainContent>
        <Topbar>
          <Tabs
            tabs={[
              { id: 'for_you', title: 'For You' },
              { id: 'following', title: 'Following' },
              { id: 'podcast', title: 'Podcast' },
            ]}
            activeTab={activeTab}
            setActiveTab={(tabId) => setActiveTab(String(tabId))}
           
          />
        </Topbar>
  <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        <div className="space-y-4">
          <div className="p-4 border border-neutral-700 rounded-lg">
            <h2 className="text-lg font-semibold">Welcome to Your Feed</h2>
            <p className="text-neutral-400 mt-2">
              Here you'll see reepls from people you follow and recommended content.
            </p>
          </div>
        </div>
      </div>
      </MainContent>
    

      {/* Right Sidebar */}
      <RightBar>
  <h2 className="text-lg font-semibold mb-2">Sidebar</h2>
        <p className="text-neutral-400">Some content goes here...</p>
      </RightBar>
      
    </div>
  );
};

export default Feed;
