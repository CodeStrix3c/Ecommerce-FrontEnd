import { X } from "lucide-react";
import LeftPanel from "./LeftPanel";
import ReviewCard from "./ReviewCard";

export default function ReviewModal({
  testimonials,
  selectedReview,
  onClose,
  onShowAll,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)]">
      <div className="animate-slideUp relative h-full w-full overflow-hidden rounded-t-2xl bg-[var(--color-white)] md:h-[90%] md:w-4/5 md:rounded-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--color-neutral-dark)] hover:text-[var(--color-neutral-dark-hover)]"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="h-full overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
          <div className="block md:h-full md:overflow-y-auto">
            <LeftPanel />
          </div>
          <div className="p-6 md:h-full md:overflow-y-auto">
            <h1 className="mb-4 mt-7 text-xl font-semibold text-[var(--color-neutral-dark)]">
              Reviews ({testimonials.length})
            </h1>

            <div className="space-y-6">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className={`border-b border-[var(--color-neutral-dark-hover)] pb-4 ${
                    selectedReview?.id === review.id
                      ? "rounded-lg bg-[var(--color-white-hover)] p-3"
                      : ""
                  }`}
                >
                  <ReviewCard review={review} onShowMore={onShowAll} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
