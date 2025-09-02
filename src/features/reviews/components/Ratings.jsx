import React from 'react';
import leftLeaf from '/assets/images/left-leaf.png';
import rightLeaf from '/assets/images/right-leaf.png';

export default function RatingSummary() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        {/* Rating with leaves */}
        <div className="flex items-center justify-center gap-1">
          <img
            src={leftLeaf}
            alt="left leaf"
            className="h-28 w-14 opacity-90 md:h-44 md:w-24"
          />
          <h1 className="mb-4 flex items-center text-7xl font-semibold text-neutral-900 md:text-8xl">
            4.93
          </h1>
          <img
            src={rightLeaf}
            alt="right leaf"
            className="h-28 w-14 opacity-90 md:h-44 md:w-24"
          />
        </div>

        {/* Subtitle */}
        <h2 className="mt-3 text-xl font-semibold text-neutral-900 md:text-2xl">
          Guest favorite
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 md:text-base">
          This home is in the top 5% of eligible listings based on ratings,
          reviews, and reliability.
        </p>
      </div>
    </div>
  );
}
