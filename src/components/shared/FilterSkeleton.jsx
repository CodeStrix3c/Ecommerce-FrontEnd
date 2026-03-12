import React from "react";
import Skeleton from "react-loading-skeleton";

const FilterSkeleton = () => {
  return (
    <div className="space-y-6">

      {/* Search */}
      <Skeleton height={40} borderRadius={8} />

      {/* Category Section */}
      <div className="space-y-3">
        <Skeleton height={18} width="40%" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton height={16} width={16} borderRadius={4} />
            <Skeleton height={14} width="60%" />
          </div>
        ))}
      </div>

      {/* Brand Section */}
      <div className="space-y-3">
        <Skeleton height={18} width="35%" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton height={16} width={16} borderRadius={4} />
            <Skeleton height={14} width="55%" />
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Skeleton height={18} width="30%" />
        <Skeleton height={10} />
        <Skeleton height={10} width="80%" />
      </div>

    </div>
  );
};

export default FilterSkeleton;