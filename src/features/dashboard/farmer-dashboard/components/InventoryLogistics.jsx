import DataBlock from "./DataBlock";
import InfoRow from "./InfoRow";
import InventoryStatus from "./InventoryStatus";

// components/InventoryLogistics.jsx (Farmer-Focused)
export default function InventoryLogistics({ data, pestRiskColor }) {
  const fungicideStatus = data.inventory.fungicide.status;

  // Farmer-focused action
  const farmerAction =
    fungicideStatus === "CRITICAL" || fungicideStatus === "LOW"
      ? `Refill recommended: Your fungicide (${data.inventory.fungicide.sku}) may not be enough for the upcoming disease-risk window.`
      : "You have sufficient stock for current field requirements.";

  return (
    <DataBlock
      title="📦 Farm Input Stock Overview"
      subtitle="Current availability & next 4-week usage needs"
      color="var(--color-secondary)"
      className="col-span-12 lg:col-span-3"
    >
      <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
        Input Stock Status:
      </h4>

      <InventoryStatus
        item="Fungicide (Systemic)"
        data={data.inventory.fungicide}
      />
      <InventoryStatus
        item="Insecticide (Targeted)"
        data={data.inventory.insecticide}
      />
      <InventoryStatus
        item="Herbicide (Pre-E)"
        data={data.inventory.herbicide}
      />
      <InventoryStatus item="Foliar Nitrogen" data={data.inventory.foliarN} />
      <InventoryStatus
        item="Adjuvant (Surfactant)"
        data={data.inventory.adjuvant}
      />

      <h4 className="text-sm font-semibold mt-4 mb-2 text-[var(--color-black)]">
        Field Planning Insights:
      </h4>

      <InfoRow
        label="Disease Spray Readiness"
        value={fungicideStatus}
        unit=""
        statusColor={pestRiskColor}
      />

      <InfoRow label="Avg. Input Refill Frequency" value="4–6" unit="Weeks" />

      <InfoRow
        label="Chance of Input Shortage (Next 7 Days)"
        value="18%"
        unit=""
        statusColor="var(--color-error)"
      />

      <div className="mt-3 text-[10px] text-[var(--color-black)] leading-relaxed">
        <strong>Farmer Recommendation:</strong> {farmerAction}
      </div>
    </DataBlock>
  );
}
