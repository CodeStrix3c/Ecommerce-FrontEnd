import React from "react";
import ChartCard from "../components/ChartCard";
import ContentWrapper from "@/components/shared/ContentWrapper";

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

  const getRiskColor = (label, value) => {
    if (label === "Pest/Disease Risk Level") {
      if (value === "High") return "text-red-600";
      if (value === "Medium") return "text-yellow-600";
      return "text-green-600";
    }
    return "text-[var(--color-black)]";
  };

  return (
   <ContentWrapper>
     <ChartCard title="Pest & Disease Management">
      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {pestMetrics.map((metric, i) => (
          <div
            key={i}
            className="bg-[var(--color-white)]  shadow-sm rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-200"
          >
            <span className="text-sm font-medium text-gray-600 mb-1">
              {metric.label}
            </span>
            <span
              className={`text-xl font-semibold ${getRiskColor(
                metric.label,
                metric.value
              )}`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Risk Trend Placeholder */}
      <div className="mt-6 h-40 bg-[var(--color-black-hover)] rounded-xl flex items-center justify-center text-gray-500 text-sm sm:text-base">
        Pest / Disease Risk Trend Chart (Coming Soon)
      </div>
    </ChartCard>
   </ContentWrapper>
  );
}
