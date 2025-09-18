import React from "react";
import { Bug } from "lucide-react";

export default function PestAlert() {
  return (
    <div className="bg-[var(--color-white)] rounded-2xl shadow-sm ">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Bug className="h-5 w-5 text-[var(--color-secondary)]" />
        Pest & Disease Alerts
      </h3>
      <div className="mt-4 p-3 rounded-lg border">
        <div className="font-medium">Armyworm activity nearby</div>
        <div className="mt-1 text-sm text-[var(--color-black)]">
          Reports of armyworm in neighboring district.
        </div>
        <div className="mt-2 text-sm text-[var(--color-black)]">
          Suggested: Scout fields twice a week and apply treatment if needed.
        </div>
      </div>
    </div>
  );
}
