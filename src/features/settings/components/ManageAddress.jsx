import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { X, Pencil, Trash2 } from "lucide-react";
import Inputs from "@/components/shared/Inputs";
import SelectInputs from "@/components/shared/SelectInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useCountries } from "@/hooks/addresshooks/useCountry";
import { useStates } from "@/hooks/addresshooks/useState";
import { useDistricts } from "@/hooks/addresshooks/useDistricts";

import {
  useAddAddress,
  useDeleteUserAddress,
  useUserAddresses,
  useEditUserAddress,
} from "@/hooks/addresshooks/useaddress";

const ManageAddress = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Confirm dialog states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /* ================= Form ================= */
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
  const { data: userAddresses } = useUserAddresses();

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

  const { mutate: addAddressApi, isPending: isAddPending } = useAddAddress();
  const { mutate: editAddressApi, isPending: isEditPending } =
    useEditUserAddress();
  const { mutate: deleteAddressApi } = useDeleteUserAddress();

  /* ================= Delete Logic ================= */

  // Open confirmation
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (!deleteId) return;

    setIsDeleting(true);

    deleteAddressApi(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-addresses"]);
        toast.success("Address deleted successfully");
        setConfirmOpen(false);
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete address");
      },
      onSettled: () => {
        setIsDeleting(false);
      },
    });
  };

  /* ================= Edit ================= */

  const handleEdit = (addr) => {
    setEditId(addr.userAddressId);
    setShowForm(true);

    setValue("name", addr.contactName);
    setValue("phone", addr.phone);
    setValue("addressLine1", addr.addressLine1);
    setValue("addressLine2", addr.addressLine2);
    setValue("city", addr.city);
    setValue("pincode", addr.zipCode);
    setValue("country", addr.countryId);
    setValue("state", addr.stateOrProvinceId);
    setValue("district", addr.districtId);
  };

  /* ================= Save ================= */

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
          onError: () => {
            toast.error("Failed to update address");
          },
        }
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
      onError: () => {
        toast.error("Failed to save address");
      },
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 py-6 border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Addresses</h2>

        <button
          onClick={() => {
            setEditId(null);
            reset();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md"
        >
          + Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {userAddresses?.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-white rounded-lg border col-span-2">
            No address added yet
          </div>
        )}

        {userAddresses?.map((addr) => (
          <div
            key={addr.userAddressId}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-semibold text-black">
                  {addr.contactName}
                </h4>
                <p className="text-md text-black">{addr.phone}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleEdit(addr)} title="Edit">
                  <Pencil size={20} className="text-green-800" />
                </button>

                <button
                  onClick={() => handleDelete(addr.userAddressId)}
                  title="Delete"
                >
                  <Trash2 size={20} className="text-red-800" />
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-black leading-6">
              <p>{addr.addressLine1}</p>
              {addr.addressLine2 && <p>{addr.addressLine2}</p>}
              <p>
                {addr.city}, {addr.districtName},{" "}
                {addr.stateOrProvinceName}
              </p>
              <p>
                {addr.countryName} - {addr.zipCode}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white w-full sm:max-w-lg rounded-lg p-6 max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between mb-4">
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

            <FormProvider {...methods}>
              <div className="grid gap-3">
                <Inputs name="name" label="Full Name" required />
                <Inputs name="phone" label="Phone" required />

                <FormTextArea
                  name="addressLine1"
                  label="Address Line 1"
                  register={register}
                  required
                />

                <FormTextArea
                  name="addressLine2"
                  label="Address Line 2"
                  register={register}
                />

                <SelectInputs name="country" label="Country" options={countryOptions} />
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
                <Inputs name="pincode" label="Pincode" required />

                <div className="flex gap-3 mt-4 justify-end">
                  <button
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

                  <button
                    onClick={() => {
                      reset();
                      setEditId(null);
                      setShowForm(false);
                    }}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      )}

  
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          if (!isDeleting) {
            setConfirmOpen(false);
            setDeleteId(null);
          }
        }}
        loading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default ManageAddress;