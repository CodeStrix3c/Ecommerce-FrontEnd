import React from "react";
import ChartCard from "../components/ChartCard";

export default function PestPanel() {
  const pestMetrics = [
    { label: "Pest Incidence (/100 trees)", value: "12" },
    { label: "Disease Incidence (%)", value: "8%" },
    { label: "Spray Compliance", value: "90%" },
    { label: "Pest/Disease Risk Level", value: "Medium" },
    { label: "Resistance Indicator", value: "Low" },
    { label: "Photo Diagnoses Submitted", value: "5" },
    { label: "Avg. Expert Response Time (hrs)", value: "4" },
  ];

  return (
    <ChartCard title="Pest & Disease Management">
      <div className="grid grid-cols-2 gap-4">
        {pestMetrics.map((metric, i) => (
          <div
            key={i}
            className="bg-[var(--color-black-hover)] p-3 rounded-lg flex flex-col items-start justify-center"
          >
            <span className="text-xs text-[var(--color-gray)]">
              {metric.label}
            </span>
            <span
              className={`text-lg font-semibold ${
                metric.label === "Pest/Disease Risk Level"
                  ? metric.value === "High"
                    ? "text-red-600"
                    : metric.value === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  : "text-[var(--color-black)]"
              }`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder for risk chart / trends */}
      <div className="mt-4 h-32 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
        Pest/Disease Risk Trend Placeholder
      </div>
    </ChartCard>
  );
}
