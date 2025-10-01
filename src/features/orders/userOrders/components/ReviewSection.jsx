import { Star } from "lucide-react";

export default function ReviewSection({ order }) {
  if (order.status !== "Delivered") return null;

  return (
    <div className="flex gap-3 items-center justify-between">
      <div className="flex items-center text-[var(--color-secondary)]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} />
        ))}
      </div>
      <span className="text-[var(--color-secondary)] text-sm cursor-pointer hover:underline">
        Write Review
      </span>
    </div>
  );
}
