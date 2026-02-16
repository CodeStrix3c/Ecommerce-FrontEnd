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
import { testimonials as initialData } from "@/data/testimonialsData";
import AddReview from "../components/AddReview";
import { useParams } from "react-router-dom";
import { useAddReview } from "@/hooks/User/Reviews/usereviewproduct";

export default function Testimonials() {
  const isMobile = useIsMobile();
  const [testimonials, setTestimonials] = useState(initialData);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { id } = useParams();

  const { mutate: addReviewMutation } = useAddReview();

  const handleShowAll = () => setShowAll(true);
  const handleShowMore = (review) => setSelectedReview(review);

  const handleAddReview = (newReview) => {
    const payload = {
      rating: newReview.rating,
      title: null,
      comment: newReview.text,
      reviewerName: null,
      entityId: Number(id), // productId
      entityTypeId: "Product", // STATIC
      hasBoughtProduct: false,
      loggedUserName: null,
    };

    addReviewMutation(payload);

    // Keep your local UI update
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const handleUpdate = (updated) => {
    setTestimonials((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r)),
    );
  };

  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[var(--color-black)]">
          What People Say About Our Art & Craft Products
        </h2>

        <AddReview onAdd={handleAddReview} />
      </div>

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
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
