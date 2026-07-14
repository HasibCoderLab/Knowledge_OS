import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, BookMarked, Timer, CheckSquare, TrendingUp, BrainCircuit, Lightbulb } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import TrendBarChart, { DistributionChart } from '../../features/analytics/components/TrendBarChart';
import InsightCard from '../../features/analytics/components/InsightCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export const Analytics: React.FC = () => {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['dailyActivity'],
    queryFn: mockApi.getDailyActivity,
  });

  const { data: readingTrend, isLoading: readingLoading } = useQuery({
    queryKey: ['readingTrend'],
    queryFn: mockApi.getReadingTrend,
  });

  const { data: knowledgeGrowth, isLoading: knowledgeLoading } = useQuery({
    queryKey: ['knowledgeGrowth'],
    queryFn: mockApi.getKnowledgeGrowth,
  });

  const { data: focusHours, isLoading: focusLoading } = useQuery({
    queryKey: ['focusHours'],
    queryFn: mockApi.getFocusHours,
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['categoryDistribution'],
    queryFn: mockApi.getCategoryDistribution,
  });

  const { data: weeklyData } = useQuery({
    queryKey: ['weeklyReports'],
    queryFn: mockApi.getWeeklyReports,
  });

  const { data: monthlyData } = useQuery({
    queryKey: ['monthlyReports'],
    queryFn: mockApi.getMonthlyReports,
  });

  const { data: insightsData } = useQuery({
    queryKey: ['insights'],
    queryFn: mockApi.getAIInsights,
  });

  const isLoading = activityLoading || readingLoading || knowledgeLoading || focusLoading || categoryLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const activity = activityData?.data ?? [];
  const reading = readingTrend?.data ?? [];
  const knowledge = knowledgeGrowth?.data ?? [];
  const focus = focusHours?.data ?? [];
  const categories = categoryData?.data ?? [];
  const insights = insightsData?.data ?? [];
  const weeklyReports = weeklyData?.data ?? [];
  const monthlyReports = monthlyData?.data ?? [];

  const totalActions = activity.reduce((sum, d) => sum + d.value, 0);
  const totalReadingHours = Math.round((reading.reduce((sum, d) => sum + d.value, 0) / 60) * 10) / 10;
  const totalFocusHours = focus.reduce((sum, d) => sum + d.value, 0);

  const overviewCards = [
    { label: 'Knowledge Created', value: knowledge.length > 0 ? knowledge[knowledge.length - 1]!.value : 0, icon: BrainCircuit, color: 'text-indigo-500' as const, bg: 'bg-indigo-50 dark:bg-indigo-900/20' as const },
    { label: 'Journal Entries', value: totalActions, icon: BookMarked, color: 'text-emerald-500' as const, bg: 'bg-emerald-50 dark:bg-emerald-900/20' as const },
    { label: 'Reading Hours', value: totalReadingHours, suffix: 'hrs', icon: BookOpen, color: 'text-blue-500' as const, bg: 'bg-blue-50 dark:bg-blue-900/20' as const },
    { label: 'Focus Hours', value: totalFocusHours, suffix: 'hrs', icon: Timer, color: 'text-amber-500' as const, bg: 'bg-amber-50 dark:bg-amber-900/20' as const },
    { label: 'Tasks Completed', value: weeklyReports.reduce((sum, r) => sum + r.tasksCompleted, 0), icon: CheckSquare, color: 'text-violet-500' as const, bg: 'bg-violet-50 dark:bg-violet-900/20' as const },
    { label: 'Learning Streak', value: '12 days', icon: TrendingUp, color: 'text-rose-500' as const, bg: 'bg-rose-50 dark:bg-rose-900/20' as const },
  ];

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
            Insights & Metrics
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Analytics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Track your growth and knowledge ecosystem performance
          </p>
        </div>
      </motion.header>

      {/* Overview Cards */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {overviewCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} ring-1 ring-slate-200/50 dark:ring-slate-700/50`}>
              <card.icon size={17} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{card.label}</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                {'suffix' in card ? <span className="text-sm font-medium text-slate-400 ml-0.5">{card.suffix}</span> : ''}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
          }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Activity</h3>
              <Badge variant="info">Last 7 days</Badge>
            </div>
            {activity.length > 0 ? (
              <TrendBarChart data={activity} height={140} accentColor="bg-indigo-500" />
            ) : (
              <div className="h-[140px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Reading Trend */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.13 } },
          }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Reading Trend</h3>
              <Badge variant="info">Pages/week</Badge>
            </div>
            {reading.length > 0 ? (
              <TrendBarChart data={reading} height={140} accentColor="bg-emerald-500" />
            ) : (
              <div className="h-[140px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Knowledge Growth */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.16 } },
          }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Knowledge Growth</h3>
              <Badge variant="info">Cumulative</Badge>
            </div>
            {knowledge.length > 0 ? (
              <TrendBarChart data={knowledge} height={140} accentColor="bg-blue-500" />
            ) : (
              <div className="h-[140px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.19 } },
          }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Activity Breakdown</h3>
            </div>
            {categories.length > 0 ? (
              <DistributionChart data={categories} />
            ) : (
              <div className="h-[140px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.2 } },
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Reports */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.25 } },
        }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Reports</h3>
          <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setView('weekly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                view === 'weekly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setView('monthly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                view === 'monthly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {view === 'weekly' && weeklyReports.length > 0 && (
          <div className="space-y-3">
            {weeklyReports.map((report, i) => (
              <motion.div
                key={report.week}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">{report.week}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Journal</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.journalEntries} entries</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Reading</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.readingHours} hrs</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Tasks Done</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Focus</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.focusHours} hrs</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view === 'monthly' && monthlyReports.length > 0 && (
          <div className="space-y-3">
            {monthlyReports.map((report, i) => (
              <motion.div
                key={report.month}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">{report.month}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Entries</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.entries}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Books Finished</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.booksFinished}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Pages Read</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.pagesRead}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Avg Focus</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{report.avgFocusHours} hrs</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
