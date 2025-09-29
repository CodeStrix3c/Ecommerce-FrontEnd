import { useState } from "react";
import useIsMobile from "@/hooks/useInMobile";
import TestimonialsCarousel from "../components/TestimonialsCarousal";
import TestimonialsGrid from "../components/TestimonialsGrid";
import ReviewModal from "../components/ReviewModal";
import AllReviewsModal from "../components/AllReviewModal";
import { testimonials } from "@/data/testimonialsData";

export default function Testimonials() {
  const isMobile = useIsMobile();
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => setShowAll(true);
  const handleShowMore = (review) => setSelectedReview(review);

  return (
    <div className="mx-auto max-w-6xl py-10">
      <h2 className="mb-6 text-2xl font-bold">What People Say</h2>

      {isMobile ? (
        <TestimonialsCarousel
          testimonials={testimonials}
          onShowMore={handleShowMore}
        />
      ) : (
        <TestimonialsGrid
          testimonials={testimonials}
          onShowMore={handleShowMore}
          onShowAll={handleShowAll}
        />
      )}

      {selectedReview && (
        <ReviewModal
          testimonials={testimonials}
          selectedReview={selectedReview}
          onClose={() => setSelectedReview(null)}
          onShowAll={handleShowAll}
        />
      )}

      {showAll && (
        <AllReviewsModal
          testimonials={testimonials}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  );
}
