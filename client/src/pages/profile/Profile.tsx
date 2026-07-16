import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Mail, Calendar, BookOpen, BookMarked, FileText,
  Target, CheckSquare, ListChecks, Flame, Activity,
  LogOut, Pencil, ArrowRight, Clock, TrendingUp, Quote, User,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { libraryApi, readingApi, journalApi, goalsApi, tasksApi, habitsApi, settingsApi } from '../../services/api/index';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import Card from '../../components/ui/Card';
import type { Book, JournalEntry, ReadingSession } from '../../types';
import type { UserProfile } from '../../services/api/index';

const colors = {
  indigo: { bg: 'bg-indigo-50', darkBg: 'dark:bg-indigo-500/10', text: 'text-indigo-600', darkText: 'dark:text-indigo-400', bar: 'bg-indigo-500' },
  blue: { bg: 'bg-blue-50', darkBg: 'dark:bg-blue-500/10', text: 'text-blue-600', darkText: 'dark:text-blue-400', bar: 'bg-blue-500' },
  emerald: { bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-500/10', text: 'text-emerald-600', darkText: 'dark:text-emerald-400', bar: 'bg-emerald-500' },
  amber: { bg: 'bg-amber-50', darkBg: 'dark:bg-amber-500/10', text: 'text-amber-600', darkText: 'dark:text-amber-400', bar: 'bg-amber-500' },
  violet: { bg: 'bg-violet-50', darkBg: 'dark:bg-violet-500/10', text: 'text-violet-600', darkText: 'dark:text-violet-400', bar: 'bg-violet-500' },
  rose: { bg: 'bg-rose-50', darkBg: 'dark:bg-rose-500/10', text: 'text-rose-600', darkText: 'dark:text-rose-400', bar: 'bg-rose-500' },
  orange: { bg: 'bg-orange-50', darkBg: 'dark:bg-orange-500/10', text: 'text-orange-600', darkText: 'dark:text-orange-400', bar: 'bg-orange-500' },
} as const;

type ColorKey = keyof typeof colors;

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

interface StatCardProps {
  icon: React.ReactNode; label: string; value: number | string;
  color: ColorKey; index: number; suffix?: string;
}
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, index, suffix }) => {
  const c = colors[color];
  return (
    <motion.div
      variants={fadeUp}
      className="relative p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -translate-y-6 translate-x-6 rounded-full opacity-[0.04] ${c.bar}`} />
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${c.bg} ${c.darkBg} ${c.text} ${c.darkText} group-hover:scale-105 transition-transform duration-200`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className="text-sm font-medium text-slate-400 dark:text-slate-500 ml-0.5">{suffix}</span>}
      </p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </motion.div>
  );
};

interface Activity {
  id: string;
  type: 'book' | 'journal' | 'goal' | 'session' | 'task' | 'habit';
  title: string;
  date: string;
  description?: string;
}
const activityIconMap: Record<string, React.ReactNode> = {
  book: <BookOpen size={14} />, journal: <FileText size={14} />, goal: <Target size={14} />,
  session: <BookMarked size={14} />, task: <CheckSquare size={14} />, habit: <ListChecks size={14} />,
};
const activityColorMap: Record<string, string> = {
  book: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/10',
  journal: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
  goal: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
  session: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
  task: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-500/10',
  habit: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10',
};

const ActivityTimeline: React.FC<{ activities: Activity[] }> = ({ activities }) => (
  <div className="relative space-y-0">
    {activities.slice(0, 5).map((a, i) => (
      <div key={a.id} className="flex gap-4 pb-5 last:pb-0 relative">
        {i < activities.slice(0, 5).length - 1 && (
          <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
        )}
        <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] ${activityColorMap[a.type]}`}>
          {activityIconMap[a.type]}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{a.title}</p>
          {a.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.description}</p>}
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const StreakMini: React.FC<{ habits: Array<Record<string, unknown>> }> = ({ habits }) => {
  const today = new Date();
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (27 - i));
    return d;
  });
  const maxStreak = habits.reduce((max, h) => Math.max(max, (h.currentStreak as number) || 0), 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Flame size={20} className="text-orange-500" />
        <div>
          <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{maxStreak}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">day streak</p>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {days.map((d, i) => {
          const dateStr = d.toISOString().split('T')[0]!;
          const logged = habits.some((h) => {
            const logs = h.logs as Array<{ date: string }> | undefined;
            return logs?.some((l) => l.date?.startsWith(dateStr));
          });
          const isToday = dateStr === today.toISOString().split('T')[0]!;
          return (
            <div
              key={i}
              className={`w-[9px] h-[9px] rounded-sm transition-colors ${
                isToday
                  ? 'ring-2 ring-offset-1 ring-orange-400 dark:ring-offset-slate-900 bg-orange-500'
                  : logged
                    ? 'bg-orange-400 dark:bg-orange-500'
                    : 'bg-slate-100 dark:bg-slate-800'
              }`}
              title={dateStr}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, logout } = useAuthStore();

  const { data: booksData, isLoading: bL } = useQuery({ queryKey: ['books'], queryFn: () => libraryApi.getAll({ limit: 5 }) });
  const { data: sessionsData, isLoading: sL } = useQuery({ queryKey: ['readingSessions'], queryFn: () => readingApi.getAll({ limit: 100 }) });
  const { data: journalData, isLoading: jL } = useQuery({ queryKey: ['journal'], queryFn: () => journalApi.getAll({ limit: 5 }) });
  const { data: goalsData, isLoading: gL } = useQuery({ queryKey: ['goals'], queryFn: () => goalsApi.getAll({ limit: 5 }) });
  const { data: tasksData, isLoading: tL } = useQuery({ queryKey: ['tasks'], queryFn: () => tasksApi.getAll({ limit: 100 }) });
  const { data: habitsData, isLoading: hL } = useQuery({ queryKey: ['habits'], queryFn: () => habitsApi.getAll({ limit: 100 }) });

  const books: Book[] = (booksData?.data ?? []) as Book[];
  const sessions: ReadingSession[] = (sessionsData?.data ?? []) as ReadingSession[];
  const journals: JournalEntry[] = (journalData?.data ?? []) as JournalEntry[];
  const goals = (goalsData?.data ?? []) as Array<Record<string, unknown>>;
  const tasks = (tasksData?.data ?? []) as Array<Record<string, unknown>>;
  const habits = (habitsData?.data ?? []) as Array<Record<string, unknown>>;

  const isLoading = bL || sL || jL || gL || tL || hL;

  const stats = useMemo(() => ({
    booksCompleted: books.filter((b) => b.status === 'completed').length,
    readingSessions: sessions.length,
    journalEntries: journals.length,
    activeGoals: goals.filter((g) => (g.status as string) === 'IN_PROGRESS' || (g.status as string) === 'active' || (g.status as string) === 'NOT_STARTED').length,
    activeTasks: tasks.filter((t) => (t.status as string) === 'TODO' || (t.status as string) === 'IN_PROGRESS').length,
    totalHabits: habits.length,
    totalPagesRead: sessions.reduce((s, r) => s + r.pagesRead, 0),
    currentStreak: habits.reduce((max, h) => Math.max(max, (h.currentStreak as number) || 0), 0),
  }), [books, sessions, journals, goals, tasks, habits]);

  const recentActivity: Activity[] = useMemo(() => {
    const activities: Activity[] = [];
    books.slice(0, 3).forEach((b) => activities.push({ id: `b-${b.id}`, type: 'book', title: `Added "${b.title}"`, date: b.startDate ?? b.finishDate ?? '', description: `by ${b.author}` }));
    journals.slice(0, 3).forEach((j) => activities.push({ id: `j-${j.id}`, type: 'journal', title: j.title, date: j.date, description: `${j.mood} mood` }));
    goals.slice(0, 3).forEach((g) => activities.push({ id: `g-${g.id as string}`, type: 'goal', title: g.title as string, date: g.createdAt as string, description: `${g.progress as number}% complete` }));
    sessions.slice(0, 3).forEach((s) => activities.push({ id: `s-${s.id}`, type: 'session', title: `Read ${s.pagesRead} pages`, date: s.date, description: `${s.durationMinutes} min` }));
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  }, [books, journals, goals, sessions]);

  const handleLogout = useCallback(async () => {
    await logout(queryClient);
    navigate('/auth/login', { replace: true });
  }, [logout, queryClient, navigate]);

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-10 pb-12">

      {/* ═══ PREMIUM HERO CARD ═══ */}
      <motion.div variants={fadeUp} className="relative">
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">

          {/* Header Row: Avatar + Name + Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="relative group shrink-0">
                <Avatar src={user?.avatar ?? undefined} name={user?.name} size="xl" className="!w-20 !h-20 md:!w-24 md:!h-24 ring-4 ring-white dark:ring-slate-800 shadow-xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {user?.name ?? 'User'}
                </h1>
                {user?.username && (
                  <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 font-medium mt-0.5">@{user.username}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/settings/profile')}>
                <Pencil size={13} />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-slate-400 hover:text-red-500" onClick={handleLogout}>
                <LogOut size={13} />
              </Button>
            </div>
          </div>

          {/* Info Card: Email · Username · Joined */}
          <div className="mt-6 p-4 md:p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {user?.email && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user.email}</p>
                  </div>
                </div>
              )}
              {user?.username && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <User size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Username</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">@{user.username}</p>
                  </div>
                </div>
              )}
              {createdDate && (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Joined</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{createdDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ STATS GRID ═══ */}
      <motion.div variants={fadeIn}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<BookOpen size={17} />} label="Books Completed" value={stats.booksCompleted} color="indigo" index={0} />
          <StatCard icon={<BookMarked size={17} />} label="Reading Sessions" value={stats.readingSessions} color="blue" index={1} />
          <StatCard icon={<FileText size={17} />} label="Journal Entries" value={stats.journalEntries} color="emerald" index={2} />
          <StatCard icon={<Target size={17} />} label="Active Goals" value={stats.activeGoals} color="amber" index={3} />
          <StatCard icon={<CheckSquare size={17} />} label="Active Tasks" value={stats.activeTasks} color="violet" index={4} />
          <StatCard icon={<ListChecks size={17} />} label="Total Habits" value={stats.totalHabits} color="rose" index={5} />
          <StatCard icon={<Flame size={17} />} label="Best Streak" value={stats.currentStreak} color="orange" index={6} suffix="d" />
          <StatCard icon={<Activity size={17} />} label="Pages Read" value={stats.totalPagesRead} color="indigo" index={7} />
        </div>
      </motion.div>

      {/* ═══ PROFILE OVERVIEW - BENTO GRID ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* ─── Left Column ─── */}
        <div className="lg:col-span-7 space-y-6">

          {/* Habit Streak */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame size={16} className="text-orange-500" />
                  Habit Streak
                </h3>
                <button onClick={() => navigate('/habits')} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </button>
              </div>
              <StreakMini habits={habits} />
            </Card>
          </motion.div>

          {/* Recent Books */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-500" />
                  Recent Books
                </h3>
                <button onClick={() => navigate('/library')} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </button>
              </div>
              {books.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3">No books added yet.</p>
              ) : (
                <div className="space-y-3">
                  {books.slice(0, 3).map((book) => (
                    <div key={book.id} className="flex items-center gap-3 group">
                      <div className="w-10 h-14 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-slate-500 shadow-sm">
                        {book.totalPages}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{book.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{book.author}</p>
                      </div>
                      <Badge variant={book.status === 'reading' ? 'info' : book.status === 'completed' ? 'success' : 'default'}>
                        {book.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Recent Journal */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={16} className="text-emerald-500" />
                  Recent Journal
                </h3>
                <button onClick={() => navigate('/journal')} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </button>
              </div>
              {journals.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3">No journal entries yet.</p>
              ) : (
                <div className="space-y-3">
                  {journals.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                        <Quote size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{entry.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{entry.content}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {' · '}{entry.mood}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Recent Tasks */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare size={16} className="text-violet-500" />
                  Recent Tasks
                </h3>
                <button onClick={() => navigate('/tasks')} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </button>
              </div>
              {tasks.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3">No tasks yet.</p>
              ) : (
                <div className="space-y-2">
                  {tasks.slice(0, 4).map((task) => {
                    const t = task as Record<string, unknown>;
                    return (
                      <div key={t.id as string} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          (t.priority as string) === 'high' ? 'bg-red-500' :
                          (t.priority as string) === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{t.title as string}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {(t.status as string) === 'TODO' ? 'To Do' : (t.status as string) === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                            {(t.dueDate as string) && ` · Due ${new Date(t.dueDate as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* ─── Right Column ─── */}
        <div className="lg:col-span-5 space-y-6">

          {/* Recent Activity */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock size={16} className="text-slate-500" />
                Recent Activity
              </h3>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3">No activity yet.</p>
              ) : (
                <ActivityTimeline activities={recentActivity} />
              )}
            </Card>
          </motion.div>

          {/* Active Goals */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target size={16} className="text-amber-500" />
                  Active Goals
                </h3>
                <button onClick={() => navigate('/goals')} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </button>
              </div>
              {goals.filter((g) => (g.status as string) === 'IN_PROGRESS' || (g.status as string) === 'active' || (g.status as string) === 'NOT_STARTED').length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3">No active goals.</p>
              ) : (
                <div className="space-y-3">
                  {goals
                    .filter((g) => (g.status as string) === 'IN_PROGRESS' || (g.status as string) === 'active' || (g.status as string) === 'NOT_STARTED')
                    .slice(0, 3)
                    .map((goal) => {
                      const g = goal as Record<string, unknown>;
                      return (
                        <div key={g.id as string} className="group">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{g.title as string}</p>
                            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 shrink-0 ml-2">{g.progress as number}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                              style={{ width: `${g.progress as number}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Reading Statistics */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-500" />
                Reading Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {stats.totalPagesRead.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total Pages</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {stats.readingSessions}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sessions</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {stats.booksCompleted}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Completed</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {stats.currentStreak}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Day Streak</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeIn}>
            <Card className="p-5 md:p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/20">
              <h3 className="text-sm font-semibold mb-1">Quick Actions</h3>
              <p className="text-xs text-indigo-200 mb-4">Jump to any part of your workspace</p>
              <div className="grid grid-cols-2 gap-2.5">
                <button onClick={() => navigate('/library')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <BookOpen size={14} /> Library
                </button>
                <button onClick={() => navigate('/journal')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <FileText size={14} /> Journal
                </button>
                <button onClick={() => navigate('/goals')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <Target size={14} /> Goals
                </button>
                <button onClick={() => navigate('/reading')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <BookMarked size={14} /> Reading
                </button>
                <button onClick={() => navigate('/habits')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <ListChecks size={14} /> Habits
                </button>
                <button onClick={() => navigate('/tasks')} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer text-left">
                  <CheckSquare size={14} /> Tasks
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;