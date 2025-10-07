import React from "react";
import ChartCard from "../components/ChartCard";

export default function FinancialPanel() {
  // Placeholder data for financial metrics
  const financialMetrics = [
    { label: "Cost of Cultivation / Acre", value: "₹45,000" },
    { label: "Gross Revenue / Acre", value: "₹75,000" },
    { label: "Net Profit / Acre", value: "₹30,000" },
    { label: "ROI (%)", value: "66%" },
    { label: "Break-Even Yield (kg/acre)", value: "1,200" },
    { label: "YoY Yield Growth (%)", value: "8%" },
    { label: "Possible Improvements", value: "Cost-cutting / Crop rotation" },
  ];

  return (
    <ChartCard title="Financial & Yield Performance">
      <div className="grid grid-cols-2 gap-4">
        {financialMetrics.map((metric, i) => (
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

      {/* Placeholder for revenue / cost graph */}
      <div className="mt-4 h-32 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
        Financial Trend / Yield Graph Placeholder
      </div>
    </ChartCard>
  );
}
