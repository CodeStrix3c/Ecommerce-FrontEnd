import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomLineChart from "@/components/charts/CustomLineChart";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { Gauge, Sprout, Tractor, Trees } from "lucide-react";
import React from "react";

export default function OrchardPanel() {
  const pHData = [
    { month: "Jan", value: 6.5 },
    { month: "Feb", value: 6.8 },
    { month: "Mar", value: 6.4 },
    { month: "Apr", value: 6.7 },
  ];

  const survivalRateData = [
    { month: "Jan", rate: 90 },
    { month: "Feb", rate: 92 },
    { month: "Mar", rate: 88 },
    { month: "Apr", rate: 91 },
  ];

  const yieldPerTreeData = [
    { month: "Jan", yield: 75 },
    { month: "Feb", yield: 80 },
    { month: "Mar", yield: 78 },
    { month: "Apr", yield: 82 },
  ];

  const plantingDensityData = [
    { area: "Block A", trees: 90 },
    { area: "Block B", trees: 100 },
    { area: "Block C", trees: 85 },
    { area: "Block D", trees: 95 },
  ];

  const varietyDistributionData = [
    { variety: "Variety 1", area: 20 },
    { variety: "Variety 2", area: 15 },
    { variety: "Variety 3", area: 10 },
    { variety: "Variety 4", area: 10 },
  ];

  return (
    <ContentWrapper>
      <div className="min-h-screen p-3 sm:p-6 bg-[var(--color-black-hover)] overflow-y-auto">
        <div className=" mx-auto">
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
              {
                label: "Total Orchard Area",
                value: "55 Kanals",
                Icon: Tractor,
              },
              { label: "Plant Density", value: "90 trees", Icon: Trees },
              { label: "Survival Rate", value: "91%", Icon: Gauge },
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
                  <p className="text-xs sm:text-sm text-[var(--color-black)]">
                    {item.label}
                  </p>
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    {item.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* CHART GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* pH Trend */}
            <div className="col-span-1 lg:col-span-1 p-4 sm:p-6 border rounded-md bg-[var(--color-white)]">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Soil pH Trend
              </h3>
              <CustomLineChart data={pHData} dataKey="value" xKey="month" />
            </div>

            {/* Survival Rate Trend */}
            <div className="col-span-1 lg:col-span-1 p-4 sm:p-6 border rounded-md bg-[var(--color-white)]">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Survival Rate (%)
              </h3>
              <CustomLineChart
                data={survivalRateData}
                dataKey="rate"
                xKey="month"
              />
            </div>

            {/* Yield per Tree Trend */}
            <div className="col-span-1 lg:col-span-1 p-4 sm:p-6 border rounded-md bg-[var(--color-white)]">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Yield per Tree (kg)
              </h3>
              <CustomLineChart
                data={yieldPerTreeData}
                dataKey="yield"
                xKey="month"
              />
            </div>

            {/* Planting Density per Block */}
            <div className="col-span-1 lg:col-span-1 p-4 sm:p-6 border rounded-md bg-[var(--color-white)]">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Planting Density (trees/block)
              </h3>
              <CustomBarChart
                data={plantingDensityData}
                dataKey="trees"
                xKey="area"
              />
            </div>

            {/* Variety Distribution */}
            <div className="col-span-1 lg:col-span-1 p-4 sm:p-6 border rounded-md bg-[var(--color-white)]">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Variety Distribution (Kanals)
              </h3>
              <CustomBarChart
                data={varietyDistributionData}
                dataKey="area"
                xKey="variety"
              />
            </div>
          </div>

          {/* YIELD SUMMARY */}
          <div className="p-4 sm:p-6 border rounded-md bg-[var(--color-white)] flex flex-col gap-4 mt-6">
            <h3 className="text-base sm:text-lg font-semibold">
              Yield Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <p className="text-xs sm:text-sm text-[var(--color-black)]">
                    {item.label}
                  </p>
                  <h4 className="text-base sm:text-xl font-semibold">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* REGISTERED ORCHARDS TABLE */}
          <div className="p-3 sm:p-6 border rounded-md mt-6 bg-[var(--color-white)] overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold">
                Registered Orchards
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-black)]">
                4 entries
              </p>
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
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-t font-semibold">
                    <td className="py-2 sm:py-3">Orchard {i}</td>
                    <td className="py-2 sm:py-3">{15 + i * 5}</td>
                    <td className="py-2 sm:py-3">{2 + i * 0.5}</td>
                    <td className="py-2 sm:py-3">Variety {i}</td>
                    <td className="py-2 sm:py-3">{2015 + i}</td>
                    <td className="py-2 sm:py-3">{85 + i * 5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
