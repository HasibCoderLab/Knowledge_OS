import React from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';

interface NoteFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  filterOptions: { value: string; label: string; count?: number }[];
  className?: string;
}

const NoteFilters: React.FC<NoteFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
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
          placeholder="Search notes by title or content..."
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400"
          aria-label="Search notes"
        />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
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

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        <div className="flex border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteFilters;
