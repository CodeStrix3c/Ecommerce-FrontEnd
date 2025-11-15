import ContentWrapper from "@/components/shared/ContentWrapper";
import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

function ChartCard({ title, children }) {
  return (
    <div className="mb-6 p-4 sm:p-6 bg-white  rounded-2xl border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function CustomAreaChart({ data, dataKey, color }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          fillOpacity={1}
          fill="url(#colorArea)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomLineChart({ data, dataKey, color }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomBarChart({ data, dataKey, xKey }) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey={dataKey} fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomDonutChart({ value, label }) {
  const data = [
    { name: "Value", value: value },
    { name: "Remaining", value: 100 - value },
  ];
  const COLORS = ["#10b981", "#f3f4f6"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={450}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-bold fill-gray-800"
        >
          {value}
          {label}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

// ================= MOCK FARMER DATA =================
const generateMockArray = (length, min, max, fixed = 1) =>
  Array.from({ length }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(fixed))
  );

const generateRiskData = (length, min, max) =>
  Array.from({ length }, (_, i) => ({
    week: `Wk ${i + 1}`,
    value: Math.min(100, Math.round(Math.random() * (max - min) + min)),
  }));

const defaultMock = {
  // Weather
  locationName: "Srinagar, Kashmir",
  tempNow: 26.4,
  tempForecast: generateMockArray(7, 20, 30), // Added for MiniStat/ChartCard usage
  humidity: 78,
  windSpeed: 8, // Added for MiniStat/ChartCard usage
  windSpeedKph: 8,
  conditionText: "Partly cloudy",
  frostRisk: false, // Added for MiniStat/ChartCard usage
  heatwaveRisk: false, // Added for MiniStat/ChartCard usage
  degreeDaysBase10: 45, // Added for MiniStat/ChartCard usage
  hailEvents: 2, // Added for MiniStat/ChartCard usage
  // Forecast / rainfall
  rainfallLast7: generateMockArray(7, 0, 10),
  rainfallForecast: generateMockArray(7, 0, 12), // Renamed from rainfallForecast7
  tempForecast7: generateMockArray(7, 15, 30),
  // Soil / irrigation
  soilMoisture: 62, // %
  soilTemp14: generateMockArray(14, 15, 25),
  irrigationNeed: 68, // % indicator
  // Crop health
  cropHealthPct: 84, // NDVI like summary 0-100
  ndviTrend14: generateMockArray(14, 0.45, 0.9, 2),
  // Risk indices
  pestRiskPct: 35,
  diseaseRiskPct: 72,
  fungalRisk7Day: generateRiskData(7, 20, 90),
  pestRisk7Day: generateRiskData(7, 10, 80),
  // Spray guidance
  optimalSprayHrsToday: ["05:00-09:00", "18:00-21:00"],
  windGustMaxKph: 15,
  inversionRisk: "Moderate", // Low / Moderate / High
  uvIndexMax: 6,
  // Environmental
  dewPoint: 17.2,
  dropletEvaporationRate: 0.45,
  frostRiskNext7: generateMockArray(7, 0, 1, 0).map((v) => (v > 0.5 ? 1 : 0)),
  droughtIndex: 35,
  // Advisories
  regionalAdvisories: [
    "Warm and humid conditions may increase fungal risk this week.",
    "Monitor low-lying fields for frost during early mornings.",
    "Soil moisture trending downwards — consider irrigation within 48 hours.",
  ],
};

// ===================== Helper Components (from both snippets) ======================
function MiniStat({ title, value, hint }) {
  return (
    <div className="flex-1 p-2 sm:p-3 min-w-[140px]">
      <div className="text-xs sm:text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-lg sm:text-xl font-semibold text-gray-900">
        {value}
      </div>
      {hint && (
        <div className="mt-1 text-[10px] sm:text-xs text-gray-500">{hint}</div>
      )}
    </div>
  );
}

function DataBlock({
  title,
  subtitle,
  color = "#10b981", // Emerald 500
  children,
  className = "",
}) {
  return (
    <div className={`bg-white border rounded-xl p-4 ${className}`}>
      <div className="mb-3 border-b pb-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-gray-800">{title}</div>
          <div
            style={{ width: 8, height: 8, background: color, borderRadius: 4 }}
          />
        </div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function InfoRow({ label, value, unit = "", statusColor }) {
  return (
    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-b-0">
      <div className="text-[13px] text-gray-600">{label}</div>
      <div className="text-[13px] font-semibold" style={{ color: statusColor }}>
        {value} {unit}
      </div>
    </div>
  );
}

// Simple Sparkline (SVG) for small charts
function Sparkline({ data = [], width = 120, height = 40 }) {
  if (!data || !data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ====================== Farmer-focused Panels ================================
function WeatherSummary({ data }) {
  return (
    <DataBlock
      title={`Current Weather — ${data.locationName}`}
      subtitle="Real-time field conditions"
      color="#4f46e5"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-5xl font-extrabold text-blue-600">
            {data.tempNow}°C
          </div>
          <div className="text-sm text-gray-600">{data.conditionText}</div>
        </div>
        <div className="text-sm text-right space-y-1">
          <InfoRow label="Humidity" value={data.humidity} unit="%" />
          <InfoRow label="Wind" value={data.windSpeedKph} unit="km/h" />
          <InfoRow label="Dew Point" value={data.dewPoint} unit="°C" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t">
        <div className="text-xs text-gray-500">7-Day Rainfall Outlook</div>
        <div className="text-xs text-gray-700 mt-1">
          Last 7d:{" "}
          <strong className="text-blue-600">
            {data.rainfallLast7.reduce((a, b) => a + b, 0).toFixed(1)} mm
          </strong>{" "}
          | Forecast 7d:{" "}
          <strong className="text-indigo-600">
            {data.rainfallForecast.reduce((a, b) => a + b, 0).toFixed(1)} mm
          </strong>
        </div>
      </div>
    </DataBlock>
  );
}

function RiskMatrixFarmer({ data }) {
  const pestLevel =
    data.pestRiskPct > 60
      ? "Critical"
      : data.pestRiskPct > 30
        ? "High"
        : "Moderate";
  const diseaseLevel =
    data.diseaseRiskPct > 80
      ? "Severe"
      : data.diseaseRiskPct > 50
        ? "High"
        : "Moderate";
  const color = diseaseLevel === "Severe" ? "#ef4444" : "#f59e0b"; // Red/Amber

  return (
    <DataBlock
      title="Field Risk Overview"
      subtitle="Short-term pest, disease & frost indicators"
      color={color}
    >
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div className="text-xs text-gray-500">Pest Pressure</div>
          <div className="text-3xl font-black text-amber-600">
            {data.pestRiskPct}%
          </div>
          <div className="text-xs text-gray-600">{pestLevel}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Disease Pressure</div>
          <div className="text-3xl font-black text-red-600">
            {data.diseaseRiskPct}%
          </div>
          <div className="text-xs text-gray-600">{diseaseLevel}</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-bold mb-1 pt-2 border-t">Key Drivers</div>
        <InfoRow label="Relative Humidity" value={`${data.humidity}%`} />
        <InfoRow
          label="Recent Rain (7d avg)"
          value={`${(data.rainfallLast7.reduce((a, b) => a + b, 0) / data.rainfallLast7.length).toFixed(1)} mm`}
        />
        <InfoRow
          label="Frost Days (next 7d)"
          value={`${data.frostRiskNext7.filter((f) => f === 1).length} days`}
          statusColor={data.frostRiskNext7.includes(1) ? "#ef4444" : "#10b981"}
        />
      </div>
    </DataBlock>
  );
}

function ApplicationPlanner({ data }) {
  // Simple logic for spray suitability
  const unsuitable =
    data.windGustMaxKph > 20 ||
    data.inversionRisk === "High" ||
    data.rainfallForecast[0] > 5;
  const recommendation = unsuitable
    ? "AVOID: Unsafe/Ineffective Conditions"
    : "SUITABLE: Follow Optimal Hours";

  return (
    <DataBlock
      title="Spray & Application Planner"
      subtitle="When and how to apply for best efficacy"
      color="#3b82f6"
    >
      <div className="text-center mb-4 border-b pb-3">
        <div className="text-xs text-gray-500">Application Recommendation</div>
        <div
          className={`text-lg font-bold mt-2 ${unsuitable ? "text-red-600" : "text-emerald-700"}`}
        >
          {recommendation}
        </div>
        <div className="text-sm font-semibold mt-1 text-blue-600">
          Optimal Hrs: {data.optimalSprayHrsToday.join(" & ")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <InfoRow
          label="Max Wind Gust"
          value={`${data.windGustMaxKph} km/h`}
          statusColor={data.windGustMaxKph > 20 ? "#ef4444" : "#10b981"}
        />
        <InfoRow label="Inversion Risk" value={data.inversionRisk} />
        <InfoRow label="UV Index Max" value={`${data.uvIndexMax}`} />
        <InfoRow
          label="Droplet Evap. Rate"
          value={`${(data.dropletEvaporationRate * 100).toFixed(0)} %/min`}
          statusColor={
            data.dropletEvaporationRate > 0.4 ? "#f59e0b" : "#10b981"
          }
        />
      </div>
    </DataBlock>
  );
}

function IrrigationPlanner({ data }) {
  const soilAvg = (
    data.soilTemp14.reduce((a, b) => a + b, 0) / data.soilTemp14.length
  ).toFixed(1);
  const irrigationAdvice =
    data.soilMoisture < 50
      ? "Irrigation recommended within 24-48 hrs"
      : data.soilMoisture < 70
        ? "Monitor soil; consider light irrigation"
        : "Soil moisture adequate";

  return (
    <DataBlock
      title="Irrigation & Soil"
      subtitle="Root-zone moisture and irrigation guidance"
      color="#10b981"
    >
      <div className="flex items-center gap-6 mb-3">
        <div>
          <div className="text-xs text-gray-500">Soil Moisture</div>
          <div className="text-3xl font-black text-blue-600">
            {data.soilMoisture}%
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Avg Soil Temp (14d)</div>
          <div className="text-3xl font-black text-gray-700">{soilAvg}°C</div>
        </div>
      </div>

      <div className="space-y-1">
        <InfoRow label="Irrigation Need" value={`${data.irrigationNeed}%`} />
        <InfoRow
          label="Drought Index"
          value={`${data.droughtIndex}/100`}
          statusColor={data.droughtIndex > 60 ? "#ef4444" : "#10b981"}
        />
      </div>

      <div className="mt-3 text-sm text-gray-700 p-2 bg-blue-50 rounded-lg">
        <span className="font-semibold">Advice:</span> {irrigationAdvice}.
      </div>
    </DataBlock>
  );
}

function CropHealthPanel({ data }) {
  const ndviAvg = (
    data.ndviTrend14.reduce((a, b) => a + b, 0) / data.ndviTrend14.length
  ).toFixed(2);
  const healthColor = data.cropHealthPct > 80 ? "#10b981" : "#f59e0b";

  return (
    <DataBlock
      title="Crop Health"
      subtitle="NDVI & vigor summary"
      color={healthColor}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500">NDVI (14d avg)</div>
          <div className="text-3xl font-black text-green-600">{ndviAvg}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Health Index</div>
          <div className="text-3xl font-black" style={{ color: healthColor }}>
            {data.cropHealthPct}%
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-sm font-bold text-gray-700">
          NDVI Trend (Last 14 Days)
        </div>
        <div className="mt-2 text-green-600 h-20">
          <Sparkline data={data.ndviTrend14} width={300} height={80} />
        </div>
      </div>

      <div className="text-[12px] text-gray-700 mt-2">
        Interpretation: High NDVI and Health Index indicate good growth. Look
        for sharp drops as signs of stress.
      </div>
    </DataBlock>
  );
}

function ForecastPanel({ data }) {
  const fungalValues = data.fungalRisk7Day.map((d) => d.value);
  const pestValues = data.pestRisk7Day.map((d) => d.value);

  return (
    <DataBlock
      title="7-day Risk Outlook"
      subtitle="Forecasted fungal, pest, and temperature trends"
      color="#f97316"
    >
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <div className="text-xs text-gray-500">Fungal Risk (Avg)</div>
          <div className="text-xl font-bold text-red-600">
            {Math.round(
              fungalValues.reduce((a, b) => a + b, 0) / fungalValues.length
            )}{" "}
            %
          </div>
          <div className="text-[12px] text-gray-600 mt-1">
            Trend: {fungalValues.join(" / ")}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Pest Risk (Avg)</div>
          <div className="text-xl font-bold text-amber-600">
            {Math.round(
              pestValues.reduce((a, b) => a + b, 0) / pestValues.length
            )}{" "}
            %
          </div>
          <div className="text-[12px] text-gray-600 mt-1">
            Trend: {pestValues.join(" / ")}
          </div>
        </div>
      </div>

      <div className="mt-2 pt-3 border-t">
        <div className="text-sm font-bold text-gray-700">
          Temperature Forecast (7d)
        </div>
        <div className="mt-2 text-[12px] text-gray-600">
          Min/Max:{" "}
          <strong className="text-gray-900">
            {Math.min(...data.tempForecast7).toFixed(1)}°C /{" "}
            {Math.max(...data.tempForecast7).toFixed(1)}°C
          </strong>
        </div>
      </div>
    </DataBlock>
  );
}

// ========================= Main Dashboard ===================================
export default function FarmerDashboard({ initialData = defaultMock }) {
  const [data] = useState(initialData);

  // Re-calculate variables needed for the first (legacy) ChartCard block
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

  const rainLastData = useMemo(
    () =>
      rainfallLast7.map((v, i) => ({
        label: `Day ${i + 1}`,
        value: v,
      })),
    [rainfallLast7]
  );

  const rainForecastData = useMemo(
    () =>
      rainfallForecast.map((v, i) => ({
        label: `Day ${i + 1}`,
        value: v,
      })),
    [rainfallForecast]
  );

  const tempForecastData = useMemo(
    () =>
      tempForecast.map((v, i) => ({
        label: `Day ${i + 1}`,
        value: v,
      })),
    [tempForecast]
  );

  const diseaseRiskScore = useMemo(
    () =>
      Math.min(
        100,
        Math.round(humidity * (1 + Math.max(0, 12 - windSpeed) / 12))
      ),
    [humidity, windSpeed]
  );

  const primaryColor = "#4f46e5"; // Indigo 600
  const secondaryColor = "#10b981"; // Emerald 600
  const errorColor = "#ef4444"; // Red 500

  return (
    <ContentWrapper>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Field Telemetry Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Actionable insights for weather, irrigation, spraying, scouting and
          crop health.
        </p>
      </header>

      {/* BLOCK 1: Weather & Climate Charts (Consolidated from original WeatherPanel JSX) */}
      <ChartCard title="Weather & Climate (Charts)">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temperature Card */}
          <div className="bg-gray-50 rounded-xl p-4  flex flex-col justify-between border">
            <div className=" flex items-center justify-between flex-wrap gap-3">
              <div className="p-1">
                <div className="text-sm text-gray-500">Current Temperature</div>
                <div className="text-3xl font-bold text-gray-900">
                  {tempNow}°C
                </div>
                <div className="text-xs text-gray-500">
                  7-day forecast trend
                </div>
              </div>
              <div className="w-full sm:w-40 h-24 p-2">
                <CustomAreaChart
                  data={tempForecastData}
                  dataKey="value"
                  color={primaryColor}
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-2 sm:gap-3">
              <MiniStat
                title="Degree Days (base 10°C)"
                value={`${degreeDaysBase10}`}
                hint="Phenology tracking"
              />
              <MiniStat
                title="Hail Events (30 days)"
                value={hailEvents}
                hint="Reported strikes"
              />
              <MiniStat
                title="Frost Risk"
                value={frostRisk ? "ALERT" : "Low"}
                hint={
                  frostRisk ? "Possible damaging frost" : "No frost expected"
                }
              />
            </div>
          </div>

          {/* Rainfall Card */}
          <div className="bg-gray-50 p-4 rounded-xl  flex flex-col justify-between border">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-sm text-gray-500">
                  Rainfall — Last 7 Days vs Forecast
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Last: {rainfallLast7.reduce((a, b) => a + b, 0).toFixed(1)} mm
                  / Forecast:{" "}
                  {rainfallForecast.reduce((a, b) => a + b, 0).toFixed(1)} mm
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <div className="text-xs text-gray-500 mb-1">
                  Last 7 Days (mm)
                </div>
                <CustomBarChart
                  data={rainLastData}
                  dataKey="value"
                  xKey="label"
                />
              </div>
              <div className="w-full sm:w-36">
                <div className="text-xs text-gray-500 mb-1">Forecast Trend</div>
                <CustomLineChart
                  data={rainForecastData}
                  dataKey="value"
                  color={secondaryColor}
                />
              </div>
            </div>
          </div>

          {/* Humidity & Risk Card */}
          <div className="bg-gray-50 p-4 rounded-xl  flex flex-col justify-between border">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-24 h-24 mx-auto sm:mx-0">
                <CustomDonutChart value={Math.round(humidity)} label="%" />
              </div>
              <div className="flex-1 min-w-[150px]">
                <div className="text-sm text-gray-500">
                  Relative Humidity & Wind
                </div>
                <div className="text-2xl font-semibold text-gray-900">
                  {humidity}%
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Wind: {windSpeed} km/h
                </div>
                <div className="mt-3 text-sm">
                  <div
                    className={`inline-block px-3 py-1 rounded-full font-medium ${
                      diseaseRiskScore > 75
                        ? "bg-red-500 text-white"
                        : diseaseRiskScore > 50
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    Disease Risk: {diseaseRiskScore}%
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-sm text-gray-500">
              <div className="flex items-center justify-between">
                <span>Heatwave Risk</span>
                <span
                  className={`font-semibold ${
                    heatwaveRisk
                      ? `text-[${errorColor}]`
                      : `text-[${secondaryColor}]`
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
                      ? `text-[${errorColor}]`
                      : `text-[${secondaryColor}]`
                  }`}
                >
                  {frostRisk ? "ALERT" : "OK"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* BLOCK 2: Actionable Intelligence Panels (from new FarmerDashboard JSX) */}
      <ChartCard title="Actionable Intelligence">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Weather Summary & Irrigation */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <WeatherSummary data={data} />
            <IrrigationPlanner data={data} />
          </div>

          {/* Right Column: Risk, Spray, Health, Forecast */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Risk & Application Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RiskMatrixFarmer data={data} />
              <ApplicationPlanner data={data} />
            </div>

            {/* Health & Forecast Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CropHealthPanel data={data} />
              <ForecastPanel data={data} />
            </div>

            {/* Advisories */}
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <strong className="text-base text-yellow-700">
                Regional Advisories:
              </strong>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                {data.regionalAdvisories.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-[12px] text-gray-500 text-right">
              Last updated: <span className="font-bold">Live</span> (using mock
              data).
            </div>
          </div>
        </div>
      </ChartCard>
    </ContentWrapper>
  );
}
