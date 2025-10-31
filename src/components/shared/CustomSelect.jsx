import React from "react";
import { Settings2, SlidersHorizontal } from "lucide-react";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  className = "",
  label = "Filter by:",
}) {
  return (
    <div className={`flex flex-col space-y-1 w-full ${className}`}>
      {/* Label for clarity */}
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Filter Select Container */}
      <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Icon */}
        <Settings2
          className="w-5 h-5 text-gray-600 mr-2 cursor-pointer hover:text-[var(--color-secondary)] transition-colors"
          title="Filter Options"
        />

        {/* Select Dropdown */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-gray-800 focus:outline-none cursor-pointer"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
