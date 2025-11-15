import React from "react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";

export default function RatingSummary() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <LeafTitleBlock title="4.8" leafSize="lg" titleSize="lg" />

        <h2 className="mt-3 text-xl font-semibold text-[var(--color-neutral-dark)] md:text-2xl">
          Farmers favorite
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-neutral-dark-hover)] md:text-base">
         This brand stands in the top 5% of farmer favourites for reliability and results
        </p>
      </div>
    </div>
  );
}
