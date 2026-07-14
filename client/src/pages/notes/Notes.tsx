import React from 'react';
import { FileText } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

export const Notes: React.FC = () => (
  <div className="space-y-6">
    <header>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notes</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Capture your thoughts and ideas</p>
    </header>
    <EmptyState icon={FileText} title="No notes yet" description="Your notes will appear here" />
  </div>
);
