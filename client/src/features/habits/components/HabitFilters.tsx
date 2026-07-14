import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface HabitFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
  className?: string;
}

const HabitFilters: React.FC<HabitFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  filterOptions,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search habits by name..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-200"
          aria-label="Search habits"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <motion.button
            key={option.value}
            whileTap={{ scale: 0.96 }}
            onClick={() => onFilterChange(option.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${activeFilter === option.value
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }
            `}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HabitFilters;
