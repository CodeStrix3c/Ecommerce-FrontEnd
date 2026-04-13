import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useGetOrderDetails } from "@/hooks/Orders/useOrders";
import { CheckCircle } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useGetOrderDetails(orderId);

  if (isLoading) {
    return (
      <ContentWrapper>
        {/* <div className="pt-40 text-center text-lg">Loading order...</div> */}
        <Spinner />
      </ContentWrapper>
    );
  }

  if (!order) return null;

  // Calculate tax percentage
  const taxBase =
    order.discountAmount > 0
      ? order.subtotal - order.discountAmount
      : order.subtotal;
  const taxPercent =
    order.taxAmount > 0 && taxBase > 0
      ? Math.round((order.taxAmount / taxBase) * 100)
      : null;

  return (
    <ContentWrapper>
      <div className="pt-10 lg:pt-36 max-w-5xl mx-auto px-4 space-y-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <div>
              <h2 className="text-lg font-semibold text-green-700">
                Order Details
              </h2>
            </div>
          </div>

          {/* Cancel Button */}
          <button className="px-4 py-2 rounded-lg border border-red-500 text-white bg-[var(--color-error)] font-medium transition">
            Cancel Order
          </button>
        </div>

        {/* Order Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Order Status</h3>
            <p className="text-gray-600">{order.orderStatusString}</p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <p className="text-gray-600">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h3 className="text-lg font-semibold">Order Items</h3>

          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-gray-800">
                ₹{item.rowTotal.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span>- ₹{order.discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-1">
              Tax
              {taxPercent !== null && (
                <span className="text-gray-400 text-xs">@ {taxPercent}%</span>
              )}
            </span>
            <span>₹{order.taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>₹{order.shippingAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total</span>
            <span>₹{order.orderTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>

          <p className="font-medium">{order.shippingAddress.contactName}</p>
          <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>

          <p className="mt-2 text-gray-700">
            {order.shippingAddress.addressLine1}
          </p>

          <p className="text-gray-700">{order.shippingAddress.addressLine2}</p>

          <p className="text-gray-700">
            {order.shippingAddress.cityName},{" "}
            {order.shippingAddress.stateOrProvinceName}
          </p>

          <p className="text-gray-700">{order.shippingAddress.zipCode}</p>
        </div>

        {/* Continue Shopping */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-[var(--color-secondary)] text-white font-medium hover:opacity-90 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
}
