import { Star } from 'lucide-react';

export default function ReviewCard({ review, onShowMore, compact }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${compact ? 'p-3' : ''}`}
    >
      <div className="mb-3 flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-neutral-900">{review.name}</p>
          <p className="text-sm text-neutral-500">{review.yearsOn}</p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? 'fill-[#FF385C] text-[#FF385C]'
                : 'text-neutral-300'
            }
          />
        ))}
        <span className="ml-2 text-sm text-neutral-400">{review.date}</span>
      </div>

      <p className="line-clamp-4 text-[15px] leading-relaxed text-neutral-700">
        {review.text}
      </p>

      {review.text.length > 50 && (
        <button
          onClick={() => onShowMore(review)}
          className="mt-2 text-sm font-medium text-neutral-800 underline underline-offset-2 hover:text-black"
        >
          Show more
        </button>
      )}
    </div>
  );
}
