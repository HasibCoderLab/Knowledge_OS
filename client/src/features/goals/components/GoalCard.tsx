import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Edit3, Trash2, MoreHorizontal, AlertCircle, Flag, CheckCircle } from 'lucide-react';
import Dropdown from '../../../components/ui/Dropdown';
import type { Goal } from '../../../types';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  index?: number;
}

const priorityConfig = {
  high: { label: 'High', dot: 'bg-red-500', bg: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' },
  medium: { label: 'Medium', dot: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
  low: { label: 'Low', dot: 'bg-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' },
};

const statusConfig = {
  active: { label: 'Active', icon: AlertCircle, color: 'text-blue-500' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-emerald-500' },
  failed: { label: 'Failed', icon: Flag, color: 'text-red-500' },
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete, index = 0 }) => {
  const priority = priorityConfig[goal.priority];
  const status = statusConfig[goal.status];
  const StatusIcon = status.icon;

  const daysUntilDeadline = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-shadow h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${priority.dot}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${goal.status === 'completed' ? 'text-emerald-500' : goal.status === 'failed' ? 'text-red-500' : 'text-slate-400'}`}>
            {goal.type.replace('-', ' ')}
          </span>
        </div>
        <Dropdown
          trigger={<MoreHorizontal size={15} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0" />}
          align="right"
          items={[
            { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(goal) },
            { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete(goal), variant: 'danger' },
          ]}
        />
      </div>

      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-1.5 flex-1">
        {goal.title}
      </h3>

      {goal.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {goal.description}
        </p>
      )}

      <div className="mt-auto space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
            <span className={`font-semibold tabular-nums ${goal.progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
              {goal.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goal.progress}%` }}
              transition={{ duration: 1, delay: 0.15, ease: 'easeOut' as const }}
              className={`h-full rounded-full ${goal.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <StatusIcon size={12} className={status.color} />
            <span className={`text-[10px] font-semibold ${status.color}`}>{status.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Calendar size={10} />
            {daysUntilDeadline > 0 ? `${daysUntilDeadline}d left` : daysUntilDeadline === 0 ? 'Due today' : 'Overdue'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalCard;
