import React from "react";
import { CheckCircle, Tag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location?.state?.order;
  const data = order?.value;

  if (!data) return null;

  // Calculate tax percentage
  const taxBase =
    data.discountAmount > 0
      ? data.subTotal - data.discountAmount
      : data.subTotal;
  const taxPercent =
    data.taxAmount > 0 && taxBase > 0
      ? Math.round((data.taxAmount / taxBase) * 100)
      : null;

  return (
    <ContentWrapper>
      <div className="lg:mt-28 max-w-4xl mx-auto p-6 space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-3">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
          <h1 className="text-3xl font-semibold">Order Placed Successfully!</h1>
          <p className="text-gray-500">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-lg font-medium">
            Order ID:
            <span
              onClick={() => navigate(`/orderdetails/${data.id}`)}
              className="ml-1 text-[var(--color-secondary)] underline underline-offset-2 cursor-pointer hover:opacity-75 transition-opacity"
            >
              #{data.id}
            </span>
          </p>
        </div>

        {/* Coupon Code — shown only if present */}
        {data.couponCode && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
            <Tag className="text-green-600 w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-green-700 font-medium">
                Coupon Applied
              </p>
              <p className="text-base font-semibold tracking-widest text-green-800">
                {data.couponCode}
              </p>
            </div>
            <span className="text-green-700 font-semibold text-sm whitespace-nowrap">
              - ₹ {Number(data.discountAmount).toFixed(2)} off
            </span>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          {data.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-3">
              <div>
                <p className="font-medium">Product ID: {item.productId}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                {item.discountAmount > 0 && (
                  <p className="text-sm text-green-600">
                    Discount: - ₹ {Number(item.discountAmount).toFixed(2)}
                  </p>
                )}
              </div>
              <p className="font-medium">
                ₹ {Number(item.productPrice).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-xl p-6 space-y-2">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {Number(data.subTotal).toFixed(2)}</span>
          </div>

          {data.couponCode && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Coupon ({data.couponCode})
              </span>
              <span>- ₹ {Number(data.discountAmount).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              Tax
              {taxPercent !== null && (
                <span className="text-gray-400 text-xs">@ {taxPercent}%</span>
              )}
            </span>
            <span>₹ {Number(data.taxAmount).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{data.shippingMethod}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹ {Number(data.orderTotal).toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          <p>{data.shippingAddress.contactName}</p>
          <p>{data.shippingAddress.phone}</p>
          <p>
            {data.shippingAddress.addressLine1},{" "}
            {data.shippingAddress.addressLine2}
          </p>
          <p>
            {data.shippingAddress.city} - {data.shippingAddress.zipCode}
          </p>
        </div>

        {/* Payment */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
          <p>{data.paymentMethod}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/order`)}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
}
