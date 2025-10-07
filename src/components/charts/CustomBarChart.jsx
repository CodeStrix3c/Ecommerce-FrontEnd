import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data, dataKey, xKey }) => (
  <ResponsiveContainer width="100%" height={80}>
    <BarChart data={data}>
      <Bar dataKey={dataKey} fill="var(--color-secondary)" radius={4} />
      <XAxis dataKey={xKey} />
      <YAxis hide />
      <Tooltip />
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
