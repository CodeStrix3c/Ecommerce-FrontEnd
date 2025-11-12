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

export default function Testimonials() {
  const isMobile = useIsMobile();
  const [testimonials, setTestimonials] = useState(initialData);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => setShowAll(true);
  const handleShowMore = (review) => setSelectedReview(review);

  const handleAddReview = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const handleUpdate = (updated) => {
    setTestimonials((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl py-10">
      <h2 className="mb-6 text-2xl font-bold">What People Say</h2>

      {isMobile ? (
        <TestimonialsCarousel testimonials={testimonials} onShowMore={handleShowMore} />
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

      {/* Add Review */}
      <AddReview onAdd={handleAddReview} />
    </div>
  );
}
