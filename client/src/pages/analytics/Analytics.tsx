import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, type Variants } from 'framer-motion';
import {
  BarChart3, BookOpen, BookMarked, Timer, CheckSquare, TrendingUp,
  BrainCircuit, Lightbulb, Search, Zap, Flame,
  PieChart as PieIcon, Radar as RadarIcon,
} from 'lucide-react';
import { journalApi, tasksApi, habitsApi, goalsApi } from '../../services/api/index';
import AreaChart from '../../features/charts/AreaChart';
import BarChart from '../../features/charts/BarChart';
import StackedBarChart from '../../features/charts/StackedBarChart';
import PieChart from '../../features/charts/PieChart';
import RadarChart from '../../features/charts/RadarChart';
import Heatmap from '../../features/charts/Heatmap';
import Sparkline from '../../features/charts/Sparkline';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

type TimeRange = 'weekly' | 'monthly' | 'yearly';

interface AnalyticsDataPoint { date: string; value: number }
interface AnalyticsCategory { name: string; value: number; color: string }
interface AIInsight { id: string; type: 'productivity' | 'reading' | 'learning' | 'focus'; message: string; trend: 'up' | 'down' | 'neutral'; percentage?: number }
interface RadarMetric { category: string; value: number; fullMark: number }
interface KnowledgeScoreBreakdown { label: string; score: number; maxScore: number }
interface WeeklyReport { week: string; journalEntries: number; readingHours: number; tasksCompleted: number; focusHours: number }
interface MonthlyReport { month: string; entries: number; booksFinished: number; pagesRead: number; avgFocusHours: number }

const MOCK_DAILY_ACTIVITY: AnalyticsDataPoint[] = [
  { date: 'Mon', value: 12 }, { date: 'Tue', value: 18 }, { date: 'Wed', value: 8 },
  { date: 'Thu', value: 22 }, { date: 'Fri', value: 15 }, { date: 'Sat', value: 10 }, { date: 'Sun', value: 20 },
];
const MOCK_READING_TREND: AnalyticsDataPoint[] = [
  { date: 'W1', value: 120 }, { date: 'W2', value: 180 }, { date: 'W3', value: 95 },
  { date: 'W4', value: 210 }, { date: 'W5', value: 150 }, { date: 'W6', value: 240 },
];
const MOCK_KNOWLEDGE_GROWTH: AnalyticsDataPoint[] = [
  { date: 'Jan', value: 50 }, { date: 'Feb', value: 85 }, { date: 'Mar', value: 120 },
  { date: 'Apr', value: 170 }, { date: 'May', value: 210 }, { date: 'Jun', value: 280 },
];
const MOCK_FOCUS_HOURS: AnalyticsDataPoint[] = [
  { date: 'W1', value: 8 }, { date: 'W2', value: 12 }, { date: 'W3', value: 6 },
  { date: 'W4', value: 15 }, { date: 'W5', value: 10 }, { date: 'W6', value: 18 },
];
const MOCK_CATEGORIES: AnalyticsCategory[] = [
  { name: 'Reading', value: 35, color: 'bg-indigo-500' },
  { name: 'Journal', value: 25, color: 'bg-emerald-500' },
  { name: 'Tasks', value: 22, color: 'bg-amber-500' },
  { name: 'Focus', value: 18, color: 'bg-blue-500' },
];

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  const queries = {
    activity: useQuery({ queryKey: ['dailyActivity'], queryFn: () => ({ data: MOCK_DAILY_ACTIVITY }) }),
    reading: useQuery({ queryKey: ['readingTrend'], queryFn: () => ({ data: MOCK_READING_TREND }) }),
    knowledge: useQuery({ queryKey: ['knowledgeGrowth'], queryFn: () => ({ data: MOCK_KNOWLEDGE_GROWTH }) }),
    focus: useQuery({ queryKey: ['focusHours'], queryFn: () => ({ data: MOCK_FOCUS_HOURS }) }),
    categories: useQuery({ queryKey: ['categoryDistribution'], queryFn: () => ({ data: MOCK_CATEGORIES }) }),
    weekly: useQuery({ queryKey: ['weeklyReports'], queryFn: () => ({ data: [] as WeeklyReport[] }) }),
    monthly: useQuery({ queryKey: ['monthlyReports'], queryFn: () => ({ data: [] as MonthlyReport[] }) }),
    insights: useQuery({ queryKey: ['insights'], queryFn: () => ({ data: [] as AIInsight[] }) }),
    radar: useQuery({ queryKey: ['radarData'], queryFn: () => ({ data: [] as RadarMetric[] }) }),
    knowledgeScore: useQuery({ queryKey: ['knowledgeScore'], queryFn: () => ({ data: [] as KnowledgeScoreBreakdown[] }) }),
    learningHeatmap: useQuery({ queryKey: ['learningHeatmap'], queryFn: () => ({ data: [] }) }),
    heatmap: useQuery({ queryKey: ['heatmap'], queryFn: () => ({ data: [] }) }),
    journal: useQuery({ queryKey: ['journal'], queryFn: () => journalApi.getAll({ limit: 1000 }) }),
    tasks: useQuery({ queryKey: ['tasks'], queryFn: () => tasksApi.getAll({ limit: 1000 }) }),
    habits: useQuery({ queryKey: ['habits'], queryFn: () => habitsApi.getAll({ limit: 1000 }) }),
    goals: useQuery({ queryKey: ['goals'], queryFn: () => goalsApi.getAll({ limit: 1000 }) }),
  };

  const isLoading = Object.values(queries).some(q => q.isLoading);

  const activity: AnalyticsDataPoint[] = queries.activity.data?.data ?? [];
  const reading: AnalyticsDataPoint[] = queries.reading.data?.data ?? [];
  const knowledge: AnalyticsDataPoint[] = queries.knowledge.data?.data ?? [];
  const focus: AnalyticsDataPoint[] = queries.focus.data?.data ?? [];
  const categories: AnalyticsCategory[] = queries.categories.data?.data ?? [];
  const insights: AIInsight[] = queries.insights.data?.data ?? [];
  const weeklyReports: WeeklyReport[] = queries.weekly.data?.data ?? [];
  const monthlyReports: MonthlyReport[] = queries.monthly.data?.data ?? [];
  const radarData: RadarMetric[] = queries.radar.data?.data ?? [];
  const knowledgeScore: KnowledgeScoreBreakdown[] = queries.knowledgeScore.data?.data ?? [];
  const learningHeatmap = queries.learningHeatmap.data?.data ?? [];
  const heatmapData = queries.heatmap.data?.data ?? [];
  const journalEntries = queries.journal.data?.data ?? [];
  const tasks: Array<{ isCompleted: boolean; streak?: number }> = (queries.tasks.data?.data ?? []).map((t: Record<string, unknown>) => ({
    ...t,
    isCompleted: (t.status as string) === 'DONE',
  })) as Array<{ isCompleted: boolean; streak?: number }>;
  const habits: Array<{ streak: number }> = (queries.habits.data?.data ?? []).map((h: Record<string, unknown>) => ({
    ...h,
    streak: (h.currentStreak as number) || 0,
  })) as Array<{ streak: number }>;
  const goals = queries.goals.data?.data ?? [];

  const totalActions = activity.reduce((sum, d) => sum + d.value, 0);
  const totalReadingHours = Math.round((reading.reduce((sum, d) => sum + d.value, 0) / 60) * 10) / 10;
  const totalFocusHours = focus.reduce((sum, d) => sum + d.value, 0);
  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100)
    : 0;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const avgHabitCompletion = habits.length > 0
    ? Math.round(habits.reduce((s, h) => s + h.streak, 0) / habits.length)
    : 0;
  const knowledgeScoreAvg = knowledgeScore.length > 0
    ? Math.round(knowledgeScore.reduce((s, k) => s + (k.score / k.maxScore) * 100, 0) / knowledgeScore.length)
    : 0;

  const categoryChart = categories.map(c => ({
    name: c.name,
    value: c.value,
    color: c.color.replace('bg-', '#').replace('indigo-500', '6366f1').replace('emerald-500', '10b981').replace('amber-500', 'f59e0b').replace('blue-500', '3b82f6').replace('violet-500', '8b5cf6'),
  }));

  const stackedData = useMemo(() => [
    { date: 'Mon', reading: 2, journal: 1, tasks: 4, focus: 3 },
    { date: 'Tue', reading: 3, journal: 2, tasks: 5, focus: 4 },
    { date: 'Wed', reading: 1, journal: 0, tasks: 3, focus: 2 },
    { date: 'Thu', reading: 4, journal: 2, tasks: 6, focus: 5 },
    { date: 'Fri', reading: 2, journal: 1, tasks: 4, focus: 3 },
    { date: 'Sat', reading: 3, journal: 2, tasks: 2, focus: 4 },
    { date: 'Sun', reading: 5, journal: 2, tasks: 1, focus: 6 },
  ], []);

  const overviewCards = [
    { label: 'Knowledge Score', value: `${knowledgeScoreAvg}%`, icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', sparkData: knowledgeScore.map(k => ({ value: Math.round((k.score / k.maxScore) * 100) })) },
    { label: 'Journal Entries', value: totalActions, icon: BookMarked, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', sparkData: activity.map(a => ({ value: a.value })) },
    { label: 'Reading Hours', value: `${totalReadingHours}h`, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', sparkData: reading.map(r => ({ value: Math.round(r.value / 10) })) },
    { label: 'Focus Hours', value: `${totalFocusHours}h`, icon: Timer, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', sparkData: focus.map(f => ({ value: f.value })) },
    { label: 'Tasks Done', value: completedTasks, icon: CheckSquare, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', sparkData: stackedData.map(d => ({ value: d.tasks })) },
    { label: 'Consistency', value: `${avgHabitCompletion} days`, icon: Flame, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', sparkData: habits.map(h => ({ value: h.streak })) },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div><Skeleton className="h-4 w-32 mb-2" /><Skeleton className="h-8 w-48" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <Skeleton className="h-8 w-8 rounded-lg" /><Skeleton className="h-3 w-20" /><Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <Skeleton className="h-4 w-32 mb-4" /><Skeleton className="h-48 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Insights & Metrics
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Analytics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your growth, productivity, and knowledge ecosystem
          </p>
        </div>
      </motion.div>

      {/* Search + Time Range */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="Search insights..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
          {(['weekly', 'monthly', 'yearly'] as const).map((t) => (
            <button key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === t
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Cards with Sparklines */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {overviewCards.map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-1">
              <div className={`p-2 rounded-xl ${card.bg} ${card.color} ring-1 ring-slate-200/50 dark:ring-slate-700/50`}>
                <card.icon size={15} strokeWidth={2} />
              </div>
              <Sparkline data={card.sparkData} color={card.color === 'text-indigo-500' ? '#6366f1' : card.color === 'text-emerald-500' ? '#10b981' : card.color === 'text-blue-500' ? '#3b82f6' : card.color === 'text-amber-500' ? '#f59e0b' : card.color === 'text-violet-500' ? '#8b5cf6' : '#f43f5e'} height={32} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2">{card.label}</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Activity</h3>
                <p className="text-[10px] text-slate-400">Actions per day</p>
              </div>
              <Badge variant="info">7 days</Badge>
            </div>
            {activity.length > 0 ? (
              <AreaChart data={activity} height={180} accentColor="#6366f1" />
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Reading Trend */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Reading Trend</h3>
                <p className="text-[10px] text-slate-400">Pages per week</p>
              </div>
              <Badge variant="info">6 weeks</Badge>
            </div>
            {reading.length > 0 ? (
              <BarChart data={reading} height={180} accentColor="#10b981" />
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Activity Breakdown (Stacked) */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Activity Breakdown</h3>
                <p className="text-[10px] text-slate-400">Daily distribution</p>
              </div>
              <BarChart3 size={14} className="text-slate-400" />
            </div>
            <StackedBarChart
              data={stackedData}
              bars={[
                { key: 'reading', color: '#10b981', name: 'Reading' },
                { key: 'journal', color: '#8b5cf6', name: 'Journal' },
                { key: 'tasks', color: '#3b82f6', name: 'Tasks' },
                { key: 'focus', color: '#f59e0b', name: 'Focus' },
              ]}
              height={180}
            />
          </Card>
        </motion.div>

        {/* Category Distribution (Donut) */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Category Distribution</h3>
                <p className="text-[10px] text-slate-400">Activity breakdown</p>
              </div>
              <PieIcon size={14} className="text-slate-400" />
            </div>
            {categories.length > 0 ? (
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <PieChart data={categoryChart} height={180} outerRadius={70} donut />
                </div>
                <div className="flex-1 space-y-2">
                  {categories.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${c.color}`} />
                      <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">{c.name}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Knowledge Growth */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Knowledge Growth</h3>
                <p className="text-[10px] text-slate-400">Cumulative knowledge units</p>
              </div>
              <Badge variant="info">6 months</Badge>
            </div>
            {knowledge.length > 0 ? (
              <AreaChart data={knowledge} height={180} accentColor="#3b82f6" gradientId="knowledgeGrad" />
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Focus Hours */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Focus Hours</h3>
                <p className="text-[10px] text-slate-400">Deep work per week</p>
              </div>
              <Badge variant="info">6 weeks</Badge>
            </div>
            {focus.length > 0 ? (
              <BarChart data={focus} height={180} accentColor="#f59e0b" />
            ) : (
              <div className="h-[180px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Radar - Balanced Scorecard */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Balanced Score</h3>
                <p className="text-[10px] text-slate-400">Skills radar</p>
              </div>
              <RadarIcon size={14} className="text-slate-400" />
            </div>
            {radarData.length > 0 ? (
              <RadarChart data={radarData} height={240} accentColor="#6366f1" />
            ) : (
              <div className="h-[240px] flex items-center justify-center text-sm text-slate-400">No data</div>
            )}
          </Card>
        </motion.div>

        {/* Knowledge Score Breakdown */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Knowledge Score</h3>
                <p className="text-[10px] text-slate-400">Area breakdown</p>
              </div>
              <Zap size={14} className="text-amber-500" />
            </div>
            <div className="space-y-3">
              {knowledgeScore.map((k) => (
                <div key={k.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{k.label}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{Math.round((k.score / k.maxScore) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${(k.score / k.maxScore) * 100}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Learning Heatmap */}
      <motion.div variants={itemVariants}>
        <Card title="Learning Heatmap" subtitle="Activity over time">
          <Heatmap data={heatmapData} />
        </Card>
      </motion.div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {insights
              .filter(i => !searchQuery || i.message.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((insight, i) => (
                <motion.div key={insight.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      insight.type === 'productivity' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500' :
                      insight.type === 'reading' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
                      insight.type === 'learning' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' :
                      'bg-amber-50 dark:bg-amber-500/10 text-amber-500'
                    }`}>
                      {insight.type === 'productivity' ? <Zap size={16} /> :
                       insight.type === 'reading' ? <BookOpen size={16} /> :
                       insight.type === 'learning' ? <BrainCircuit size={16} /> :
                       <Timer size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{insight.message}</p>
                      {insight.percentage && (
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp size={12} className={insight.trend === 'up' ? 'text-emerald-500' : 'text-red-500'} />
                          <span className={`text-xs font-semibold ${insight.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {insight.trend === 'up' ? '+' : ''}{insight.percentage}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Reports */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Reports</h3>
          <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === 'weekly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'
              }`}>Weekly</button>
            <button onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === 'monthly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'
              }`}>Monthly</button>
          </div>
        </div>
        {(timeRange === 'weekly' ? weeklyReports : monthlyReports).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(timeRange === 'weekly' ? weeklyReports : monthlyReports).map((report, i) => (
              <motion.div key={'week' in report ? report.week : report.month}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  {'week' in report ? report.week : report.month}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {'week' in report ? (
                    <>
                      <div><p className="text-[10px] text-slate-400">Journal</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.journalEntries}</p></div>
                      <div><p className="text-[10px] text-slate-400">Reading</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.readingHours}h</p></div>
                      <div><p className="text-[10px] text-slate-400">Tasks</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.tasksCompleted}</p></div>
                      <div><p className="text-[10px] text-slate-400">Focus</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.focusHours}h</p></div>
                    </>
                  ) : (
                    <>
                      <div><p className="text-[10px] text-slate-400">Entries</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.entries}</p></div>
                      <div><p className="text-[10px] text-slate-400">Books</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.booksFinished}</p></div>
                      <div><p className="text-[10px] text-slate-400">Pages</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.pagesRead}</p></div>
                      <div><p className="text-[10px] text-slate-400">Avg Focus</p><p className="text-sm font-bold text-slate-900 dark:text-white">{report.avgFocusHours}h</p></div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : <p className="text-xs text-slate-400 text-center py-8">No reports available</p>}
      </motion.div>
    </motion.div>
  );
};
