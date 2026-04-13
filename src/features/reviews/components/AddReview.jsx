import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AddReview({ onAdd, reviews }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && reviews?.length) {
      const alreadyReviewed = reviews.some((r) => r.userId == userId);
      setHasReviewed(alreadyReviewed);
    }
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const alreadyReviewed = reviews?.some((r) => r.userId == userId);
    if (alreadyReviewed) {
      toast.error("You have already submitted a review!");
      setShowModal(false);
      return;
    }

    if (!reviewText || rating === 0) {
      toast.error("Please fill all fields before submitting!");
      return;
    }

    const newReview = {
      id: Date.now(),
      userId,
      avatar: "https://i.pravatar.cc/150?u=" + Date.now(),
      text: reviewText,
      rating,
      date: new Date().toLocaleDateString(),
      yearsOn: "Verified Buyer",
    };

    // 🔥 FIX: Close modal immediately
    setShowModal(false);

    onAdd(newReview, {
      onSuccess: () => {
        setHasReviewed(true);
        setReviewText("");
        setRating(0);
      },
      onError: () => {
        setReviewText("");
        setRating(0);
      },
    });
  };

  return (
    <>
      <div className="mt-8 max-w-xl bg-white p-6">
        {hasReviewed ? (
          <p></p>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="text-black font-medium py-2 px-5 rounded-lg border border-gray-200 transition-all duration-300"
          >
            Write a review
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex justify-center items-start">
          <div className="relative mt-20 bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Add Your Review
              </h2>
              <p className="text-gray-500 text-xs">
                Share your experience with others
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="text-center">
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  Rate your experience
                </label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer transition-all ${
                        star <= (hover || rating)
                          ? "fill-[var(--color-secondary)] text-[var(--color-secondary)] scale-110"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setReviewText(e.target.value);
                    }
                  }}
                  maxLength={300}
                  className="w-full border border-gray-100 rounded-lg px-3 py-2 h-24 text-sm"
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  {reviewText.length}/300
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-secondary)] text-white font-semibold py-2.5 rounded-lg text-sm shadow-md"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
