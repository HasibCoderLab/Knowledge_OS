import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Flame, Zap, Trophy, AlertTriangle } from 'lucide-react';
import { habitsApi } from '../../services/api/index';
import HabitCard from '../../features/habits/components/HabitCard';
import HabitFilters from '../../features/habits/components/HabitFilters';
import HabitForm from '../../features/habits/components/HabitForm';
import { useToastStore } from '../../store/toastStore';
import type { HabitFormData } from '../../features/habits/components/HabitForm';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import type { Habit } from '../../types';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed Today' },
  { value: 'pending', label: 'Pending' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export const Habits: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading: habitsLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: () => habitsApi.getAll({ limit: 1000 }),
  });

  const rawHabits = data?.data ?? [];

  const habits: Habit[] = rawHabits.map((h: Record<string, unknown>) => ({
    id: h.id as string,
    name: h.name as string,
    description: h.description as string | undefined,
    frequency: h.frequency as 'daily' | 'weekly',
    streak: (h.currentStreak as number) || 0,
    completedToday: false,
    logs: [],
    createdAt: h.createdAt as string,
  }));

  const stats = {
    totalCompletions: rawHabits.reduce((sum: number, h: Record<string, unknown>) => sum + ((h.currentStreak as number) || 0), 0),
    currentStreak: Math.max(0, ...rawHabits.map((h: Record<string, unknown>) => (h.currentStreak as number) || 0)),
    longestStreak: Math.max(0, ...rawHabits.map((h: Record<string, unknown>) => (h.longestStreak as number) || 0)),
  };

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    queryClient.invalidateQueries({ queryKey: ['habitStats'] });
  }, [queryClient]);

  const filteredHabits = useMemo(() => {
    let result = habits;

    if (activeFilter === 'completed') {
      result = result.filter((h) => h.completedToday);
    } else if (activeFilter === 'pending') {
      result = result.filter((h) => !h.completedToday);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [habits, activeFilter, searchQuery]);

  const handleCreate = useCallback(async (formData: HabitFormData) => {
    setIsSaving(true);
    try {
      await habitsApi.create(formData as unknown as Record<string, unknown>);
      useToastStore.getState().addToast({ title: 'Habit created', type: 'success' });
      setIsCreating(false);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to create habit', description: 'Please try again', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [invalidate]);

  const handleUpdate = useCallback(async (formData: HabitFormData) => {
    if (!editingHabit) return;
    setIsSaving(true);
    try {
      await habitsApi.update(editingHabit.id, formData as unknown as Record<string, unknown>);
      useToastStore.getState().addToast({ title: 'Habit updated', type: 'success' });
      setEditingHabit(null);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to update habit', description: 'Please try again', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [editingHabit, invalidate]);

  const handleDelete = useCallback(async () => {
    if (!deletingHabit) return;
    try {
      await habitsApi.delete(deletingHabit.id);
      useToastStore.getState().addToast({ title: 'Habit deleted', type: 'success' });
      setDeletingHabit(null);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to delete habit', description: 'Please try again', type: 'error' });
    }
  }, [deletingHabit, invalidate]);

  const handleToggle = useCallback(async (habit: Habit) => {
    try {
      await habitsApi.log(habit.id, {
        date: new Date().toISOString(),
        completed: true,
      });
      useToastStore.getState().addToast({ title: 'Habit logged', description: `${habit.name} completed`, type: 'success' });
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to log habit', description: 'Please try again', type: 'error' });
    }
  }, [invalidate]);

  const isLoading = habitsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="w-full max-w-md h-11 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="flex gap-2">
            <div className="h-9 w-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                </div>
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
            Routines
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Habits
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Build and maintain daily routines
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0" onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New Habit
        </Button>
      </motion.header>

      {stats && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05, ease: 'easeOut' as const } },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20">
              <Flame size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {stats.currentStreak}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
              <Trophy size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Best Streak
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {stats.longestStreak}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">days</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
              <Zap size={20} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Total Completions
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {stats.totalCompletions}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">check-ins</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' as const } },
        }}
      >
        <HabitFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={filterOptions}
        />
      </motion.div>

      {filteredHabits.length === 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {searchQuery ? (
            <EmptyState icon={CheckSquare} title="No habits found" description="Try a different search or filter" />
          ) : (
            <EmptyState
              icon={CheckSquare}
              title="No habits yet"
              description="Create your first habit to start building routines"
              actionLabel="New Habit"
              onAction={() => setIsCreating(true)}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="space-y-3"
        >
          {filteredHabits.map((habit, index) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={setEditingHabit}
              onDelete={setDeletingHabit}
              onToggle={handleToggle}
              index={index}
            />
          ))}
        </motion.div>
      )}

      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} title="Create Habit" size="md">
        <HabitForm onSave={handleCreate} onCancel={() => setIsCreating(false)} isSaving={isSaving} />
      </Modal>

      <Modal isOpen={!!editingHabit} onClose={() => setEditingHabit(null)} title="Edit Habit" size="md">
        {editingHabit && (
          <HabitForm habit={editingHabit} onSave={handleUpdate} onCancel={() => setEditingHabit(null)} isSaving={isSaving} />
        )}
      </Modal>

      <Modal isOpen={!!deletingHabit} onClose={() => setDeletingHabit(null)} title="Delete Habit" size="sm">
        {deletingHabit && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Are you sure you want to delete "<span className="font-semibold">{deletingHabit.name}</span>"?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeletingHabit(null)}>
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
