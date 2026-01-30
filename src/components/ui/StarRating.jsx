import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ rating = 4.2, size = 16 }) {
  // Clamp rating between 0 and 5
  const safeRating = Math.min(5, Math.max(0, rating));

  const fullStars = Math.floor(safeRating);
  const hasPartialStar = safeRating % 1 !== 0;
  const decimal = safeRating - fullStars;
  const emptyStars = 5 - fullStars - (hasPartialStar ? 1 : 0);

  return (
    <span className="flex items-center gap-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-[var(--color-secondary)] fill-current"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Partial Star */}
      {hasPartialStar && (
        <span
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          <Star
            className="text-gray-300"
            style={{ width: size, height: size }}
          />
          <Star
            className="text-[var(--color-secondary)] fill-current absolute top-0 left-0 overflow-hidden"
            style={{
              width: size,
              height: size,
              clipPath: `inset(0 ${100 - decimal * 100}% 0 0)`,
            }}
          />
        </span>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-gray-300"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Numeric Rating */}
      <span className="text-sm font-medium ml-1 ">{safeRating.toFixed(1)}</span>
    </span>
  );
}
