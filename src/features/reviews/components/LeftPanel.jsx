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
      icon: <SprayCan className="h-5 w-5 text-[var(--color-black)]" />,
    },
    {
      label: "Accuracy",
      score: 5.0,
      icon: <CheckCircle className="h-5 w-5 text-[var(--color-black)]" />,
    },
    {
      label: "Check-in",
      score: 5.0,
      icon: <Key className="h-5 w-5 text-[var(--color-black)]" />,
    },
    {
      label: "Communication",
      score: 5.0,
      icon: <MessageCircle className="h-5 w-5 text-[var(--color-black)]" />,
    },
    {
      label: "Location",
      score: 4.9,
      icon: <Map className="h-5 w-5 text-[var(--color-black)]" />,
    },
    {
      label: "Value",
      score: 4.9,
      icon: <Tag className="h-5 w-5 text-[var(--color-black)]" />,
    },
  ];

  return (
    <>
      <div className="custom-scrollbar hidden overflow-y-auto border-r p-6 md:block">
        <RatingSummary />

        <div className="w-70 mx-auto mb-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="w-4 text-sm text-[var(--color-black)]">{star}</span>
              <div className="h-2 flex-1 rounded ">
                <div
                  className="h-2 rounded bg-black"
                  style={{
                    width: `${(distribution[star] / totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 justify-center gap-5 space-y-2">
          {subRatings.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-semibold text-[var(--color-black)]">
                  {item.label}
                </span>
              </div>
              <span className="text-lg">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="block p-4 md:hidden">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <img src={leftLeaf} alt="left leaf" className="h-8 w-8" />
            <p className="text-5xl font-bold">{overall}</p>
            <img src={rightLeaf} alt="right leaf" className="h-8 w-8" />
          </div>
          <p className="mt-2 font-medium text-[var(--color-black)]">Guest favourite</p>
          <p className="text-xs text-[var(--color-black)]">
            Based on {totalReviews} reviews
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {subRatings.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl  p-3 shadow-md"
            >
              {item.icon}
              <span className="mt-1 text-sm font-semibold text-[var(--color-black)]">
                {item.label}
              </span>
              <span className="text-lg font-bold">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
