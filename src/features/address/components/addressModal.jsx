// components/AddressModal.jsx
import React from "react";
import { X } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { ShippingForm } from "./addressForm";

export const AddressModal = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
  countries,
  states,
  districts,
  loadingStates,
  loadingDistricts,
  isSaving,
  editId,
}) => {
  if (!isOpen) return null;

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "var(--color-overlay)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none ">
        <div
          className="bg-white max-w-xl w-full max-h-[90vh] flex flex-col pointer-events-auto rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b flex-shrink-0"
            style={{ borderColor: "var(--color-gray)" }}
          >
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-black)" }}
              >
                Add New Shipping Address
              </h2>
              <p className="text-xs" style={{ color: "var(--color-black)" }}>
                Fill required fields
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 min-h-0"
            >
              {/* Scrollable form fields */}
              <div
                className="p-6 flex-1 overflow-y-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
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
                  loadingStates={loadingStates}
                  loadingDistricts={loadingDistricts}
                />
              </div>

              {/* Sticky Footer */}
              <div
                className="flex justify-end gap-3 px-6 py-4 border-t flex-shrink-0"
                style={{ borderColor: "var(--color-gray)" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-sm rounded rounded-xl"
                  style={{
                    background: "var(--color-secondary)",
                    color: "var(--color-white)",
                  }}
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
                >
                  {editId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
