import React from 'react';
import { CalendarDays } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const CalendarPage: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Calendar</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View your schedule and events</p>
    </header>
    <EmptyState icon={CalendarDays} title="Calendar" description="Your events and reading schedule" />
  </div>
);
