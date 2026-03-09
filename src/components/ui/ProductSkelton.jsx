import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <div className="space-y-3">

      {/* Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Price */}
      <Skeleton height={18} width="40%" />

      {/* Stars */}
      <Skeleton height={14} width="30%" />

      {/* Title / Name */}
      <Skeleton height={14} width="60%" />

   

    </div>
  );
};

export default ProductSkeleton;