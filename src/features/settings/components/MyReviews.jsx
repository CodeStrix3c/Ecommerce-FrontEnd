import {Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";

const MyReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "Handmade Wooden Vase",
      image:
        "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      rating: 5,
      review:
        "Beautiful craftsmanship! The finishing is excellent and looks perfect in my living room.",
      date: "10 Feb 2026",
    },
    {
      id: 2,
      productName: "Kashmiri Pashmina Shawl",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      rating: 4,
      review:
        "Very soft and warm. Authentic quality but delivery took a bit longer.",
      date: "05 Feb 2026",
    },
    {
      id: 3,
      productName: "Terracotta Wall Art",
      image:
        "https://images.unsplash.com/photo-1598300056393-4aac492f4344",
      rating: 5,
      review:
        "Amazing design and perfect for home decor. Highly recommended!",
      date: "28 Jan 2026",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editReview, setEditReview] = useState(null);

  /* ================= Delete ================= */
  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  /* ================= Edit ================= */
  const openEdit = (review) => {
    setEditReview({ ...review });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditReview({
      ...editReview,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = () => {
    const updated = reviews.map((r) =>
      r.id === editReview.id ? editReview : r
    );
    setReviews(updated);
    setIsEditing(false);
    setEditReview(null);
  };

  /* ================= Stars ================= */
  const renderStars = (rating, editable = false) => {
    return (
      <div className="flex text-[var(--color-secondary)] cursor-pointer">
        {Array(5)
          .fill()
          .map((_, index) => (
            <span
              key={index}
              onClick={
                editable
                  ? () =>
                      setEditReview({ ...editReview, rating: index + 1 })
                  : undefined
              }
            >
              {index < rating ? "★" : "☆"}
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 border border-[var(--color-gray)] rounded-lg">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--color-black)]">
          My Reviews
        </h1>

        {reviews.length === 0 ? (
          <div className="bg-[var(--color-white)] p-6 rounded-lg shadow text-center">
            <p className="text-[var(--color-gray)]">
              You haven't reviewed any products yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[var(--color-white)] rounded-lg shadow-sm border border-[var(--color-gray)] p-4 flex flex-col md:flex-row gap-4"
              >
                {/* Image */}
                <img
                  src={review.image}
                  alt={review.productName}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Content */}
                <div className="flex-1">
                  <h2 className="font-medium text-lg text-[var(--color-black)]">
                    {review.productName}
                  </h2>

                  {renderStars(review.rating)}

                  <p className="mt-2 text-sm text-[var(--color-black)]">
                    {review.review}
                  </p>

                  <p className="text-xs text-[var(--color-black)] mt-2">
                    Reviewed on {review.date}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 md:items-end">
                  <Edit
                    size={16}
                    className="cursor-pointer"
                    onClick={() => openEdit(review)}
                  />

                  <Trash2
                    size={16}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(review.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Edit Modal ================= */}
      {isEditing && editReview && (
        <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50">
          <div className="bg-[var(--color-white)] w-full max-w-md rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Edit Review
            </h3>

            <p className="font-medium mb-2">{editReview.productName}</p>

            {/* Editable Stars */}
            {renderStars(editReview.rating, true)}

            {/* Review Text */}
            <textarea
              name="review"
              value={editReview.review}
              onChange={handleEditChange}
              rows="4"
              className="w-full border border-[var(--color-gray)] rounded p-2 mt-3"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-[var(--color-gray)] rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;