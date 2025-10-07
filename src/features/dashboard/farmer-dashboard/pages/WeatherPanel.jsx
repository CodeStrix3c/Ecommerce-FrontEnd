import React from "react";
import ChartCard from "../components/ChartCard";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomDonutChart from "@/components/charts/CustomDonutChart";

const mock = {
  tempNow: 26.4,
  tempForecast: [25, 26, 27, 28, 27, 26, 25],
  rainfallLast7: [0, 2.4, 0, 5.2, 0, 0, 0],
  rainfallForecast: [1, 0, 0, 3.6, 0, 0, 0],
  humidity: 78,
  windSpeed: 8,
  frostRisk: false,
  heatwaveRisk: false,
  degreeDaysBase10: 45,
  hailEvents: 2,
};

function MiniStat({ title, value, hint }) {
  return (
    <div className="flex-1 p-3 min-w-[160px]">
      <div className="text-sm text-[var(--color-gray)]">{title}</div>
      <div className="mt-1 text-xl font-semibold text-[var(--color-black)]">
        {value}
      </div>
      {hint && (
        <div className="mt-1 text-xs text-[var(--color-gray)]">{hint}</div>
      )}
    </div>
  );
}

export default function WeatherPanel({ data = mock }) {
  const {
    tempNow,
    tempForecast,
    rainfallLast7,
    rainfallForecast,
    humidity,
    windSpeed,
    frostRisk,
    heatwaveRisk,
    degreeDaysBase10,
    hailEvents,
  } = data;

  const rainLastData = rainfallLast7.map((v, i) => ({
    label: `Day ${i + 1}`,
    value: v,
  }));
  const rainForecastData = rainfallForecast.map((v, i) => ({
    label: `Day ${i + 1}`,
    value: v,
  }));
  const tempForecastData = tempForecast.map((v, i) => ({
    label: `Day ${i + 1}`,
    value: v,
  }));

  const diseaseRiskScore = Math.min(
    100,
    Math.round(humidity * (1 + Math.max(0, 12 - windSpeed) / 12))
  );

  return (
    <ChartCard title="Weather & Climate">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-[var(--color-white)] p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[var(--color-gray)]">
                Current Temperature
              </div>
              <div className="text-3xl font-bold text-[var(--color-black)]">
                {tempNow}°C
              </div>
              <div className="text-xs text-[var(--color-gray)]">
                7-day forecast
              </div>
            </div>
            <div className="w-36 h-24 flex items-center justify-center">
              <CustomAreaChart
                data={tempForecastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <MiniStat
              title="Degree Days (base 10°C)"
              value={`${degreeDaysBase10}`}
              hint="Phenology tracking"
            />
            <MiniStat
              title="Hail events (30 days)"
              value={hailEvents}
              hint="Reported hail strikes"
            />
            <MiniStat
              title="Frost Risk"
              value={frostRisk ? "ALERT" : "Low"}
              hint={frostRisk ? "Possible damaging frost" : "No frost expected"}
            />
          </div>
        </div>

        <div className="bg-[var(--color-white)] p-4 rounded-lg shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[var(--color-gray)]">
                Rainfall — Last 7 days vs Forecast
              </div>
              <div className="text-lg font-semibold text-[var(--color-black)]">
                {rainfallLast7.reduce((a, b) => a + b, 0).toFixed(1)} mm /{" "}
                {rainfallForecast.reduce((a, b) => a + b, 0).toFixed(1)} mm
              </div>
            </div>
            <div className="w-36 h-20">
              <CustomLineChart
                data={rainLastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-[var(--color-gray)]">
                Last 7 days
              </div>
              <CustomBarChart
                data={rainLastData}
                dataKey="value"
                xKey="label"
              />
            </div>
            <div className="w-32 flex flex-col items-center">
              <div className="text-xs text-[var(--color-gray)]">Forecast</div>
              <CustomLineChart
                data={rainForecastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-white)] p-4 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <CustomDonutChart value={Math.round(humidity)} label="%" />
            <div className="flex-1">
              <div className="text-sm text-[var(--color-gray)]">Humidity</div>
              <div className="text-xl font-semibold text-[var(--color-black)]">
                {humidity}%
              </div>
              <div className="mt-2 text-xs text-[var(--color-gray)]">
                Wind: {windSpeed} km/h
              </div>
              <div className="mt-3 text-xs">
                <div
                  className={`inline-block px-2 py-1 rounded text-sm ${diseaseRiskScore > 75 ? "bg-[var(--color-error)] text-[var(--color-black)]" : diseaseRiskScore > 50 ? "bg-[var(--color-secondary)] text-[var(--color-black)]" : "bg-[var(--color-primary)] text-[var(--color-black)]"}`}
                >
                  Disease risk: {diseaseRiskScore}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
              <div>Heatwave / Drought</div>
              <div
                className={`${heatwaveRisk ? "text-[var(--color-error)] font-semibold" : "text-[var(--color-primary)]"}`}
              >
                {heatwaveRisk ? "ALERT" : "OK"}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
              <div>Frost Alerts</div>
              <div
                className={`${frostRisk ? "text-[var(--color-error)] font-semibold" : "text-[var(--color-primary)]"}`}
              >
                {frostRisk ? "ALERT" : "OK"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-[var(--color-gray)]">
        Legend — Degree days: cumulative heat units. Disease risk uses humidity
        & wind heuristics. Replace heuristics with domain models or API-derived
        flags for production.
      </div>
    </ChartCard>
  );
}
