import React from "react";

export default function ProgressBar({
  value = 0,
  size = "md",
  label = "",
  showPercent = true,
  colorClass = "bg-gradient-to-r from-green-400 to-green-600",
  striped = false,
  animated = true,
  indeterminate = false,
}) {
  // clamp value between 0 and 100
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const containerHeight = sizes[size] || sizes.md;

  const transitionClass = animated && !indeterminate ? "transition-[width] duration-700 ease-in-out" : "";

  const stripeStyle = striped
    ? "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 10px, transparent 10px, transparent 20px)]"
    : "";

  return (
    <div className="w-full">
      {/* Optional label and percent */}
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700 truncate">{label}</div>
          {showPercent && (
            <div className="text-sm font-mono text-gray-600 ml-4">{indeterminate ? "—" : `${pct}%`}</div>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        className={`relative rounded-xl bg-gray-200/60 dark:bg-gray-700/40 overflow-hidden ${containerHeight}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : pct}
        aria-label={label || "progress"}
      >
        {/* Determinate fill */}
        {!indeterminate && (
          <div
            className={`absolute left-0 top-0 bottom-0 ${transitionClass} ${stripeStyle} ${colorClass}`}
            style={{ width: `${pct}%` }}
          />
        )}

        {/* Indeterminate animated fill */}
        {indeterminate && (
          <div className={`absolute inset-0 overflow-hidden`}> 
            <div
              className={`absolute left-[-40%] top-0 bottom-0 w-[40%] ${colorClass} ${stripeStyle} animate-[indeterminate_1.5s_linear_infinite]`}
              style={{
                // small inline keyframes using Tailwind's arbitrary value syntax requires global CSS in many setups.
                // If your build strips this, add this CSS in a global stylesheet:
                // @keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
              }}
            />
          </div>
        )}
      </div>

      {/* Optional small caption below */}
      <style>{`
        /* Fallback keyframes if your project doesn't include them already */
        @keyframes indeterminate { 0% { transform: translateX(-120%); } 100% { transform: translateX(220%); } }
        .animate-[indeterminate_1.5s_linear_infinite] { animation: indeterminate 1.5s linear infinite; }
      `}</style>
    </div>
  );
}
