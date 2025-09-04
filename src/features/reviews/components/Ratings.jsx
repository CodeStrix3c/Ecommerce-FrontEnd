import React from "react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";

export default function RatingSummary() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <LeafTitleBlock title="4.8" leafSize="lg" titleSize="lg" />
        <h2 className="mt-3 text-xl font-semibold text-neutral-900 md:text-2xl">
          Guest favorite
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 md:text-base">
          This home is in the top 5% of eligible listings based on ratings,
          reviews, and reliability.
        </p>
      </div>
    </div>
  );
}
