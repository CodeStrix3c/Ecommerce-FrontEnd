import React from "react";
import ChartCard from "../components/ChartCard";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function KnowledgePanel() {
  const knowledgeMetrics = [
    { label: "Knowledge Hub Articles Read", value: 12 },
    { label: "Seasonal Advisory Compliance (%)", value: "85%" },
    { label: "Community Forum Participation", value: 7 },
    { label: "Expert Consultations Taken", value: 3 },
    { label: "Knowledge Shared", value: 5 },
    { label: "Complaints Resolved", value: "90%" },
  ];

  return (
    <ContentWrapper>
      <ChartCard title="Knowledge & Advisory Engagement">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {knowledgeMetrics.map((metric, i) => (
            <div
              key={i}
              className="bg-[var(--color-white)] shadow-sm rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-200"
            >
              <span className="text-sm font-medium text-gray-600 mb-1">
                {metric.label}
              </span>
              <span className="text-xl font-semibold text-[var(--color-black)]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Engagement Trend Placeholder */}
        <div className="mt-6 h-40 bg-[var(--color-black-hover)] rounded-xl flex items-center justify-center text-gray-500 text-sm sm:text-base">
          Knowledge Engagement Trend Chart (Coming Soon)
        </div>
      </ChartCard>
    </ContentWrapper>
  );
}
