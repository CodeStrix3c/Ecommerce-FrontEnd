// import React, { useState } from "react";
// import { Star, X } from "lucide-react";

// export default function AddReview() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
     
//       <div className="mt-8 max-w-xl bg-white border rounded-2xl shadow-sm p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">
//           Review this product
//         </h2>
//         <p className="text-gray-600 mb-5">
//           Share your thoughts with other customers
//         </p>

//         <button
//           onClick={() => setShowModal(true)}
//           className="text-black font-medium py-2 px-5 rounded-full shadow-sm border border-slate-950 hover:bg-gray-100 transition-all duration-300"
//         >
//           Write a review
//         </button>
//       </div>

//       {/* Popup Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-8 animate-fadeIn">
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
//             >
//               <X size={22} />
//             </button>

//             {/* Title */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Add Your Review
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 We value your feedback! Share your experience with others.
//               </p>
//             </div>

//             {/* Review Form */}
//             <form className="space-y-4">
             

//               <div className="text-center">
//                 <label className="block mb-2 font-medium text-gray-700">
//                   Rate your experience
//                 </label>
//                 <div className="flex justify-center gap-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       size={28}
//                       className="text-gray-300 cursor-pointer hover:text-[var(color-secondary)] transition-all hover:scale-110"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium text-gray-700">
//                   Your Review
//                 </label>
//                 <textarea
//                   placeholder="Write your review..."
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28  transition"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="w-full bg-[var(--color-secondary)] S text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AddReview({ onAdd }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  // const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !reviewText || rating === 0) {
      toast.error("Please fill all fields before submitting!");
      return;
    }

    const newReview = {
      id: Date.now(),
      // name,
      avatar: "https://i.pravatar.cc/150?u=" + Date.now(), 
      text: reviewText,
      rating,
      date: new Date().toLocaleDateString(),
      yearsOn: "Verified Buyer",
    };

    onAdd(newReview); 
    setShowModal(false); 
    setName("");
    setReviewText("");
    setRating(0);
  };

  return (
    <>
      <div className="mt-8 max-w-xl bg-white border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review this product
        </h2>
        <p className="text-gray-600 mb-5">
          Share your thoughts with other customers
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="text-black font-medium py-2 px-5 rounded-full shadow-sm border border-slate-950 hover:bg-gray-100 transition-all duration-300"
        >
          Write a review
        </button>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-8 animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Add Your Review
              </h2>
              <p className="text-gray-500 text-sm">
                We value your feedback! Share your experience with others.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 "
                />
              </div> */}

              <div className="text-center">
                <label className="block mb-2 font-medium text-gray-700">
                  Rate your experience
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={28}
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
                <label className="block mb-1 font-medium text-gray-700">
                  Your Review
                </label>
                <textarea
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 "
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-secondary)] text-[var(--color-white)] font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
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
