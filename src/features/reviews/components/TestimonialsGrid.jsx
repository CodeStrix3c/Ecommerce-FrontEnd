import ReviewCard from './ReviewCard';

export default function TestimonialsGrid({
  testimonials,
  onShowMore,
  onShowAll,
}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.slice(0, 4).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            compact
            onShowMore={onShowMore} // Show more for single review
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onShowAll} // Show all reviews
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Show All Reviews
        </button>
      </div>
    </>
  );
}
