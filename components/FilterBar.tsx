import React from 'react';
import { Search, SlidersHorizontal, ArrowDownAZ, ArrowUpZA } from 'lucide-react';

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (val: 'asc' | 'desc') => void;
  filterIssues: string[];
  setFilterIssues: (val: string[]) => void;
  availableIssues: string[];
}

export const FilterBar = ({
  search, setSearch,
  sortBy, setSortBy,
  sortOrder, setSortOrder,
  filterIssues, setFilterIssues,
  availableIssues
}: FilterBarProps) => {

  const toggleIssue = (issue: string) => {
    if (filterIssues.includes(issue)) {
      setFilterIssues(filterIssues.filter(i => i !== issue));
    } else {
      setFilterIssues([...filterIssues, issue]);
    }
  };

  return (
    <div className="flex flex-col gap-5 relative z-20">
      
      {/* Top row: search & sort */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            placeholder="Search patients by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Sort by</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer border-none"
            >
              <option value="patient_id">ID</option>
              <option value="patient_name">Name</option>
              <option value="age">Age</option>
            </select>
          </div>
          
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? <ArrowDownAZ size={18} /> : <ArrowUpZA size={18} />}
          </button>
        </div>
      </div>
      
      {/* Bottom row: Filters */}
      <div>
         <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal size={16} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-600">Filter by Issues:</span>
            {filterIssues.length > 0 && (
              <button 
                onClick={() => setFilterIssues([])}
                className="ml-auto text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-2 py-1 rounded-md"
              >
                Clear Filters ({filterIssues.length})
              </button>
            )}
         </div>
         <div className="flex flex-wrap gap-2">
            {availableIssues.map(issue => {
              const isActive = filterIssues.includes(issue);
              return (
                <button
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm
                    ${isActive 
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-1 border-transparent' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                >
                  {issue.replace(/_/g, ' ')}
                </button>
              );
            })}
         </div>
      </div>
    </div>
  );
};
