import React from 'react';
import { BarChart3 } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Analytics: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Analytics</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track your growth and insights</p>
    </header>
    <EmptyState icon={BarChart3} title="No data yet" description="Analytics will populate as you use the app" />
  </div>
);
