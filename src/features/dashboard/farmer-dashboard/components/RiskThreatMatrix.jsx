import DataBlock from "./DataBlock";
import InfoRow from "./InfoRow";

// components/RiskThreatMatrix.jsx
export default function RiskThreatMatrix({
  data,
  pestRiskColor,
  diseaseRiskColor,
  pestRiskStatus,
  diseaseRiskStatus,
  droughtColor,
  frostAlerts,
}) {
  return (
    <DataBlock
      title="🔴 Immediate Threat Matrix"
      subtitle="Current risk levels drive short-term fungicide/insecticide sales"
      color={pestRiskColor}
      className="col-span-2"
    >
      <div className="flex justify-around items-center mb-4 p-3 border-b border-gray-100">
        <div>
          <div className="text-sm text-[var(--color-gray)]">
            PEST INFESTATION
          </div>
          <div className="text-4xl font-black" style={{ color: pestRiskColor }}>
            {data.pestRisk}%
          </div>
          <div
            className="text-xs font-semibold"
            style={{ color: pestRiskColor }}
          >
            {pestRiskStatus} ALERT
          </div>
        </div>
        <div>
          <div className="text-sm text-[var(--color-gray)]">
            DISEASE PRESSURE
          </div>
          <div
            className="text-4xl font-black"
            style={{ color: diseaseRiskColor }}
          >
            {data.diseaseRiskScore}%
          </div>
          <div
            className="text-xs font-semibold"
            style={{ color: diseaseRiskColor }}
          >
            {diseaseRiskStatus} RISK
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
            Risk Drivers:
          </h4>
          <InfoRow
            label="Relative Humidity"
            value={`${data.humidity}%`}
            unit=""
            statusColor={diseaseRiskColor}
          />
          <InfoRow
            label="Dew Point"
            value={`${data.dewPoint}°C`}
            unit=""
            statusColor={diseaseRiskColor}
          />
          <InfoRow
            label="Wind Speed"
            value={`${data.windSpeed} km/h`}
            unit=""
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
            Sales Focus:
          </h4>
          <InfoRow
            label="Product Priority"
            value={
              data.diseaseRiskScore > 70
                ? "Fungicides (Systemic)"
                : "Insecticides"
            }
            statusColor="var(--color-primary)"
          />
          <InfoRow
            label="Drought Index"
            value={`${data.droughtIndex} / 100`}
            unit=""
            statusColor={droughtColor}
          />
          <InfoRow
            label="Frost Alerts (7D)"
            value={frostAlerts}
            unit="Days"
            statusColor={
              frostAlerts > 0 ? "var(--color-error)" : "var(--color-primary)"
            }
          />
        </div>
      </div>
    </DataBlock>
  );
}
