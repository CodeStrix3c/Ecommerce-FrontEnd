import React from "react";
import ChartCard from "../components/ChartCard";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import CustomLineChart from "@/components/charts/CustomLineChart";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomDonutChart from "@/components/charts/CustomDonutChart";
import ContentWrapper from "@/components/shared/ContentWrapper";

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
    <div className="flex-1 p-2 sm:p-3 min-w-[140px]">
      <div className="text-xs sm:text-sm text-[var(--color-gray)]">{title}</div>
      <div className="mt-1 text-lg sm:text-xl font-semibold text-[var(--color-black)]">
        {value}
      </div>
      {hint && (
        <div className="mt-1 text-[10px] sm:text-xs text-[var(--color-gray)]">
          {hint}
        </div>
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
   <ContentWrapper>

     <ChartCard title="Weather & Climate">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
        {/* Temperature Card */}
        <div className="bg-[var(--color-white)] rounded-md  flex flex-col justify-between">
          <div className=" flex items-center justify-between flex-wrap gap-3">
            <div className="p-5">
              <div className="text-xs sm:text-sm text-[var(--color-gray)]">
                Current Temperature
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--color-black)]">
                {tempNow}°C
              </div>
              <div className="text-xs text-[var(--color-gray)]">
                7-day forecast
              </div>
            </div>
            <div className="w-full sm:w-40 h-fit sm:h-24 p-2">
              <CustomAreaChart
                data={tempForecastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            <MiniStat
              title="Degree Days (base 10°C)"
              value={`${degreeDaysBase10}`}
              hint="Phenology tracking"
            />
            <MiniStat
              title="Hail Events (30 days)"
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

        {/* Rainfall Card */}
        <div className="bg-[var(--color-white)] p-4 sm:p-5 rounded-xl shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs sm:text-sm text-[var(--color-gray)]">
                Rainfall — Last 7 Days vs Forecast
              </div>
              <div className="text-base sm:text-lg font-semibold text-[var(--color-black)]">
                {rainfallLast7.reduce((a, b) => a + b, 0).toFixed(1)} mm /{" "}
                {rainfallForecast.reduce((a, b) => a + b, 0).toFixed(1)} mm
              </div>
            </div>
            <div className="w-full sm:w-40 h-20">
              <CustomLineChart
                data={rainLastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="text-xs text-[var(--color-gray)] mb-1">
                Last 7 Days
              </div>
              <CustomBarChart data={rainLastData} dataKey="value" xKey="label" />
            </div>
            <div className="w-full sm:w-36">
              <div className="text-xs text-[var(--color-gray)] mb-1">
                Forecast
              </div>
              <CustomLineChart
                data={rainForecastData}
                dataKey="value"
                color="var(--color-secondary)"
              />
            </div>
          </div>
        </div>

        {/* Humidity & Risk Card */}
        <div className="bg-[var(--color-white)] p-4 sm:p-5 rounded-xl shadow-md flex flex-col justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-24 sm:w-28 h-24 sm:h-28 mx-auto sm:mx-0">
              <CustomDonutChart value={Math.round(humidity)} label="%" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <div className="text-xs sm:text-sm text-[var(--color-gray)]">
                Humidity
              </div>
              <div className="text-xl sm:text-2xl font-semibold text-[var(--color-black)]">
                {humidity}%
              </div>
              <div className="mt-1 text-xs text-[var(--color-gray)]">
                Wind: {windSpeed} km/h
              </div>
              <div className="mt-3 text-xs">
                <div
                  className={`inline-block px-3 py-1 rounded-md font-medium text-sm ${
                    diseaseRiskScore > 75
                      ? "bg-[var(--color-error)] text-white"
                      : diseaseRiskScore > 50
                      ? "bg-[var(--color-secondary)] text-white"
                      : "bg-[var(--color-primary)] text-white"
                  }`}
                >
                  Disease Risk: {diseaseRiskScore}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--color-gray)]">
            <div className="flex items-center justify-between">
              <span>Heatwave / Drought</span>
              <span
                className={`font-semibold ${
                  heatwaveRisk
                    ? "text-[var(--color-error)]"
                    : "text-[var(--color-primary)]"
                }`}
              >
                {heatwaveRisk ? "ALERT" : "OK"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Frost Alerts</span>
              <span
                className={`font-semibold ${
                  frostRisk
                    ? "text-[var(--color-error)]"
                    : "text-[var(--color-primary)]"
                }`}
              >
                {frostRisk ? "ALERT" : "OK"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 text-[10px] sm:text-xs text-[var(--color-gray)] leading-relaxed">
        <strong>Legend:</strong> Degree days = cumulative heat units. Disease
        risk uses humidity & wind heuristics. Replace heuristics with real-time
        models or API data for production.
      </div>
    </ChartCard>
   </ContentWrapper>
  );
}
