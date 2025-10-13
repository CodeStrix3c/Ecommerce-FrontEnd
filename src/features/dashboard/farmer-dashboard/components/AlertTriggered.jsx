import React, { useEffect, useState } from "react";
import { CloudRain, Bug, Leaf } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function AlertTriggered() {
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [pestAlerts, setPestAlerts] = useState([]);
  const [nutrientAlerts, setNutrientAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const weatherData = [
          {
            title: "Heavy Rainfall Warning",
            description: "Expected 60mm rainfall in 24h. Avoid irrigation.",
            source: "IMD",
          },
        ];

      const pestData = [
        {
          type: "Locust Risk",
          severity: "High",
          area: "North Field",
          recommendation: "Deploy pheromone traps immediately.",
        },
        {
          type: "Aphid Population Rise",
          severity: "Moderate",
          area: "South Farm",
          recommendation: "Spray neem-based biopesticide.",
        },
      ];

      const nutrientData = [
        {
          nutrient: "Nitrogen (N)",
          level: "Low",
          action: "Apply urea fertilizer (46% N).",
        },
        {
          nutrient: "Potassium (K)",
          level: "Deficient",
          action: "Apply MOP fertilizer (60% K₂O).",
        },
      ];

      setWeatherAlerts(weatherData);
      setPestAlerts(pestData);
      setNutrientAlerts(nutrientData);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
        // You could set an error state here
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">
        Fetching alerts...
      </div>
    );

  return (
    <ContentWrapper>
      <h1 className="text-xl font-semibold mb-8 text-gray-800">
        Major Alerts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Alerts */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center px-5 py-4 border-b border-gray-200">
            <CloudRain className="text-blue-600 w-6 h-6 mr-3"/>
            <h2 className="font-semibold text-lg text-blue-600">
              Weather Alerts
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {weatherAlerts.map((alert, i) => (
              <div
                key={i}
                className="p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-medium text-blue-600 mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-700">{alert.description}</p>
                {alert.source && (
                  <p className="text-xs text-gray-500 mt-1">Source: {alert.source}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pest Alerts */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center px-5 py-4 border-b border-gray-200">
            <Bug className="text-red-500 w-6 h-6 mr-3" />
            <h2 className="font-semibold text-lg text-red-500">Pest Alerts</h2>
          </div>
          <div className="p-5 space-y-4">
            {pestAlerts.map((alert, i) => (
              <div
                key={i}
                className="p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-medium text-red-500 mb-1">{alert.type}</h3>
                <p className="text-sm text-gray-700">
                  <strong>Severity:</strong> {alert.severity}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Area:</strong> {alert.area}
                </p>
                <p className="text-sm text-gray-700 mt-1">{alert.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrient Alerts */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center px-5 py-4 border-b border-gray-200">
            <Leaf className="text-green-600 w-6 h-6 mr-3" />
            <h2 className="font-semibold text-lg text-green-600">Nutrient Alerts</h2>
          </div>
          <div className="p-5 space-y-4">
            {nutrientAlerts.map((alert, i) => (
              <div
                key={i}
                className="p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="font-medium text-green-600 mb-1">
                  {alert.nutrient} - {alert.level}
                </h3>
                <p className="text-sm text-gray-700 mt-1">{alert.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
