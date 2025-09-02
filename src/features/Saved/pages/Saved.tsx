import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";

export const Saved = () => {
  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
          <h1 className="text-2xl font-bold mb-4">Saved Items</h1>
      <div className="space-y-4">
        <div className="p-4 border border-neutral-700 rounded-lg">
          <p className="text-neutral-400">
            Your saved reepls and collections will appear here.
          </p>
        </div>
      </div>
    

      </MainContent>
      <RightBar>
        <div>
          right saved
        </div>
      </RightBar>
    </div>
  );
};

export default Saved;
