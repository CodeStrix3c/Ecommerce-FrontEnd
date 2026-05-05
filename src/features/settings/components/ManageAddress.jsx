import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { X, Pencil, Trash2 } from "lucide-react";

import Inputs from "@/components/shared/Inputs";
import SelectInputs from "@/components/shared/SelectInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
import ConfirmDialog from "@/components/shared/confirmDialog";

import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useAddAddress,
  useDeleteUserAddress,
  useUserAddresses,
  useEditUserAddress,
  useSetDefaultAddress,
  useExistingAddress,
} from "@/hooks/addresshooks/useaddress";
import { ManageAddressSchema } from "@/features/farmer-registration/schemas/userSchamas/ManagePasswordSchema";

const ManageAddress = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const methods = useForm({
    resolver: zodResolver(ManageAddressSchema),
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
  const { data: userAddresses } = useUserAddresses();

  const { data: existingAddress, isLoading: isExistingLoading } =
    useExistingAddress(editId);

  // ✅ AUTO-SET DEFAULT LOGIC
  // If there is exactly 1 address and it's not default, set it as default automatically
  useEffect(() => {
    if (userAddresses && userAddresses.length === 1) {
      const singleAddress = userAddresses[0];
      if (!singleAddress.isDefaultShippingAddress) {
        handleSetDefault(singleAddress.userAddressId, true);
      }
    }
  }, [userAddresses]);

  useEffect(() => {
    if (existingAddress && editId) {
      setValue("name", existingAddress.contactName);
      setValue("phone", existingAddress.phone);
      setValue("addressLine1", existingAddress.addressLine1);
      setValue("addressLine2", existingAddress.addressLine2);
      setValue("city", existingAddress.city);
      setValue("pincode", existingAddress.zipCode);
      setValue("country", existingAddress.countryId);
      setValue("state", String(existingAddress.stateOrProvinceId));
      setValue("district", String(existingAddress.districtId));
    }
  }, [existingAddress, editId, setValue]);

  useEffect(() => {
    if (!editId) {
      setValue("state", "");
      setValue("district", "");
    }
  }, [countryId]);

  useEffect(() => {
    if (!editId) {
      setValue("district", "");
    }
  }, [stateId]);

  const countryOptions =
    countriesData?.map((item) => ({
      label: item.name,
      value: String(item.id),
    })) || [];
  const stateOptions =
    statesData?.map((item) => ({ label: item.name, value: String(item.id) })) ||
    [];
  const districtOptions =
    districtsData?.map((item) => ({
      label: item.name,
      value: String(item.id),
    })) || [];

  const { mutate: addAddressApi, isPending: isAddPending } = useAddAddress();
  const { mutate: editAddressApi, isPending: isEditPending } =
    useEditUserAddress();
  const { mutate: deleteAddressApi } = useDeleteUserAddress();
  const { mutate: setDefaultApi, isPending: isDefaultPending } =
    useSetDefaultAddress();

  const handleSetDefault = (id, silent = false) => {
    setDefaultApi(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-addresses"]);
        if (!silent) toast.success("Default address updated");
      },
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setIsDeleting(true);
    deleteAddressApi(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-addresses"]);
        toast.success("Address deleted successfully");
      },
      onSettled: () => {
        setIsDeleting(false);
        setConfirmOpen(false);
        setDeleteId(null);
      },
    });
  };

  const handleEdit = (addr) => {
    setEditId(addr.userAddressId);
    setShowForm(true);
  };

  const saveAddress = (data) => {
    const countryValue = methods.getValues("country");
    const isFirstAddress = !userAddresses || userAddresses.length === 0;

    const payload = {
      contactName: data.name,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      zipCode: data.pincode,
      city: data.city,
      stateOrProvinceId: data.state ? Number(data.state) : null,
      districtId: data.district ? Number(data.district) : null,
      countryId: countryValue || null,
      isDefaultShippingAddress: isFirstAddress,
    };

    if (editId) {
      editAddressApi(
        { userAddressId: editId, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["user-addresses"]);
            toast.success("Address updated successfully");
            reset();
            setEditId(null);
            setShowForm(false);
          },
        },
      );
      return;
    }

    addAddressApi(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-addresses"]);
        toast.success("Address added successfully");
        reset();
        setShowForm(false);
      },
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 py-6 border rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Addresses</h2>
        <button
          onClick={() => {
            setEditId(null);
            reset();
            setShowForm(true);
          }}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
        >
          + Add Address
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
        {userAddresses?.map((addr) => (
          <div
            key={addr.userAddressId}
            className={`bg-white border rounded-xl p-5 shadow-sm overflow-hidden ${
              addr.isDefaultShippingAddress
                ? "border-green-600"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-xl font-semibold flex items-center gap-2 flex-wrap">
                  <span className="break-words">{addr.contactName}</span>
                  {addr.isDefaultShippingAddress && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded shrink-0">
                      Default
                    </span>
                  )}
                </h4>
                <p className="break-words">{addr.phone}</p>
              </div>

              <div className="flex gap-3 items-start shrink-0">
                <button onClick={() => handleEdit(addr)}>
                  <Pencil size={20} className="text-green-800" />
                </button>
                <button onClick={() => handleDelete(addr.userAddressId)}>
                  <Trash2 size={20} className="text-red-800" />
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm overflow-hidden break-words">
              <p>{addr.addressLine1}</p>
              {addr.addressLine2 && <p>{addr.addressLine2}</p>}
              <p>
                {addr.city}, {addr.districtName}, {addr.stateOrProvinceName}
              </p>
              <p>
                {addr.countryName} - {addr.zipCode}
              </p>
            </div>

            {!addr.isDefaultShippingAddress && (
              <button
                disabled={isDefaultPending}
                onClick={() => handleSetDefault(addr.userAddressId)}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                {isDefaultPending ? "Updating..." : "Set as Default"}
              </button>
            )}
          </div>
        ))}
        {userAddresses?.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500 border-2 border-dashed rounded-xl">
            No addresses found. Add your first address to get started.
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white w-full sm:max-w-lg rounded-lg max-h-[90vh] flex flex-col relative">
            <div className="flex justify-between px-6 py-4 border-b flex-shrink-0">
              <h3 className="text-lg font-semibold">
                {editId ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                onClick={() => {
                  reset();
                  setEditId(null);
                  setShowForm(false);
                }}
              >
                <X size={20} />
              </button>
            </div>
            {editId && isExistingLoading ? (
              <p className="text-center py-10">Loading address...</p>
            ) : (
              <FormProvider {...methods}>
                <div className="flex flex-col flex-1 min-h-0">
                  {/* Scrollable fields */}
                  <div
                    className="px-6 py-4 flex-1 overflow-y-auto grid gap-3"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                    <Inputs name="name" label="Full Name" required />
                    <Inputs name="phone" label="Phone" required type="phone" />
                    <FormTextArea
                      name="addressLine1"
                      label="Address Line 1"
                      register={register}
                      errors={errors.addressLine1}
                      required
                    />
                    <FormTextArea
                      name="addressLine2"
                      label="Address Line 2"
                      register={register}
                      required={false}
                      errors={errors.addressLine2}
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
                    <Inputs name="city" label="City" required />
                    <Inputs
                      name="pincode"
                      label="Pincode"
                      type="pincode"
                      required
                      errors={errors.pincode}
                    />
                  </div>

                  {/* Sticky footer */}
                  <div className="flex gap-3 px-6 py-4 justify-end border-t flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setEditId(null);
                        setShowForm(false);
                      }}
                      className="border px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit(saveAddress)}
                      disabled={isAddPending || isEditPending}
                      className="bg-[var(--color-primary)] text-white px-4 py-2 rounded"
                    >
                      {isAddPending || isEditPending
                        ? "Saving..."
                        : editId
                          ? "Update Address"
                          : "Save Address"}
                    </button>
                  </div>
                </div>
              </FormProvider>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Address"
        message="Are you sure you want to delete this address?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        loading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default ManageAddress;
