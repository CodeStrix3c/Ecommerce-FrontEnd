import { Star } from "lucide-react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";
import Divider from "@mui/material/Divider";

export default function HighlightBanner({
  title = "Guest favourite",
  rating = 5.0,
  reviewCount = 26,
}) {
  return (
    <div className="border flex items-center w-fit space-x-8 rounded-2xl bg-[var(--color-white)] py-1.5 px-5 text-[14px]">
    
      <LeafTitleBlock
        title={title}
        isGray
        leafSize="sm"
        titleSize="bold"
      />
      
      
      <Divider
        orientation="vertical"
        flexItem
        className="border-[var(--color-black-hover)]"
      />

   
      <div className="flex flex-col items-center space-x-2">
  <p className="font-semibold">{rating.toFixed(1)}</p>
  <div className="flex items-center">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={18}
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

  
     <div className="flex flex-col items-center space-x-2">
  <p className="font-semibold">{reviewCount}</p>
  <p className="text-[var(--color-black)] text-[16px]">Reviews</p>
</div>


    </div>
  );
}
