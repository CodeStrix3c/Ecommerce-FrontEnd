import React, { useState } from "react";
import { Star, Edit, Trash2, X } from "lucide-react";

export default function ReviewCard({ review, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [editedReview, setEditedReview] = useState({
    ...review,
  });

  if (!review) return null;

  const {
    id,
    rating = 0,
    comment = "",
    reviewerName = "Anonymous",
    createdOn,
  } = review;

  const shortText = comment?.length > 100 ? comment.slice(0, 100) : comment;

  const formattedDate = createdOn
    ? new Date(createdOn).toLocaleDateString()
    : "";

  const handleSave = () => {
    onUpdate?.(editedReview);
    setIsEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6">
        {/* Edit / Delete */}
        {/* <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div> */}

        {/* Reviewer Info */}
        <div className="mb-3">
          <p className="font-semibold text-gray-900">{reviewerName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-700 leading-relaxed">
          {isExpanded ? comment : shortText}
          {comment?.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-sm underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      </div>

      {/* Edit Modal */}
      {/* {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Review</h2>

            <textarea
              value={editedReview.comment}
              onChange={(e) =>
                setEditedReview({
                  ...editedReview,
                  comment: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-2 h-28"
            />

            <div className="flex gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  onClick={() =>
                    setEditedReview({
                      ...editedReview,
                      rating: i + 1,
                    })
                  }
                  className={`cursor-pointer ${
                    i < editedReview.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-black text-white py-2 rounded-lg mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      )} */}

      {/* Delete Modal */}
      {/* {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 text-center">
            <h2 className="text-lg font-semibold mb-3">Delete Review?</h2>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
