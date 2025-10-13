import React from "react";
import { TrendingUp, ArrowUpCircle, BarChart3, LineChart } from "lucide-react";
import ChartCard from "../components/ChartCard";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import ContentWrapper from "@/components/shared/ContentWrapper";

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

  const chartData = [
  { month: "Jan", fertilizer: 100, pesticide: 2, labor: 40 },
  { month: "Feb", fertilizer: 120, pesticide: 3, labor: 45 },
  { month: "Mar", fertilizer: 110, pesticide: 2, labor: 50 },
];

  return (
    <ContentWrapper>
      <ChartCard title="Financial & Yield Performance">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {financialMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className=" bg-[var(--color-white)] p-4 rounded-sm  flex items-start space-x-3"
            >
              <div className="p-2 rounded-full shadow-sm bg-[color:var(--color-white)]">
                <Icon className="text-[color:var(--color-secondary)] w-5 h-5" />
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
      <div className=" bg-[var(--color-white)] mt-6 pt-20 px-5 h-40 rounded-sm shadow-inner  text-[color:var(--color-black)] ">
      <CustomLineChart data={chartData} dataKey="fertilizer" xKey="month">


      </CustomLineChart>
      </div>
    </ChartCard>
    </ContentWrapper>
  );
}
