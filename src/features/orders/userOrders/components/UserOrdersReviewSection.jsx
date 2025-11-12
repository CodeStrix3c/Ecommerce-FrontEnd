import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "../../review/pages/ReviewPopup"

export default function ReviewSection({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (order.status !== "Delivered") return null;

  return (
    <div className="flex w-full justify-between items-center md:justify-start md:w-auto gap-1">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className="text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
        ))}
      </div>

      
      <span
        onClick={() => setIsModalOpen(true)}
        className="text-[var(--color-secondary)] text-sm cursor-pointer hover:underline"
      >
        Write Review
      </span>

     
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write Your Review"
      >
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Type your review here..."
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              
              setIsModalOpen(false);
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}
