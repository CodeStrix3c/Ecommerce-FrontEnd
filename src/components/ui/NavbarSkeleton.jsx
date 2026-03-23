import React from "react";
import Skeleton from "react-loading-skeleton";
import ContentWrapper from "../shared/ContentWrapper";
import useIsMobile from "@/hooks/useInMobile";

const NavBarSkeleton = () => {
  const below600 = useIsMobile(600);

  // ✅ Mobile Skeleton
  if (below600) {
    return (
      <nav className="fixed bottom-0 z-10 w-full border-t bg-[var(--color-white)] py-2">
        <ContentWrapper>
          <div className="flex justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Skeleton circle height={24} width={24} />
                <Skeleton height={10} width={40} />
              </div>
            ))}
          </div>
        </ContentWrapper>
      </nav>
    );
  }

  // ✅ Desktop Skeleton
  return (
    <div className="relative">
      <nav className="flex items-center gap-4 lg:gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 px-2 lg:px-3 py-2">
            <Skeleton circle height={18} width={18} />
            <Skeleton height={14} width={70} />
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBarSkeleton;