import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";

export const Feed = () => {
  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      {/* Main Content */}
      <MainContent>
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
