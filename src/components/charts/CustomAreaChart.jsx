import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const CustomAreaChart = ({ data, dataKey, color = "var(--color-accent)" }) => (
  <ResponsiveContainer width="100%" height={80}>
    <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.6} />
          <stop offset="100%" stopColor={color} stopOpacity={0.08} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        fill="url(#gradArea)"
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default CustomAreaChart;
