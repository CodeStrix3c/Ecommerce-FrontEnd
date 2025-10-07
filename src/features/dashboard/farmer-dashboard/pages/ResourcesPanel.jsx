import React from "react";
import ChartCard from "../components/ChartCard";
import { BarChart3, Droplet, Clock, CreditCard, Wrench, Shovel } from "lucide-react";
import CustomLineChart from "@/components/charts/CustomLineChart";

export default function ResourcePanel() {
  const chartData = [
    { month: "Jan", fertilizer: 100, pesticide: 2, labor: 40 },
    { month: "Feb", fertilizer: 120, pesticide: 3, labor: 45 },
    { month: "Mar", fertilizer: 110, pesticide: 2, labor: 50 },
  ];
  const resourceMetrics = [
    {
      label: "Fertilizer Consumption (kg/ha)",
      value: "120",
      icon: BarChart3,
    },
    {
      label: "Pesticide Usage (ml/ha or sprays/season)",
      value: "3 sprays",
      icon: Droplet,
    },
    {
      label: "Over/Under Usage of Pesticides",
      value: "Within limit",
      icon: Droplet,
    },
    {
      label: "Labor Hours Logged (per operation)",
      value: "48 hrs",
      icon: Clock,
    },
    {
      label: "Cost of Inputs (₹/acre or ₹/tree)",
      value: "₹45,000",
      icon: CreditCard,
    },
    {
      label: "Equipment/Machinery Utilization Rate (%)",
      value: "75%",
      icon: Shovel,
    },
  ];

  return (
    <ChartCard title="Input & Resource Usage">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resourceMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="  p-4 rounded-2xl shadow-md flex items-start space-x-3"
            >
              <div className="p-2 rounded-full shadow-sm bg-[var(--color-white)]">
                <Icon className="text-[var(--color-secondary)] w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[var(--color-black)]">
                  {metric.label}
                </span>
                <span className="text-lg font-bold text-[var(--color-black)]">
                  {metric.value}
                </span>
              </div>
            </div>
          );
        })}

       
      </div>
       <div className=" mt-6 pt-20 rounded-xl shadow-inner text-[color:var(--color-black)] ">
          <CustomLineChart
            data={chartData}
            dataKey="fertilizer"
            xKey="month"
          ></CustomLineChart>
        </div>
    </ChartCard>
  );
}
