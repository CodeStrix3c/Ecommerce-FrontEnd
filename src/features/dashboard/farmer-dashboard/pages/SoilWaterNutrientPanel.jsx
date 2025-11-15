import React from "react";
import {
  Droplet,
  Leaf,
  FlaskConical,
  Gauge,
  Bug,
  PackageCheck,
} from "lucide-react";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import ContentWrapper from "@/components/shared/ContentWrapper";

const SoilWaterNutrientPanel = () => {
  // MOCK DATA
  const pHData = [
    { month: "Jan", value: 6.5 },
    { month: "Feb", value: 6.8 },
    { month: "Mar", value: 6.4 },
    { month: "Apr", value: 6.7 },
  ];
  const organicData = [
    { month: "Jan", value: 1.2 },
    { month: "Feb", value: 1.3 },
    { month: "Mar", value: 1.5 },
    { month: "Apr", value: 1.4 },
  ];
  const npkData = [
    { name: "N", value: 45 },
    { name: "P", value: 35 },
    { name: "K", value: 50 },
  ];
  const pesticideDemand = [
    { quarter: "Q1", value: 120 },
    { quarter: "Q2", value: 150 },
    { quarter: "Q3", value: 170 },
    { quarter: "Q4", value: 160 },
  ];
  const supplierStock = [
    { name: "Insecticides", value: 420 },
    { name: "Fungicides", value: 360 },
    { name: "Herbicides", value: 510 },
  ];

  const kpis = [
    { label: "Soil pH Avg", value: 6.7, icon: FlaskConical },
    { label: "Organic Matter (%)", value: 1.4, icon: Leaf },
    { label: "Nutrient Sufficiency", value: "Optimal", icon: Gauge },
    { label: "Pesticide Demand (Quarterly)", value: 150, icon: Bug },
    { label: "Supplier Stock Health", value: "Healthy", icon: PackageCheck },
  ];

  return (
    <ContentWrapper>
      <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-black)] mb-6">
        Soil & Crop Intelligence Dashboard
      </h1>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={index}
              className="bg-[var(--color-white)] text-[var(--color-black)] rounded-2xl shadow-sm p-4 flex flex-col items-start gap-2"
            >
              <div className="flex items-center gap-2">
                <Icon size={20} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-semibold">{kpi.label}</h3>
              </div>
              <p className="text-lg font-bold text-[var(--color-secondary)]">
                {kpi.value}
              </p>
            </Card>
          );
        })}
      </div>

      {/* CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FlaskConical size={20} /> Soil pH Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart data={pHData} dataKey="value" xKey="month" />
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Leaf size={20} /> Organic Matter Trend (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart data={organicData} dataKey="value" xKey="month" />
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Gauge size={20} /> NPK Nutrient Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart data={npkData} dataKey="value" xKey="name" />
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Bug size={20} /> Pesticide Demand Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              data={pesticideDemand}
              dataKey="value"
              xKey="quarter"
            />
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <PackageCheck size={20} /> Supplier Stock Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart data={supplierStock} dataKey="value" xKey="name" />
          </CardContent>
        </Card>
      </div>

      {/* TABLE: Soil & Nutrient Summary */}
      <Card className="bg-[var(--color-white)] rounded-2xl shadow-sm overflow-x-auto p-4">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Soil & Nutrient Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm table-auto border-t border-gray-200">
            <thead>
              <tr className="text-left text-[var(--color-black)]">
                <th className="py-2 px-3">Metric</th>
                <th className="py-2 px-3">Jan</th>
                <th className="py-2 px-3">Feb</th>
                <th className="py-2 px-3">Mar</th>
                <th className="py-2 px-3">Apr</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3 font-semibold">Soil pH</td>
                {pHData.map((d, i) => (
                  <td key={i} className="py-2 px-3">
                    {d.value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">Organic Matter (%)</td>
                {organicData.map((d, i) => (
                  <td key={i} className="py-2 px-3">
                    {d.value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">Nutrient N (kg/ha)</td>
                <td colSpan={4} className="py-2 px-3">
                  {npkData.find((d) => d.name === "N")?.value}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">Nutrient P (kg/ha)</td>
                <td colSpan={4} className="py-2 px-3">
                  {npkData.find((d) => d.name === "P")?.value}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">Nutrient K (kg/ha)</td>
                <td colSpan={4} className="py-2 px-3">
                  {npkData.find((d) => d.name === "K")?.value}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
};

export default SoilWaterNutrientPanel;
