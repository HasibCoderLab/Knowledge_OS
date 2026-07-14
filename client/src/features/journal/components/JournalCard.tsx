import React from 'react';
import { motion } from 'framer-motion';
import { Pin, Clock, Smile, Meh, Frown, Angry, Heart } from 'lucide-react';
import type { JournalEntry } from '../../../types';

interface JournalCardProps {
  entry: JournalEntry;
  index?: number;
  onClick?: () => void;
}

const moodConfig = {
  great: { icon: Heart, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'Great' },
  good: { icon: Smile, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'Good' },
  neutral: { icon: Meh, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Neutral' },
  bad: { icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', label: 'Bad' },
  terrible: { icon: Angry, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Terrible' },
};

const JournalCard: React.FC<JournalCardProps> = ({ entry, index = 0, onClick }) => {
  const mood = moodConfig[entry.mood];
  const MoodIcon = mood.icon;
  const preview = entry.content.slice(0, 120) + (entry.content.length > 120 ? '...' : '');
  const readTime = Math.max(1, Math.ceil(entry.content.split(' ').length / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`p-2 rounded-xl ${mood.bg} ${mood.color} shrink-0`}>
          <MoodIcon size={16} strokeWidth={2} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {entry.tags.includes('pinned') && (
            <Pin size={13} className="text-indigo-500 fill-indigo-500" />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {entry.title}
      </h3>

      {/* Preview */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
        {preview}
      </p>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-medium text-slate-500 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <Clock size={11} />
          <span>{readTime} min read</span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">{entry.date}</span>
      </div>
    </motion.div>
  );
};

export default JournalCard;
