import React, { useMemo } from "react";

export const OrderSummary = ({ orders = [] }) => {
  // Calculate subtotal dynamically
  const subtotal = useMemo(() => {
    return orders.reduce((total, item) => total + item.price * item.qty, 0);
  }, [orders]);

  const shipping = 0; // change if needed
  const total = subtotal + shipping;

  return (
    <div className="max-w-md w-full border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {orders.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-xs">Qty: {item.qty}</p>
            </div>
            <p className="font-medium">₹{(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between font-semibold text-base border-t pt-3">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
