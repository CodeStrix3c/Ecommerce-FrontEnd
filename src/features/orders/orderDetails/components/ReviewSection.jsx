import { useState } from "react";
import { Star } from "lucide-react";
import ReviewPopup from "../../review/pages/ReviewPopup";

export default function ReviewSection({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!order || order.status !== "Delivered") return null;

  return (
    <div className="flex w-full justify-between items-center md:justify-start md:w-auto gap-1">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className="text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
        ))}
      </div>

      <span
        onClick={() => setIsModalOpen(true)}
        className="text-[var(--color-secondary)] text-sm cursor-pointer hover:underline"
      >
        Write Review
      </span>

      <ReviewPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
