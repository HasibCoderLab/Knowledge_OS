import React from 'react';
import {
  AreaChart as RechartsArea, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

interface AreaChartProps {
  data: { date: string; value: number }[];
  accentColor?: string;
  gradientId?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data, accentColor = '#6366f1', gradientId = 'colorGradient',
  height = 200, showGrid = false, showAxis = true,
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <RechartsArea data={data} margin={{ top: 5, right: 5, left: showAxis ? -20 : 0, bottom: 0 }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={accentColor} stopOpacity={0.25} />
          <stop offset="95%" stopColor={accentColor} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
      {showAxis && <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />}
      {showAxis && <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />}
      <Tooltip
        contentStyle={{
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px',
        }}
        labelStyle={{ fontWeight: 600, color: '#1e293b', marginBottom: 4 }}
      />
      <Area
        type="monotone" dataKey="value" stroke={accentColor} strokeWidth={2}
        fill={`url(#${gradientId})`} animationDuration={800} animationEasing="ease-out"
      />
    </RechartsArea>
  </ResponsiveContainer>
);

export default AreaChart;
