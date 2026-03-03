import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  const checkoutId = localStorage.getItem("checkoutId");

  const [useNewAddress, setUseNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  /* ---------------- FORM ---------------- */
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

  /* ---------------- API CALLS ---------------- */

  // 1️⃣ Get checkout shipping data
  const { data: checkoutData } = useCheckoutShipping(checkoutId);

  // 2️⃣ Countries / States / Districts (keep as you requested)
  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  // 3️⃣ Mutations
  const { mutateAsync: addShipping, isPending } = useAddShippingAddress();

  const { mutateAsync: updatePrices } = useUpdateShippingPrices();

  /* ---------------- RESET LOGIC ---------------- */
  useEffect(() => {
    setValue("state", "");
    setValue("district", "");
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("district", "");
  }, [selectedState, setValue]);

  /* ---------------- OPTIONS ---------------- */
  const countryOptions = countries.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const stateOptions = states.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const districtOptions = districts.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (formData) => {
    try {
      if (useNewAddress) {
        // 🔹 NEW ADDRESS
        await addShipping({
          checkoutId,
          payload: {
            newAddressForm: {
              ContactName: formData.contactName,
              Phone: formData.phone,
              AddressLine1: formData.addressLine1,
              AddressLine2: formData.addressLine2,
              ZipCode: formData.zipCode,
              City: formData.city,
              StateOrProvinceId: Number(formData.state),
              DistrictId: Number(formData.district),
              CountryId: formData.country,
            },
            useShippingAddressAsBillingAddress: true,
          },
        });
      } else {
        // 🔹 EXISTING ADDRESS
        await addShipping({
          checkoutId,
          payload: {
            shippingAddressId: selectedAddressId,
            billingAddressId: selectedAddressId,
            useShippingAddressAsBillingAddress: true,
          },
        });
      }

      // 🔹 Update Tax & Shipping
      await updatePrices({
        checkoutId,
        payload: {
          selectedShippingMethodName: "Standard",
        },
      });

      // 🔹 Go to payment
      navigate(`/checkout/${checkoutId}/payment`);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  /* ---------------- EXISTING ADDRESSES ---------------- */
  const existingAddresses = checkoutData?.existingShippingAddresses || [];

  return (
    <ContentWrapper>
      <div className="py-24 lg:py-40 min-h-screen bg-[var(--color-white)]">
        <div className="flex flex-col lg:flex-row gap-24 max-w-7xl mx-auto px-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

            {/* -------- EXISTING ADDRESS LIST -------- */}
            {existingAddresses.length > 0 && (
              <div className="space-y-4 mb-8">
                {existingAddresses.map((address) => (
                  <label
                    key={address.userAddressId}
                    className="flex items-start gap-3 border p-4 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="existingAddress"
                      value={address.userAddressId}
                      onChange={() => {
                        setSelectedAddressId(address.userAddressId);
                        setUseNewAddress(false);
                      }}
                    />
                    <div>
                      <p className="font-semibold">{address.contactName}</p>
                      <p className="text-sm">{address.addressLine1}</p>
                      <p className="text-sm">{address.phone}</p>
                      <p className="text-sm">
                        {address.stateOrProvinceName} - {address.cityName} -
                        {address.districtName} - {address.zipCode}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* -------- ADD NEW ADDRESS BUTTON -------- */}
            <button
              type="button"
              onClick={() => setUseNewAddress(true)}
              className="text-sm underline mb-6"
            >
              + Add New Address
            </button>

            {/* -------- NEW ADDRESS FORM -------- */}
            {useNewAddress && (
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ShippingForm
                    errors={errors}
                    countryOptions={countryOptions}
                    stateOptions={stateOptions}
                    districtOptions={districtOptions}
                    isPending={isPending}
                  />
                </form>
              </FormProvider>
            )}

            {/* -------- CONTINUE BUTTON FOR EXISTING -------- */}
            {!useNewAddress && selectedAddressId && (
              <button
                onClick={() => onSubmit({})}
                className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
              >
                Continue to Payment
              </button>
            )}
          </div>

          {/* -------- ORDER SUMMARY -------- */}
          <div className="w-full lg:w-96">
            <OrderSummary orders={[]} />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AddressPage;
