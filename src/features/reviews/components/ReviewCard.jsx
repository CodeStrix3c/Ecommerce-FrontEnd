import { Star } from "lucide-react";

export default function ReviewCard({ review, onShowMore, compact }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-neutral-dark-hover)] bg-[var(--color-white)] shadow-sm ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="mb-3 flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-[var(--color-neutral-dark)]">
            {review.name}
          </p>
          <p className="text-sm text-[var(--color-neutral-dark-hover)]">
            {review.yearsOn}
          </p>
        </div>
      </div>

      {/* Rating + Date */}
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-neutral-dark-hover)]"
            }
          />
        ))}
        <span className="ml-2 text-sm text-[var(--color-neutral-dark-hover)]">
          {review.date}
        </span>
      </div>

     
      <p className="line-clamp-4 text-[15px] leading-relaxed text-[var(--color-neutral-dark-hover)]">
        {review.text}
      </p>

      
      {review.text.length > 50 && (
        <button
          onClick={() => onShowMore(review)}
          className="mt-2 text-sm font-medium text-[var(--color-neutral-dark)] underline underline-offset-2 hover:text-[var(--color-neutral-dark-hover)]"
        >
          Show more
        </button>
      )}
    </div>
  );
}
