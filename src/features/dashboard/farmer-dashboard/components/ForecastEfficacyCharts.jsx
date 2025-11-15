import CustomLineChart from "@/components/charts/CustomLineChart";
import InfoRow from "./InfoRow";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import DataBlock from "./DataBlock";

// components/ForecastEfficacyCharts.jsx
export default function ForecastEfficacyCharts({
  data,
  fungalRiskData,
  ndviData,
  soilTemp,
}) {
  const dropletEvaporationColor =
    data.dropletEvaporationRate > 0.5
      ? "var(--color-error)"
      : "var(--color-primary)";
  const uvIndexColor =
    data.uvIndex > 7 ? "var(--color-error)" : "var(--color-primary)";

  return (
    <DataBlock
      title="📈 Extended Forecast & Efficacy"
      subtitle="Data supporting long-term campaign planning"
      color="var(--color-secondary)"
      className="col-span-12 lg:col-span-3"
    >
      <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
        Risk Trajectory:
      </h4>
      <div className="h-28 w-full mb-3">
        <CustomAreaChart
          data={fungalRiskData}
          dataKey="value"
          color="var(--color-error)"
        />
      </div>
      <p className="text-[10px] text-[var(--color-gray)] mt-1 mb-3">
        **Fungal Risk** trend shows a clear peak in Week 7, supporting bulk
        order timing.
      </p>

      <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
        Vigor & Climate:
      </h4>
      <div className="h-24 w-full mb-3">
        <CustomLineChart
          data={ndviData}
          dataKey="value"
          color="var(--color-primary)"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InfoRow
          label="Droplet Evaporation"
          value={`${data.dropletEvaporationRate}%/min`}
          unit=""
          statusColor={dropletEvaporationColor}
        />
        <InfoRow
          label="Bioavailability Index"
          value={data.bioavailabilityIndex}
          unit=""
        />
        <InfoRow
          label="UV Index Max"
          value={data.uvIndex}
          unit=""
          statusColor={uvIndexColor}
        />
        <InfoRow
          label="Avg. Soil Temp (14D)"
          value={`${(soilTemp.reduce((a, b) => a + b, 0) / soilTemp.length).toFixed(1)}°C`}
          unit=""
        />
      </div>
    </DataBlock>
  );
}
