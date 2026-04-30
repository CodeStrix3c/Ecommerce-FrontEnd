import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { AddressModal } from "./components/addressModal";
import { OrderSummary } from "./components/OrderSummary";
import { Plus, Pencil, MapPin } from "lucide-react";
import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useCheckoutShipping,
  useAddShippingAddress,
  useUpdateShippingPrices,
  useAddAddress,
  useExistingAddress,
  useEditUserAddress,
} from "@/hooks/addresshooks/useaddress";

import { useCreateOrder } from "@/hooks/Orders/useOrders";
import { usePaymentProviders } from "@/services/User/paymenthooks/getPaymentProviders";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../farmer-registration/schemas/addressSchema";
import { ShippingForm } from "./components/addressForm";
import Spinner from "@/components/ui/Spinner";

const defaultValues = {
  contactName: "",
  phone: "",
  country: "",
  state: "",
  district: "",
  city: "",
  zipCode: "",
  addressLine1: "",
  addressLine2: "",
};

const AddressPage = () => {
  const navigate = useNavigate();
  const checkoutId = localStorage.getItem("checkoutId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [updatedCheckoutData, setUpdatedCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [addressList, setAddressList] = useState([]);

  // Holds an error message to display inline in the UI (e.g. out of stock)
  const [orderError, setOrderError] = useState(null);

  const [editId, setEditId] = useState(null);

  const methods = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues,
  });

  const { watch, reset, handleSubmit } = methods;

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

  const { mutateAsync: createAddress } = useAddAddress();

  const { mutateAsync: editAddress } = useEditUserAddress();

  const { data: existingAddress } = useExistingAddress(editId);

  const { data: countries = [] } = useCountries();
  const { data: states = [] } = useStates(selectedCountry);
  const { data: districts = [] } = useDistricts(selectedState);

  const { mutateAsync: addShipping } = useAddShippingAddress();

  const { mutateAsync: updatePrices, isPending: updatingPrices } =
    useUpdateShippingPrices();

  const rootData = updatedCheckoutData || checkoutData;
  const shippingPrices = rootData?.shippingPrices || [];

  /* ---------------- INITIALIZE ADDRESS LIST ---------------- */
  useEffect(() => {
    if (checkoutData?.existingShippingAddresses) {
      const filtered =
        checkoutData.existingShippingAddresses.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      setAddressList(filtered);

      if (filtered.length > 0 && !selectedAddressId) {
        setSelectedAddressId(filtered[0].userAddressId);
        handleAddressSelection(filtered[0].userAddressId);
      }
    }
  }, [checkoutData]);

  /* ---------------- LOAD EXISTING ADDRESS INTO FORM ---------------- */
  useEffect(() => {
    if (existingAddress && editId) {
      reset({
        contactName: existingAddress.contactName,
        phone: existingAddress.phone,
        addressLine1: existingAddress.addressLine1,
        addressLine2: existingAddress.addressLine2,
        city: existingAddress.city,
        zipCode: existingAddress.zipCode,
        country: existingAddress.countryId,
        state: String(existingAddress.stateOrProvinceId),
        district: String(existingAddress.districtId),
      });

      setIsModalOpen(true);
    }
  }, [existingAddress, editId, reset]);

  /* ---------------- SHIPPING METHOD ---------------- */
  const getShippingMethod = () => {
    return (
      selectedShippingMethod ||
      shippingPrices?.[0]?.name ||
      checkoutData?.shippingPrices?.[0]?.name ||
      "Free"
    );
  };

  /* ---------------- POST SHIPPING ---------------- */
  const callPostShipping = async (addressId, isNew = false) => {
    try {
      const payload = {
        existingShippingAddresses: [],
        shippingAddressId: isNew ? 0 : addressId,
        billingAddressId: 0,
        shippingMethod: getShippingMethod(),
        newAddressForm: null,
        useShippingAddressAsBillingAddress: true,
        newBillingAddressForm: null,
        orderNote: "",
        checkoutId,
      };

      await addShipping({ checkoutId, payload });
    } catch (err) {
      console.error("Shipping post failed", err);
    }
  };

  /* ---------------- ADDRESS SELECT ---------------- */
  const handleAddressSelection = async (userAddressId) => {
    try {
      setSelectedAddressId(userAddressId);

      const payload = { existingShippingAddressId: userAddressId };
      const result = await updatePrices({ checkoutId, payload });

      setUpdatedCheckoutData(result);
      await callPostShipping(userAddressId, false);
    } catch {
      toast.error("Failed to update tax & shipping");
    }
  };

  /* ---------------- SHIPPING METHOD CHANGE ---------------- */
  const handleShippingMethodChange = async (methodName) => {
    setSelectedShippingMethod(methodName);
    if (!selectedAddressId) return;
    await handleAddressSelection(selectedAddressId);
  };

  /* ---------------- INITIAL METHOD ---------------- */
  useEffect(() => {
    if (shippingPrices.length > 0 && !selectedShippingMethod) {
      setSelectedShippingMethod(shippingPrices[0].name);
    }
  }, [shippingPrices]);

  /* ---------------- ADD / EDIT ADDRESS ---------------- */
  const onModalSubmit = async (formData) => {
    try {
      const payload = {
        contactName: formData.contactName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        districtId: Number(formData.district),
        zipCode: formData.zipCode,
        stateOrProvinceId: Number(formData.state),
        city: formData.city,
        countryId: String(formData.country),
      };

      if (editId) {
        await editAddress({ userAddressId: editId, payload });
        toast.success("Address updated successfully");
        setEditId(null);
      } else {
        await createAddress(payload);
        toast.success("Address added successfully");
      }

      const { data: freshCheckout } = await refetchCheckout();

      const newAddresses =
        freshCheckout?.existingShippingAddresses?.filter(
          (a) => a.userAddressId !== 0,
        ) || [];

      setAddressList(newAddresses);
      setIsModalOpen(false);
      reset(defaultValues);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    // Clear any previous order error
    setOrderError(null);

    if (!selectedPayment) {
      toast.error("Please select payment mefffthod");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select address");
      return;
    }

    try {
      const orderResponse = await createOrder({ checkoutId });
      toast.success("Order placed successfully!");
      navigate("/success", { state: { order: orderResponse } });
    } catch (err) {
      const data = err?.response?.data;

      // API returns { value, success, error } — extract the "error" field first,
      // then fall back to other common shapes, then a generic message.
      const message =
        data?.error ||
        data?.message ||
        (typeof data === "string" ? data : null) ||
        err?.message ||
        "Failed to place order";

      // Show inline in the UI instead of (or in addition to) a toast
      setOrderError(message);
    }
  };

  if (loadingCheckout) {
    return (
      <ContentWrapper>
        <Spinner />
      </ContentWrapper>
    );
  }

  /* ---------------- NO ADDRESS — INLINE FORM ---------------- */
  if (addressList.length === 0) {
    return (
      <ContentWrapper>
        <div className="py-8 lg:mt-10">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-4">
                <MapPin size={28} className="text-[var(--color-primary)]" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">
                Add a delivery address
              </h1>
              <p className="text-sm text-gray-500">
                You need at least one shipping address before placing an order.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray)] p-6 w-full">
              <h2 className="text-base font-semibold mb-5">Shipping Address</h2>

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onModalSubmit)}>
                  <ShippingForm
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

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg"
                    >
                      Save & Continue
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </ContentWrapper>
    );
  }

  /* ---------------- NORMAL CHECKOUT LAYOUT ---------------- */
  return (
    <ContentWrapper>
      <div className="min-h-screen py-8 lg:mt-28 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--color-white)] p-6 rounded-xl shadow-sm border border-[var(--color-gray)]">
                <h2 className="text-lg font-semibold mb-4">Shipping Methods</h2>

                <div className="space-y-3">
                  {shippingPrices.map((method) => (
                    <label
                      key={method.name}
                      className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer
                  ${
                    getShippingMethod() === method.name
                      ? "border-[var(--color-primary)] bg-[var(--color-black-hover)]"
                      : "border-[var(--color-gray)]"
                  }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={getShippingMethod() === method.name}
                          onChange={() =>
                            handleShippingMethodChange(method.name)
                          }
                        />
                        <span className="text-sm font-medium">
                          {method.name}
                        </span>
                      </div>
                      <span className="text-sm">₹ {method.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-[var(--color-white)] p-6 rounded-xl shadow-sm border border-[var(--color-gray)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Select Delivery Address
                  </h2>

                  <button
                    onClick={() => {
                      setEditId(null);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 text-white bg-[var(--color-primary)] px-4 py-2 rounded-xl"
                  >
                    <Plus size={16} />
                    New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {addressList.map((address) => (
                    <div
                      key={address.userAddressId}
                      onClick={() =>
                        handleAddressSelection(address.userAddressId)
                      }
                      className={`relative flex gap-4 border rounded-lg p-4 cursor-pointer
  ${
    selectedAddressId === address.userAddressId
      ? "border-[var(--color-primary)] bg-[var(--color-black-hover)]"
      : "border-[var(--color-gray)]"
  }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditId(address.userAddressId);
                        }}
                        className="absolute top-5 right-4 text-[var(--color-primary)]"
                      >
                        <Pencil size={18} />
                      </button>

                      <input
                        type="radio"
                        checked={selectedAddressId === address.userAddressId}
                        onChange={() =>
                          handleAddressSelection(address.userAddressId)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />

                      <div className="text-sm overflow-hidden break-words">
                        <p className="font-semibold">
                          {address.contactName} <br />
                          {address.phone}
                        </p>
                        <p className="mt-1">
                          {address.addressLine1} <br />
                          {address.addressLine2}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="lg:sticky lg:top-24 h-fit">
              <OrderSummary
                checkoutData={rootData}
                isUpdating={updatingPrices}
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                onPlaceOrder={handlePlaceOrder}
                placingOrder={placingOrder}
                orderError={orderError}
              />
            </div>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditId(null);
            reset(defaultValues);
          }}
          methods={methods}
          onSubmit={onModalSubmit}
          countries={countries}
          states={states}
          districts={districts}
          editId={editId}
        />
      </FormProvider>
    </ContentWrapper>
  );
};

export default AddressPage;
