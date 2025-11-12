import React, { useState } from "react";
import { Star, Edit, Trash2, X } from "lucide-react";

export default function ReviewCard({ review, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedReview, setEditedReview] = useState({ ...review });

  
  const handleSave = () => {
    onUpdate(editedReview);
    setIsEditOpen(false);
  };

 
  const handleDelete = () => {
    onDelete(review.id);
    setIsDeleteOpen(false);
  };

  const shortText = review.text.slice(0, 100);

  return (
    <>
      
      <div
        className="relative rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6"
      >
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-100"
            title="Edit"
          >
            <Edit size={18} className="text-[var(--color-secondary)]" />
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-100"
            title="Delete"
          >
            <Trash2 size={18} className="text-[var(--color-error)]" />
          </button>
        </div>

        
        <div className="mb-3 flex items-center gap-4">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{review.name}</p>
            <p className="text-sm text-gray-500">{review.yearsOn}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < review.rating
                  ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                  : "text-gray-400"
              }
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">{review.date}</span>
        </div>

       
        <p className="text-gray-700 leading-relaxed">
          {isExpanded ? review.text : shortText}
          {review.text.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-sm font-medium text-gray-800 underline underline-offset-2 hover:text-gray-600"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      </div>

      
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 animate-fadeIn">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Review
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editedReview.name}
                  onChange={(e) =>
                    setEditedReview({ ...editedReview, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review Text
                </label>
                <textarea
                  value={editedReview.text}
                  onChange={(e) =>
                    setEditedReview({ ...editedReview, text: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 h-28 "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={22}
                      onClick={() =>
                        setEditedReview({ ...editedReview, rating: i + 1 })
                      }
                      className={`cursor-pointer transition ${
                        i < editedReview.rating
                          ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-[var(--color-secondary)]  text-black font-semibold py-2 rounded-lg mt-4 shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 text-center animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Review?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-[var(--color-error)] text-white "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
