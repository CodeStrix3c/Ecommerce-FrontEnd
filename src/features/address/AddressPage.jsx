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
import { useCreateOrder } from "@/hooks/Orders/useOrders";
import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";

const AddressPage = () => {
  const navigate = useNavigate();
  const checkoutId = localStorage.getItem("checkoutId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

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

  const { data: paymentMethods = [] } = usePaymentProviders();
  const { mutateAsync: createOrder, isPending: placingOrder } =
    useCreateOrder();

  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  const { mutateAsync: addShipping, isPending } = useAddShippingAddress();
  const { mutateAsync: updatePrices, isPending: updatingPrices } =
    useUpdateShippingPrices();

  const handleAddressSelection = async (userAddressId) => {
    try {
      setSelectedAddressId(userAddressId);

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

      const { data: freshCheckout } = await refetchCheckout();

      const newAddresses =
        freshCheckout?.existingShippingAddresses?.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      if (newAddresses.length === 0) {
        toast.error("Address created but not found in checkout");
        return;
      }

      const newestAddress = newAddresses[newAddresses.length - 1].userAddressId;

      await handleAddressSelection(newestAddress);

      toast.success("Address added & tax calculated");

      setIsModalOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      toast.error("Please select payment method");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select address");
      return;
    }

    try {
      const selectedAddress = checkoutData?.existingShippingAddresses?.find(
        (a) => a.userAddressId === selectedAddressId,
      );

      if (!selectedAddress) {
        toast.error("Selected address not found");
        return;
      }

      const rootPricingData = updatedCheckoutData || checkoutData;

      const addressFormPayload = {
        contactName: selectedAddress.contactName,
        phone: selectedAddress.phone,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2 || "",
        stateOrProvinceId: selectedAddress.stateOrProvinceId,
        districtId: selectedAddress.districtId,
        countryId: selectedAddress.countryId,
        city: selectedAddress.cityName,
        zipCode: selectedAddress.zipCode,
        stateOrProvinces: [],
        districts: [],
        shipableContries: [],
      };

      const orderPayload = {
        existingShippingAddresses: [],
        shippingAddressId: selectedAddressId,
        billingAddressId: selectedAddressId,
        shippingMethod: rootPricingData?.selectedShippingMethodName || "Free",
        newAddressForm: addressFormPayload,
        useShippingAddressAsBillingAddress: true,
        newBillingAddressForm: addressFormPayload,
        orderNote: "",
        checkoutId,
      };

      await createOrder({
        checkoutId,
        payload: orderPayload,
      });

      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
    }
  };

  if (loadingCheckout) {
    return (
      <ContentWrapper>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </ContentWrapper>
    );
  }

  const existingAddresses =
    checkoutData?.existingShippingAddresses?.filter(
      (a) => a.userAddressId !== 0,
    ) || [];

  const newAddress = checkoutData?.newAddressForm;

  const displayCheckoutData = updatedCheckoutData || checkoutData;

  return (
    <ContentWrapper>
      <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                {newAddress && (
                  <>
                    <h2 className="text-lg font-semibold">Shipping Address</h2>

                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="text-sm space-y-1">
                        <p className="font-semibold">
                          {newAddress.contactName}
                        </p>
                        <p>📞 {newAddress.phone}</p>
                        <p>{newAddress.addressLine1}</p>
                        {newAddress.addressLine2 && (
                          <p>{newAddress.addressLine2}</p>
                        )}
                        <p>
                          {newAddress.city}, {newAddress.districtId}
                        </p>
                        <p>
                          {newAddress.stateOrProvinceId} - {newAddress.zipCode}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <h2 className="text-lg font-semibold">Existing Addresses</h2>

                {existingAddresses.map((address) => (
                  <label
                    key={address.userAddressId}
                    className={`border rounded-xl p-4 flex gap-4 cursor-pointer transition ${
                      selectedAddressId === address.userAddressId
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === address.userAddressId}
                      onChange={() =>
                        handleAddressSelection(address.userAddressId)
                      }
                      className="mt-1"
                    />

                    <div className="text-sm space-y-1">
                      <p className="font-semibold">{address.contactName}</p>
                      <p>📞 {address.phone}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.cityName}, {address.districtName}
                      </p>
                      <p>
                        {address.stateOrProvinceName} - {address.zipCode}
                      </p>
                      <p>{address.countryName}</p>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-black"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <OrderSummary
                checkoutData={displayCheckoutData}
                isUpdating={updatingPrices}
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                onPlaceOrder={handlePlaceOrder}
                placingOrder={placingOrder}
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
