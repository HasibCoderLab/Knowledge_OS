import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const SettingsPage: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure your preferences</p>
    </header>
    <EmptyState icon={SettingsIcon} title="Settings" description="Configure your application preferences" />
  </div>
);
