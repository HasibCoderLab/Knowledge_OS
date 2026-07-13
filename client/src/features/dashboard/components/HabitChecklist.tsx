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
      <div className="space-y-3">
        {habits.map((habit) => (
          <div 
            key={habit.id} 
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {habit.completedToday ? (
                <CheckCircle2 className="text-green-500" size={20} />
              ) : (
                <Circle className="text-gray-300 group-hover:text-indigo-400 transition-colors" size={20} />
              )}
              <span className={`text-sm ${habit.completedToday ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                {habit.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              <Flame size={12} className="text-orange-500" /> {habit.streak}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HabitChecklist;
