import React from 'react';
import { BookMarked } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Journal: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Journal</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Daily reflections and insights</p>
    </header>
    <EmptyState icon={BookMarked} title="No entries yet" description="Write your first journal entry" />
  </div>
);
