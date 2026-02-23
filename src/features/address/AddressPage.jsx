import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { ShippingForm } from "./components/addressForm";
import { OrderSummary } from "./components/orderSummary";

import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useCheckoutShipping,
  useAddShippingAddress,
  useUpdateShippingPrices,
} from "@/hooks/addresshooks/useaddress";

const AddressPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const checkoutId = localStorage.getItem("checkoutId");

  const [useNewAddress, setUseNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isInitialTaxLoaded, setIsInitialTaxLoaded] = useState(false);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      contactName: "",
      phone: "",
      country: "",
      state: "",
      district: "",
      zipCode: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = methods;
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  /* ---------------- API ---------------- */
  const { data: checkoutData } = useCheckoutShipping(checkoutId);
  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  const { mutateAsync: addShipping, isPending: isAddingAddress } =
    useAddShippingAddress();
  const { mutateAsync: updatePrices } = useUpdateShippingPrices();

  // Load initial summary/tax on mount
  useEffect(() => {
    const loadInitialTax = async () => {
      if (!checkoutId || isInitialTaxLoaded) return;
      try {
        const result = await updatePrices({ checkoutId, payload: {} });
        queryClient.setQueryData(["checkout-shipping", checkoutId], result);
        setIsInitialTaxLoaded(true);
      } catch (err) {
        console.error("Initial tax update failed:", err);
      }
    };
    loadInitialTax();
  }, [checkoutId, updatePrices, queryClient, isInitialTaxLoaded]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        shippingAddressId: useNewAddress ? 0 : selectedAddressId || 0,
        billingAddressId: useNewAddress ? 0 : selectedAddressId || 0,
        newAddressForm: useNewAddress
          ? {
              contactName: formData.contactName,
              phone: formData.phone,
              addressLine1: formData.addressLine1,
              addressLine2: formData.addressLine2,
              stateOrProvinceId: Number(formData.state),
              districtId: Number(formData.district),
              countryId: formData.country,
              city: formData.city,
              zipCode: formData.zipCode,
            }
          : null,
        useShippingAddressAsBillingAddress: true,
        checkoutId,
      };

      await addShipping({ checkoutId, payload });

      // Navigate to the payment selection page
      navigate(`/checkout/payment`);
    } catch (err) {
      console.error("Checkout submission failed:", err);
    }
  };

  const existingAddresses = checkoutData?.existingShippingAddresses || [];

  return (
    <ContentWrapper>
      <div className="py-24 lg:py-40 min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row gap-24 max-w-7xl mx-auto px-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

            {!useNewAddress && existingAddresses.length > 0 && (
              <div className="space-y-4 mb-8">
                {existingAddresses.map((address) => (
                  <label
                    key={address.userAddressId}
                    className={`flex items-start gap-3 border p-4 rounded-lg cursor-pointer transition-all ${selectedAddressId === address.userAddressId ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === address.userAddressId}
                      onChange={() =>
                        setSelectedAddressId(address.userAddressId)
                      }
                    />
                    <div>
                      <p className="font-semibold">{address.contactName}</p>
                      <p className="text-sm text-gray-600">
                        {address.addressLine1}, {address.cityName}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setUseNewAddress(!useNewAddress)}
              className="text-sm font-medium text-blue-600 underline mb-6 block"
            >
              {useNewAddress ? "← Use saved address" : "+ Add New Address"}
            </button>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {useNewAddress && (
                  <ShippingForm
                    errors={errors}
                    countryOptions={countries.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    stateOptions={states.map((s) => ({
                      label: s.name,
                      value: s.id,
                    }))}
                    districtOptions={districts.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                )}

                <button
                  type="submit"
                  disabled={
                    isAddingAddress || (!useNewAddress && !selectedAddressId)
                  }
                  className="mt-8 bg-black text-white px-10 py-4 rounded-lg font-semibold w-full disabled:bg-gray-400"
                >
                  {isAddingAddress ? "Saving..." : "Continue to Payment"}
                </button>
              </form>
            </FormProvider>
          </div>

          <div className="w-full lg:w-96">
            <OrderSummary checkoutData={checkoutData} />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddressPage;
