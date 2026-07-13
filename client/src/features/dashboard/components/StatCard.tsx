import React from 'react';
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
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50',
    green: 'text-green-600 bg-green-50',
    orange: 'text-orange-600 bg-orange-50',
    blue: 'text-blue-600 bg-blue-50',
  };

  return (
    <Card className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`text-[10px] md:text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;
