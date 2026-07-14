import React from 'react';
import Card from '../../../components/ui/Card';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

interface HabitChecklistProps {
  habits: Habit[];
}

const HabitChecklist: React.FC<HabitChecklistProps> = ({ habits }) => {
  return (
    <Card title="Today's Habits" subtitle="Stay consistent with your growth">
      <div className="space-y-2">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {habit.completedToday ? (
                <CheckCircle2 className="text-emerald-500 shrink-0" size={19} strokeWidth={2} />
              ) : (
                <Circle className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 transition-colors shrink-0" size={19} strokeWidth={2} />
              )}
              <span className={`text-[13px] transition-colors ${habit.completedToday ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200 font-medium'}`}>
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1 rounded-full">
              <Flame size={12} className="text-orange-500" /> {habit.streak}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HabitChecklist;
