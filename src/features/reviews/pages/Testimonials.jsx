// import { useState } from "react";
// import useIsMobile from "@/hooks/useInMobile";
// import TestimonialsCarousel from "../components/TestimonialsCarousal";
// import TestimonialsGrid from "../components/TestimonialsGrid";
// import ReviewModal from "../components/ReviewModal";
// import AllReviewsModal from "../components/AllReviewModal";
// import { testimonials } from "@/data/testimonialsData";
// import AddReview from "../components/AddReview";
// import { Add } from "@mui/icons-material";

// export default function Testimonials() {
//   const isMobile = useIsMobile();
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [showAll, setShowAll] = useState(false);

//   const handleShowAll = () => setShowAll(true);
//   const handleShowMore = (review) => setSelectedReview(review);

//   return (
// <div className="mx-auto max-w-6xl py-10">
//       {/* Title */}
//       <h2 className="mb-6 text-2xl font-bold">What People Say</h2>

//       {/* Testimonials Section */}
//       {isMobile ? (
//         <TestimonialsCarousel
//           testimonials={testimonials}
//           onShowMore={handleShowMore}
//         />
//       ) : (
//         <TestimonialsGrid
//           testimonials={testimonials}
//           onShowMore={handleShowMore}
//           onShowAll={handleShowAll}
//         />
//           )}

//       {/* Single Review Modal */}
//       {selectedReview && (
//         <ReviewModal
//           testimonials={testimonials}
//           selectedReview={selectedReview}
//           onClose={() => setSelectedReview(null)}
//           onShowAll={handleShowAll}
//         />
//       )}

//       {/* All Reviews Modal */}
//       {showAll && (
//         <AllReviewsModal
//           testimonials={testimonials}
//           onClose={() => setShowAll(false)}
//         />
//       )}

// <div>
//   <AddReview/>
// </div>

//     </div>
//   );
// }
import { useState } from "react";
import useIsMobile from "@/hooks/useInMobile";
import TestimonialsCarousel from "../components/TestimonialsCarousal";
import TestimonialsGrid from "../components/TestimonialsGrid";
import ReviewModal from "../components/ReviewModal";
import AllReviewsModal from "../components/AllReviewModal";
import AddReview from "../components/AddReview";
import { useParams } from "react-router-dom";

import {
  useAddReview,
  useGetAllReviews,
} from "@/hooks/User/Reviews/usereviewproduct";

export default function Testimonials() {
  const isMobile = useIsMobile();
  const { id } = useParams();

  const [selectedReview, setSelectedReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ GET REVIEWS FROM API
  const { data, refetch } = useGetAllReviews({
    entityId: Number(id),
    entityTypeId: "Product",
    pageNumber: 1,
    pageSize: 20,
  });

  const reviews = data?.items?.data || [];

  const { mutate: addReviewMutation } = useAddReview();

  const handleShowAll = () => setShowAll(true);
  const handleShowMore = (review) => setSelectedReview(review);

  // ---------- ADD REVIEW ----------
  const handleAddReview = (newReview) => {
    const payload = {
      rating: newReview.rating,
      title: null,
      comment: newReview.text,
      reviewerName: null,
      entityId: Number(id),
      entityTypeId: "Product",
      hasBoughtProduct: false,
      loggedUserName: null,
    };

    addReviewMutation(payload, {
      onSuccess: () => {
        refetch(); // refresh list after posting
      },
    });
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[var(--color-black)]">
          What People Say About Our Art & Craft Products
        </h2>

        <AddReview onAdd={handleAddReview} reviews={reviews} />
      </div>

      {isMobile ? (
        <TestimonialsCarousel
          testimonials={reviews}
          onShowMore={handleShowMore}
        />
      ) : (
        <TestimonialsGrid
          testimonials={reviews}
          onShowMore={handleShowMore}
          onShowAll={handleShowAll}
        />
      )}

      {selectedReview && (
        <ReviewModal
          testimonials={reviews}
          selectedReview={selectedReview}
          onClose={() => setSelectedReview(null)}
          onShowAll={handleShowAll}
        />
      )}

      {showAll && (
        <AllReviewsModal
          testimonials={reviews}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  );
}
