import React, { useState, useEffect } from "react";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [timeAgo, setTimeAgo] = useState({});

  // 🕒 Auto-update time ago every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      reviews.forEach((r) => {
        updated[r.id] = getTimeAgo(r.timeAdded);
      });
      setTimeAgo(updated);
    }, 60000);
    return () => clearInterval(interval);
  }, [reviews]);

  const getTimeAgo = (time) => {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
    if (seconds < 172800) return "yesterday";
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const handleAddReview = (newReview) => {
    const now = new Date();
    const review = {
      id: Date.now(),
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? "men" : "women"
      }/${Math.floor(Math.random() * 80)}.jpg`,
      yearsOn: "Verified Buyer",
      timeAdded: now,
    };
    setReviews((prev) => [review, ...prev]);
    setTimeAgo((prev) => ({ ...prev, [review.id]: getTimeAgo(now) }));
  };

  const handleUpdateReview = (updated) => {
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 mt-6">
      <AddReview onAdd={handleAddReview} />
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No reviews yet. Be the first to share your thoughts!
        </p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={{ ...review, date: timeAgo[review.id] || "just now" }}
            onUpdate={handleUpdateReview}
            onDelete={handleDeleteReview}
          />
        ))
      )}
    </div>
  );
}
