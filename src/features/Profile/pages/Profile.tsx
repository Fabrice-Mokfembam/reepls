import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";

export const Profile = () => {
  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
          <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-neutral-700"></div>
            <div>
              <h1 className="text-2xl font-bold">Username</h1>
              <p className="text-neutral-400">@handle</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-neutral-700 rounded-lg">
            <p className="text-neutral-400">
              Your reepls and activity will appear here.
            </p>
          </div>
        </div>
      </div>

      </MainContent>
    <RightBar>
      profile
    </RightBar>
    </div>
  );
};

export default Profile;
