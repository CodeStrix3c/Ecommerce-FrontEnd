import React, { useEffect, useState } from "react";
import { CloudRain, Bug, Leaf } from "lucide-react";

export default function AlertTriggered() {
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [pestAlerts, setPestAlerts] = useState([]);
  const [nutrientAlerts, setNutrientAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-8 text-[var(--color-gray)]">
        Fetching alerts...
      </div>
    );

  return (
    <contentWrapper>
      <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Major Alert's</h1>

      {/* Responsive layout: column on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row gap-3 max-w-7xl mx-auto">

        {/* Weather Alerts */}
        <div className="w-full md:flex-1 border border-[var(--color-black)] rounded-xl">
          <div className="p-4 flex items-center">
            <CloudRain className="mr-2 text-[var(--color-primary)]" />
            <h2 className="font-bold text-lg text-[var(--color-primary)]">
              Weather Alerts
            </h2>
          </div>
          <div className="p-4 pt-0">
            {weatherAlerts.map((alert, i) => (
              <div key={i} className="p-3 mb-2 rounded-lg shadow-sm bg-[var(--color-white)]">
                <h3 className="font-medium text-[var(--color-primary)]">{alert.title}</h3>
                <p className="text-sm text-[var(--color-black)]">{alert.description}</p>
                {alert.source && (
                  <p className="text-xs text-[var(--color-black)] mt-1">
                    Source: {alert.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pest Alerts */}
        <div className="w-full md:flex-1 border border-[var(--color-black)] rounded-xl">
          <div className="p-4 flex items-center">
            <Bug className="mr-2 text-[var(--color-secondary)]" />
            <h2 className="font-bold text-lg text-[var(--color-secondary)]">Pest Alerts</h2>
          </div>
          <div className="p-4 pt-0">
            {pestAlerts.map((alert, i) => (
              <div key={i} className="p-3 mb-2 rounded-lg shadow-sm bg-[var(--color-white)]">
                <h3 className="font-medium text-[var(--color-secondary)]">{alert.type}</h3>
                <p className="text-sm text-[var(--color-black)]"><strong>Severity:</strong> {alert.severity}</p>
                <p className="text-sm text-[var(--color-black)]"><strong>Area:</strong> {alert.area}</p>
                <p className="text-sm text-[var(--color-black)] mt-1">{alert.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrient Alerts */}
        <div className="w-full md:flex-1 border border-[var(--color-black)] rounded-xl">
          <div className="p-4 flex items-center">
            <Leaf className="mr-2 text-[var(--color-black)]" />
            <h2 className="font-bold text-lg text-[var(--color-black)]">Nutrient Alerts</h2>
          </div>
          <div className="p-4 pt-0">
            {nutrientAlerts.map((alert, i) => (
              <div key={i} className="p-3 mb-2 rounded-lg shadow-sm bg-[var(--color-white)]">
                <h3 className="font-medium text-[var(--color-black)]">
                  {alert.nutrient} - {alert.level}
                </h3>
                <p className="text-sm text-[var(--color-black)]">{alert.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </contentWrapper>
  );
}
