import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ListChecks, Plus, AlertTriangle } from 'lucide-react';
import { tasksApi } from '../../services/api/index';
import TaskItem from '../../features/tasks/components/TaskItem';
import TaskFilters from '../../features/tasks/components/TaskFilters';
import TaskForm from '../../features/tasks/components/TaskForm';
import { useToastStore } from '../../store/toastStore';
import type { TaskFormData } from '../../features/tasks/components/TaskForm';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import type { Task } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

export const Tasks: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getAll({ limit: 100 }),
  });

  const tasks: Task[] = (data?.data ?? []).map((t: Record<string, unknown>) => ({
    ...t,
    isCompleted: (t.status as string) === 'DONE',
  })) as Task[];

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  }, [queryClient]);

  const categories = useMemo(() => {
    const cats = new Set(tasks.map((t) => t.category).filter(Boolean) as string[]);
    return Array.from(cats).sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeFilter === 'active') {
      result = result.filter((t) => !t.isCompleted);
    } else if (activeFilter === 'completed') {
      result = result.filter((t) => t.isCompleted);
    }

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tasks, activeFilter, categoryFilter, searchQuery]);

  const completedCount = useMemo(() => tasks.filter((t) => t.isCompleted).length, [tasks]);
  const totalCount = tasks.length;

  const handleCreate = useCallback(async (formData: TaskFormData) => {
    setIsSaving(true);
    try {
      await tasksApi.create({
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        status: 'TODO',
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      });
      useToastStore.getState().addToast({ title: 'Task created', type: 'success' });
      setIsCreating(false);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to create task', description: 'Please try again', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [invalidate]);

  const handleUpdate = useCallback(async (formData: TaskFormData) => {
    if (!editingTask) return;
    setIsSaving(true);
    try {
      await tasksApi.update(editingTask.id, {
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      });
      useToastStore.getState().addToast({ title: 'Task updated', type: 'success' });
      setEditingTask(null);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to update task', description: 'Please try again', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [editingTask, invalidate]);

  const handleDelete = useCallback(async () => {
    if (!deletingTask) return;
    try {
      await tasksApi.delete(deletingTask.id);
      useToastStore.getState().addToast({ title: 'Task deleted', type: 'success' });
      setDeletingTask(null);
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to delete task', description: 'Please try again', type: 'error' });
    }
  }, [deletingTask, invalidate]);

  const handleToggle = useCallback(async (task: Task) => {
    try {
      await tasksApi.update(task.id, { status: task.isCompleted ? 'TODO' : 'DONE' });
      useToastStore.getState().addToast({
        title: task.isCompleted ? 'Task reopened' : 'Task completed',
        type: 'success',
      });
      invalidate();
    } catch {
      useToastStore.getState().addToast({ title: 'Failed to update task', description: 'Please try again', type: 'error' });
    }
  }, [invalidate]);

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
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 rounded-full shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-16 rounded-lg" />
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
            Todos
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tasks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            {completedCount} of {totalCount} completed
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0" onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New Task
        </Button>
      </motion.header>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' as const } },
        }}
      >
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
      </motion.div>

      {filteredTasks.length === 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {searchQuery || activeFilter !== 'all' || categoryFilter !== 'all' ? (
            <EmptyState icon={ListChecks} title="No tasks found" description="Try a different search or filter" />
          ) : (
            <EmptyState
              icon={ListChecks}
              title="No tasks yet"
              description="Add your first task to get started"
              actionLabel="New Task"
              onAction={() => setIsCreating(true)}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="space-y-2"
        >
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={setDeletingTask}
              onToggle={handleToggle}
              index={index}
            />
          ))}
        </motion.div>
      )}

      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} title="Create Task" size="md">
        <TaskForm onSave={handleCreate} onCancel={() => setIsCreating(false)} isSaving={isSaving} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task" size="md">
        {editingTask && (
          <TaskForm task={editingTask} onSave={handleUpdate} onCancel={() => setEditingTask(null)} isSaving={isSaving} />
        )}
      </Modal>

      <Modal isOpen={!!deletingTask} onClose={() => setDeletingTask(null)} title="Delete Task" size="sm">
        {deletingTask && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Are you sure you want to delete "<span className="font-semibold">{deletingTask.title}</span>"?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeletingTask(null)}>
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
