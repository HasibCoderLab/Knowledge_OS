import React from 'react';
import { Bell } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Notifications: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Stay updated with your activity</p>
    </header>
    <EmptyState icon={Bell} title="No notifications" description="You're all caught up!" />
  </div>
);
