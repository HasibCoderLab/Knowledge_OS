import React from 'react';
import { CheckSquare } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Habits: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Habits</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Build and maintain daily routines</p>
    </header>
    <EmptyState icon={CheckSquare} title="No habits yet" description="Create your first habit to start building routines" />
  </div>
);
