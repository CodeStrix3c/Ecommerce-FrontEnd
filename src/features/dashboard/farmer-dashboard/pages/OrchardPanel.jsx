import CustomBarChart from "@/components/charts/CustomBarChart";
import { Gauge, Sprout, Tractor, Trees } from "lucide-react";
import React from "react";

export default function OrchardPanel() {
  const pHData = [
    { month: "Jan", value: 6.5 },
    { month: "Feb", value: 6.8 },
    { month: "Mar", value: 6.4 },
    { month: "Apr", value: 6.7 },
  ];

  return (
    <div className="min-h-screen p-3 sm:p-6 bg-[var(--color-black-hover)] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-black)]">
              Orchard Profile
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-black)] mt-1">
              Overview of area, planting, survival & yield metrics
            </p>
          </div>
        </div>

        {/* KPI GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
          {[
            { label: "Total Orchard Area", value: "55 Kanals", Icon: Tractor },
            { label: "Plant Density", value: "90 trees", Icon: Trees },
            { label: "Survival Rate", value: "5%", Icon: Gauge },
            { label: "Average Tree Age", value: "8yrs", Icon: Sprout },
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 sm:p-5 border rounded-md flex items-center gap-3 sm:gap-4 bg-[var(--color-white)]"
            >
              <div className="p-2 sm:p-3 rounded-md">
                <item.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-secondary)]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[var(--color-black)]">{item.label}</p>
                <h2 className="text-lg sm:text-2xl font-semibold">{item.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* CHART + YIELD SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* CHART */}
          <div className="col-span-1 lg:col-span-2 p-4 sm:p-6 border rounded-md bg-[var(--color-white)] overflow-x-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Variety & Planting Year Distribution</h3>
              <p className="text-xs sm:text-sm text-[var(--color-black)]">Area measured in Kanals</p>
            </div>
            <div className="relative z-0">
  <CustomBarChart data={pHData} dataKey="value" xKey="month" />
</div>
          </div>

          {/* YIELD SUMMARY */}
          <div className="p-4 sm:p-6 border rounded-md bg-[var(--color-white)] flex flex-col gap-4">
            <h3 className="text-base sm:text-lg font-semibold">Yield Summary</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Yield per Tree", value: "80 kg/tree" },
                { label: "Total Trees (approx.)", value: "60" },
                { label: "Estimated Total Yield", value: "88kg (700kg/ha)" },
                { label: "Total Yield per Hectare (admin)", value: "90 kg/ha" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 border rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <p className="text-xs sm:text-sm text-[var(--color-black)]">{item.label}</p>
                  <h4 className="text-base sm:text-xl font-semibold">{item.value}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="p-3 sm:p-6 border rounded-md mt-6 bg-[var(--color-white)] overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Registered Orchards</h3>
            <p className="text-xs sm:text-sm text-[var(--color-black)]">4 entries</p>
          </div>
          <table className="w-full text-xs sm:text-sm table-auto min-w-[600px]">
            <thead>
              <tr className="text-[var(--color-black)] text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Area (Kanals)</th>
                <th className="py-2">Area (ha)</th>
                <th className="py-2">Variety</th>
                <th className="py-2">Planting Year</th>
                <th className="py-2">Density (trees/ha)</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-t font-semibold">
                  <td className="py-2 sm:py-3">Total</td>
                  <td className="py-2 sm:py-3">30</td>
                  <td className="py-2 sm:py-3">5000</td>
                  <td className="py-2 sm:py-3">7</td>
                  <td className="py-2 sm:py-3">4</td>
                  <td className="py-2 sm:py-3">6000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
