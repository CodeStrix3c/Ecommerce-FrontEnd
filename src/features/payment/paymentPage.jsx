import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContentWrapper from "@/components/shared/ContentWrapper";

import { useCheckoutShipping } from "@/hooks/addresshooks/useaddress";
import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";
import { OrderSummary } from "../address/components/orderSummary";

const PaymentPage = () => {
  const navigate = useNavigate();
  const checkoutId = localStorage.getItem("checkoutId");

  const [selectedMethod, setSelectedMethod] = useState(null);

  const {
    data: checkoutData,
    isLoading,
    refetch,
  } = useCheckoutShipping(checkoutId);

  const { data: paymentMethods = [] } = usePaymentProviders();

  /* 🔥 Ensure latest checkout is loaded */
  useEffect(() => {
    if (checkoutId) {
      refetch();
    }
  }, [checkoutId]);

  const handlePlaceOrder = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    toast.success(`Selected Payment: ${selectedMethod}`);
  };

  if (isLoading || !checkoutData) {
    return <div className="flex justify-center p-20">Loading...</div>;
  }

  const shipping = checkoutData?.existingShippingAddresses?.find(
    (a) => a.userAddressId === checkoutData?.shippingAddressId,
  );

  return (
    <ContentWrapper>
      <div className="min-h-screen py-8 lg:mt-28">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Summary */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

              {shipping ? (
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{shipping.contactName}</p>
                  <p>{shipping.phone}</p>
                  <p>{shipping.addressLine1}</p>
                  {shipping.addressLine2 && <p>{shipping.addressLine2}</p>}
                  <p>
                    {shipping.cityName}, {shipping.districtName}
                  </p>
                  <p>
                    {shipping.stateOrProvinceName} - {shipping.zipCode}
                  </p>
                  <p>{shipping.countryName}</p>
                </div>
              ) : (
                <p className="text-sm text-red-500">
                  No shipping address selected.
                </p>
              )}

              <button
                onClick={() => navigate("/address")}
                className="text-sm text-blue-600 mt-3"
              >
                Change
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

              {paymentMethods
                ?.filter((m) => m.isEnabled)
                .map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                    />
                    <span>{method.name}</span>
                  </label>
                ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Continue
            </button>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <OrderSummary checkoutData={checkoutData} />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PaymentPage;
