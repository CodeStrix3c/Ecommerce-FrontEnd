"use client";

import React from "react";
import ChartCard from "../components/ChartCard";
import ContentWrapper from "@/components/shared/ContentWrapper";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";

export default function KnowledgePanel() {
  // Main metrics
  const knowledgeMetrics = [
    { label: "Knowledge Hub Articles Read", value: 12 },
    { label: "Seasonal Advisory Compliance (%)", value: "85%" },
    { label: "Community Forum Participation", value: 7 },
    { label: "Expert Consultations Taken", value: 3 },
    { label: "Knowledge Shared", value: 5 },
    { label: "Complaints Resolved", value: "90%" },
  ];

  // Chart data
  const articlesReadData = [
    { month: "Jan", articles: 5 },
    { month: "Feb", articles: 8 },
    { month: "Mar", articles: 12 },
    { month: "Apr", articles: 15 },
  ];

  const complianceData = [
    { month: "Jan", compliance: 70 },
    { month: "Feb", compliance: 80 },
    { month: "Mar", compliance: 85 },
    { month: "Apr", compliance: 90 },
  ];

  const forumParticipationData = [
    { month: "Jan", posts: 2 },
    { month: "Feb", posts: 3 },
    { month: "Mar", posts: 7 },
    { month: "Apr", posts: 10 },
  ];

  const expertConsultData = [
    { week: "W1", consultations: 1 },
    { week: "W2", consultations: 2 },
    { week: "W3", consultations: 3 },
  ];

  const knowledgeSharedData = [
    { month: "Jan", shared: 1 },
    { month: "Feb", shared: 2 },
    { month: "Mar", shared: 5 },
    { month: "Apr", shared: 6 },
  ];

  const complaintsResolvedData = [
    { month: "Jan", resolved: 60 },
    { month: "Feb", resolved: 75 },
    { month: "Mar", resolved: 85 },
    { month: "Apr", resolved: 90 },
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
              <span className="text-sm font-medium text-[var(--color-black)] mb-1">
                {metric.label}
              </span>
              <span className="text-xl font-semibold text-[var(--color-black)]">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Articles Read Trend */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Articles Read (Monthly)
            </h3>
            <CustomLineChart
              data={articlesReadData}
              dataKey="articles"
              xKey="month"
            />
          </div>

          {/* Compliance Trend */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Seasonal Advisory Compliance (%)
            </h3>
            <CustomLineChart
              data={complianceData}
              dataKey="compliance"
              xKey="month"
            />
          </div>

          {/* Forum Participation */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Community Forum Participation
            </h3>
            <CustomBarChart
              data={forumParticipationData}
              dataKey="posts"
              xKey="month"
            />
          </div>

          {/* Expert Consultations */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Expert Consultations Taken
            </h3>
            <CustomBarChart
              data={expertConsultData}
              dataKey="consultations"
              xKey="week"
            />
          </div>

          {/* Knowledge Shared */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Knowledge Shared
            </h3>
            <CustomLineChart
              data={knowledgeSharedData}
              dataKey="shared"
              xKey="month"
            />
          </div>

          {/* Complaints Resolved */}
          <div className="bg-[var(--color-white)] p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Complaints Resolved (%)
            </h3>
            <CustomLineChart
              data={complaintsResolvedData}
              dataKey="resolved"
              xKey="month"
            />
          </div>
        </div>

        {/* Placeholder for Future Advanced Graphs */}
        <div className="mt-6 h-40 bg-[var(--color-black-hover)] rounded-xl flex items-center justify-center text-[var(--color-black)] text-sm sm:text-base">
          Advanced Knowledge Engagement Analytics (Coming Soon)
        </div>
      </ChartCard>
    </ContentWrapper>
  );
}
