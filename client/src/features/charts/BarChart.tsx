import React from 'react';
import {
  BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

interface BarChartProps {
  data: { date: string; value: number }[];
  accentColor?: string;
  height?: number;
  showGrid?: boolean;
  radius?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data, accentColor = '#6366f1', height = 200, showGrid = false, radius = 4,
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <RechartsBar data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
      {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <Tooltip
        contentStyle={{
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px',
        }}
        labelStyle={{ fontWeight: 600, color: '#1e293b', marginBottom: 4 }}
      />
      <Bar dataKey="value" fill={accentColor} radius={[radius, radius, 0, 0]} animationDuration={800} animationEasing="ease-out" />
    </RechartsBar>
  </ResponsiveContainer>
);

export default BarChart;
