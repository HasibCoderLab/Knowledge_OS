import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Target, Zap, Flame, ArrowUpRight, Plus, FileText, Lightbulb } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import StatCard from '../../features/dashboard/components/StatCard';
import ReadingProgressCard from '../../features/dashboard/components/ReadingProgressCard';
import HabitChecklist from '../../features/dashboard/components/HabitChecklist';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export const Dashboard: React.FC = () => {
  const { data: books, isLoading: booksLoading } = useQuery({ 
    queryKey: ['books'], 
    queryFn: mockApi.getBooks 
  });
  const { data: habits, isLoading: habitsLoading } = useQuery({ 
    queryKey: ['habits'], 
    queryFn: mockApi.getHabits 
  });
  const { data: goals, isLoading: goalsLoading } = useQuery({ 
    queryKey: ['goals'], 
    queryFn: mockApi.getGoals 
  });

  if (booksLoading || habitsLoading || goalsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 animate-pulse">Loading your OS...</p>
        </div>
      </div>
    );
  }

  const currentBook = books?.data?.find(b => b.status === 'reading') || books?.data?.[0];

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">Welcome back, John. Here's your growth summary.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="flex items-center justify-center gap-2">
            <Zap size={14} /> Quick Action
          </Button>
          <Button variant="primary" size="sm" className="flex items-center justify-center gap-2">
            <Plus size={14} /> New Entry
          </Button>
        </div>
      </header>

      {/* Top Row: High Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Books Read" 
          value="14" 
          icon={BookOpen} 
          color="indigo" 
          trend={{ value: '+2 this month', isPositive: true }} 
        />
        <StatCard 
          label="Active Goals" 
          value={goals?.data?.length || 0} 
          icon={Target} 
          color="blue" 
        />
        <StatCard 
          label="Habit Completion" 
          value="85%" 
          icon={Zap} 
          color="green" 
          trend={{ value: '+5% vs last week', isPositive: true }} 
        />
        <StatCard 
          label="New Vocabulary" 
          value="124" 
          icon={Flame} 
          color="orange" 
        />
      </div>

      {/* Middle Section: Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Main Focus: Reading Progress (Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen size={20} className="text-indigo-600" />
                Current Focus
              </h3>
              <Button variant="ghost" size="sm" className="text-xs">View Library <ArrowUpRight size={12} /></Button>
            </div>
            <ReadingProgressCard book={currentBook} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target size={20} className="text-indigo-600" />
                Strategic Goals
              </h3>
              <Button variant="ghost" size="sm" className="text-xs">Manage Goals <ArrowUpRight size={12} /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals?.data?.map(goal => (
                <Card key={goal.id} className="p-4 group cursor-pointer hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.priority === 'high' ? 'danger' : 'info'}>{goal.priority}</Badge>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{goal.title}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-700 group-hover:bg-indigo-400" 
                      style={{ width: `${goal.progress}%` }} 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Habits & Quick Actions (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          <HabitChecklist habits={habits?.data || []} />
          
          <Card title="Quick Actions" subtitle="Rapid entry for your OS">
            <div className="grid grid-cols-1 gap-3">
              <Button variant="secondary" className="justify-start gap-3 text-left">
                <BookOpen size={16} /> Add New Book
              </Button>
              <Button variant="secondary" className="justify-start gap-3 text-left">
                <FileText size={16} /> Create New Note
              </Button>
              <Button variant="secondary" className="justify-start gap-3 text-left">
                <Target size={16} /> Set New Goal
              </Button>
            </div>
          </Card>

          <div className="p-4 md:p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-base md:text-lg font-bold mb-2 flex items-center gap-2">
                <Lightbulb size={18} className="text-yellow-300 shrink-0" />
                Pro Tip
              </h4>
              <p className="text-indigo-100 text-xs md:text-sm leading-relaxed mb-4">
                "Reading a book is a conversation. Take notes to talk back to the author."
              </p>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Explore Tips
              </Button>
            </div>
            <Zap className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform" size={80} />
          </div>
        </div>
      </div>
    </div>
  );
};


