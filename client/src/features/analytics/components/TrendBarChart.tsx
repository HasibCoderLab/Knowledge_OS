import React from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  date: string;
  value: number;
}

interface TrendBarChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  accentColor?: string;
  className?: string;
}

const TrendBarChart: React.FC<TrendBarChartProps> = ({
  data,
  title,
  height = 160,
  accentColor = 'bg-indigo-500',
  className = '',
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h4>
      )}
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((point, i) => {
          const barHeight = (point.value / maxValue) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                className={`w-full ${accentColor} rounded-t-md opacity-80 hover:opacity-100 transition-opacity relative group`}
                style={{ minHeight: 4 }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {point.value}
                </div>
              </motion.div>
              <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                {point.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DistributionItem {
  name: string;
  value: number;
  color: string;
}

interface DistributionChartProps {
  data: DistributionItem[];
  title?: string;
  className?: string;
}

export const DistributionChart: React.FC<DistributionChartProps> = ({
  data,
  title,
  className = '',
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h4>
      )}
      <div className="space-y-2.5">
        {data.map((item, i) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
                <span className="text-slate-500 dark:text-slate-500 font-semibold tabular-nums">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendBarChart;
