import React from 'react';
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  donut?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data, height = 200, innerRadius = 0, outerRadius = 80, donut = false,
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <RechartsPie>
      <Pie
        data={data} cx="50%" cy="50%"
        innerRadius={donut ? 50 : innerRadius}
        outerRadius={outerRadius}
        dataKey="value"
        animationDuration={800}
        animationEasing="ease-out"
      >
        {data.map((entry, i) => (
          <Cell key={i} fill={entry.color} stroke="transparent" />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px',
        }}
      />
    </RechartsPie>
  </ResponsiveContainer>
);

export default PieChart;
