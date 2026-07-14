import React from 'react';
import { User } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Profile: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Profile</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your personal information and stats</p>
    </header>
    <EmptyState icon={User} title="Profile" description="Manage your profile information" />
  </div>
);
