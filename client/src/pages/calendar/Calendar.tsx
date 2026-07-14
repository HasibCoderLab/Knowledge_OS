import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CalendarDays, Plus, BookOpen, Flame, Target, BookMarked } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import CalendarGrid from '../../features/calendar/components/CalendarGrid';
import EventCard from '../../features/calendar/components/EventCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import type { CalendarEvent } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const today = new Date();
const todayStr = today.toISOString().split('T')[0]!;

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: mockApi.getEvents,
  });

  const { data: tasksData } = useQuery({
    queryKey: ['tasks'],
    queryFn: mockApi.getTasks,
  });

  const { data: habitsData } = useQuery({
    queryKey: ['habits'],
    queryFn: mockApi.getHabits,
  });

  const { data: goalsData } = useQuery({
    queryKey: ['goals'],
    queryFn: mockApi.getGoals,
  });

  const events = eventsData?.data ?? [];
  const tasks = tasksData?.data ?? [];
  const habits = habitsData?.data ?? [];
  const goals = goalsData?.data ?? [];

  const selectedEvents = useMemo(() => {
    return events.filter(e => e.date === selectedDate);
  }, [events, selectedDate]);

  const todayEvents = useMemo(() => {
    return events.filter(e => e.date === todayStr).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));
    return sorted.filter(e => e.date >= todayStr).slice(0, 5);
  }, [events]);

  const todayTasks = useMemo(() => {
    return tasks.filter(t => {
      if (!t.dueDate) return false;
      return t.dueDate === todayStr && !t.isCompleted;
    });
  }, [tasks, todayStr]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const selectedDateObj = new Date(selectedDate + 'T12:00:00');
  const dayName = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = selectedDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Header */}
      <motion.header
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Schedule Planner
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Calendar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Plan your reading, journaling, and study sessions
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0">
          <Plus size={16} /> Add Event
        </Button>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-7 xl:col-span-8">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05 } },
            }}
          >
            <CalendarGrid
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              events={events}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Selected Date Events */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.08 } },
            }}
          >
            <Card title={dayName} subtitle={formattedDate}>
              {selectedEvents.length === 0 && selectedDate !== todayStr && (
                <div className="text-center py-6">
                  <CalendarDays size={24} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-slate-400 dark:text-slate-500">No events scheduled</p>
                </div>
              )}
              {selectedEvents.length === 0 && selectedDate === todayStr && (
                <div className="text-center py-6">
                  <CalendarDays size={24} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-slate-400 dark:text-slate-500">Free day! Plan something</p>
                  <Button size="sm" variant="outline" className="mt-3 gap-1.5">
                    <Plus size={12} /> Quick Add
                  </Button>
                </div>
              )}
              <div className="space-y-0">
                {selectedEvents
                  .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                  .map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
              </div>
            </Card>
          </motion.div>

          {/* Today's Overview */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1 } },
            }}
          >
            <Card title="Today's Overview" subtitle={today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}>
              {/* Today's Events */}
              {todayEvents.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Schedule</p>
                  {todayEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} compact index={i} />
                  ))}
                </div>
              )}

              {/* Today's Tasks */}
              {todayTasks.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Tasks Due</p>
                  {todayTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 truncate">{task.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Today's Habits */}
              {habits.some(h => h.completedToday) && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Completed Habits</p>
                  {habits.filter(h => h.completedToday).map((habit) => (
                    <div key={habit.id} className="flex items-center gap-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 truncate">{habit.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {todayEvents.length === 0 && todayTasks.length === 0 && !habits.some(h => h.completedToday) && (
                <div className="text-center py-4">
                  <p className="text-xs text-slate-400">No activities today. Start something!</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Upcoming */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.12 } },
            }}
          >
            <Card title="Upcoming" subtitle="Next 5 events">
              {upcomingEvents.map((event, i) => (
                <EventCard key={event.id} event={event} compact index={i} />
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No upcoming events</p>
              )}
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.14 } },
            }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 inline-block mb-2">
                <BookOpen size={14} strokeWidth={2} />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {events.filter(e => e.type === 'reading').length}
              </p>
              <p className="text-[10px] text-slate-400">Sessions</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 inline-block mb-2">
                <BookMarked size={14} strokeWidth={2} />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {events.filter(e => e.type === 'journal').length}
              </p>
              <p className="text-[10px] text-slate-400">Journal</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 inline-block mb-2">
                <Target size={14} strokeWidth={2} />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {goals.filter(g => g.status === 'active').length}
              </p>
              <p className="text-[10px] text-slate-400">Goals</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 inline-block mb-2">
                <Flame size={14} strokeWidth={2} />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {Math.max(...habits.map(h => h.streak), 0)}
              </p>
              <p className="text-[10px] text-slate-400">Best Streak</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
