import React from "react";
import ChartCard from "../components/ChartCard";

export default function KnowledgePanel() {
  // Placeholder data for knowledge and advisory engagement
  const knowledgeMetrics = [
    { label: "Knowledge Hub Articles Read", value: 12 },
    { label: "Seasonal Advisory Compliance (%)", value: "85%" },
    { label: "Community Forum Participation", value: 7 },
    { label: "Expert Consultations Taken", value: 3 },
    { label: "Knowledge Shared", value: 5 },
    { label: "Complaints Resolved", value: "90%" },
  ];

  return (
    <ChartCard title="Knowledge & Advisory Engagement">
      <div className="grid grid-cols-2 gap-4">
        {knowledgeMetrics.map((metric, i) => (
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

      {/* Placeholder for engagement graph */}
      <div className="mt-4 h-32 bg-[var(--color-white)] rounded shadow flex items-center justify-center text-gray-400">
        Knowledge Engagement Trend Placeholder
      </div>
    </ChartCard>
  );
}
