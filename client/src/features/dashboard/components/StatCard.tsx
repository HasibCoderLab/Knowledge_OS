import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import Card from '../../../components/ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'indigo' | 'green' | 'orange' | 'blue';
  index?: number;
}

const colorMap = {
  indigo: {
    icon: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
    ring: 'ring-indigo-500/10',
  },
  green: {
    icon: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
    ring: 'ring-emerald-500/10',
  },
  orange: {
    icon: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10',
    ring: 'ring-orange-500/10',
  },
  blue: {
    icon: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10',
    ring: 'ring-blue-500/10',
  },
};

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'indigo', index = 0 }) => {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-xl ring-1 ${colors.icon} ${colors.ring}`}>
            <Icon size={17} strokeWidth={2} />
          </div>
          {trend && (
            <span className={`text-[10px] md:text-xs font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {trend.isPositive ? '+' : ''} {trend.value}
            </span>
          )}
        </div>
        <div>
          <p className="text-xs md:text-[13px] text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{value}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
