import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tag, AlertCircle } from "lucide-react";

export const OrderSummary = ({
  checkoutData,
  isUpdating,
  paymentMethods = [],
  selectedPayment,
  setSelectedPayment,
  onPlaceOrder,
  placingOrder,
  orderError,
}) => {
  const queryClient = useQueryClient();

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
  } = vm;

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

  const taxBase = discount > 0 ? subTotalWithDiscount : subTotal;
  const taxPercent =
    taxAmount > 0 && taxBase > 0
      ? Math.round((taxAmount / taxBase) * 100)
      : null;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border max-w-xl">
      <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

      {/* Items List */}
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
              {item.calculatedProductPrice?.oldPrice >
                item.calculatedProductPrice?.price && (
                <p className="text-xs text-green-600">
                  {item.calculatedProductPrice.percentOfSaving}% off
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">
                ₹{Number(item.total).toLocaleString()}
              </p>
              {item.calculatedProductPrice?.oldPrice >
                item.calculatedProductPrice?.price && (
                <p className="text-xs text-gray-400 line-through">
                  ₹
                  {Number(
                    item.calculatedProductPrice.oldPrice,
                  ).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

     
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{Number(subTotal).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>
            {!shippingPrice || shippingPrice === 0
              ? "Free"
              : `₹${shippingPrice}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 flex items-center">
            Tax
            {taxPercent !== null && (
              <span className="text-gray-600 text-l">@{taxPercent}%</span>
            )}
          </span>
          <span>₹{Number(taxAmount).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Packaging</span>
          <span>₹{Number(packagingAmount).toLocaleString()}</span>
        </div>  

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>− ₹{Number(discount).toLocaleString()}</span>
          </div>
        )}

        {couponCode && (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2 mt-1">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-green-600 shrink-0" />
              <div>
                <p className="text-green-700 font-medium text-xs leading-tight">
                  Coupon Applied
                </p>
                <p className="text-green-600 font-bold text-sm tracking-wide">
                  {couponCode}
                </p>
              </div>
            </div>
          </div>
        )}

        <hr className="my-2" />

        {discount > 0 && (
          <div className="flex justify-between text-gray-500 text-xs">
            <span>Subtotal after discount</span>
            <span>₹{Number(subTotalWithDiscount).toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between font-semibold text-base pt-1">
          <span>Total</span>
          <span>₹{Number(orderTotal).toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method */}
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

      
      {orderError && (
        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{orderError}</p>
        </div>
      )}

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
