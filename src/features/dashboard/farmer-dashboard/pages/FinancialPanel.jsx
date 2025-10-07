import React from "react";
import { TrendingUp, ArrowUpCircle, BarChart3, LineChart } from "lucide-react";
import ChartCard from "../components/ChartCard";

export default function FinancialPanel() {
  const financialMetrics = [
    { label: "Cost of Cultivation / Acre", value: "₹45,000", icon: BarChart3 },
    { label: "Gross Revenue / Acre", value: "₹75,000", icon: TrendingUp },
    { label: "Net Profit / Acre", value: "₹30,000", icon: ArrowUpCircle },
    { label: "ROI (%)", value: "66%", icon: LineChart },
    { label: "Break-Even Yield (kg/acre)", value: "1,200", icon: BarChart3 },
    { label: "YoY Yield Growth (%)", value: "8%", icon: TrendingUp },
    {
      label: "Possible Improvements",
      value: "Cost-cutting / Crop rotation",
      icon: ArrowUpCircle,
    },
  ];

  return (
    <ChartCard title="Financial & Yield Performance">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {financialMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className=" p-4 rounded-2xl shadow-md flex items-start space-x-3"
            >
              <div className="p-2 rounded-full shadow-sm bg-[color:var(--color-white)]">
                <Icon className="text-[color:var(--color-black)] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[color:var(--color-black)]">
                  {metric.label}
                </span>
                <span className="text-lg font-bold text-[color:var(--color-black)]">
                  {metric.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 h-40 bg-[color:var(--color-secondary)]/20 rounded-xl shadow-inner flex flex-col items-center justify-center text-[color:var(--color-black)] animate-pulse">
        📊 Financial Trend / Yield Graph Loading...
      </div>
    </ChartCard>
  );
}
