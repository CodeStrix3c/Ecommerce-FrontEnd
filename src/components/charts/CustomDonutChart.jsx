import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CustomDonutChart = ({ value, max = 100, label }) => {
  const data = [value, Math.max(0, max - value)];
  return (
    <div className="w-24 h-24 flex items-center justify-center relative">
      <ResponsiveContainer width={96} height={96}>
        <PieChart>
          <Pie
            data={data}
            dataKey={(v) => v}
            startAngle={90}
            endAngle={-270}
            innerRadius={30}
            outerRadius={44}
            paddingAngle={0}
          >
            <Cell key="c1" fill="var(--color-accent)" />
            <Cell key="c2" fill="rgba(255,255,255,0.06)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-center">
        <div className="text-sm text-[var(--color-muted)]">{label}</div>
        <div className="text-lg font-semibold text-[var(--color-white)]">
          {value}
          {label === "%" ? "%" : ""}
        </div>
      </div>
    </div>
  );
};

export default CustomDonutChart;
