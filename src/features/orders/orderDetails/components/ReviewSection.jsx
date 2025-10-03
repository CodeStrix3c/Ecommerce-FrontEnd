import { Star } from "lucide-react";

export default function ReviewSection() {
  return (
    <div className="bg-[var(--color-black-hover)] shadow-sm w-full p-4  sm:p-5">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        <div className="flex text-[var(--color-primary)]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </div>
        <button className="text-[var(--color-black)] font-medium text-sm sm:text-base">
          Write Review
        </button>
      </div>
    </div>
  );
}
