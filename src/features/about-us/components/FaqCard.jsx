import React, { useState } from "react";
import { ChevronDown } from "lucide-react";


const FAQCard = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-10 px-4 sm:px-8 md:px-16 lg:px-24">

      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg ">
          Find answers to common questions about our eco-friendly orchard care
          products and services.
        </p>
      </div>


      <div className="max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--color-gray)] rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-left p-4 sm:p-5"
            >
              <h3 className="font-medium text-md">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-[var(--color-black)] transform transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                  }`}
              />
            </button>

            {openIndex === i && (
              <div className="px-4 sm:px-5 pb-4 leading-relaxed text-base lg:text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQCard;
