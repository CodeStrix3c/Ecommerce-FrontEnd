import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({
  data,
  dataKey,
  xKey = "label",
  color = "var(--color-secondary)",
}) => (
  <ResponsiveContainer width="100%" height={80}>
    <ReLineChart data={data}>
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
      <XAxis dataKey={xKey} hide />
      <YAxis hide />
      <Tooltip />
    </ReLineChart>
  </ResponsiveContainer>
);

export default CustomLineChart;
