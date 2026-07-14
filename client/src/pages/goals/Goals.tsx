import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Target, Plus, AlertTriangle } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import GoalCard from '../../features/goals/components/GoalCard';
import GoalFilters from '../../features/goals/components/GoalFilters';
import GoalForm from '../../features/goals/components/GoalForm';
import type { GoalFormData } from '../../features/goals/components/GoalForm';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import type { Goal } from '../../types';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export const Goals: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: mockApi.getGoals,
  });

  const goals = data?.data ?? [];

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['goals'] });
  }, [queryClient]);

  const filteredGoals = useMemo(() => {
    let result = goals;

    if (activeFilter !== 'all') {
      result = result.filter((g) => g.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(query) ||
          g.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [goals, activeFilter, searchQuery]);

  const handleCreate = useCallback(async (formData: GoalFormData) => {
    setIsSaving(true);
    await mockApi.createGoal(formData);
    setIsSaving(false);
    setIsCreating(false);
    invalidate();
  }, [invalidate]);

  const handleUpdate = useCallback(async (formData: GoalFormData) => {
    if (!editingGoal) return;
    setIsSaving(true);
    await mockApi.updateGoal(editingGoal.id, formData);
    setIsSaving(false);
    setEditingGoal(null);
    invalidate();
  }, [editingGoal, invalidate]);

  const handleDelete = useCallback(async () => {
    if (!deletingGoal) return;
    await mockApi.deleteGoal(deletingGoal.id);
    setDeletingGoal(null);
    invalidate();
  }, [deletingGoal, invalidate]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="w-full max-w-md h-11 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="flex gap-2">
            <div className="h-9 w-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="pt-2 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
              <div className="flex justify-between pt-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.header
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Objectives
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Goals
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Track your long-term and short-term objectives
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0" onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New Goal
        </Button>
      </motion.header>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' as const } },
        }}
      >
        <GoalFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={filterOptions}
        />
      </motion.div>

      {filteredGoals.length === 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {searchQuery ? (
            <EmptyState icon={Target} title="No goals found" description="Try a different search or filter" />
          ) : (
            <EmptyState
              icon={Target}
              title="No goals yet"
              description="Set your first goal to start tracking"
              actionLabel="New Goal"
              onAction={() => setIsCreating(true)}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredGoals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={setEditingGoal}
              onDelete={setDeletingGoal}
              index={index}
            />
          ))}
        </motion.div>
      )}

      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} title="Create Goal" size="md">
        <GoalForm onSave={handleCreate} onCancel={() => setIsCreating(false)} isSaving={isSaving} />
      </Modal>

      <Modal isOpen={!!editingGoal} onClose={() => setEditingGoal(null)} title="Edit Goal" size="md">
        {editingGoal && (
          <GoalForm goal={editingGoal} onSave={handleUpdate} onCancel={() => setEditingGoal(null)} isSaving={isSaving} />
        )}
      </Modal>

      <Modal isOpen={!!deletingGoal} onClose={() => setDeletingGoal(null)} title="Delete Goal" size="sm">
        {deletingGoal && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Are you sure you want to delete "<span className="font-semibold">{deletingGoal.title}</span>"?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeletingGoal(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};
