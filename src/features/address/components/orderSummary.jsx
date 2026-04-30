import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usePaymentFlow } from "@/transactions/flows/usePaymentFlow";
import { PAYMENT_METHODS } from "@/transactions/constants/transactionConstants";

export const OrderSummary = ({
  checkoutData,
  selectedPayment,
  setSelectedPayment,
  onPlaceOrder,
  placingOrder,
}) => {
  const queryClient = useQueryClient();
  const { startPayment } = usePaymentFlow();

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
    subTotalWithDiscount = 0,
    user,
  } = vm;

  const vendorAccountId = import.meta.env.VITE_VENDOR_ACCOUNT_ID;

  const shippingPrice =
    rootData?.shippingPrices?.find(
      (p) => p.name === rootData?.selectedShippingMethodName,
    )?.price ?? shippingAmount;

  // 🔥 CLEAN HANDLER
  const handlePlaceOrder = async () => {
    try {
      if (!selectedPayment) {
        toast.error("Please select a payment method");
        return;
      }

      if (selectedPayment === PAYMENT_METHODS.UPI) {
        const res = await startPayment({
          amount: orderTotal,
          user,
          vendorAccountId,
        });

        await onPlaceOrder();

        // ⚠️ still temporary (should move to backend)
        localStorage.setItem("transferId", res.transferId);
      } else {
        await onPlaceOrder({ paymentMethod: selectedPayment });
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error(err);
    }
  };

  const taxBase = discount > 0 ? subTotalWithDiscount : subTotal;
  const taxPercent =
    taxAmount > 0 && taxBase > 0
      ? Math.round((taxAmount / taxBase) * 100)
      : null;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border max-w-xl">
      <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

      {/* ITEMS */}
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
            <p className="font-semibold text-sm">
              ₹{Number(item.total).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      {/* TOTAL */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingPrice || "Free"}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax {taxPercent ? `@${taxPercent}%` : ""}</span>
          <span>₹{taxAmount}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{orderTotal}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <select
        value={selectedPayment || ""}
        onChange={(e) => setSelectedPayment(e.target.value)}
        className="w-full border rounded-md p-2 mt-4"
      >
        <option value="">Select Payment</option>
        <option value={PAYMENT_METHODS.UPI}>UPI / Razorpay</option>
        <option value={PAYMENT_METHODS.COD}>Cash on delivery</option>
      </select>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
      >
        {placingOrder ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};
