import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import faqData from "../../data/faq.json";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const { heading, faqs } = faqData;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto pt-32 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-black)]">
        {heading}
      </h2>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-[var(--color-gray)] rounded-lg mb-3 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-5 py-3 flex justify-between items-center font-medium focus:outline-none text-[var(--color-black)]"
            >
              {faq.question}
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-[var(--color-black)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--color-black)]" />
              )}
            </button>

            {isOpen && (
              <div className="p-5 bg-[var(--color-white)] text-[var(--color-black)] border-t border-[var(--color-gray)]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Faq;
