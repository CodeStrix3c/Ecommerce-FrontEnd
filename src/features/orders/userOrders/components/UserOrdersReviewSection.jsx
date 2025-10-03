import { Star } from "lucide-react";

export default function ReviewSection({ order }) {
  if (order.status !== "Delivered") return null;

  return (
    <div className="flex w-full justify-between items-center md:justify-start md:w-auto gap-1">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className="text-[var(--color-secondary)]" />
        ))}
      </div>

      {/* Text */}
      <span className="text-[var(--color-secondary)] text-sm cursor-pointer hover:underline">
        Write Review
      </span>
    </div>
  );
}
