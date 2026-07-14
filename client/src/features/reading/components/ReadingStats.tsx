import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Target, TrendingUp } from 'lucide-react';

interface ReadingStatsProps {
  totalBooks: number;
  completedBooks: number;
  readingStreak: number;
  pagesToday: number;
}

const ReadingStats: React.FC<ReadingStatsProps> = ({
  totalBooks,
  completedBooks,
  readingStreak,
  pagesToday,
}) => {
  const stats = [
    {
      label: 'Total Books',
      value: totalBooks,
      icon: BookOpen,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
      ring: 'ring-indigo-500/10',
    },
    {
      label: 'Completed',
      value: completedBooks,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
      ring: 'ring-emerald-500/10',
    },
    {
      label: 'Day Streak',
      value: readingStreak,
      icon: Flame,
      color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10',
      ring: 'ring-orange-500/10',
    },
    {
      label: 'Pages Today',
      value: pagesToday,
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10',
      ring: 'ring-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4"
        >
          <div className={`p-2.5 rounded-xl ring-1 ${stat.color} ${stat.ring}`}>
            <stat.icon size={17} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReadingStats;
