import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Circle, Edit3, Trash2, MoreHorizontal, Zap } from 'lucide-react';
import Dropdown from '../../../components/ui/Dropdown';
import type { Habit } from '../../../types';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onToggle: (habit: Habit) => void;
  index?: number;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit, onDelete, onToggle, index = 0 }) => {
  const weekLogs = habit.logs.slice(-7);
  const completionRate = weekLogs.length > 0
    ? Math.round((weekLogs.filter((l) => l.completed).length / weekLogs.length) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-shadow"
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(habit)}
          className={`shrink-0 mt-0.5 transition-all ${
            habit.completedToday
              ? 'text-emerald-500'
              : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'
          }`}
          aria-label={habit.completedToday ? 'Mark incomplete' : 'Mark complete'}
        >
          {habit.completedToday ? (
            <CheckCircle2 size={24} className="fill-emerald-500 text-white" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`text-sm font-semibold leading-snug ${
                habit.completedToday
                  ? 'text-slate-500 dark:text-slate-400 line-through'
                  : 'text-slate-900 dark:text-slate-100'
              }`}>
                {habit.name}
              </h3>
              {habit.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {habit.description}
                </p>
              )}
            </div>
            <Dropdown
              trigger={<MoreHorizontal size={15} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0" />}
              align="right"
              items={[
                { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(habit) },
                { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete(habit), variant: 'danger' },
              ]}
            />
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-sm font-bold tabular-nums">
              <Flame size={16} className={habit.streak > 0 ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600'} />
              <span className={habit.streak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}>
                {habit.streak}
              </span>
            </div>

            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {habit.frequency}
            </span>

            <span className={`text-[10px] font-medium ${completionRate >= 70 ? 'text-emerald-500' : 'text-slate-400'}`}>
              {completionRate}% 7d
            </span>
          </div>

          <div className="flex items-center gap-1 mt-2.5">
            {weekLogs.map((log, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center ${
                  log.completed
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                }`}
                title={log.date}
              >
                {log.completed ? '✓' : '·'}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 7 - weekLogs.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-5 h-5 rounded bg-slate-50 dark:bg-slate-800/50 text-[8px] flex items-center justify-center text-slate-200 dark:text-slate-700"
              >
                ·
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
