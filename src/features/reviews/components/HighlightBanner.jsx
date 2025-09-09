import { Star } from "lucide-react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";
import Divider from "@mui/material/Divider";

export default function HighlightBanner({
  title = "Farmer's Favourite",
  subtitle = "One of the most loved homes on Airbnb, according to guests",
  rating = 5.0,
  reviewCount = 26,
}) {
  return (
    <div className="flex w-fit flex-col space-y-4 rounded-2xl border border-[var(--color-black)] bg-[var(--color-white)] p-4 shadow-sm">
      <div className="flex w-full justify-center">
        <LeafTitleBlock
          title={title}
          subtitle={subtitle}
          isGray
          leafSize="sm"
          titleSize="sm"
        />
      </div>

      <div className="flex w-full items-center justify-center space-x-6">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{rating.toFixed(1)}</p>
          <div className="flex mt-1">
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

        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{reviewCount}</p>
          <p className="text-sm text-[var(--color-black)]">Reviews</p>
        </div>
      </div>
    </div>
  );
}
