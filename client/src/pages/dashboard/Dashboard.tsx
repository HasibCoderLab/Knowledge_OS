import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Target, Zap, Flame, ArrowUpRight, Plus, FileText, Lightbulb } from 'lucide-react';
import { libraryApi, habitsApi, goalsApi } from '../../services/api/index';
import StatCard from '../../features/dashboard/components/StatCard';
import type { Book, Goal } from '../../types';
import ReadingProgressCard from '../../features/dashboard/components/ReadingProgressCard';
import HabitChecklist from '../../features/dashboard/components/HabitChecklist';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export const Dashboard: React.FC = () => {
  const { data: books, isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => libraryApi.getAll({ limit: 1000 }),
  });
  const { data: habits, isLoading: habitsLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: () => habitsApi.getAll({ limit: 1000 }),
  });
  const { data: goals, isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsApi.getAll({ limit: 1000 }),
  });

  if (booksLoading || habitsLoading || goalsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">Loading your OS...</p>
        </div>
      </div>
    );
  }

  const currentBook = (books?.data as Book[] | undefined)?.find((b) => b.status === 'reading') || (books?.data as Book[] | undefined)?.[0];

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h2>
          <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, John. Here's your growth summary.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Zap size={14} /> Quick Action
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus size={14} /> New Entry
          </Button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          label="Books Read"
          value="14"
          icon={BookOpen}
          color="indigo"
          trend={{ value: '+2 this month', isPositive: true }}
          index={0}
        />
        <StatCard
          label="Active Goals"
          value={goals?.data?.length || 0}
          icon={Target}
          color="blue"
          index={1}
        />
        <StatCard
          label="Habit Completion"
          value="85%"
          icon={Zap}
          color="green"
          trend={{ value: '+5% vs last week', isPositive: true }}
          index={2}
        />
        <StatCard
          label="New Vocabulary"
          value="124"
          icon={Flame}
          color="orange"
          index={3}
        />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Reading Progress */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-500" strokeWidth={2} />
                Current Focus
              </h3>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View Library <ArrowUpRight size={12} />
              </Button>
            </div>
            <ReadingProgressCard book={currentBook} />
          </section>

          {/* Goals */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Target size={18} className="text-indigo-500" strokeWidth={2} />
                Strategic Goals
              </h3>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Manage Goals <ArrowUpRight size={12} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(goals?.data as Goal[] | undefined)?.map((goal) => (
                <Card key={goal.id} hoverable className="p-4 group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge variant={goal.priority === 'high' ? 'danger' : goal.priority === 'medium' ? 'warning' : 'info'}>
                        {goal.priority}
                      </Badge>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {goal.title}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 ml-2">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-700 ease-out group-hover:from-indigo-400 group-hover:to-indigo-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          <HabitChecklist habits={habits?.data || []} />

          {/* Quick Actions */}
          <Card>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Quick Actions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Rapid entry for your OS</p>
            <div className="grid grid-cols-1 gap-2.5">
              <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer group border border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                  <BookOpen size={15} strokeWidth={2} />
                </div>
                Add New Book
              </button>
              <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer group border border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <FileText size={15} strokeWidth={2} />
                </div>
                Create New Note
              </button>
              <button className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 cursor-pointer group border border-slate-100 dark:border-slate-800">
                <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Target size={15} strokeWidth={2} />
                </div>
                Set New Goal
              </button>
            </div>
          </Card>

          {/* Pro Tip */}
          <div className="p-5 md:p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-base font-bold mb-2.5 flex items-center gap-2">
                <Lightbulb size={17} className="text-yellow-300 shrink-0" />
                Pro Tip
              </h4>
              <p className="text-indigo-100 text-sm leading-relaxed mb-5">
                "Reading a book is a conversation. Take notes to talk back to the author."
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
              >
                Explore Tips
              </Button>
            </div>
            <Zap
              className="absolute -right-6 -bottom-6 text-white/[0.07] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
              size={90}
              strokeWidth={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
