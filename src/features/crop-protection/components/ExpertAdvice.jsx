import React from "react";
import { MessageCircle } from "lucide-react";

export default function ExpertAdvice() {
  return (
    <div className="bg-[var(--color-white)] rounded-2xl shadow-sm p-4  border">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-[var(--color-secondary)]" />
        Expert Advice
      </h3>
      <div className="mt-4 text-sm text-[var(--color-black)]">
        For this region, consider split application of nitrogen and monitor soil
        moisture closely during early tillering.
      </div>
    </div>
  );
}
