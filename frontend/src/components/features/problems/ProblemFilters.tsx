import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch }: { onSearch: (val: string) => void }) => {
  return (
    <div className="relative w-full max-w-lg group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
      <input 
        type="text" 
        placeholder="Search for problems, tags, or IDs..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 outline-none 
                   focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
      />
    </div>
  );
};

export const FilterBar = () => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
       {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
         <button 
           key={diff}
           className="px-6 py-2 rounded-xl bg-slate-800/50 border border-white/5 text-sm font-bold text-slate-500 
                      hover:text-white hover:border-white/10 transition-all whitespace-nowrap"
         >
           {diff}
         </button>
       ))}
    </div>
  );
};
