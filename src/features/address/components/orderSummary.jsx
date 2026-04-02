import React from "react";
import { useQueryClient } from "@tanstack/react-query"; // ✅ ADDED

export const OrderSummary = ({
  checkoutData,
  isUpdating,
  paymentMethods = [],
  selectedPayment,
  setSelectedPayment,
  onPlaceOrder,
  placingOrder,
}) => {
  const queryClient = useQueryClient(); // ✅ ADDED

  if (!checkoutData) return null;

  const rootData = checkoutData?.data || checkoutData;
  const vm = rootData?.checkoutVm;

  if (!vm) return null;

  const {
    items = [],
    subTotal = 0,
    shippingAmount = 0,
    taxAmount = 0,
    discount = 0,
    orderTotal = 0,
  } = vm;

  const shippingMethodName =
    rootData?.selectedShippingMethodName ||
    rootData?.shippingPrices?.[0]?.name ||
    "Shipping";

  const shippingPrice =
    rootData?.shippingPrices?.find(
      (p) => p.name === rootData?.selectedShippingMethodName,
    )?.price ?? shippingAmount;

  const handlePlaceOrder = async () => {
    try {
      await onPlaceOrder();

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {}
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border max-w-xl">
      <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-14 h-14 object-cover rounded-md border"
            />

            <div className="flex-1">
              <p className="font-medium text-sm">{item.productName}</p>
              <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold text-sm">₹{Number(item.total)}</p>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping </span>
          <span>
            {!shippingPrice || shippingPrice === 0
              ? "Free"
              : `₹${shippingPrice}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{taxAmount}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>₹{orderTotal}</span>
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">
          Select Payment Method
        </label>

        <select
          value={selectedPayment || ""}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="">Select</option>
          {paymentMethods
            ?.filter((m) => m.isEnabled)
            .map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="w-full mt-5 bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};
