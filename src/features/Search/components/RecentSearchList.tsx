
import { SearchIcon, ArrowUpRight } from 'lucide-react';

const RecentSearchesList = ({ searches }:{ searches: string[]; }) => {
  return (
    <div className="mt-8">
      <h2 className="text-neutral-50 text-xl font-medium px-4 sm:px-0 mb-4">
        Recent Searches
      </h2>
      <ul className="text-neutral-300">
        {searches.map((search: string, index: number) => (
          <li 
            key={index} 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowUpRight size={16} className="text-neutral-400" />
              <span className="text-sm">{search}</span>
            </div>
            <SearchIcon size={16} className="text-neutral-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchesList;