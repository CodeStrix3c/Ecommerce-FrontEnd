import React from "react";
import { HelpCircle } from "lucide-react";

export default function FaqCard({ question, answer }) {
  console.log(question, answer);

  return (
    <div className="p-5 md:p-6 border rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center mb-2 gap-2">
        <HelpCircle className="text-[var(--color-secondary)]" size={20} />
        <h3 className="font-semibold text-base md:text-lg">{question}</h3>
      </div>
      <p className="text-[var(--color-black)] text-sm sm:text-base">{answer}</p>
    </div>
  );
}
