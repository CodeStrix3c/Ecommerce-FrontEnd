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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Add New Shipping Address
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill in all required fields to continue
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Form Content */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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

              {/* Form Validation Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    Please fix the following errors:
                  </p>
                  <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        {field}: {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  //   disabled={isSaving || !isValid}
                  className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-black to-gray-900 hover:shadow-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Address"
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
