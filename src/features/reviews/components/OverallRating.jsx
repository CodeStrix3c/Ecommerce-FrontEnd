import React from "react";
import {
  SprayCan,
  CheckCircle,
  Key,
  MessageSquare,
  Map,
  Tag,
} from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function OverallRating() {
  const ratingBars = [
    { stars: 5, value: "w-[85%]" },
    { stars: 4, value: "w-[5%]" },
    { stars: 3, value: "w-[0%]" },
    { stars: 2, value: "w-[0%]" },
    { stars: 1, value: "w-[0%]" },
  ];

  const categories = [
    { label: "Cleanliness", score: 4.9, icon: <SprayCan size={24} /> },
    { label: "Accuracy", score: 4.9, icon: <CheckCircle size={24} /> },
    { label: "Check-in", score: 4.9, icon: <Key size={24} /> },
    { label: "Communication", score: 5.0, icon: <MessageSquare size={24} /> },
    { label: "Location", score: 5.0, icon: <Map size={24} /> },
    { label: "Value", score: 4.9, icon: <Tag size={24} /> },
  ];

  return (
  <ContentWrapper>
      <div className="w-full max-w-6xl mx-auto mt-6 border-b border-[var(--color-border)] pb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left: Overall rating bars */}
        <div className="hidden md:block w-full md:w-[22%]">
          <h3 className="font-bold mb-3 text-[15px] text-[var(--color-neutral-dark)]">
            Overall rating
          </h3>
          <div className="space-y-1">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-2">
                <span className="w-4 text-[13px] text-[var(--color-neutral-dark)]">
                  {bar.stars}
                </span>
                <div className="flex-1 bg-[var(--color-border)] h-[1px] rounded">
                  <div
                    className={`h-[3px] rounded bg-[var(--color-black)] ${bar.value}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Categories - Desktop */}
        <div className="hidden md:grid flex-1 grid-cols-6">
          {categories.map((cat, index) => (
            <div
              key={cat.label}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 ${
                index !== 0 ? "border-l border-[var(--color-border)]" : ""
              }`}
            >
              <p className="font-bold text-[15px] text-[var(--color-neutral-dark)]">
                {cat.label}
              </p>
              <span className="text-[17px] font-bold text-[var(--color-neutral-dark)]">
                {cat.score}
              </span>
              <span className="text-[var(--color-neutral-dark-hover)] font-bold mt-2">
                {cat.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile view */}
        <div className="grid grid-cols-2 gap-4 w-full md:hidden">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center justify-center bg-[var(--color-bg)] rounded-2xl shadow-md p-4"
            >
              <span className="text-[var(--color-neutral-dark-hover)] mb-1">
                {cat.icon}
              </span>
              <p className="font-semibold text-sm text-[var(--color-neutral-dark)]">
                {cat.label}
              </p>
              <span className="text-lg font-bold text-[var(--color-neutral-dark)]">
                {cat.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ContentWrapper>
  );
}
