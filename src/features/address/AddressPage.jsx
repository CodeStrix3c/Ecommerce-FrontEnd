import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { AddressModal } from "./components/addressModal";
import { OrderSummary } from "./components/OrderSummary";
import { Plus } from "lucide-react";

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
    mode: "onChange",
  });

  const { watch, reset } = methods;
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const {
    data: checkoutData,
    isLoading: loadingCheckout,
    refetch: refetchCheckout,
  } = useCheckoutShipping(checkoutId);

  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  const { mutateAsync: addShipping, isPending } = useAddShippingAddress();
  const { mutateAsync: updatePrices, isPending: updatingPrices } =
    useUpdateShippingPrices();

  /* -------------------- ADDRESS SELECTION -------------------- */

  const handleAddressSelection = async (userAddressId) => {
    try {
      setSelectedAddressId(userAddressId);

      // ✅ FIX: Only send what tax API expects
      const payload = {
        existingShippingAddressId: userAddressId,
      };

      const result = await updatePrices({ checkoutId, payload });

      setUpdatedCheckoutData(result);
      hasCalculatedPricesRef.current = true;
    } catch {
      toast.error("Failed to update tax & shipping");
    }
  };

  /* -------------------- AUTO SELECT FIRST ADDRESS -------------------- */

  useEffect(() => {
    const addresses =
      checkoutData?.existingShippingAddresses?.filter(
        (a) => a.userAddressId !== 0,
      ) || [];

    if (
      addresses.length > 0 &&
      !selectedAddressId &&
      !hasCalculatedPricesRef.current
    ) {
      handleAddressSelection(addresses[0].userAddressId);
    }
  }, [checkoutData]);

  /* -------------------- ADD NEW ADDRESS FLOW -------------------- */

  const onModalSubmit = async (formData) => {
    try {
      const shippingForm = {
        contactName: formData.contactName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || "",
        stateOrProvinceId: Number(formData.state),
        districtId: Number(formData.district),
        countryId: String(formData.country),
        city: formData.city,
        zipCode: formData.zipCode,
        stateOrProvinces: [],
        districts: [],
        shipableContries: [],
      };

      const payload = {
        existingShippingAddresses: [],
        shippingAddressId: 0,
        billingAddressId: 0,
        shippingMethod: "",
        newAddressForm: shippingForm,
        useShippingAddressAsBillingAddress: true,
        newBillingAddressForm: shippingForm,
        orderNote: "",
        checkoutId,
      };

      await addShipping({ checkoutId, payload });

      // ✅ Refetch updated checkout after adding address
      const { data: freshCheckout } = await refetchCheckout();

      const newAddresses =
        freshCheckout?.existingShippingAddresses?.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      if (newAddresses.length === 0) {
        toast.error("Address created but not found in checkout");
        return;
      }

      // ✅ Select newest address
      const newestAddress = newAddresses[newAddresses.length - 1].userAddressId;

      // ✅ Call tax API properly
      await handleAddressSelection(newestAddress);

      toast.success("Address added & tax calculated");

      setIsModalOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  const existingAddresses =
    checkoutData?.existingShippingAddresses?.filter(
      (a) => a.userAddressId !== 0,
    ) || [];

  if (loadingCheckout) {
    return (
      <ContentWrapper>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
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
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
                {existingAddresses.map((address) => (
                  <label
                    key={address.userAddressId}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === address.userAddressId}
                      onChange={() =>
                        handleAddressSelection(address.userAddressId)
                      }
                    />
                    <span>{address.contactName}</span>
                  </label>
                ))}

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-black"
                >
                  <Plus size={16} /> Add New Address
                </button>

                {/* <button
                  onClick={() => navigate(`/checkout/${checkoutId}/payment`)}
                  disabled={!selectedAddressId}
                  className="w-full bg-black text-white py-3 rounded-xl mt-6"
                >
                  Continue to Payment →
                </button> */}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <OrderSummary
                checkoutData={displayCheckoutData}
                isUpdating={updatingPrices}
              />
            </div>
          </div>
        </div>
      </div>

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
        isSaving={isPending}
      />
    </ContentWrapper>
  );
};

export default AddressPage;
