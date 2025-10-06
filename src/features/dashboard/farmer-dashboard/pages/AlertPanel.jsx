import React from "react";
import ChartCard from "../components/ChartCard";

export default function AlertPanel() {
  // Placeholder data for alerts and notifications
  const alertMetrics = [
    { label: "Total Alerts Triggered", value: 15 },
    { label: "Alerts Acknowledged (%)", value: "80%" },
    { label: "Advisory Tickets Resolved (%)", value: "70%" },
    { label: "Pending Actions", value: 4 },
    { label: "Services Booked", value: 2 },
  ];

  return (
    <ChartCard title="Alerts & Notifications">
      <div className="grid grid-cols-2 gap-4">
        {alertMetrics.map((metric, i) => (
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

      {/* Placeholder for alert trends / notifications */}
      <div className="mt-4 h-32 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
        Alert Trend / Notification Placeholder
      </div>
    </ChartCard>
  );
}
