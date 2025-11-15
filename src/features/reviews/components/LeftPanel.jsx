import React from "react";
import {
  SprayCan,
  CheckCircle,
  Key,
  MessageCircle,
  Map,
  Tag,
} from "lucide-react";
import leftLeaf from "/assets/images/left-leaf.png";
import rightLeaf from "/assets/images/right-leaf.png";
import RatingSummary from "./Ratings";

export default function LeftPanel() {
  const overall = 4.96;
  const totalReviews = 67;

  const distribution = { 5: 60, 4: 5, 3: 1, 2: 1, 1: 0 };

  const subRatings = [
    {
      label: "Cleanliness",
      score: 5.0,
      icon: <SprayCan className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
    {
      label: "Accuracy",
      score: 5.0,
      icon: <CheckCircle className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
    {
      label: "Check-in",
      score: 5.0,
      icon: <Key className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
    {
      label: "Communication",
      score: 5.0,
      icon: <MessageCircle className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
    {
      label: "Location",
      score: 4.9,
      icon: <Map className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
    {
      label: "Value",
      score: 4.9,
      icon: <Tag className="h-5 w-5 text-[var(--color-secondary)]" />,
    },
  ];

  return (
    <>
      {/* ---------- Desktop View ---------- */}
      <div className="custom-scrollbar hidden overflow-y-auto border-r border-gray-200 bg-white p-6 md:block">
        <RatingSummary />

        {/* Star Distribution */}
        <div className="w-72 mx-auto mb-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-5 text-sm text-gray-800 font-medium">{star}</span>
              <div className="relative h-2 flex-1 rounded-full bg-gray-200">
                <div
                  className="absolute h-2 rounded-full bg-[var(--color-secondary)] transition-all"
                  style={{
                    width: `${(distribution[star] / totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub Ratings */}
        <div className="grid grid-cols-1 gap-4">
          {subRatings.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-semibold text-gray-800">
                  {item.label}
                </span>
              </div>
              <span className="text-base font-bold text-[var(--color-secondary)]">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile View ---------- */}
      <div className="block p-5 md:hidden">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <img src={leftLeaf} alt="left leaf" className="h-8 w-8" />
            <p className="text-4xl font-extrabold text-gray-800">{overall}</p>
            <img src={rightLeaf} alt="right leaf" className="h-8 w-8" />
          </div>
          <p className="mt-2 font-semibold text-gray-700">Guest favourite</p>
          <p className="text-xs text-gray-600">Based on {totalReviews} reviews</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {subRatings.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm hover:shadow-md transition"
            >
              {item.icon}
              <span className="mt-2 text-sm font-semibold text-gray-800">
                {item.label}
              </span>
              <span className="text-base font-bold text-[var(--color-secondary)]">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
