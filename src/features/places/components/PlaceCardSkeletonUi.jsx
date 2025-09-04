import React from "react";
import Skeleton from "react-loading-skeleton";

function PlaceCardSkeletonUi() {
  return (
    <div className="h-full">
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="absolute left-2 top-2">
          <Skeleton width={80} height={20} borderRadius={12} />
        </div>
        <div className="absolute right-2 top-2">
          <Skeleton circle width={28} height={28} />
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <Skeleton height={18} width="80%" />
        <Skeleton height={14} width="60%" />

        <div className="mt-1 flex items-center justify-between">
          {/* <Skeleton height={14} width="55%" /> */}
          <Skeleton height={14} width={130} />
        </div>
      </div>
    </div>
  );
}

export default PlaceCardSkeletonUi;
