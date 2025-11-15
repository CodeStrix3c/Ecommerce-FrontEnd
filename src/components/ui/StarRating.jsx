import React from "react";
import { Star } from "lucide-react";
import { Rating } from "@mui/material";

export default function StarRating({ rating = 4.2, size = 16, highlightSingle = false }) {
  if (highlightSingle) {
    // Only show one filled star
    return (
      <span className="flex items-center gap-1">
        <Star
          className="text-[var(--color-secondary)] fill-current"
          style={{ width: size, height: size }}
        />
        <span>{rating}</span>
      </span>
    );
  }

  // Normal rating display
  const safeRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(safeRating);
  const decimal = safeRating - fullStars;
  const emptyStars = 5 - fullStars - (decimal > 0 ? 1 : 0);

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
      {decimal > 0 && (
        <span
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          <Star
            className="text-gray-300"
            style={{ width: size, height: size }}
          />
          <Star
            className="text-[var(--color-secondary)] fill-current absolute top-0 left-0"
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

      <span className="text-sm font-medium ml-1">{safeRating.toFixed(1)}</span>
    </span>
  );
}
