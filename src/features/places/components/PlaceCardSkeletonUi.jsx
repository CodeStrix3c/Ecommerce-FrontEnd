import React from "react";
import Skeleton from "react-loading-skeleton";

function PlaceCardSkeletonUi() {
  return (
    <div className="h-full">
      <div className="relative">
        <Skeleton height={180} className="rounded-xl" />
      </div>
      <div className="mt-2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
        <div className="mt-1 flex items-center justify-between">
          <Skeleton height={15} width={80} />
          <Skeleton height={15} width={40} />
        </div>
      </div>
    </div>
  );
}

export default PlaceCardSkeletonUi;
