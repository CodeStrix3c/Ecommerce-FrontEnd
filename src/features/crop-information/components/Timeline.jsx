import React from "react";
import { Calendar } from "lucide-react";

export default function Timeline() {
  return (
    <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4 border">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[var(--color-secondary)]" />
        Seasonal Timeline
      </h3>
      <div className="mt-4">
        <div className="w-full bg-[var(--color-black-hover)] rounded-full h-3 relative">
          <div
            className="absolute left-0 top-0 h-3 rounded-full"
            style={{
              width: "40%",
              background: "linear-gradient(90deg,#34d399,#059669)",
            }}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Sowing Window</div>
            <div className="text-[var(--color-black)]">Oct 20 - Nov 20</div>
          </div>
          <div>
            <div className="font-medium">Harvest Window</div>
            <div className="text-[var(--color-black)]">Mar 10 - Apr 30</div>
          </div>
        </div>
      </div>
    </div>
  );
}
