import { Star } from "lucide-react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";
import Divider from "@mui/material/Divider";

export default function HighlightBanner({
  title = "Guest favourite",
  rating = 5.0,
  reviewCount = 26,
}) {
  // ⭐ Dynamic star rendering
  const renderStars = () =>
    Array(5)
      .fill(0)
      .map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <Star
            key={i}
            size={14}
            className={`${
              filled
                ? "fill-current text-[var(--color-black)]"
                : half
                ? "fill-current text-[var(--color-black)] opacity-50"
                : "text-[var(--color-black-hover)]"
            }`}
          />
        );
      });

  return (
    <div className="border flex flex-col sm:flex-row items-center w-full sm:w-fit justify-between sm:space-x-6 md:space-x-8 rounded-2xl bg-[var(--color-white)] py-2 px-3 sm:py-1.5 sm:px-5 text-[12px] sm:text-[13px] md:text-[14px]">
      
      {/* ================= Mobile ================= */}
      <div className="flex sm:hidden flex-row items-center w-full justify-center">
        {/* Rating */}
        <div className="flex flex-col items-center gap-0.5 px-2">
          <p className="font-semibold text-xs">{rating.toFixed(1)}</p>
          <div className="flex items-center">{renderStars()}</div>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)] h-8 mx-3"
        />

        {/* Title */}
        <div className="px-2">
          <LeafTitleBlock title={title} isGray leafSize="sm" titleSize="bold" />
        </div>

        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)] h-8 mx-3"
        />

        {/* Reviews */}
        <div className="flex flex-col items-center gap-0.5 px-2">
          <p className="font-semibold text-sm">{reviewCount}</p>
          <p className="text-[var(--color-black)] font-bold text-[13px]">
            Reviews
          </p>
        </div>
      </div>

      {/* ================= medium & Desktop ================= */}
      <div className="hidden sm:flex flex-row items-center w-full sm:w-auto sm:space-x-4 md:space-x-6 lg:space-x-8">
        
        {/* Title */}
        <div>
          <LeafTitleBlock title={title} isGray leafSize="sm" titleSize="bold" />
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-semibold text-xs md:text-sm">
            {rating.toFixed(1)}
          </p>
          <div className="flex items-center">{renderStars()}</div>
        </div>

        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)]"
        />

        {/* Reviews */}
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-semibold text-xs md:text-sm">{reviewCount}</p>
          <p className="text-[var(--color-black)] text-[12px] md:text-[14px]">
            Reviews
          </p>
        </div>
      </div>
    </div>
  );
}
