import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, BookOpen, BookMarked, FileText,
  Target, CheckSquare, ListChecks, Flame, Activity,
  Settings, LogOut, Camera, Pencil,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { libraryApi, readingApi, journalApi, goalsApi, tasksApi, habitsApi } from '../../services/api/index';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';

const colorClasses = {
  indigo: { bg: 'bg-indigo-50', darkBg: 'dark:bg-indigo-500/10', text: 'text-indigo-600', darkText: 'dark:text-indigo-400' },
  blue: { bg: 'bg-blue-50', darkBg: 'dark:bg-blue-500/10', text: 'text-blue-600', darkText: 'dark:text-blue-400' },
  emerald: { bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-500/10', text: 'text-emerald-600', darkText: 'dark:text-emerald-400' },
  amber: { bg: 'bg-amber-50', darkBg: 'dark:bg-amber-500/10', text: 'text-amber-600', darkText: 'dark:text-amber-400' },
  violet: { bg: 'bg-violet-50', darkBg: 'dark:bg-violet-500/10', text: 'text-violet-600', darkText: 'dark:text-violet-400' },
  rose: { bg: 'bg-rose-50', darkBg: 'dark:bg-rose-500/10', text: 'text-rose-600', darkText: 'dark:text-rose-400' },
  orange: { bg: 'bg-orange-50', darkBg: 'dark:bg-orange-500/10', text: 'text-orange-600', darkText: 'dark:text-orange-400' },
} as const;

type ColorKey = keyof typeof colorClasses;

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: ColorKey;
  index: number;
}> = ({ icon, label, value, color, index }) => {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-xl ${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText} group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, logout } = useAuthStore();

  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => libraryApi.getAll({ limit: 1000 }),
  });

  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ['readingSessions'],
    queryFn: () => readingApi.getAll({ limit: 1000 }),
  });

  const { data: journalData, isLoading: journalLoading } = useQuery({
    queryKey: ['journal'],
    queryFn: () => journalApi.getAll({ limit: 1000 }),
  });

  const { data: goalsData, isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsApi.getAll({ limit: 1000 }),
  });

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getAll({ limit: 1000 }),
  });

  const { data: habitsData, isLoading: habitsLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: () => habitsApi.getAll({ limit: 1000 }),
  });

  const isLoading = booksLoading || sessionsLoading || journalLoading || goalsLoading || tasksLoading || habitsLoading;

  const stats = useMemo(() => {
    const books = (booksData?.data as Array<Record<string, unknown>>) ?? [];
    const sessions = (sessionsData?.data as Array<Record<string, unknown>>) ?? [];
    const journalEntries = (journalData?.data as Array<Record<string, unknown>>) ?? [];
    const goals = (goalsData?.data as Array<Record<string, unknown>>) ?? [];
    const tasks = (tasksData?.data as Array<Record<string, unknown>>) ?? [];
    const habits = (habitsData?.data as Array<Record<string, unknown>>) ?? [];

    return {
      booksCompleted: books.filter((b: Record<string, unknown>) => b.status === 'completed').length,
      readingSessions: sessions.length,
      journalEntries: journalEntries.length,
      activeGoals: goals.filter((g: Record<string, unknown>) => g.status === 'IN_PROGRESS' || g.status === 'active').length,
      activeTasks: tasks.filter((t: Record<string, unknown>) => t.status === 'TODO' || t.status === 'IN_PROGRESS').length,
      totalHabits: habits.length,
      totalPagesRead: sessions.reduce((sum: number, s: Record<string, unknown>) => sum + (s.pagesRead as number || 0), 0),
      currentStreak: habits.reduce((maxStreak: number, h: Record<string, unknown>) => {
        const streak = (h.currentStreak as number) || 0;
        return streak > maxStreak ? streak : maxStreak;
      }, 0),
    };
  }, [booksData, sessionsData, journalData, goalsData, tasksData, habitsData]);

  const handleLogout = async () => {
    await logout(queryClient);
    navigate('/auth/login', { replace: true });
  };

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 md:space-y-8"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative group shrink-0">
            <Avatar src={user?.avatar} name={user?.name} size="xl" />
            <button
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              aria-label="Change avatar"
            >
              <Camera size={18} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {user?.name ?? 'User'}
            </h2>
            {user?.username && (
              <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/settings')}
          >
            <Pencil size={14} />
            Edit Profile
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="gap-2"
            onClick={handleLogout}
          >
            <LogOut size={14} />
            Logout
          </Button>
        </div>
      </motion.header>

      {/* User Info Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.email ?? '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <User size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Username</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.username ? `@${user.username}` : '-'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Joined</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {createdDate ?? '-'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants}>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity size={18} className="text-indigo-500" />
          Activity Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<BookOpen size={18} />} label="Books Completed" value={stats.booksCompleted} color="indigo" index={0} />
          <StatCard icon={<BookMarked size={18} />} label="Reading Sessions" value={stats.readingSessions} color="blue" index={1} />
          <StatCard icon={<FileText size={18} />} label="Journal Entries" value={stats.journalEntries} color="emerald" index={2} />
          <StatCard icon={<Target size={18} />} label="Active Goals" value={stats.activeGoals} color="amber" index={3} />
          <StatCard icon={<CheckSquare size={18} />} label="Active Tasks" value={stats.activeTasks} color="violet" index={4} />
          <StatCard icon={<ListChecks size={18} />} label="Total Habits" value={stats.totalHabits} color="rose" index={5} />
          <StatCard icon={<Flame size={18} />} label="Current Streak" value={stats.currentStreak} color="orange" index={6} />
          <StatCard icon={<Activity size={18} />} label="Total Pages Read" value={stats.totalPagesRead} color="indigo" index={7} />
        </div>
      </motion.div>

      {/* Account Management Section (Future-ready) */}
      <motion.div variants={itemVariants}>
        <Card title="Account Management" subtitle="Manage your account settings">
          <div className="space-y-3">
            <button
              onClick={() => navigate('/settings?section=account')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all cursor-pointer border border-slate-100 dark:border-slate-800"
            >
              <span className="flex items-center gap-3">
                <Settings size={16} className="text-slate-400" />
                Change Password
              </span>
              <Badge variant="default">Soon</Badge>
            </button>
            <button
              disabled
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-100 dark:border-slate-800 opacity-60"
            >
              <span className="flex items-center gap-3">
                <User size={16} />
                Connected Accounts
              </span>
              <Badge variant="default">Soon</Badge>
            </button>
            <button
              disabled
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-sm font-medium text-red-400 dark:text-red-500 cursor-not-allowed border border-red-100 dark:border-red-900/20 opacity-60"
            >
              <span className="flex items-center gap-3">
                <LogOut size={16} />
                Delete Account
              </span>
              <Badge variant="danger">Soon</Badge>
            </button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
