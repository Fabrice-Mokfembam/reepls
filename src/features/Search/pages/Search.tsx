import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";

export const Search = () => {
  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reepls, users, or topics..."
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </MainContent>
      <RightBar>
        <div>search</div>
      </RightBar>
    </div>
  );
};

export default Search;
