import React from "react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";

export default function RatingSummary() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 border border-lg border-[var(--color-gray)] rounded-2xl bg-[var(--color-white)] shadow-lg">
      <div className="text-center">
        <LeafTitleBlock title="4.8" leafSize="md" titleSize="md" />
        {/* <h1 className="font-bold text-[50px]">4.8</h1> */}

        <h2 className="mt-3 text-xl font-semibold text-[var(--color-neutral-dark)] md:text-xl">
          Top Rated Art & Craft Products
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-neutral-dark-hover)] md:text-base">
          These products are in the top 5% of art & craft items for quality,
          creativity, and customer satisfaction.
        </p>
      </div>
    </div>
  );
}
