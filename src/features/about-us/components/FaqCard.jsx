import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are your pesticides safe for the environment?",
    answer:
      "Yes. All Ziraat products are eco-safe and tested to ensure minimal environmental impact. They are designed to protect crops without harming beneficial insects or soil quality.",
  },
  {
    question: "Do your products work for all orchard crops?",
    answer:
      "Our pesticide solutions are tailored for orchard fruits such as apples, mangoes, oranges, and pomegranates. We also offer crop-specific recommendations for best results.",
  },
  {
    question: "Can I buy products directly from Ziraat?",
    answer:
      "Yes, farmers can buy directly through our website or connect with our authorized field representatives and distributors across India.",
  },
  {
    question: "Do you provide field consultation or support?",
    answer:
      "Absolutely! Our agronomy experts offer field visits, pest diagnosis, and crop protection advice to help farmers make informed decisions.",
  },
  {
    question: "Where are your products manufactured?",
    answer:
      "All Ziraat products are proudly made in India, developed using cutting-edge agricultural research and sustainable production practices.",
  },
];

const FAQCard = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg ">
          Find answers to common questions about our eco-friendly orchard care
          products and services.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--color-gray)] rounded-md  shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-left p-4 sm:p-5"
            >
              <h3 className="font-semibold text-base sm:text-lg">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-[var(--color-secondary)] transform transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === i && (
              <div className="px-4 sm:px-5 pb-4  leading-relaxed border-t  text-sm sm:text-base">
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
