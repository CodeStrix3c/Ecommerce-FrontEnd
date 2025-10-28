import React from "react";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = null,
  className = "",
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        px-3 py-2 border rounded-sm w-full bg-[var(--color-white)] 
        border-[var(--color-gray)] focus:outline-none ] 
        ${className}
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
