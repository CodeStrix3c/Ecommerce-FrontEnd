// pages/AddressPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { AddressModal } from "./components/addressModal";
import { OrderSummary } from "./components/OrderSummary";
import { MapPin, Plus, Check } from "lucide-react";

import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useCheckoutShipping,
  useAddShippingAddress,
  useUpdateShippingPrices,
} from "@/hooks/addresshooks/useaddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "../farmer-registration/schemas/addressSchema";

const AddressPage = () => {
  const navigate = useNavigate();
  const checkoutId = localStorage.getItem("checkoutId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
  const hasCalculatedPricesRef = useRef(false);

  const methods = useForm({
    resolver: zodResolver(shippingAddressSchema),
    mode: "onChange", // Validates on change
    defaultValues: {
      contactName: "",
      phone: "",
      country: "",
      state: "",
      district: "",
      city: "",
      zipCode: "",
      addressLine1: "",
      addressLine2: "",
    },
  });

  const { watch, reset } = methods;
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  /* ---------------- API ---------------- */
  const { data: checkoutData, isLoading: loadingCheckout } =
    useCheckoutShipping(checkoutId);
  const { data: countries = [] } = useCountries();
  const { data: states = [], isLoading: loadingStates } =
    useStates(selectedCountry);
  const { data: districts = [], isLoading: loadingDistricts } =
    useDistricts(selectedState);

  const { mutateAsync: addShipping, isPending } = useAddShippingAddress();
  const { mutateAsync: updatePrices, isPending: updatingPrices } =
    useUpdateShippingPrices();

  // Redirect if no checkoutId
  useEffect(() => {
    if (!checkoutId) {
      toast.error("No active checkout found");
      navigate("/cart");
    }
  }, [checkoutId, navigate]);

  // ✅ Calculate tax & shipping when address is selected
  const handleAddressSelection = async (userAddressId) => {
    setSelectedAddressId(userAddressId);

    try {
      const payload = {
        existingShippingAddressId: userAddressId,
      };

      const result = await updatePrices({ checkoutId, payload });
      setUpdatedCheckoutData(result);
      hasCalculatedPricesRef.current = true;
    } catch (err) {
      console.error("Failed to calculate tax/shipping:", err);
      toast.error("Failed to calculate shipping costs");
    }
  };

  // ✅ Auto-select first address and calculate prices on initial load
  useEffect(() => {
    const existingAddresses =
      checkoutData?.existingShippingAddresses?.filter(
        (a) => a.userAddressId !== 0,
      ) || [];

    if (
      !selectedAddressId &&
      existingAddresses.length > 0 &&
      !hasCalculatedPricesRef.current
    ) {
      const firstAddressId = existingAddresses[0].userAddressId;
      setSelectedAddressId(firstAddressId);
      handleAddressSelection(firstAddressId);
    }
  }, [checkoutData, selectedAddressId]);

  /* ---------------- MODAL SUBMIT (Save New Address) ---------------- */
  const onModalSubmit = async (formData) => {
    try {
      const payload = {
        shippingAddressId: 0,
        billingAddressId: 0,
        useShippingAddressAsBillingAddress: true,
        checkoutId,
        newAddressForm: {
          contactName: formData.contactName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2 || "",
          stateOrProvinceId: formData.state,
          districtId: formData.district,
          countryId: formData.country,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      };

      await addShipping({ checkoutId, payload });
      toast.success("Address saved successfully");

      // Close modal and reset form
      setIsModalOpen(false);
      reset();

      // Refresh checkout data to show new address
      hasCalculatedPricesRef.current = false;
    } catch (err) {
      console.error("Failed to save address:", err);
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  /* ---------------- FINAL SUBMIT (Proceed to Payment) ---------------- */
  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    navigate(`/checkout/${checkoutId}/payment`);
  };

  const existingAddresses =
    checkoutData?.existingShippingAddresses?.filter(
      (a) => a.userAddressId !== 0,
    ) || [];

  if (loadingCheckout) {
    return (
      <ContentWrapper>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </ContentWrapper>
    );
  }

  const displayCheckoutData = updatedCheckoutData || checkoutData;

  return (
    <ContentWrapper>
      <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT - Address Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <MapPin className="w-6 h-6 text-black" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                </div>

                {/* Existing Addresses */}
                {existingAddresses.length > 0 && (
                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Select a saved address:
                    </p>
                    {existingAddresses.map((address) => (
                      <label
                        key={address.userAddressId}
                        className={`flex gap-4 p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedAddressId === address.userAddressId
                            ? "border-black bg-gray-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={selectedAddressId === address.userAddressId}
                          onChange={() =>
                            handleAddressSelection(address.userAddressId)
                          }
                          className="mt-1 w-4 h-4 accent-black cursor-pointer"
                          disabled={updatingPrices}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {address.contactName}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.cityName}, {address.zipCode}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {address.phone}
                          </p>
                        </div>
                        {selectedAddressId === address.userAddressId && (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {/* Loading Indicator */}
                {updatingPrices && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-blue-800">
                      Calculating shipping and tax...
                    </span>
                  </div>
                )}

                {/* Add New Address Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                  disabled={updatingPrices}
                >
                  <Plus size={16} />
                  Add New Address
                </button>

                {/* Proceed to Payment Button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={!selectedAddressId || updatingPrices}
                  className="w-full bg-gradient-to-r from-black to-gray-900 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <OrderSummary
                checkoutData={displayCheckoutData}
                isUpdating={updatingPrices}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        methods={methods}
        onSubmit={onModalSubmit}
        countries={countries}
        states={states}
        districts={districts}
        loadingStates={loadingStates}
        loadingDistricts={loadingDistricts}
        isSaving={isPending}
      />
    </ContentWrapper>
  );
};

export default AddressPage;
