import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Inputs from "@/components/shared/Inputs";
import SelectInputs from "@/components/shared/SelectInput";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Quarat ul Qadir",
      phone: "9876543210",
      address: "House 21, Main Road",
      city: "Srinagar",
      state: "Jammu & Kashmir",
      country: "India",
      pincode: "190001",
      default: true,
    },
    {
      id: 2,
      name: "Quarat ul Qadir",
      phone: "9876543210",
      address: "Office, 5th Avenue",
      city: "Srinagar",
      state: "Jammu & Kashmir",
      country: "India",
      pincode: "190001",
      default: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  /* ================= Save Address ================= */
  const saveAddress = (data) => {
    const newEntry = {
      id: Date.now(),
      ...data,
      default: false,
    };

    setAddresses([...addresses, newEntry]);
    reset();
    setShowForm(false);
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setDefault = (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      default: addr.id === id,
    }));
    setAddresses(updated);
  };

  return (
    <div className="min-h-screen px-6 md:px-12 py-8 border border-[var(--color-gray)] rounded-lg bg-[var(--color-white)]">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-black)]">
        Your Addresses
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Add Address Card */}
        <div
          onClick={() => setShowForm(true)}
          className="border-2 border-dashed border-[var(--color-gray)] rounded-md flex items-center justify-center cursor-pointer hover:border-[var(--color-primary)]"
        >
          <div className="text-center py-10">
            <div className="text-3xl text-[var(--color-primary)]">+</div>
            <p className="text-sm mt-2">Add Address</p>
          </div>
        </div>

        {/* Address Cards */}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative bg-[var(--color-white)] rounded-md p-4 border shadow-sm ${
              addr.default
                ? "border-2 border-[var(--color-primary)]"
                : "border-[var(--color-gray)]"
            }`}
          >
            {addr.default && (
              <span className="absolute top-2 right-2 text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded">
                Default
              </span>
            )}

            <h4 className="font-semibold text-sm">{addr.name}</h4>
            <p className="text-sm">{addr.address}</p>
            <p className="text-sm">
              {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
            </p>
            <p className="text-sm">Phone: {addr.phone}</p>

            <div className="mt-3 space-x-3 text-sm">
              <button
                onClick={() => setDefault(addr.id)}
                className="text-[var(--color-primary)] hover:underline"
              >
                Set Default
              </button>
              <button
                onClick={() => removeAddress(addr.id)}
                className="text-[var(--color-error)] hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Modal Form ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50">
          <div className="bg-[var(--color-white)] w-full max-w-lg rounded-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Add New Address
            </h3>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(saveAddress)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Inputs
                  required
                  name="name"
                  label="Full Name"
                  type="text"
                  errors={errors.name}
                />

                <Inputs
                  required
                  name="phone"
                  label="Phone"
                  type="text"
                  errors={errors.phone}
                />

                <Inputs
                  required
                  name="address"
                  label="Address"
                  type="text"
                  errors={errors.address}
                />

                {/* Country */}
                <SelectInputs
                  name="country"
                  label="Country"
                  options={["India"]}
                  required
                />

                {/* State */}
                <SelectInputs
                  name="state"
                  label="State"
                  options={[
                    "Jammu & Kashmir",
                    "Delhi",
                    "Punjab",
                    "Haryana",
                  ]}
                  required
                />

                {/* City */}
                <SelectInputs
                  name="city"
                  label="City"
                  options={[
                    "Srinagar",
                    "Jammu",
                    "Delhi",
                    "Amritsar",
                  ]}
                  required
                />

                <Inputs
                  required
                  name="pincode"
                  label="Pincode"
                  type="text"
                  rules={{
                    minLength: {
                      value: 6,
                      message: "Invalid pincode",
                    },
                  }}
                  errors={errors.pincode}
                />

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setShowForm(false);
                    }}
                    className="px-4 py-2 border border-[var(--color-gray)] rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)]"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddress;