import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  value, max = 100, size = 80, strokeWidth = 6,
  color = '#6366f1', bgColor = '#e2e8f0', label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums" style={{ marginTop: -size }}>
        {Math.round(percentage)}%
      </span>
      {label && <span className="text-[10px] font-medium text-slate-400">{label}</span>}
    </div>
  );
};

export default ProgressRing;
