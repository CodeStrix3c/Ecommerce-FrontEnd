// components/OrderSummary.jsx
import React from "react";
import { ShoppingBag, Tag, Truck, Receipt, Loader2 } from "lucide-react";

export const OrderSummary = ({ checkoutData, isUpdating }) => {
  const rootData = checkoutData?.data || checkoutData;
  const vm = rootData?.checkoutVm;
  const items = vm?.items || [];

  if (!vm) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-4">
          <div className="h-16 bg-gray-100 rounded"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg relative">
      {/* Updating Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
            <span className="text-sm font-medium text-gray-700">
              Updating prices...
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-gray-100">
        <ShoppingBag size={20} className="text-black" />
        <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-2 text-gray-900">
                {item.productName}
              </p>
              <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-sm whitespace-nowrap text-gray-900">
              {item.totalString}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t-2 border-gray-100 pt-4 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">
            {vm.subTotalString}
          </span>
        </div>

        {vm.discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="flex items-center gap-1">
              <Tag size={14} />
              Discount
            </span>
            <span className="font-semibold">-{vm.discountString}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-gray-600">
            <Truck size={14} />
            Shipping
          </span>
          <span
            className={
              vm.shippingAmount === null || vm.shippingAmount === undefined
                ? "text-orange-500 italic text-xs"
                : "font-semibold text-gray-900"
            }
          >
            {vm.shippingAmount === null || vm.shippingAmount === undefined
              ? "Select address first"
              : vm.shippingAmountString}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-gray-600">
            <Receipt size={14} />
            Tax
          </span>
          <span className="font-semibold text-gray-900">
            {vm.taxAmountString || "₹0.00"}
          </span>
        </div>

        <div className="flex justify-between items-center font-bold text-lg border-t-2 border-gray-200 pt-4 mt-4">
          <span className="text-gray-900">Total</span>
          <span className="text-black">{vm.orderTotalString}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Secure Checkout</span>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};
