import React from 'react';
import { RadarChart as RechartsRadar, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: { category: string; value: number; fullMark: number }[];
  accentColor?: string;
  height?: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, accentColor = '#6366f1', height = 240 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <RechartsRadar data={data} cx="50%" cy="55%">
      <PolarGrid stroke="#e2e8f0" />
      <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#94a3b8' }} />
      <PolarRadiusAxis angle={90} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
      <Radar
        name="Score"
        dataKey="value"
        stroke={accentColor}
        fill={accentColor}
        fillOpacity={0.15}
        strokeWidth={2}
        animationDuration={800}
        animationEasing="ease-out"
      />
    </RechartsRadar>
  </ResponsiveContainer>
);

export default RadarChart;
