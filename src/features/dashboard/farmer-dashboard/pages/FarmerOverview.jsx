import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import KPIGrid from "../components/KPIGrid";
import ChartCard from "../components/ChartCard";
import WeatherPanel from "./WeatherPanel";
import SoilPanel from "./SoilPanel";
import PestPanel from "./PestPanel";
import FinancialPanel from "./FinancialPanel";
import KnowledgePanel from "./KnowledgePanel";
import AlertPanel from "./AlertPanel";

export default function FarmerOverview() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-[var(--color-black-hover)] overflow-y-auto">
      <DashboardHeader />

      <KPIGrid />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <WeatherPanel />
        </div>

        <div className="col-span-6">
          <SoilPanel />
        </div>

        <div className="col-span-6">
          <PestPanel />
        </div>

        <div className="col-span-6">
          <ChartCard title="Inputs & Resources">
            <div className="h-48 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
              Inputs Chart Placeholder
            </div>
          </ChartCard>
        </div>

        <div className="col-span-12">
          <FinancialPanel />
        </div>

        <div className="col-span-6">
          <KnowledgePanel />
        </div>

        <div className="col-span-6">
          <AlertPanel />
        </div>
      </div>
    </div>
  );
}
