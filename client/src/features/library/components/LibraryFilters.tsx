import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface LibraryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
  className?: string;
}

const LibraryFilters: React.FC<LibraryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filterOptions,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400"
          aria-label="Search books"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${activeFilter === option.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700'
              }
            `}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={`text-[10px] font-bold ${
                activeFilter === option.value ? 'text-indigo-200' : 'text-slate-400'
              }`}>
                {option.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LibraryFilters;
