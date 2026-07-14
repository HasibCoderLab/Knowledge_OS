import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckSquare, Flame, Target, BookMarked, Calendar } from 'lucide-react';
import type { CalendarEvent } from '../../../types';

interface EventCardProps {
  event: CalendarEvent;
  compact?: boolean;
  index?: number;
}

const typeConfig = {
  reading: { icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', dot: 'bg-emerald-500' },
  task: { icon: CheckSquare, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', dot: 'bg-blue-500' },
  habit: { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', dot: 'bg-orange-500' },
  goal: { icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', dot: 'bg-indigo-500' },
  journal: { icon: BookMarked, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', dot: 'bg-violet-500' },
  other: { icon: Calendar, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800', dot: 'bg-slate-400' },
};

const EventCard: React.FC<EventCardProps> = ({ event, compact = false, index = 0 }) => {
  const config = typeConfig[event.type] || typeConfig.other;
  const Icon = config.icon;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className="flex items-center gap-2 py-1.5"
      >
        <div className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 w-10 shrink-0">{event.time}</span>
        <Icon size={11} className={`${config.color} shrink-0`} strokeWidth={2} />
        <span className="text-[11px] text-slate-700 dark:text-slate-300 truncate">{event.title}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-md dark:hover:shadow-slate-900/60 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className={`w-1 self-stretch rounded-full ${config.dot} shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{event.time}</span>
            <span className={`text-[9px] font-semibold uppercase tracking-wider ${config.color}`}>{event.type}</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            {event.title}
          </h4>
          {event.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{event.description}</p>
          )}
        </div>
        <div className={`p-1.5 rounded-lg ${config.bg} ${config.color} shrink-0`}>
          <Icon size={14} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
