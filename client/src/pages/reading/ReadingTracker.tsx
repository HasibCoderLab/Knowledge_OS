import React from 'react';
import { BookOpen } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const ReadingTracker: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Reading Tracker</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Log your reading sessions and progress</p>
    </header>
    <EmptyState icon={BookOpen} title="No reading sessions" description="Start reading to log your sessions" />
  </div>
);
