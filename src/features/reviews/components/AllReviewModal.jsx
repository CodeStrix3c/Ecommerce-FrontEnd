import { X } from "lucide-react";
import LeftPanel from "./LeftPanel";
import ReviewCard from "./ReviewCard";

export default function AllReviewsModal({ testimonials, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="animate-slideUp relative h-full w-full overflow-hidden rounded-t-2xl bg-white md:h-[90%] md:w-4/5 md:rounded-xl">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="h-6 w-6" />
        </button>

        <div className="h-full overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
          <div className="block md:h-full md:overflow-y-auto">
            <LeftPanel />
          </div>
          <div className="p-6 md:h-full md:overflow-y-auto">
            <h2 className="mb-4 text-xl font-semibold">
              All Reviews ({testimonials.length})
            </h2>
            <div className="space-y-6">
              {testimonials.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <ReviewCard review={review} compact={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
