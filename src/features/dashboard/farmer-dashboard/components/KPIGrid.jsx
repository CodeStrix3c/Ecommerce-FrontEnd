import React from "react";
import ChartCard from "./ChartCard";

export default function KPIGrid() {
  const kpis = [
    { label: "Orchard Area", value: "120 ha" },
    { label: "Total Yield", value: "3500 kg/ha" },
    { label: "Survival Rate", value: "95%" },
    { label: "Avg. Tree Age", value: "5 yrs" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((k, i) => (
        <ChartCard key={i} title={k.label}>
          <div className="text-2xl font-bold text-[var(--color-black)]">
            {k.value}
          </div>
        </ChartCard>
      ))}
    </div>
  );
}
