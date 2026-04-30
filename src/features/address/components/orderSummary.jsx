import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tag, AlertCircle, Truck } from "lucide-react";
import { usePayment } from "../hooks/usePayment";
import { toast } from "react-toastify";

export const OrderSummary = ({
  checkoutData,
  paymentMethods = [],
  selectedPayment,
  setSelectedPayment,
  onPlaceOrder,
  placingOrder,
  orderError,
}) => {
  const queryClient = useQueryClient();
  const { payWithUPI } = usePayment();

  const [releasing, setReleasing] = useState(false);
  const [released, setReleased] = useState(false);
  const [pTransferId, setpTransferId] = useState(null);

  if (!checkoutData) return null;

  const rootData = checkoutData?.data || checkoutData;
  const vm = rootData?.checkoutVm;

  if (!vm) return null;

  const {
    items = [],
    subTotal = 0,
    shippingAmount = 0,
    taxAmount = 0,
    packagingAmount = 0,
    discount = 0,
    orderTotal = 0,
    couponCode = null,
    subTotalWithDiscount = 0,
    user,
    transferId, // ✅ coming from backend
    orderStatus, // ✅ e.g. PLACED / DELIVERED
  } = vm;

  const vendorAccountId = import.meta.env.VITE_VENDOR_ACCOUNT_ID;

  const shippingPrice =
    rootData?.shippingPrices?.find(
      (p) => p.name === rootData?.selectedShippingMethodName,
    )?.price ?? shippingAmount;

  // ─────────────────────────────────────────
  // PLACE ORDER + PAYMENT
  // ─────────────────────────────────────────
  const handlePlaceOrder = async () => {
    try {
      if (!selectedPayment) {
        toast.error("Please select a payment method");
        return;
      }

      if (selectedPayment === "RAZORPAY_UPI") {
        // 1. Create order
        const orderRes = await fetch("http://localhost:4000/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: orderTotal }),
        });

        const orderData = await orderRes.json();

        if (!orderData.id) {
          toast.error("Failed to create payment order");
          return;
        }

        // 2. Open Razorpay
        const result = await payWithUPI({
          amount: orderTotal,
          orderId: orderData.id,
          description: "Order Payment",
          user: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
            contact: user?.phone || "9999999999",
          },
        });

        if (!result.success) {
          toast.error(result.error.description);
          return;
        }

        // 3. Verify + create HOLD transfer
        const verifyRes = await fetch("http://localhost:4000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.id,
            razorpay_payment_id: result.data.razorpay_payment_id,
            razorpay_signature: result.data.razorpay_signature,
            amount: orderTotal,
            vendorAccountId,
          }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          toast.error("Payment verification failed");
          return;
        }

        toast.success("🔒 Payment held securely");

        await onPlaceOrder();
        setpTransferId(verifyData.transferId);
        localStorage.setItem("transferId", verifyData.transferId);
      } else {
        await onPlaceOrder({ paymentMethod: selectedPayment });
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
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

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Original Price</span>
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
        <div className="flex justify-between">
          <span className="text-gray-600">Packaging</span>
          <span>₹{Number(packagingAmount).toLocaleString()}</span>
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
        <option value="RAZORPAY_UPI">UPI / Razorpay</option>
        <option value="COD">Cash on delivery</option>
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
