import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, type Variants } from 'framer-motion';
import {
  BookOpen, Flame, Target, BookMarked, Search, Lightbulb, BrainCircuit,
  Clock, CheckSquare, Zap, Sparkles, Star, Award, TrendingUp, CalendarDays,
} from 'lucide-react';
import { readingApi, tasksApi, journalApi } from '../../services/api/index';
import { calendarData, USER_CREATION_DATE } from '../../features/calendar/calendarData';
import type {
  TimelineEntry, TimelineMilestone, DailySummaryData,
  AchievementMilestone, TimelineInsight, ProductivityScoreData,
  CalendarSuggestion,
} from '../../features/calendar/calendarData';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import ProgressRing from '../../features/charts/ProgressRing';

const c: Variants = {
  h: { opacity: 0 }, v: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const i: Variants = {
  h: { opacity: 0, y: 12 }, v: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

type TR = 'today' | 'yesterday' | 'week' | 'month' | 'year';

const now = new Date();
const todayStr = now.toISOString().split('T')[0]!;
const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0]!;

const typeIcon: Record<string, string> = {
  study: '🧠', reading: '📖', journal: '📝', meeting: '🤝', goal: '🎯',
  habit: '🔄', task: '✅', reminder: '🔔', milestone: '🎉', achievement: '🏆',
  'ai-session': '🤖',
};
const typeColor: Record<string, string> = {
  study: 'bg-blue-500', reading: 'bg-emerald-500', journal: 'bg-violet-500',
  meeting: 'bg-orange-500', goal: 'bg-rose-500', habit: 'bg-amber-500',
  task: 'bg-indigo-500', reminder: 'bg-sky-500', milestone: 'bg-purple-500',
  achievement: 'bg-yellow-500', 'ai-session': 'bg-cyan-500',
};
const badgeStyle: Record<string, string> = {
  today: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
  tomorrow: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  missed: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  important: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  new: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  upcoming: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
};

function TimelineDot({ type, isFirst, isLast }: { type: string; isFirst?: boolean; isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className={`w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-900 ${typeColor[type] || 'bg-slate-400'} ${isFirst ? 'ring-4 ring-indigo-200 dark:ring-indigo-800' : ''}`} />
      {!isLast && <div className="w-0.5 flex-1 min-h-[24px] bg-slate-200 dark:bg-slate-700" />}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
}

function daysSinceCreation(): number {
  const created = new Date(USER_CREATION_DATE + 'T12:00:00');
  return Math.floor((now.getTime() - created.getTime()) / 86400000);
}

function getWeekStart(d: Date): string {
  const s = new Date(d); s.setDate(s.getDate() - s.getDay());
  return s.toISOString().split('T')[0]!;
}
function getMonthStart(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

function buildSmartSuggestions(
  entries: TimelineEntry[], summaries: DailySummaryData[],
  suggestions: CalendarSuggestion[], todayStr: string,
): { icon: string; text: string; type: string }[] {
  const result: { icon: string; text: string; type: string }[] = [];
  const todaySummary = summaries.find(s => s.date === todayStr);
  const todayEntries = entries.filter(e => e.date === todayStr);
  const hasJournal = todayEntries.some(e => e.type === 'journal');
  const hasReading = todayEntries.some(e => e.type === 'reading');
  const hasTask = todayEntries.some(e => e.type === 'task');

  if (!hasJournal) result.push({ icon: '✍️', text: 'Write Today\'s Reflection', type: 'journal' });
  if (!hasReading) result.push({ icon: '📖', text: 'Read for 20 minutes', type: 'reading' });
  if (!hasTask) result.push({ icon: '📋', text: 'Plan Your Day', type: 'task' });
  if (now.getDay() === 0) result.push({ icon: '🏆', text: 'Complete Your Weekly Review', type: 'review' });
  if (now.getDate() === 1) result.push({ icon: '📊', text: 'Start Monthly Review', type: 'review' });

  suggestions.slice(0, 2).forEach(s => {
    if (!result.some(r => r.text === s.message)) {
      result.push({ icon: s.type === 'reading' ? '📖' : s.type === 'focus' ? '🎯' : '💡', text: s.message, type: s.type });
    }
  });

  return result;
}

function buildDailySummaryData(
  date: string, summaries: DailySummaryData[], entries: TimelineEntry[],
): DailySummaryData | null {
  const fromMock = summaries.find(s => s.date === date);
  const dayEntries = entries.filter(e => e.date === date);
  if (fromMock) return fromMock;
  if (dayEntries.length === 0) return null;
  return {
    date, tasksCompleted: 0, tasksTotal: 0, pagesRead: 0, readingMinutes: 0,
    journalEntries: dayEntries.filter(e => e.type === 'journal').length,
    goalsCompleted: 0, habitsCompleted: 0, habitsTotal: 0,
    mood: 'neutral', focusMinutes: 0,
  };
}

const moodEmoji: Record<string, string> = { great: '😄', good: '🙂', neutral: '😐', bad: '😔', terrible: '😢' };

export const CalendarPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TR>('today');
  const [searchQuery, setSearchQuery] = useState('');

  const q = {
    entries: useQuery({ queryKey: ['timelineEntries'], queryFn: calendarData.getTimelineEntries }),
    firstEvents: useQuery({ queryKey: ['firstEvents'], queryFn: calendarData.getFirstEventMilestones }),
    achievements: useQuery({ queryKey: ['achievements'], queryFn: calendarData.getAchievementMilestones }),
    summaries: useQuery({ queryKey: ['dailySummaries'], queryFn: calendarData.getDailySummaries }),
    weekly: useQuery({ queryKey: ['weeklyReviews'], queryFn: calendarData.getWeeklyReviews }),
    monthly: useQuery({ queryKey: ['monthlyReviews'], queryFn: calendarData.getMonthlyReviews }),
    yearly: useQuery({ queryKey: ['yearlyReview'], queryFn: calendarData.getYearlyReview }),
    score: useQuery({ queryKey: ['productivityScore'], queryFn: calendarData.getProductivityScore }),
    insights: useQuery({ queryKey: ['timelineInsights'], queryFn: calendarData.getTimelineInsights }),
    suggestions: useQuery({ queryKey: ['calendarSuggestions'], queryFn: calendarData.getCalendarSuggestions }),
    heatmap: useQuery({ queryKey: ['heatmap'], queryFn: calendarData.getHeatmapData }),
    moods: useQuery({ queryKey: ['calendarMoods'], queryFn: calendarData.getCalendarMoods }),
    reading: useQuery({ queryKey: ['readingSessions'], queryFn: () => readingApi.getAll({ limit: 1000 }) }),
    tasks: useQuery({ queryKey: ['tasks'], queryFn: () => tasksApi.getAll({ limit: 1000 }) }),
    journal: useQuery({ queryKey: ['journal'], queryFn: () => journalApi.getAll({ limit: 1000 }) }),
  };

  const loading = Object.values(q).some(x => x.isLoading);

  const entries = q.entries.data?.data ?? [];
  const firstMilestones = q.firstEvents.data?.data ?? [];
  const achievements = q.achievements.data?.data ?? [];
  const summaries = q.summaries.data?.data ?? [];
  const weeklyReviews = q.weekly.data?.data ?? [];
  const monthlyReviews = q.monthly.data?.data ?? [];
  const yearlyData = q.yearly.data?.data;
  const score = q.score.data?.data;
  const insights = q.insights.data?.data ?? [];
  const suggestions = q.suggestions.data?.data ?? [];
  const heatmap = q.heatmap.data?.data ?? [];
  const moods = q.moods.data?.data ?? [];
  const tasks = (q.tasks.data?.data ?? []) as Array<{ isCompleted: boolean }>;

  const todayMood = moods.find(m => m.date === todayStr);

  const allEntries = useMemo<TimelineEntry[]>(() => {
    const milestoneEntries: TimelineEntry[] = firstMilestones.map(m => ({
      id: m.id, date: m.date, type: 'milestone', title: m.label,
      description: m.description, isCompleted: true,
    }));
    const combined = [...milestoneEntries, ...entries];
    combined.sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));
    return combined;
  }, [firstMilestones, entries]);

  const filteredEntries = useMemo(() => {
    let items = allEntries;
    if (searchQuery) {
      const qq = searchQuery.toLowerCase();
      items = items.filter(e => e.title.toLowerCase().includes(qq) || (e.description || '').toLowerCase().includes(qq));
    }
    if (timeRange === 'today') items = items.filter(e => e.date === todayStr);
    else if (timeRange === 'yesterday') items = items.filter(e => e.date === yesterdayStr);
    else if (timeRange === 'week') {
      const ws = getWeekStart(now);
      const d = new Date(now); d.setDate(d.getDate() - 7);
      const cut = d.toISOString().split('T')[0]!;
      items = items.filter(e => e.date >= cut && e.date <= todayStr);
    } else if (timeRange === 'month') {
      const d = new Date(now); d.setDate(d.getDate() - 30);
      const cut = d.toISOString().split('T')[0]!;
      items = items.filter(e => e.date >= cut && e.date <= todayStr);
    } else if (timeRange === 'year') {
      const y = now.getFullYear();
      items = items.filter(e => e.date.startsWith(`${y}-`));
    }
    return items;
  }, [allEntries, searchQuery, timeRange]);

  const dailySummary = useMemo(() =>
    buildDailySummaryData(timeRange === 'today' ? todayStr : timeRange === 'yesterday' ? yesterdayStr : '', summaries, entries),
  [timeRange, summaries, entries]);

  const smartSuggestions = useMemo(() =>
    buildSmartSuggestions(entries, summaries, suggestions, todayStr),
  [entries, summaries, suggestions]);

  const weekReview = useMemo(() => {
    const ws = getWeekStart(now);
    return weeklyReviews.find(r => r.weekStart === ws) || weeklyReviews[weeklyReviews.length - 1];
  }, [weeklyReviews]);

  const monthReview = useMemo(() => {
    const ms = getMonthStart(now);
    return monthlyReviews.find(r => r.month === ms) || monthlyReviews[monthlyReviews.length - 1];
  }, [monthlyReviews]);

  const topEntries = useMemo(() => {
    const today = allEntries.filter(e => e.date === todayStr);
    if (today.length > 0) return today;
    const recent = allEntries.filter(e => e.date >= yesterdayStr);
    return recent.length > 0 ? recent : allEntries.slice(-3);
  }, [allEntries]);

  const daysSince = useMemo(daysSinceCreation, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-5 w-40 mb-1" /><Skeleton className="h-9 w-56" />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="flex gap-4 mb-6"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-20" /></div>
          <div className="space-y-4">
            {[1,2,3,4,5].map(n => <div key={n} className="flex gap-3"><Skeleton className="h-3 w-3 rounded-full shrink-0" /><div className="flex-1"><Skeleton className="h-4 w-full mb-1" /><Skeleton className="h-3 w-2/3" /></div></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="h" animate="v" variants={c} className="space-y-6">
      {/* ─── Hero: Day Zero ─── */}
      <motion.div variants={i} className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-2xl p-5 md:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎉</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-200">Day Zero</span>
            </div>
            <p className="text-xl md:text-2xl font-bold tracking-tight">Joined KnowledgeOS</p>
            <p className="text-sm text-indigo-200 mt-0.5">
              {new Date(USER_CREATION_DATE + 'T12:00:00').toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="ml-2 text-indigo-300">· {daysSince} days ago</span>
            </p>
          </div>
          <div className="flex gap-3 md:gap-5">
            <div className="text-center">
              <p className="text-2xl font-bold">{daysSince}</p>
              <p className="text-[10px] text-indigo-200 uppercase tracking-wider">Days Active</p>
            </div>
            <div className="w-px bg-indigo-400/40" />
            <div className="text-center">
              <p className="text-2xl font-bold">{tasks.filter(t => t.isCompleted).length}</p>
              <p className="text-[10px] text-indigo-200 uppercase tracking-wider">Tasks Done</p>
            </div>
            <div className="w-px bg-indigo-400/40" />
            <div className="text-center">
              <p className="text-2xl font-bold">{score?.overall || 0}</p>
              <p className="text-[10px] text-indigo-200 uppercase tracking-wider">Score</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Navigator ─── */}
      <motion.div variants={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit flex-wrap">
          {(['today', 'yesterday', 'week', 'month', 'year'] as TR[]).map(t => (
            <button key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                timeRange === t
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t === 'today' ? 'Today' : t === 'yesterday' ? 'Yesterday' : t === 'week' ? 'Last 7 Days' : t === 'month' ? 'Last 30 Days' : 'This Year'}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-[200px] w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="Search timeline..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─── Main Timeline ─── */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">

          {/* Daily Summary (today/yesterday) */}
          {(timeRange === 'today' || timeRange === 'yesterday') && dailySummary && (
            <motion.div variants={i}>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {timeRange === 'today' ? 'Today' : 'Yesterday'} · {formatDate(timeRange === 'today' ? todayStr : yesterdayStr)}
                    </h3>
                  </div>
                  {timeRange === 'today' && todayMood && (
                    <span className="text-lg">{moodEmoji[todayMood.mood] || '😐'}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tasks</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{dailySummary.tasksCompleted}/{dailySummary.tasksTotal}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reading</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{dailySummary.pagesRead}p</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Journal</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{dailySummary.journalEntries}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Focus</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{Math.round(dailySummary.focusMinutes / 60 * 10) / 10}h</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Weekly Review */}
          {timeRange === 'week' && weekReview && (
            <motion.div variants={i}>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={15} className="text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Review</h3>
                  <Badge variant="info">{weekReview.label}</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Focus</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{weekReview.focusHours}h</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Goals</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{weekReview.goalProgress}%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Habits</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{weekReview.habitProgress}%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Growth</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">+{weekReview.knowledgeGrowth}%</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Reading:</span> {weekReview.readingSummary}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Journal:</span> {weekReview.journalSummary}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Monthly Review */}
          {timeRange === 'month' && monthReview && (
            <motion.div variants={i}>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={15} className="text-indigo-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Monthly Review</h3>
                  <Badge variant="info">{monthReview.label}</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Books</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{monthReview.booksFinished}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tasks</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{monthReview.tasksCompleted}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Journal</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{monthReview.journalCount}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Study</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{monthReview.studyHours}h</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Consistency</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{monthReview.consistency}%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Score</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{monthReview.productivityScore}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Yearly Review */}
          {timeRange === 'year' && yearlyData && (
            <motion.div variants={i}>
              <Card title={`${yearlyData.year} in Review`} subtitle="Achievements & milestones">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {yearlyData.achievements.map((a, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium">
                        <Sparkles size={12} /> {a}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Milestones</p>
                    <div className="space-y-1.5">
                      {yearlyData.milestones.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <span>{m.icon}</span>
                          <span className="flex-1">{m.label}</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{m.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Knowledge Growth</p>
                    <div className="flex items-end gap-1.5 h-20">
                      {yearlyData.growthTimeline.map((g) => {
                        const maxVal = Math.max(...yearlyData.growthTimeline.map(x => x.value));
                        const h = Math.max(4, (g.value / maxVal) * 100);
                        return (
                          <div key={g.month} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-indigo-500/80 dark:bg-indigo-400/80 rounded-t-md transition-all duration-500"
                              style={{ height: `${h}%` }} />
                            <span className="text-[9px] text-slate-400">{g.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ─── Timeline Entries ─── */}
          <motion.div variants={i}>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={15} className="text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {timeRange === 'today' ? 'Today' : timeRange === 'yesterday' ? 'Yesterday' : timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}
                </h3>
                <Badge variant="default">{filteredEntries.length}</Badge>
              </div>

              {filteredEntries.length === 0 ? (
                <div className="text-center py-10">
                  <CalendarDays size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-slate-400 mb-1">You haven't planned your first day yet.</p>
                  <p className="text-xs text-slate-400">Create your first event to get started.</p>
                  <button onClick={() => setTimeRange('today')} className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer">
                    <Sparkles size={14} /> Create First Event
                  </button>
                </div>
              ) : (
                <div className="space-y-0">
                  {filteredEntries.map((entry, idx) => {
                    const isToday = entry.date === todayStr;
                    const isYesterday = !isToday && entry.date === yesterdayStr;
                    const showDateHeader = idx === 0 || entry.date !== filteredEntries[idx - 1]!.date;
                    return (
                      <div key={entry.id}>
                        {showDateHeader && (
                          <div className="flex items-center gap-2 py-2">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isToday ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' :
                              isYesterday ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' :
                              'text-slate-400'
                            }`}>
                              {isToday ? 'Today' : isYesterday ? 'Yesterday' : formatDate(entry.date)}
                            </span>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                          </div>
                        )}
                        <div className="flex gap-3 py-1.5 group hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl px-2 -mx-2 transition-colors">
                          <div className="flex flex-col items-center shrink-0 pt-0.5">
                            <span className="text-sm">{typeIcon[entry.type] || '📌'}</span>
                            {idx < filteredEntries.length - 1 && <div className="w-0.5 flex-1 min-h-[20px] bg-slate-100 dark:bg-slate-800" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-xs font-medium text-slate-900 dark:text-slate-100">{entry.title}</p>
                                {entry.description && <p className="text-[11px] text-slate-400 mt-0.5">{entry.description}</p>}
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {entry.time && <span className="text-[10px] text-slate-400">{entry.time}</span>}
                                {entry.isCompleted && <CheckSquare size={12} className="text-emerald-500" />}
                                {entry.badge && (
                                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badgeStyle[entry.badge] || ''}`}>
                                    {entry.badge === 'today' ? 'Today' : entry.badge === 'tomorrow' ? 'Tomorrow' :
                                     entry.badge === 'missed' ? 'Missed' : entry.badge === 'completed' ? 'Done' :
                                     entry.badge === 'important' ? '!!!' : entry.badge === 'new' ? 'New' : 'Soon'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Heatmap */}
          <motion.div variants={i}>
            <Card title="Activity" subtitle="Last 90 days">
              {heatmap.length > 0 ? (
                <div className="overflow-x-auto">
                  <div className="inline-flex flex-col gap-0.5 min-w-[600px]">
                    {Array.from({ length: 7 }, (_, row) => (
                      <div key={row} className="flex gap-0.5">
                        {Array.from({ length: Math.ceil(heatmap.length / 7) }, (_, col) => {
                          const idx = col * 7 + row;
                          const day = heatmap[idx];
                          if (!day) return <div key={`${row}-${col}`} className="w-3 h-3 rounded-sm" />;
                          const intensity = day.count > 6 ? 'bg-emerald-600 dark:bg-emerald-500' :
                            day.count > 4 ? 'bg-emerald-500 dark:bg-emerald-400' :
                            day.count > 2 ? 'bg-emerald-300 dark:bg-emerald-300/60' :
                            day.count > 0 ? 'bg-emerald-200 dark:bg-emerald-200/30' :
                            'bg-slate-100 dark:bg-slate-800';
                          return (
                            <div key={idx}
                              className={`w-3 h-3 rounded-sm ${intensity}`}
                              title={`${day.date}: ${day.count} activities`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-200/30" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-300/60" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-400" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
                    <span>More</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">No activity data</p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* ─── Right Sidebar ─── */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">

          {/* Productivity Score */}
          {score && (
            <motion.div variants={i}>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Productivity Score</h3>
                  <Zap size={14} className="text-amber-500" />
                </div>
                <div className="flex items-center gap-5">
                  <ProgressRing value={score.overall} max={100} size={80} strokeWidth={5} color="#6366f1" label="overall" />
                  <div className="flex-1 space-y-1.5">
                    {[
                      { label: 'Reading', value: score.reading, color: 'bg-emerald-500' },
                      { label: 'Journal', value: score.journal, color: 'bg-violet-500' },
                      { label: 'Tasks', value: score.tasks, color: 'bg-indigo-500' },
                      { label: 'Goals', value: score.goals, color: 'bg-rose-500' },
                      { label: 'Habits', value: score.habits, color: 'bg-amber-500' },
                      { label: 'Calendar', value: score.calendar, color: 'bg-sky-500' },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex-1">{s.label}</span>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Smart Suggestions */}
          <motion.div variants={i}>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={14} className="text-amber-500" />
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Suggestions</h3>
              </div>
              {smartSuggestions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-3">All caught up! 🎉</p>
              ) : (
                <div className="space-y-2">
                  {smartSuggestions.slice(0, 4).map((s, idx) => (
                    <motion.div key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-base">{s.icon}</span>
                      <span className="text-xs text-slate-700 dark:text-slate-300">{s.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Milestones */}
          <motion.div variants={i}>
            <Card title="Milestones" subtitle="Achievements unlocked">
              {achievements.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No milestones yet</p>
              ) : (
                <div className="space-y-2.5">
                  {achievements.map((ach, idx) => (
                    <motion.div key={ach.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`p-3 rounded-xl border transition-all ${
                        ach.achieved
                          ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-lg ${ach.achieved ? '' : 'opacity-40'}`}>{ach.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-xs font-semibold ${ach.achieved ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                              {ach.title}
                            </p>
                            {ach.achieved && ach.achievedDate && (
                              <Badge variant="success">{formatDate(ach.achievedDate)}</Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{ach.description}</p>
                          <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-700 ${
                              ach.achieved ? 'bg-emerald-500' : 'bg-indigo-500/60'
                            }`} style={{ width: `${ach.progress}%` }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* AI Insights */}
          {insights.length > 0 && (
            <motion.div variants={i}>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit size={14} className="text-indigo-500" />
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">AI Insights</h3>
                </div>
                <div className="space-y-2">
                  {insights.slice(0, 5).map((ins, idx) => (
                    <div key={ins.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                    >
                      <span className="text-sm shrink-0 mt-0.5">{ins.icon}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ins.message}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
