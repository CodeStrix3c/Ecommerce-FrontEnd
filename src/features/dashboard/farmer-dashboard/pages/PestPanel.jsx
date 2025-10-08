import React from "react";

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen  p-6 bg-[var(--color-white)]">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-black)] tracking-tight">
            Pest and Disease Management
          </h1>
          <span className="text-sm text-[var(--color-black)] bg-white-50 border border-gray px-3 py-1 rounded-lg mt-2 md:mt-0">
            Region: Admin-fed
          </span>
        </header>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Pest Incidence (per 100 trees)"
            value="12.5"
            color="black"
          />
          <MetricCard
            title="Disease Incidence Rate (%)"
            value="4.2%"
            color=""
          />

          <div className="bg-[var(--color-white)] p-2 rounded-2xl shadow-sm border border-white backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-black)]">
                Spray Compliance vs Advisory
              </h3>
              <button className="text-xs px-2 py-1 rounded-md border border-gray text-[var(--color-black)] ">
                Update
              </button>
            </div>
            <div className="text-3xl font-bold text-[var(--color-black)]">93.7%</div>
            <div className="mt-3">
              <SmallBar value={93.7} />
              <div className="mt-2 text-xs text-gray ">
                Sprayed: 75 / Scheduled: 80
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[var(--color-white)] p-5 rounded-2xl shadow-md border border-emerald-100 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-[var(--color-black)] mb-2">
              Pest/Disease Risk Level
            </h3>
            <RiskPill level="Medium" />
            <div className="mt-4 text-sm text-[var(--color-black)]">
              <p className="font-medium mb-1">Why :</p>
              <ul className="list-disc pl-5 space-y-1 ">
                <li>Pest load: 12.5 per 100 trees</li>
                <li>Disease rate: 4.2%</li>
                <li>Spray compliance: 93.7%</li>
              </ul>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-gray text-sm text-[var(--color-black)] border border-gray-200">
              Possible resistance detected: frequent use of Pyrethroid A.  
              Consider rotating modes of action and integrated pest management.
            </div>
          </div>

          <div className="bg-[var(--color-white)] p-5 rounded-2xl shadow-md border border-emerald-100 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-[var(--color-black)] mb-2">
              Photo Diagnoses
            </h3>
            <div className="text-4xl font-bold text-[var(--color-black)]">2</div>
            <div className="mt-2 text-xs text-[var(--color-black)]">
              Average response time: 6.8 hrs
            </div>
            <div className="mt-5">
              <button className="w-full text-sm py-2 rounded-lg border border-gray-50 text-[var(--color-white)] bg-[var(--color-primary)]">
                Add Photo Diagnosis
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[var(--color-white)] p-5 rounded-2xl shadow-md border border-white backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-[var(--color-black)] mb-3">
            Recent Photo Diagnoses
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-t border-emerald-50">
              <thead>
                <tr className="text-sm text-[var(--color-black)]uppercase">
                  <th className="py-2">Farmer</th>
                  <th className="py-2">Title</th>
                  <th className="py-2">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y ">
                <tr className="text-gray">
                  <td className="py-3">Ravi</td>
                  <td className="py-3">Leaf spots</td>
                  <td className="py-3">2025-10-01 08:20</td>
                </tr>
                <tr className="">
                  <td className="py-3">Sita</td>
                  <td className="py-3">Wilting</td>
                  <td className="py-3">2025-10-02 11:45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

       
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-[var(--color-black)] text-md shadow-sm border border-sm bg-[var(--color-error)]">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg text-[var(--color-black)] text-md shadow-sm border border-sm  bg-[var(--color-primary)]">
            Edit Advisory Schedule
          </button>
        </div>
      </div>
    </div>
  );
}


function MetricCard({ title, value, color }) {
  const dotColor =
    color === "brown"
      ? "text-[vatr(--color-secondary)]"
      : color === "brown"
      ? "text-[var(--color-secondary)]"
      : "text-[var(--color-secondary)]";
  return (
    <div className="bg-[var(--color-white)] p-5 rounded-2xl shadow-md border border-emerald-100 backdrop-blur-sm flex items-start justify-between">
      <div>
        <div className="text-sm text-[var(--color-black)]">{title}</div>
        <div className="mt-2 text-3xl font-bold text-[var(--color-black)]">{value}</div>
      </div>
      <div className={`${dotColor} text-2xl`}>●</div>
    </div>
  );
}

function SmallBar({ value = 0 }) {
  return (
    <div className="w-full h-3 bg-[var(--color-secondary)] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, text-[var(--color-secondary)])`,
        }}
      />
    </div>
  );
}

function RiskPill({ level }) {
  const classes = {
    Low: " bg-white text-[var(--color-secondary)] border border-gray",
    Medium: "bg-white text-[var(--color-black)] border border-gray",
    High: "bg-white text-[var(--color-secondary)] border border-gray",
  };
  const dotColor = "brown"
    level === "High"
      ? "#ef4444"
      : level === "Medium"
      ? ""
      : "";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-sm ${classes[level]}`}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: dotColor }}
      />
      <span>{level}</span>
    </div>
  );
}
