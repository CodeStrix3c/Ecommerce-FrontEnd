import React from "react";
import { Heart, Share2 } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";

export default function ListingHeader({ place, onShare }) {
  const { wishlist, toggleWishlist } = useWishlist();

  const isSaved = wishlist?.some((item) => item._id === place._id);

  const handleSave = () => {
    toggleWishlist(place);
  };

  return (
    <header className="w-full border-b border-[var(--color-black-hover)] bg-[var(--color-white)]">
      <div className="mx-auto flex items-center justify-between gap-4 py-5">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-black)] sm:text-2xl md:text-3xl">
          {place.title}
        </h1>

        <div className="flex items-center text-[var(--color-black)]">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-1 transition hover:bg-[var(--color-black-hover)] sm:px-3"
            aria-label="Share"
          >
            <Share2 className="size-5" aria-hidden="true" />
            <span className="hidden underline sm:inline">Share</span>
          </button>

          <span
            className="mx-1 h-5 w-px bg-[var(--color-black-hover)] sm:mx-2"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-1 transition hover:bg-[var(--color-black-hover)] sm:px-3"
            aria-label="Save"
          >
            <Heart
              className={`size-5 ${
                isSaved ? "fill-current text-[var(--color-primary)]" : ""
              }`}
              aria-hidden="true"
            />
            <span className="hidden underline sm:inline">Save</span>
          </button>
        </div>
      </div>
    </header>
  );
}
