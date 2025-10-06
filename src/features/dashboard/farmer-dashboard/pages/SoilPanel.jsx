import React from "react";
import ChartCard from "../components/ChartCard";

export default function SoilPanel() {
  const soilMetrics = [
    { label: "Soil pH", value: "6.5" },
    { label: "EC (dS/m)", value: "1.2" },
    { label: "Organic Matter %", value: "3.5%" },
    { label: "Nitrogen (N)", value: "Medium" },
    { label: "Phosphorus (P)", value: "Low" },
    { label: "Potassium (K)", value: "High" },
    { label: "Fertigation Compliance", value: "85%" },
    { label: "Irrigation Volume (L/ha)", value: "4500" },
    { label: "Water Use Efficiency", value: "78%" },
    { label: "Deficiency Symptoms Detected", value: "2" },
  ];

  return (
    <ChartCard title="Soil, Water & Nutrient Management">
      <div className="grid grid-cols-2 gap-4">
        {soilMetrics.map((metric, i) => (
          <div
            key={i}
            className="bg-[var(--color-black-hover)] p-3 rounded-lg flex flex-col items-start justify-center"
          >
            <span className="text-xs text-[var(--color-gray)]">
              {metric.label}
            </span>
            <span className="text-lg font-semibold text-[var(--color-black)]">
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder for status graph / improvement suggestions */}
      <div className="mt-4 h-32 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
        Soil Status / Improvement Graph Placeholder
      </div>
    </ChartCard>
  );
}
