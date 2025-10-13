import React from "react";
import {
  Droplet,
  Leaf,
  FlaskConical,
  Gauge,
  Thermometer,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import ContentWrapper from "@/components/shared/ContentWrapper";
import ChartCard from "../components/ChartCard";

const SoilWaterNutrientPanel = () => {
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
  const fertigationData = [
    { week: "W1", actual: 80 },
    { week: "W2", actual: 90 },
    { week: "W3", actual: 85 },
  ];
  const irrigationData = [
    { month: "Jan", liters: 1200 },
    { month: "Feb", liters: 1400 },
    { month: "Mar", liters: 1300 },
    { month: "Apr", liters: 1250 },
  ];
  const efficiencyData = [
    { season: "Kharif", eff: 78 },
    { season: "Rabi", eff: 82 },
    { season: "Zaid", eff: 80 },
  ];
  const deficiencyData = [
    { season: "2022", count: 5 },
    { season: "2023", count: 3 },
    { season: "2024", count: 2 },
  ];

  const getStatus = (title, value) => {
    if (title.includes("pH")) {
      if (value >= 6.5 && value <= 7.5)
        return { text: "Good", color: "var(--color-primary)" };
      if (value < 6.0 || value > 8.0)
        return { text: "Needs Attention", color: "var(--color-error)" };
      return { text: "Moderate", color: "var(--color-secondary)" };
    }
    if (title.includes("Organic")) {
      if (value >= 1.5) return { text: "Good", color: "var(--color-primary)" };
      if (value < 1.0)
        return { text: "Needs Improvement", color: "var(--color-error)" };
      return { text: "Moderate", color: "var(--color-secondary)" };
    }
    if (title.includes("Water Use")) {
      if (value >= 80)
        return { text: "Efficient", color: "var(--color-primary)" };
      if (value < 60) return { text: "Poor", color: "var(--color-error)" };
      return { text: "Average", color: "var(--color-secondary)" };
    }
    if (title.includes("Deficiency")) {
      if (value <= 2) return { text: "Healthy", color: "var(--color-primary)" };
      if (value >= 5) return { text: "Critical", color: "var(--color-error)" };
      return { text: "Mild", color: "var(--color-secondary)" };
    }
    return { text: "Normal", color: "var(--color-secondary)" };
  };

  const cards = [
    {
      title: "Soil pH & EC Status",
      icon: <FlaskConical size={22} color="var(--color-primary)" />,
      value: "pH 6.7 / EC 1.2 dS/m",
      numericValue: 6.7,
      chart: <CustomLineChart data={pHData} dataKey="value" xKey="month" />,
    },
    {
      title: "Organic Matter %",
      icon: <Leaf size={22} color="var(--color-primary)" />,
      value: "1.4%",
      numericValue: 1.4,
      chart: <CustomLineChart data={organicData} dataKey="value" xKey="month" />,
    },
    {
      title: "N-P-K Nutrient Levels",
      icon: <Gauge size={22} color="var(--color-primary)" />,
      value: "N: High | P: Medium | K: High",
      numericValue: 2,
      chart: <CustomBarChart data={npkData} dataKey="value" xKey="name" />,
    },
    {
      title: "Fertigation Compliance (%) vs Schedule",
      icon: <BarChart3 size={22} color="var(--color-primary)" />,
      value: "87%",
      numericValue: 87,
      chart: (
        <CustomBarChart
          data={fertigationData}
          dataKey="actual"
          xKey="week"
          color="var(--color-primary)"
        />
      ),
    },
    {
      title: "Irrigation Volume Applied (L/ha)",
      icon: <Droplet size={22} color="var(--color-primary)" />,
      value: "1,250 L/ha",
      numericValue: 1250,
      chart: <CustomLineChart data={irrigationData} dataKey="liters" xKey="month" />,
    },
    {
      title: "Water Use Efficiency (%)",
      icon: <Thermometer size={22} color="var(--color-primary)" />,
      value: "80%",
      numericValue: 80,
      chart: <CustomBarChart data={efficiencyData} dataKey="eff" xKey="season" />,
    },
    {
      title: "Deficiency Symptoms Detected (Count/Season)",
      icon: <AlertTriangle size={22} color="var(--color-primary)" />,
      value: "2",
      numericValue: 2,
      chart: (
        <CustomLineChart
          data={deficiencyData}
          dataKey="count"
          xKey="season"
          color="var(--color-error)"
        />
      ),
    },
  ];

  return (
    <ContentWrapper>
      <ChartCard title="Soil & Nutrient Management">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5 bg-[var(--color-black-hover)] rounded-xl">
          {cards.map((card, index) => {
            const status = getStatus(card.title, card.numericValue);
            return (
              <Card
                key={index}
                className="bg-[var(--color-white)] text-[var(--color-black)] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out border border-[var(--color-gray-light)]"
              >
                <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--color-gray-light)] pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    {card.icon}
                    <span>{card.title}</span>
                  </CardTitle>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${status.color}25`,
                      color: status.color,
                    }}
                  >
                    {status.text}
                  </span>
                </CardHeader>

                <CardContent className="pt-3">
                  <p className="text-lg font-bold text-[var(--color-secondary)] mb-2">
                    {card.value}
                  </p>
                  <div className="h-24 md:h-28 lg:h-32">{card.chart}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ChartCard>
    </ContentWrapper>
  );
};

export default SoilWaterNutrientPanel;
