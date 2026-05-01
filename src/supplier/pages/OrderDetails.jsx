import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useGetOrderDetails } from "@/hooks/Orders/useOrders";
import { CheckCircle, Printer } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
// import { useReactToPrint } from "react-to-print";
import Invoice from "@/components/shared/Invoice";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useGetOrderDetails(orderId);
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-ORD-${orderId}`,
  });

  if (isLoading) {
    return (
      <ContentWrapper>
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      </ContentWrapper>
    );
  }

  if (!order) return null;

  const taxPercent = order?.orderItems?.[0]?.taxPercent ?? null;

  console.log(order, "order is...");

  return (
    <ContentWrapper>
      <div className="pt-12 lg:pt-28 max-w-5xl mx-auto px-4">
        {/* SINGLE MAIN CONTAINER */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-start border-b pb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600 w-7 h-7" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order Placed
                </h2>
                <p className="text-sm text-gray-500">Order ID: #{orderId}</p>
              </div>
            </div>

            {/* PRINT ICON ONLY */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Print Invoice"
            >
              <Printer className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* STATUS + PAYMENT */}
          <div className="flex flex-col md:flex-row justify-between gap-4 text-sm">
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-gray-800">
                {order.orderStatusString}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Payment</p>
              <p className="font-medium text-gray-800">{order.paymentMethod}</p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold text-gray-800">Items</h3>

            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-md border"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="text-sm font-semibold text-gray-800">
                  ₹{item.rowTotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="border-t pt-4 text-sm space-y-2">
            <h3 className="font-semibold text-gray-800">Summary</h3>

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>- ₹{order.discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tax {taxPercent !== null && `(@${taxPercent}%)`}</span>
              <span>₹{order.taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₹{order.shippingAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>₹{order.orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="border-t pt-4 text-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Delivery Address
            </h3>

            <p className="font-medium">{order.shippingAddress.contactName}</p>
            <p className="text-gray-600">{order.shippingAddress.phone}</p>

            <p className="mt-1 text-gray-700">
              {order.shippingAddress.addressLine1}
            </p>
            <p className="text-gray-700">
              {order.shippingAddress.addressLine2}
            </p>
            <p className="text-gray-700">
              {order.shippingAddress.cityName},{" "}
              {order.shippingAddress.stateOrProvinceName}
            </p>
            <p className="text-gray-700">{order.shippingAddress.zipCode}</p>
          </div>

          {/* ACTIONS */}
          <div className="border-t pt-4 flex justify-between items-center">
            <button className="text-red-500 text-sm hover:underline">
              Cancel Order
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* PRINT */}
        <div className="hidden print:block">
          <Invoice ref={invoiceRef} order={order} />
        </div>
      </div>
    </ContentWrapper>
  );
}
