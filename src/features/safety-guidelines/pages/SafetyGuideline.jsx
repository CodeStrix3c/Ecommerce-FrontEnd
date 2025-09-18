import React, { useState } from "react";
import {
  Pill,
  Sprout,
  Shield,
  Recycle,
  AlertTriangle,
  Droplets,
  Hand,
  ChevronDown,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SafetyGuideline() {
  const [open, setOpen] = useState(null);
  const [popupCategory, setPopupCategory] = useState(null);

  const toggleOpen = (id) => {
    setOpen(open === id ? null : id);
  };

  const guidelines = [
    {
      title: "Storage & Labeling",
      icon: Shield,
      category: "Storage",
      color: "bg-blue-100 text-blue-600",
      steps: [
        "Store medicines in cool, dry areas.",
        "Seal containers tightly & label clearly.",
        "Never reuse containers without cleaning.",
      ],
    },
    {
      title: "Handling Practices",
      icon: Hand,
      category: "Handling",
      color: "bg-yellow-100 text-yellow-600",
      steps: [
        "Wear gloves while handling herbs/chemicals.",
        "Avoid touching face, eyes, or mouth.",
        "Wash hands thoroughly after contact.",
      ],
    },
    {
      title: "Protective Measures",
      icon: Droplets,
      category: "Protection",
      color: "bg-red-100 text-red-600",
      steps: [
        "Wear protective masks to avoid inhaling powders.",
        "Use goggles when handling liquid extracts.",
        "Keep first-aid kit nearby.",
      ],
    },
    {
      title: "Environmental Safety",
      icon: Recycle,
      category: "Environment",
      color: "bg-green-100 text-green-600",
      steps: [
        "Dispose expired medicines safely.",
        "Avoid releasing chemicals into soil/water.",
        "Compost organic waste if possible.",
      ],
    },
    {
      title: "Cultivation & Harvesting",
      icon: Sprout,
      category: "Cultivation",
      color: "bg-emerald-100 text-emerald-600",
      steps: [
        "Wear protective clothing with pesticides.",
        "Harvest at safe, recommended times.",
        "Sanitize tools and containers.",
      ],
    },
    {
      title: "Medicine Usage Safety",
      icon: Pill,
      category: "Usage",
      color: "bg-purple-100 text-purple-600",
      steps: [
        "Follow prescribed dosages strictly.",
        "Keep medicines away from children/pets.",
        "Report allergic reactions immediately.",
      ],
    },
    {
      title: "Emergency Precautions",
      icon: AlertTriangle,
      category: "Emergency",
      color: "bg-orange-100 text-orange-600",
      steps: [
        "Know the nearest hospital/poison center.",
        "Clean spills with gloves & safe disposal.",
        "Seek medical help if accidental ingestion.",
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I take herbal medicines with regular prescriptions?",
      answer:
        "Always consult your doctor first. Some herbs may interact with prescribed drugs and reduce their effectiveness or cause side effects.",
    },
    {
      question: "What should I do if I miss a dose of my medicine?",
      answer:
        "Take it as soon as you remember. If it’s close to the next dose, skip the missed one — never double dose.",
    },
    {
      question: "How can I check if my medicine has expired?",
      answer:
        "Check the expiry date on the packaging. Expired medicines may lose effectiveness or become harmful.",
    },
    {
      question: "Is it safe to store medicine in the refrigerator?",
      answer:
        "Only if the label or doctor specifically recommends it. Most medicines should be kept at room temperature in a dry place.",
    },
    {
      question: "Can I share my prescribed medicines with others?",
      answer:
        "No, prescriptions are specific to each individual. Sharing can cause serious health risks.",
    },
  ];

  const categories = [
    "Storage",
    "Handling",
    "Protection",
    "Environment",
    "Cultivation",
    "Usage",
    "Emergency",
  ];

  const filteredGuidelines = guidelines.filter(
    (g) => g.category === popupCategory
  );

  return (
    <div className="min-h-screen bg-[var(--color-white)] py-8 px-4 sm:px-6 md:mt-28 lg:mt-36">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-3">
          Safety Guidelines for Plants & Medicines
        </h1>
        <p className="text-[var(--color-black)] text-sm sm:text-base max-w-2xl mx-auto">
          Quick safety modules to help you handle medicinal plants and products
          responsibly.
        </p>
      </header>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setPopupCategory(cat)}
            className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border bg-[var(--color-white)] text-[var(--color-black)] border-[var(--color-primary)] hover:bg-[var(--color-black-hover)] transition-all"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-14 sm:mb-16">
        {guidelines.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-[var(--color-white)] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col"
            >
              <div
                className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                <Icon className="w-6 sm:w-7 h-6 sm:h-7" />
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-[var(--color-black)] mb-3">
                {item.title}
              </h2>

              <ul className="list-disc pl-5 text-xs sm:text-sm md:text-base text-[var(--color-black)] space-y-1">
                {item.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupCategory && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--color-white)] rounded-2xl shadow-lg w-full sm:w-11/12 max-w-3xl p-4 sm:p-6 relative max-h-[80vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setPopupCategory(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[var(--color-black)] hover:[var(--color-black-hover)]"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <h2 className="text-lg sm:text-xl font-bold mb-4 text-[var(--color-black)]">
                {popupCategory} Guidelines
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredGuidelines.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-[var(--color-white)] rounded-xl shadow-md p-4 sm:p-5"
                    >
                      <div
                        className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center mb-3 ${item.color}`}
                      >
                        <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-[var(--color-black)]">
                        {item.title}
                      </h3>
                      <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm text-[var(--color-black)] space-y-1">
                        {item.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mt-14 sm:mt-16 px-2 sm:px-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-[var(--color-black)] mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl bg-[var(--color-white)] shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 text-left text-[var(--color-black)] text-sm sm:text-base font-medium hover:bg-[var(--color-white-hover)] transition"
              >
                {faq.question}
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-3 sm:pb-4 text-[var(--color-black)] text-xs sm:text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
