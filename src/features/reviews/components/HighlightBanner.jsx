import { Star } from "lucide-react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";
import Divider from "@mui/material/Divider";

export default function HighlightBanner({
  title = "Guest favourite",
  rating = 5.0,
  reviewCount = 26,
}) {
  return (

<div className="border flex flex-col sm:flex-row items-center w-full sm:w-fit justify-between sm:space-x-8 rounded-2xl bg-[var(--color-white)] py-2 px-3 sm:py-1.5 sm:px-5 text-[12px] sm:text-[14px]">

 {/* Mobile */}
<div className="flex sm:hidden flex-row items-center w-full justify-center">

  <div className="flex flex-col items-center gap-0.5 px-2">
    <p className="font-semibold text-xs">{rating.toFixed(1)}</p>
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-current text-[var(--color-black)]"
          />
        ))}
    </div>
  </div>

 
  <Divider
    orientation="vertical"
    flexItem
    className="border-[var(--color-black-hover)] h-8 mx-6" 
  />

  <div className="px-2">  
    <LeafTitleBlock
      title={title}
      isGray
      leafSize="sm"
      titleSize="bold"
    />
  </div>

 
  <Divider
    orientation="vertical"
    flexItem
    className="border-[var(--color-black-hover)] h-8 mx-6"
  />
  <div className="flex flex-col items-center gap-0.5 px-2">
    <p className="font-semibold text-sm">{reviewCount}</p>
    <p className="text-[var(--color-black)] font-bold text-[13px]">Reviews</p>
  </div>
</div>

  {/* Desktop */}
  <div className="hidden sm:flex flex-row items-center sm:space-x-8 w-full sm:w-auto">
<div className="">
      <LeafTitleBlock
        title={title}
        isGray
        leafSize="sm"
        titleSize="bold"
      />
    </div>
    
    <div className="flex flex-col items-center gap-0.5">
      <p className="font-semibold text-sm">{rating.toFixed(1)}</p>
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-current text-[var(--color-black)]"
            />
          ))}
      </div>
    </div>

    <Divider
      orientation="vertical"
      flexItem
      className="border-[var(--color-black-hover)]"
    />

    <div className="flex flex-col items-center gap-0.5">
      <p className="font-semibold text-sm">{reviewCount}</p>
      <p className="text-[var(--color-black)] text-[14px]">Reviews</p>
    </div>
  </div>
</div>
  );
}
