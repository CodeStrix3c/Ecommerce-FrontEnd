import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success(`${place.title} added to cart! (${quantity})`);
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${quantity} × ${place.title}`);
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50 border-t
        border-gray-200 bg-white p-3 
        md:static md:rounded-2xl md:border md:border-gray-200 md:p-5 md:shadow-md
      "
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="font-semibold text-[#222222]">
            ₹{place.price}{' '}
            <span className="font-normal text-gray-600">/ unit</span>
          </div>
          <div className="font-semibold text-[#222222]">
            Total: ₹{quantity * place.price}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2">
          <label className="text-sm font-medium text-gray-700">Qty</label>
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-base font-bold text-gray-700 hover:bg-gray-300"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="text-base font-semibold text-[#222222]">
              {quantity}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-base font-bold text-gray-700 hover:bg-gray-300"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-md bg-[#F97316] py-2 text-sm font-semibold text-white transition hover:bg-[#FB923C] sm:text-base"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-md bg-[#F43F5E] py-2 text-sm font-semibold text-white transition hover:bg-[#E11D48] sm:text-base"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
