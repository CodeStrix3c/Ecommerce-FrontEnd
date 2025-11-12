// import { X } from "lucide-react";
// import LeftPanel from "./LeftPanel";
// import ReviewCard from "./ReviewCard";

// export default function ReviewModal({
//   testimonials,
//   selectedReview,
//   onClose,
//   onShowAll,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)]">
//       <div className="animate-slideUp relative h-full w-full overflow-hidden rounded-t-2xl bg-[var(--color-white)] md:h-[90%] md:w-4/5 md:rounded-xl">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-[var(--color-neutral-dark)] hover:text-[var(--color-neutral-dark-hover)]"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <div className="h-full overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
//           <div className="block md:h-full md:overflow-y-auto">
//             <LeftPanel />
//           </div>
//           <div className="p-6 md:h-full md:overflow-y-auto">
//             <h1 className="mb-4 mt-7 text-xl font-semibold text-[var(--color-neutral-dark)]">
//              All Reviews ({testimonials.length})
//             </h1>

//             <div className="space-y-6">
//               {testimonials.map((review) => (
//                 <div
//                   key={review.id}
//                   className={`pb-4 ${
//                     selectedReview?.id === review.id
//                       ? "rounded-lg bg-[var(--color-white-hover)] p-3"
//                       : ""
//                   }`}
//                 >
//                   <ReviewCard review={review} onShowMore={onShowAll} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { X } from "lucide-react";
import LeftPanel from "./LeftPanel";
import ReviewCard from "./ReviewCard";
import React from "react";

export default function ReviewModal({
  testimonials,
  selectedReview,
  onClose,
  onShowAll,
  onUpdate,
  onDelete, 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)]">
      <div className="animate-slideUp relative h-full w-full overflow-hidden rounded-t-2xl bg-[var(--color-white)] md:h-[90%] md:w-4/5 md:rounded-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--color-neutral-dark)] hover:text-[var(--color-neutral-dark-hover)]"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Grid layout */}
        <div className="h-full overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden">
          {/* Left Panel */}
          <div className="block md:h-full md:overflow-y-auto">
            <LeftPanel />
          </div>

          {/* Right Panel (All Reviews) */}
          <div className="p-6 md:h-full md:overflow-y-auto">
            <h1 className="mb-4 mt-7 text-xl font-semibold text-[var(--color-neutral-dark)]">
              All Reviews ({testimonials.length})
            </h1>

            <div className="space-y-6">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className={`pb-4 ${
                    selectedReview?.id === review.id
                      ? "rounded-lg bg-[var(--color-white-hover)] p-3"
                      : ""
                  }`}
                >
                  {/* ✅ Pass update & delete handlers */}
                  <ReviewCard
                    review={review}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

