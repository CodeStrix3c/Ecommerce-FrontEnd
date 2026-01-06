import React, { useState } from "react";
import { ChevronDown, Check, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FilterDropdown = ({ onSelect, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ value: "All", label: "All" });

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option.value);
  };

  // Determine the display text based on selected value
  const displayText = selected.value === "All" ? "Filter" : selected.label;

  return (
    <div className="relative inline-block text-left">
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 w-44 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 bg-[var(--color-white)] border-[var(--color-gray)] text-[var(--color-black)]"
      >
        <span className="flex items-center gap-2">
          <Settings2
            size={18}
            strokeWidth={2}
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-[var(--color-black)] font-medium">
            {displayText}
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 text-[var(--color-secondary)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-xl border z-20 overflow-hidden"
            style={{
              backgroundColor: "var(--color-white)",
              borderColor: "var(--color-gray)",
            }}
          >
            <ul className="py-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all text-sm ${
                    selected.value === option.value
                      ? "bg-[var(--color-gray)] text-[var(--color-primary)] font-semibold"
                      : "hover:bg-[var(--color-gray)] text-[var(--color-black)]"
                  }`}
                >
                  {option.label}
                  {selected.value === option.value && (
                    <Check
                      size={16}
                      style={{ color: "var(--color-primary)" }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
