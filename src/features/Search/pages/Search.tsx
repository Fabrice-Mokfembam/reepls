import { SearchIcon } from "lucide-react";
import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import AuthorSuggestionsList from "../../Profile/components/AuthorSuggestions";
import RecentSearchesList from "../components/RecentSearchList";


export const Search = () => {
  // Sample data for recent searches
  const recentSearchesData = [
    "Thiago Fabrice",
    "The Internet of Things",
    "Artificial Intelligence",
    "Web Development Trends"
  ];

  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="relative flex items-center w-full max-w-3xl m-auto ">
            <input
              type="text"
              className="w-full h-14 px-4 py-2 text-sm text-neutral-50 bg-neutral-600 rounded-full focus:outline-none"
              placeholder="Search for topics, articles, and people"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon size={20} className="text-gray-400" />
            </div>
          </div>
        </Topbar>
        <div className="w-full max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6">
          <RecentSearchesList searches={recentSearchesData} /> {/* Replace the "recent searches" text with this line */}
        </div>
      </MainContent>
      <RightBar>
        <AuthorSuggestionsList />
      </RightBar>
    </div>
  );
};

export default Search;