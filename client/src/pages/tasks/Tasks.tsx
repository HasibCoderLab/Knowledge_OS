import React from 'react';
import { ListChecks } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Tasks: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Tasks</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your todos and deadlines</p>
    </header>
    <EmptyState icon={ListChecks} title="No tasks yet" description="Add your first task to get started" />
  </div>
);
