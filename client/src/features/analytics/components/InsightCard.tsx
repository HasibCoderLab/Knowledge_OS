import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'productivity' | 'reading' | 'learning' | 'focus';
  message: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
}

interface InsightCardProps {
  insight: AIInsight;
  index?: number;
}

const typeConfig = {
  productivity: { icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  reading: { icon: Lightbulb, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  learning: { icon: BrainCircuit, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  focus: { icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
};

const InsightCard: React.FC<InsightCardProps> = ({ insight, index = 0 }) => {
  const config = typeConfig[insight.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-md dark:hover:shadow-slate-900/60 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl ${config.color} ${config.bg} shrink-0`}>
          <Icon size={16} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 capitalize">{insight.type}</span>
            {insight.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
            {insight.trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
            {insight.trend === 'neutral' && <Minus size={12} className="text-slate-400" />}
            {insight.percentage && (
              <span className={`text-[10px] font-bold ${insight.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {insight.trend === 'up' ? '+' : ''}{insight.percentage}%
              </span>
            )}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {insight.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightCard;
