import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Edit3, Trash2, MoreHorizontal, AlertCircle } from 'lucide-react';
import Dropdown from '../../../components/ui/Dropdown';
import type { Task } from '../../../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggle: (task: Task) => void;
  index?: number;
}

const priorityConfig = {
  high: { label: 'High', bg: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' },
  medium: { label: 'Medium', bg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  low: { label: 'Low', bg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggle, index = 0 }) => {
  const priority = priorityConfig[task.priority];
  const isOverdue = task.dueDate && !task.isCompleted && new Date(task.dueDate) < new Date();
  const isDueToday = task.dueDate && !task.isCompleted && new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group bg-white dark:bg-slate-900 border rounded-xl transition-all hover:shadow-sm ${
        task.isCompleted
          ? 'border-slate-200 dark:border-slate-800 opacity-70'
          : isOverdue
            ? 'border-red-200 dark:border-red-900'
            : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => onToggle(task)}
          className={`shrink-0 mt-0.5 transition-all ${
            task.isCompleted
              ? 'text-emerald-500'
              : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'
          }`}
          aria-label={task.isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.isCompleted ? (
            <CheckCircle2 size={20} className="fill-emerald-500 text-white" />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-sm font-semibold leading-snug ${
                  task.isCompleted
                    ? 'text-slate-400 dark:text-slate-500 line-through'
                    : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {task.title}
                </h3>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${priority.bg}`}>
                  {priority.label}
                </span>
                {task.category && (
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {task.category}
                  </span>
                )}
              </div>
              {task.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg ${
                  isOverdue
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                    : isDueToday
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-slate-400'
                }`}>
                  <Calendar size={10} />
                  {isOverdue ? 'Overdue' : isDueToday ? 'Today' : task.dueDate}
                </div>
              )}
              <Dropdown
                trigger={<MoreHorizontal size={15} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />}
                align="right"
                items={[
                  { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(task) },
                  { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete(task), variant: 'danger' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
