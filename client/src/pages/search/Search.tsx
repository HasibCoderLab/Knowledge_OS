import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Search: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Search</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Find anything in your KnowledgeOS</p>
    </header>
    <EmptyState icon={SearchIcon} title="Search" description="Search across all your data" />
  </div>
);
