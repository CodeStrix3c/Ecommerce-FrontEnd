import React, { useState } from "react";
import SectionCard from "./SectionCard";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");

  const options = ["light", "dark", "system"];

  return (
    <SectionCard title="Appearance">
      <p className="text-sm text-gray-600 mb-3">
        Customize how the application looks on your device.
      </p>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="theme"
              value={option}
              checked={theme === option}
              onChange={() => setTheme(option)}
            />
            <span className="capitalize text-sm">{option} Mode</span>
          </label>
        ))}
      </div>

      <button className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded text-sm">
        Save Preferences
      </button>
    </SectionCard>
  );
};

export default AppearanceSettings;