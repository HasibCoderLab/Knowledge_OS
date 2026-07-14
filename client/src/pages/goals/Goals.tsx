import React from 'react';
import { Target } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Goals: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Goals</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track your long-term and short-term objectives</p>
    </header>
    <EmptyState icon={Target} title="No goals yet" description="Set your first goal to start tracking" />
  </div>
);
