import React from "react";
import ChartCard from "../components/ChartCard";

export default function WeatherPanel() {
  return (
    <ChartCard title="Weather & Climate">
      <div className="h-48 bg-[var(--color-black-hover)] rounded flex items-center justify-center text-gray-400">
        Weather Chart / Widget Placeholder
      </div>
    </ChartCard>
  );
}
