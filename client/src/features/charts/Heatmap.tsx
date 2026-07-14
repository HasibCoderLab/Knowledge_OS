import React, { useMemo } from 'react';

interface HeatmapProps {
  data: { date: string; count: number }[];
  days?: number;
}

const colorMap = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-indigo-200 dark:bg-indigo-900',
  'bg-indigo-400 dark:bg-indigo-700',
  'bg-indigo-500 dark:bg-indigo-600',
  'bg-indigo-600 dark:bg-indigo-500',
  'bg-indigo-700 dark:bg-indigo-400',
];

const Heatmap: React.FC<HeatmapProps> = ({ data, days = 84 }) => {
  const weeks = useMemo(() => {
    const result: { date: string; count: number }[][] = [];
    const sliced = data.slice(-days);
    for (let i = 0; i < sliced.length; i += 7) {
      result.push(sliced.slice(i, i + 7));
    }
    return result;
  }, [data, days]);

  return (
    <div className="flex gap-[3px] overflow-x-auto pb-2">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => {
            const level = Math.min(Math.floor(day.count / 2), colorMap.length - 1);
            return (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-[3px] ${colorMap[level]} transition-colors duration-200`}
                title={`${day.date}: ${day.count} activities`}
              />
            );
          })}
          {/* pad incomplete weeks */}
          {Array.from({ length: 7 - week.length }).map((_, pi) => (
            <div key={`pad-${pi}`} className="w-3 h-3" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
