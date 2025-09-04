import { Star } from "lucide-react";
import LeafTitleBlock from "@/components/shared/LeafTitleBlock";

export default function HighlightBanner({
  title = "Guest Favourite",
  subtitle = "One of the most loved homes on Airbnb, according to guests",
  rating = 5.0,
  reviewCount = 26,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-gray-300 bg-white p-4 shadow-sm w-full max-w-2xl space-y-4 md:space-y-0">
      <LeafTitleBlock
        title={title}
        subtitle={subtitle}
        isGray
        leafSize="md"
        titleSize="sm"
      />

      <div className="flex items-center justify-center space-x-6">
        <div className="text-center">
          <p className="font-semibold text-lg">{rating.toFixed(1)}</p>
          <div className="flex justify-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={14} className="fill-black text-black" />
              ))}
          </div>
        </div>

        <div className="h-10 border-l border-gray-400 hidden md:block"></div>

        <div className="text-center">
          <p className="font-semibold text-lg">{reviewCount}</p>
          <p className="text-sm text-gray-600">Reviews</p>
        </div>
      </div>
    </div>
  );
}
