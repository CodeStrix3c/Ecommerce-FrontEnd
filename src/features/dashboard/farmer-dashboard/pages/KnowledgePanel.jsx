import React from "react";
import {
  Book,
  CheckCircle,
  MessageSquare,
  UserCheck,
  Share2,
  AlertCircle,
} from "lucide-react";

import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomPieChart from "@/components/charts/CustomePieChart";

const metrics = [
  {
    title: "Articles Read",
    value: 42,
    icon: (
      <Book className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description:
      "Total number of knowledge hub articles read by users this season.",
    chartDataKey: "value",
    chartXKey: "metric",
    chartData: [{ metric: "Articles Read", value: 42 }],
  },
  {
    title: "Seasonal Compliance",
    value: "75%",
    icon: (
      <CheckCircle className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description:
      "Percentage of advisory recommendations followed during the current season.",
    chartDataKey: "value",
    chartXKey: "season",
    chartData: [
      { season: "Winter", value: 70 },
      { season: "Spring", value: 75 },
      { season: "Summer", value: 80 },
      { season: "Autumn", value: 65 },
    ],
    chartType: "line",
  },
  {
    title: "Forum Participation",
    value: 18,
    icon: (
      <MessageSquare className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description:
      "Number of posts and questions shared by the community in forums.",
    chartDataKey: "value",
    chartXKey: "metric",
    chartData: [{ metric: "Forum Participation", value: 18 }],
  },
  {
    title: "Expert Consultations",
    value: 12,
    icon: (
      <UserCheck className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description: "Consultations taken with experts to get personalized advice.",
    chartDataKey: "value",
    chartXKey: "metric",
    chartData: [{ metric: "Expert Consultations", value: 12 }],
  },
  {
    title: "Knowledge Shared",
    value: 7,
    icon: (
      <Share2 className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description:
      "Instances where users contributed tips, solutions, or shared knowledge.",
    chartDataKey: "value",
    chartXKey: "metric",
    chartData: [{ metric: "Knowledge Shared", value: 7 }],
  },
  {
    title: "Complaints Resolved",
    value: "8/10",
    icon: (
      <AlertCircle className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />
    ),
    description:
      "Number of complaints successfully resolved out of total registered complaints.",
    chartType: "pie",
    chartData: [
      { name: "Resolved", value: 8, color: "#34D399" },
      { name: "Pending", value: 2, color: "#F87171" },
    ],
  },
];

const KnowledgePanel = () => {
  return (
    <div className="p-4 sm:p-6 space-y-8 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Knowledge & Advisory
      </h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-white)] p-4 rounded-lg shadow hover:shadow-lg transition text-center"
          >
            {metric.icon}
            <p className="text-base font-medium mb-1">{metric.title}</p>
            <p className="text-2xl font-bold mb-2">{metric.value}</p>
            <p className="text-sm text-[var(--color-black)]">
              {metric.description}
            </p>

            {/* Chart Section */}
            {metric.chartData &&
              metric.chartType !== "pie" &&
              (metric.chartType === "line" ? (
                <CustomLineChart
                  data={metric.chartData}
                  dataKey={metric.chartDataKey}
                  xKey={metric.chartXKey}
                />
              ) : (
                <CustomBarChart
                  data={metric.chartData}
                  dataKey={metric.chartDataKey}
                  xKey={metric.chartXKey}
                />
              ))}

            {metric.chartType === "pie" && metric.chartData && (
              <div className="mt-4" style={{ height: 150 }}>
                <CustomPieChart data={metric.chartData} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgePanel;
