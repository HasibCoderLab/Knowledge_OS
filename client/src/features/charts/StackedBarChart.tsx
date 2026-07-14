import React from 'react';
import {
  BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

interface StackedBarProps {
  data: Record<string, unknown>[];
  bars: { key: string; color: string; name: string }[];
  height?: number;
}

const StackedBarChart: React.FC<StackedBarProps> = ({ data, bars, height = 200 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <RechartsBar data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
      <Tooltip
        contentStyle={{
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px',
        }}
      />
      <Legend
        wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
        iconType="circle" iconSize={8}
      />
      {bars.map((b) => (
        <Bar key={b.key} dataKey={b.key} stackId="a" fill={b.color} name={b.name} radius={[0, 0, 0, 0]} animationDuration={800} />
      ))}
    </RechartsBar>
  </ResponsiveContainer>
);

export default StackedBarChart;
