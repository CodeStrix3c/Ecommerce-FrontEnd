import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are your pesticides safe for the environment?",
    answer:
      "Yes. All Ziraat products are formulated to be environmentally responsible. Each product undergoes rigorous safety testing to ensure it does not harm beneficial insects, pollinators, or soil microorganisms. We focus on eco-safe ingredients that break down naturally, leaving no harmful residues. Farmers can use our solutions confidently, knowing they help protect both crops and the ecosystem.",
  },
  {
    question: "Do your products work for all orchard crops?",
    answer:
      "Our pesticide solutions are specifically designed for a wide range of orchard crops such as apples, mangoes, oranges, and pomegranates. Each formulation is tested for crop compatibility and pest resistance. We also provide tailored recommendations based on local climate, pest type, and soil conditions to help farmers achieve maximum yield and plant health.",
  },
  {
    question: "Can I buy products directly from Ziraat?",
    answer:
      "Yes, farmers can conveniently purchase our products directly through the official Ziraat website. We also have a network of verified distributors and field representatives across India who provide genuine products and personalized assistance. Online orders are delivered quickly and securely, ensuring farmers get the right solutions exactly when they need them.",
  },
  {
    question: "Do you provide field consultation or support?",
    answer:
      "Absolutely! Ziraat believes in guiding farmers beyond just product use. Our agronomy experts provide on-field consultations, pest and disease diagnosis, spray schedule planning, and nutrient management guidance. Farmers can also contact us through our helpline or WhatsApp support for real-time assistance and customized recommendations.",
  },
  {
    question: "Where are your products manufactured?",
    answer:
      "All Ziraat products are proudly made in India in state-of-the-art facilities that follow ISO and GMP standards. Our production process emphasizes safety, precision, and sustainability. We combine modern agricultural research with eco-friendly formulations to deliver high-quality solutions that meet the needs of Indian farmers while protecting the environment.",
  },
  {
    question: "Do your products help reduce pest resistance?",
    answer:
      "Yes. Ziraat’s formulations are developed using advanced chemistry and integrated pest management (IPM) principles. By rotating active ingredients and combining bio-based components, our products help prevent resistance build-up in pests and fungi, ensuring long-term effectiveness and healthier crops season after season.",
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
      <div className=" mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg ">
          Find answers to common questions about our eco-friendly orchard care
          products and services.
        </p>
      </div>

      {/* FAQ List */}
      <div className="mx-auto space-y-4">
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
                className={`w-5 h-5 text-[var(--color-black)] transform transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
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
