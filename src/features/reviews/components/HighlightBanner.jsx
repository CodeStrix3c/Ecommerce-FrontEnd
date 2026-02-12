import LeafTitleBlock from "@/components/shared/LeafTitleBlock";
import Divider from "@mui/material/Divider";
import StarRating from "@/components/ui/StarRating";

export default function HighlightBanner({
  title = "Customer's favourite",
  rating = 4.5,
  reviewCount = 26,
}) {
  return (
    <div className="w-full border border-[var(--color-gray)] rounded-2xl bg-[var(--color-white)] py-3 px-4">

      {/* ================= Desktop ================= */}
      <div className="hidden sm:flex items-center justify-evenly w-full">

        {/* Title */}
        <div className="flex items-center gap-3">
          <LeafTitleBlock title={title} isGray leafSize="sm" />
        </div>

        {/* Middle Divider */}
        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)]"
        />

        {/* Rating */}
        <div className="flex flex-col items-center">
          
          <StarRating size={14} rating={rating} />
        </div>

        {/* Middle Divider */}
        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)]"
        />

        {/* Reviews */}
    <div className="flex flex-col items-center justify-center text-center">
  <p className="font-semibold text-sm text-[var(--color-black)]">
    Reviews: {reviewCount}
  </p>
</div>


      </div>

      {/* ================= Mobile ================= */}
      <div className="flex sm:hidden items-center justify-center">

        <LeafTitleBlock title={title} isGray leafSize="sm" />

        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)] h-8 mx-3"
        />

        <div className="flex flex-col items-center px-2">
          <StarRating size={14} rating={rating} />
        </div>

        <Divider
          orientation="vertical"
          flexItem
          className="border-[var(--color-black-hover)] h-8 mx-3"
        />

        <div className="flex flex-col items-center px-2">
          <p className="font-semibold text-sm">{reviewCount}</p>
          <p className="text-[var(--color-black)] font-semibold text-[13px]">
            Reviews
          </p>
        </div>
      </div>
    </div>
  );
}
