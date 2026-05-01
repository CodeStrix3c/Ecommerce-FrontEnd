import React, { useRef } from "react";
import { CheckCircle, Printer } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Invoice from "@/components/shared/Invoice";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location?.state?.order;
  console.log(order.value.id, "order in ordersucess");
  localStorage.setItem("livePayOrderId", order?.value?.id);

  const data = order?.value;

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });

  if (!data) return null;

  const taxPercent = data.orderItems?.[0]?.taxPercent ?? null;
  const isOnlineOrder = localStorage.getItem("livePayOrderId");

  const totalPackaging = data.orderItems?.reduce(
    (acc, item) => acc + (item.packagingAmount || 0),
    0,
  );

  return (
    <ContentWrapper>
      <div className="lg:mt-28 max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white border rounded-md shadow-sm">
          {/* HEADER */}
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 w-7 h-7 mt-1" />
                <div>
                  <h1 className="text-lg font-semibold text-green-700">
                    Order placed successfully
                  </h1>
                  <p className="text-sm text-gray-600">
                    Thank you for shopping with us.
                  </p>
                  <p className="text-sm mt-1">
                    Order ID:
                    <span
                      onClick={() => navigate(`/orderdetails/${data.id}`)}
                      className="ml-1 text-blue-600 cursor-pointer hover:underline"
                    >
                      #{data.id}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/orderdetails/${data.id}`)}
                  className="px-2 py-1 text-sm  hover:bg-gray-50"
                >
                  View Order
                </button>

                <button
                  onClick={handlePrint}
                  className="px-2 py-1 text-sm  flex items-center gap-2 hover:bg-gray-50"
                >
                  <Printer className="w-4 h-4" />
                  Invoice
                </button>
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="p-6 border-b">
            <h2 className="font-semibold mb-4 text-gray-800">Order Items</h2>

            {data.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-3 border-b last:border-none"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Product ID: {item.productId}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  ₹{Number(item.productPrice).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="p-6 border-b">
            <h2 className="font-semibold mb-3 text-gray-800">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Number(data.subTotal).toFixed(2)}</span>
              </div>

              {data.couponCode && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({data.couponCode})</span>
                  <span>- ₹{Number(data.discountAmount).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Packaging</span>
                <span>₹{totalPackaging.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax {taxPercent && `(${taxPercent}%)`}</span>
                <span>₹{Number(data.taxAmount).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{data.shippingMethod}</span>
              </div>

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>₹{Number(data.orderTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* ADDRESS + PAYMENT */}
          <div className="p-6 grid md:grid-cols-2 gap-6 border-b">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Delivery Address
              </h3>
              <p className="text-sm">{data.shippingAddress.contactName}</p>
              <p className="text-sm text-gray-600">
                {data.shippingAddress.phone}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {data.shippingAddress.addressLine1}
              </p>
              <p className="text-sm text-gray-700">
                {data.shippingAddress.city} - {data.shippingAddress.zipCode}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Payment Method
              </h3>
              <p className="text-sm">
                {isOnlineOrder ? "Upi" : data.paymentMethod}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-6 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-blue-600 hover:underline"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/order")}
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium rounded-md"
            >
              Your Orders
            </button>
          </div>
        </div>

        {/* PRINT */}
        <div className="hidden">
          <Invoice ref={invoiceRef} order={data} />
        </div>
      </div>
    </ContentWrapper>
  );
}
