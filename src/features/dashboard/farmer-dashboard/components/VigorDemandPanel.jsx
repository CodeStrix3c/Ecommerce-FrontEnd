import CustomDonutChart from "@/components/charts/CustomDonutChart";
import DataBlock from "./DataBlock";
import InfoRow from "./InfoRow";

// components/VigorDemandPanel.jsx
export default function VigorDemandPanel({
  data,
  droughtColor,
  droughtStatus,
}) {
  const soilMoistureColor =
    data.soilMoisture < 50 ? "var(--color-secondary)" : "var(--color-primary)";

  return (
    <DataBlock
      title="🌿 Vigor & Nutrient Demand"
      subtitle="Fertilizer/Biostimulant sales triggers"
      color="var(--color-primary)"
      className="col-span-1"
    >
      <div className="flex justify-around items-center mb-3">
        <div className="w-14 h-14">
          <CustomDonutChart
            value={data.cropHealth}
            label="Health"
            color="var(--color-primary)"
          />
        </div>
        <div>
          <div className="text-sm text-[var(--color-gray)]">
            Irrigation Need
          </div>
          <div className="text-2xl font-black text-[var(--color-secondary)]">
            {data.irrigationNeed}%
          </div>
        </div>
      </div>
      <InfoRow
        label="Soil Moisture"
        value={`${data.soilMoisture}%`}
        unit="(Root Zone)"
        statusColor={soilMoistureColor}
      />
      <InfoRow
        label="Drought Status"
        value={`${droughtStatus} Level`}
        unit=""
        statusColor={droughtColor}
      />
      <div className="mt-3 text-[10px] text-[var(--color-black)]">
        **Action:** Push **high-N foliar products** due to strong vigor (NDVI)
        and **water-saving products** (Biostimulants) due to **{droughtStatus}**
        watch.
      </div>
    </DataBlock>
  );
}
