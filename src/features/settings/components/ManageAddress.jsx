import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import Inputs from "@/components/shared/Inputs";
import SelectInputs from "@/components/shared/SelectInput";
import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";
import {
  useAddAddress,
  useUserAddresses,
} from "@/hooks/addresshooks/useaddress";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
import { X } from "lucide-react";

const ManageAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const countryId = watch("country");
  const stateId = watch("state");

  
  const { data: countriesData } = useCountries();
  const { data: statesData } = useStates(countryId);
  const { data: districtsData } = useDistricts(stateId);


  const {
    data: userAddresses,
  } = useUserAddresses();


  useEffect(() => {
    setValue("state", "");
    setValue("district", "");
  }, [countryId]);

  useEffect(() => {
    setValue("district", "");
  }, [stateId]);

  const countryOptions =
    countriesData?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const stateOptions =
    statesData?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const districtOptions =
    districtsData?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const { mutate: addAddressApi, isPending } = useAddAddress();

  /* ================= Save Address ================= */
  const saveAddress = (data) => {
    const payload = {
      contactName: data.name,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      zipCode: data.pincode,
      city: data.city,
      stateOrProvinceId: Number(data.state),
      districtId: Number(data.district),
      countryId: data.country,
    };
    console.log("Saving address with payload:", payload);
    addAddressApi(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-addresses"]);

        reset();
        setShowForm(false);
      },
    });
  };

  return (
  <div className="min-h-screen px-4 sm:px-6 md:px-12 py-6 bg-gray-50">
    
    {/* Header Row */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Your Addresses</h2>

      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:opacity-90"
      >
        <span className="text-lg font-bold">+</span>
        Add Address
      </button>
    </div>

    {/* Address List - Single Column */}
    <div className="grid grid-cols-1 gap-4">
      {userAddresses?.length === 0 && (
        <div className="text-center text-gray-500 py-10 bg-white rounded-lg border">
          No address added yet
        </div>
      )}

      {userAddresses?.map((addr) => (
        <div
          key={addr.id}
          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          <h4 className="font-semibold text-base">{addr.contactName}</h4>

          <p className="text-sm mt-1">{addr.addressLine1}</p>

        {addr.addressLine2?.trim() && (
  <p className="text-sm">{addr.addressLine2}</p>
)}
          <p className="text-sm mt-1">
            {addr.city} - {addr.zipCode}
          </p>

          {/* Added Missing Fields */}
          <p className="text-sm">
       {addr.stateOrProvinceName || addr.stateName}
          </p>

          <p className="text-sm">
         {addr.districtName}
          </p>

          <p className="text-sm">
         {addr.countryName}
          </p>

          <p className="text-sm mt-2 font-medium">
            {addr.phone}
          </p>
        </div>
      ))}
    </div>

    {/* ================= Modal (unchanged) ================= */}
    {showForm && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:max-w-lg rounded-t-xl sm:rounded-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto relative">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Add New Address</h3>

            <button
              type="button"
              onClick={() => {
                reset();
                setShowForm(false);
              }}
              className="p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <FormProvider {...methods}>
            <div className="grid grid-cols-1 gap-3">
              
              <Inputs name="name" label="Full Name" required errors={errors.name} />
              <Inputs name="phone" label="Phone" required errors={errors.phone} />

              <FormTextArea
                name="addressLine1"
                label="Address Line 1"
                register={register}
                required
                errors={errors.addressLine1}
              />

              <FormTextArea
                name="addressLine2"
                label="Address Line 2"
                register={register}
              />

              <SelectInputs
                name="country"
                label="Country"
                options={countryOptions}
              />

              <SelectInputs
                name="state"
                label="State"
                options={stateOptions}
                disabled={!countryId}
              />

              <SelectInputs
                name="district"
                label="District"
                options={districtOptions}
                disabled={!stateId}
              />

              <Inputs name="city" label="City" required errors={errors.city} />
              <Inputs name="pincode" label="Pincode" required errors={errors.pincode} />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSubmit(saveAddress)}
                  disabled={isPending}
                  className="bg-[var(--color-primary)] text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  {isPending ? "Saving..." : "Save Address"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setShowForm(false);
                  }}
                  className="border px-4 py-2 rounded w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    )}
  </div>
);
};

export default ManageAddress;