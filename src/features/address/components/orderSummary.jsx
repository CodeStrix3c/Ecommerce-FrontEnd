import React from "react";

export const OrderSummary = ({ checkoutData }) => {
  // 🟢 DEBUG: Check your browser console!
  // If this logs "undefined", your AddressPage is not passing data correctly.
  console.log("OrderSummary Received Data:", checkoutData);

  // 1. Swagger returns data directly or inside a .data property from Axios
  const rootData = checkoutData?.data || checkoutData;

  // 2. Extract the checkoutVm
  const vm = rootData?.checkoutVm;
  const items = vm?.items || [];

  if (!vm) {
    return (
      <div className="max-w-md w-full border rounded-lg p-6 bg-white animate-pulse">
        <p className="text-gray-500 font-medium">Loading summary...</p>
        <p className="text-[10px] text-gray-400 mt-2">
          Check console for data structure
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full border rounded-lg p-6 bg-white shadow-sm sticky top-10">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm items-center"
          >
            <div className="flex gap-3 items-center">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-12 h-12 object-cover rounded border"
              />
              <div>
                <p className="font-medium line-clamp-1">{item.productName}</p>
                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium whitespace-nowrap">{item.totalString}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">{vm.subTotalString}</span>
        </div>

        {vm.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>-{vm.discountString}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span
            className={
              vm.shippingAmount === null
                ? "text-orange-500 italic"
                : "font-medium"
            }
          >
            {vm.shippingAmount === null
              ? "Calculating..."
              : vm.shippingAmountString}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span className="font-medium">{vm.taxAmountString}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
          <span>Total</span>
          <span>{vm.orderTotalString}</span>
        </div>
      </div>
    </div>
  );
};
