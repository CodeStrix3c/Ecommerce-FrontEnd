import DataBlock from "./DataBlock";
import InfoRow from "./InfoRow";

// components/ApplicationAdvisory.jsx
export default function ApplicationAdvisory({
  data,
  sprayAdvice,
  sprayAdviceColor,
  windGustMax,
  inversionRisk,
}) {
  // Determine the most critical weather alert
  const criticalAlerts = [];
  if (data.windGustMax > 15) criticalAlerts.push("HIGH WIND DRIFT RISK");
  if (data.inversionRisk === "High")
    criticalAlerts.push("SEVERE INVERSION RISK");
  if (data.uvIndex > 7) criticalAlerts.push("HIGH UV DEGRADATION");
  if (data.rainfallForecast14[0] > 5)
    criticalAlerts.push("RAIN FASTNESS REQUIRED TODAY");

  return (
    <DataBlock
      title="💨 Application Window & Safety"
      subtitle="Optimal scheduling to reduce drift and maximize efficacy"
      color={sprayAdviceColor}
      className="col-span-1"
    >
      <div className="text-center mb-3">
        <div className="text-sm text-[var(--color-gray)]">SPRAY ADVICE:</div>
        <div
          className="text-2xl font-black mt-1"
          style={{ color: sprayAdviceColor }}
        >
          {sprayAdvice}
        </div>
        <div className="text-sm font-bold mt-1 text-[var(--color-black)]">
          Optimal Hrs: {data.optimalSprayHrsToday?.join(" & ")}
        </div>
      </div>

      <h4 className="text-sm font-semibold mb-2 text-[var(--color-black)]">
        Farmer Weather Alert:
      </h4>
      <div
        className={`p-2 rounded-md mb-3 text-xs font-semibold ${criticalAlerts.length > 0 ? "bg-[var(--color-error)]/[0.1] text-[var(--color-error)]" : "bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)]"}`}
      >
        {criticalAlerts.length > 0
          ? `🛑 ALERT: ${criticalAlerts?.join(" / ")}`
          : "✅ Clear for Application during Optimal Hrs."}
      </div>

      <InfoRow
        label="Max Wind Gust"
        value={`${windGustMax} km/h`}
        unit="(Drift)"
        statusColor={
          windGustMax > 15 ? "var(--color-error)" : "var(--color-primary)"
        }
      />
      <InfoRow
        label="Inversion Risk"
        value={inversionRisk}
        unit=""
        statusColor={
          inversionRisk === "Moderate"
            ? "var(--color-secondary)"
            : "var(--color-primary)"
        }
      />
      <div className="mt-3 text-[10px] text-[var(--color-black)]">
        **Action:** Advise customers to utilize **adjuvants** to counter high
        evaporation/UV, and to only spray during the **Optimal Hours**.
      </div>
    </DataBlock>
  );
}
