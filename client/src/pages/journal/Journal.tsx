import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookMarked, Plus, PenLine, Flame, CalendarDays, Quote, BookHeart } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import JournalCard from '../../features/journal/components/JournalCard';
import JournalFilters from '../../features/journal/components/JournalFilters';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'pinned', label: 'Pinned' },
  { value: 'personal', label: 'Personal' },
  { value: 'learning', label: 'Learning' },
  { value: 'ideas', label: 'Ideas' },
];

const dailyQuotes = [
  { text: '"The only way to do great work is to love what you do."', author: 'Steve Jobs' },
  { text: '"In the middle of difficulty lies opportunity."', author: 'Albert Einstein' },
  { text: '"The best time to plant a tree was 20 years ago. The second best time is now."', author: 'Chinese Proverb' },
  { text: '"You are what you repeatedly do. Excellence, then, is not an act, but a habit."', author: 'Aristotle' },
  { text: '"The unexamined life is not worth living."', author: 'Socrates' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const today = new Date();
const todayStr = today.toISOString().split('T')[0]!;
const quoteIndex = today.getDate() % dailyQuotes.length;
const dailyQuote = dailyQuotes[quoteIndex]!;

export const Journal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['journal'],
    queryFn: mockApi.getJournalEntries,
  });

  const entries = data?.data ?? [];

  const stats = useMemo(() => {
    const total = entries.length;
    const consecutiveDays = entries
      .map(e => e.date)
      .sort()
      .reverse()
      .reduce((streak, date, i, arr) => {
        if (i === 0) return 1;
        const prev = new Date(arr[i - 1]!);
        const curr = new Date(date);
        const diffDays = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays <= 1.5) return streak + 1;
        return streak;
      }, 0);
    const thisMonth = entries.filter(e => e.date.startsWith(todayStr.slice(0, 7))).length;
    const categories = [...new Set(entries.flatMap(e => e.tags))];
    return { total, streak: consecutiveDays, thisMonth, categories: categories.length };
  }, [entries]);

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (activeFilter === 'pinned') {
      result = result.filter(e => e.tags.includes('pinned') || e.tags.includes('reflection'));
    } else if (activeFilter === 'personal') {
      result = result.filter(e => e.tags.some(t => ['gratitude', 'mindfulness', 'reflection', 'struggles'].includes(t)));
    } else if (activeFilter === 'learning') {
      result = result.filter(e => e.tags.some(t => ['learning', 'reading', 'coding', 'typescript', 'rust', 'programming'].includes(t)));
    } else if (activeFilter === 'ideas') {
      result = result.filter(e => e.tags.some(t => ['planning', 'design', 'project', 'ideas'].includes(t)));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        e => e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q) || e.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [entries, activeFilter, searchQuery]);

  const filterOptionsWithCounts = useMemo(() => {
    return filterOptions.map(opt => ({
      ...opt,
      count: opt.value === 'all' ? entries.length
        : opt.value === 'pinned' ? entries.filter(e => e.tags.includes('reflection')).length
        : opt.value === 'personal' ? entries.filter(e => e.tags.some(t => ['gratitude', 'mindfulness', 'reflection', 'struggles'].includes(t))).length
        : opt.value === 'learning' ? entries.filter(e => e.tags.some(t => ['learning', 'reading', 'coding', 'typescript', 'rust', 'programming'].includes(t))).length
        : opt.value === 'ideas' ? entries.filter(e => e.tags.some(t => ['planning', 'design', 'project', 'ideas'].includes(t))).length
        : 0,
    }));
  }, [entries]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-11 w-full max-w-md rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-16 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex gap-1 pt-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
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
            Personal Journal
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Journal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            {entries.length} entries · {stats.thisMonth} this month
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0">
          <Plus size={16} /> New Entry
        </Button>
      </motion.header>

      {/* Daily Quote */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.05 } },
        }}
        className="bg-gradient-to-br from-indigo-600/5 to-indigo-600/10 dark:from-indigo-500/5 dark:to-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/30 rounded-2xl p-5 md:p-6"
      >
        <div className="flex items-start gap-4">
          <Quote size={24} className="text-indigo-400 dark:text-indigo-500 shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">{dailyQuote.text}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">— {dailyQuote.author}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
            <BookMarked size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Entries</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
            <Flame size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Writing Streak</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stats.streak} days</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <PenLine size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">This Month</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stats.thisMonth}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400">
            <BookHeart size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Categories</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stats.categories}</p>
          </div>
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' as const } },
        }}
      >
        <JournalFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={filterOptionsWithCounts}
        />
      </motion.div>

      {/* Entries Grid */}
      {filteredEntries.length === 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {searchQuery || activeFilter !== 'all' ? (
            <EmptyState icon={BookMarked} title="No entries found" description="Try a different search or filter" />
          ) : (
            <EmptyState
              icon={BookMarked}
              title="No entries yet"
              description="Write your first journal entry to start reflecting"
              actionLabel="New Entry"
              onAction={() => {}}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredEntries.map((entry, index) => (
            <JournalCard key={entry.id} entry={entry} index={index} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
