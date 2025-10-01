import React, { useState } from "react";
import { HelpCircle, ChevronRight, ChevronDown } from "lucide-react";

export default function FaqCard({ question, answer, opened = false }) {
  const [isOpen, setIsOpen] = useState(opened);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="p-5 md:p-6 border rounded-xl transition">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full text-left gap-2"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="text-[var(--color-secondary)]" size={20} />
          <h3 className="font-semibold text-base md:text-lg">{question}</h3>
        </div>
        {isOpen ? (
          <ChevronDown size={18} className="text-[var(--color-black)]" />
        ) : (
          <ChevronRight size={18} className="text-[var(--color-black)]" />
        )}
      </button>

      {isOpen && (
        <p className="mt-3 text-[var(--color-black)] text-sm sm:text-base">
          {answer}
        </p>
      )}
    </div>
  );
}
