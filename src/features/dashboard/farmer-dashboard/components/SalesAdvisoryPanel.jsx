import React from "react";
import CustomBarChart from "@/components/charts/CustomBarChart";
import { AlertTriangle, Bug, DollarSign, Droplets } from "lucide-react";

export default function SalesAdvisoryPanel({
  commonPests = [],
  regionalAdvisories = [],
  rainfallForecastData = [],
}) {
  const alerts = regionalAdvisories
    .filter((a) => a.includes("Alert:") || a.includes("Caution:"))
    .slice(0, 5);

  return (
    <div className="bg-[var(--color-white)]  rounded-2xl shadow-sm p-6 mt-6 transition-all hover:shadow-md">
      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
        <AlertTriangle
          className="text-[var(--color-primary)] opacity-80"
          size={20}
        />
        Regional Advisory & Sales Insights
      </h2>

      <p className="text-sm text-[var(--black)] mb-6 leading-relaxed">
        Translating technical agro-weather and pest forecasts into actionable
        regional sales talking points, helping representatives anticipate demand
        and optimize advisory timing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ========================== COLUMN 1: ACTION ALERTS ========================== */}
        <div className="rounded-xl border border-[var(--color-error)]/30 bg-[var(--color-white)] p-4 hover:shadow transition-all">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-[var(--color-error)]" size={18} />
            <h3 className="text-sm font-bold text-[var(--color-error)] uppercase tracking-wide">
              Immediate Action Alerts
            </h3>
          </div>

          <ul className="list-disc pl-5 text-xs space-y-2 max-h-64 overflow-y-auto text-[var(--color-error)] font-medium">
            {alerts.map((advice, index) => (
              <li key={index}>{advice}</li>
            ))}
            <li className="text-[10px] text-[var(--black)] italic">
              [Simulated]: High night humidity in Eastern fields — promote
              **Systemic Fungicide** pre-purchase.
            </li>
          </ul>
        </div>

        {/* ========================== COLUMN 2: PEST & DISEASE ========================== */}
        <div className="rounded-xl border border-[var(--color-secondary)]/30 bg-[var(--color-white)] p-4 hover:shadow transition-all">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="text-[var(--color-secondary)]" size={18} />
            <h3 className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-wide">
              Pest & Pathogen Focus
            </h3>
          </div>

          <div className="text-xs font-semibold mb-1 text-[var(--color-black)]">
            Top 5 Threats Driving Sales:
          </div>
          <ul className="list-disc pl-5 text-xs space-y-1 max-h-64 overflow-y-auto">
            {commonPests.slice(0, 5).map((pest, index) => (
              <li key={index} className="text-[var(--color-black)]">
                {pest}: Pressure **High** → Recommend{" "}
                <span className="font-semibold text-[var(--color-secondary)]">
                  {index < 3 ? "Insecticide" : "Fungicide"}
                </span>
                .
              </li>
            ))}
            <li className="text-[10px] text-[var(--black)] italic">
              [Simulated]: Corn Borer activity in Central fields — **Sell
              Larvicides** now.
            </li>
          </ul>

          {/* RAIN CHART */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="text-[var(--color-primary)]" size={16} />
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide">
                Water & Irrigation
              </h3>
            </div>
            <div className="text-xs font-semibold mb-1 text-[var(--color-black)]">
              14-Day Rain Forecast (mm):
            </div>
            <div className="h-20 w-full">
              <CustomBarChart
                data={rainfallForecastData}
                dataKey="value"
                xKey="label"
                color="var(--color-primary)"
              />
            </div>
          </div>
        </div>

        {/* ========================== COLUMN 3: SALES GOALS ========================== */}
        <div className="rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-white)] p-4 hover:shadow transition-all">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="text-[var(--color-primary)]" size={18} />
            <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide">
              Weekly Sales Goals
            </h3>
          </div>

          <div className="text-xs font-semibold mb-1 text-[var(--color-black)]">
            Prioritized Product Sales:
          </div>
          <ul className="list-disc pl-5 text-xs space-y-1 text-[var(--color-black)]">
            <li>Goal 1: Promote **Fungicide Pre-Purchase** (Wk 6–7 Risk).</li>
            <li>Goal 2: **Adjuvant Bundles** (High UV / Evaporation).</li>
            <li>Goal 3: **Drought Biostimulants** (Rising Drought Index).</li>
            <li className="text-[var(--black)]">
              Target farms with ~60% soil moisture — prioritize biostimulant
              calls.
            </li>
            <li className="text-[var(--black)]">
              Marketing focus: Wind-safe drone spray services.
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="text-sm font-bold mb-2 text-[var(--color-secondary)] uppercase tracking-wide">
              Efficacy & Uptake
            </h3>
            <ul className="list-disc pl-5 text-xs space-y-1 text-[var(--color-black)]">
              <li>
                High **Bioavailability Index** — foliar uptake efficiency
                strong.
              </li>
              <li>
                Favor spray windows with low **Wind** & **Inversion Risk**.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
