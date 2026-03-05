// components/ShippingForm.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import Inputs from "@/components/shared/Inputs";
import SelectInput from "@/components/shared/SelectInput";
import { User, Phone, MapPin, Home, AlertCircle } from "lucide-react";

export const ShippingForm = ({
  countryOptions,
  stateOptions,
  districtOptions,
  loadingStates,
  loadingDistricts,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  // Helper to get error message
  const getErrorMessage = (error) => {
    if (!error) return null;
    return error.message || "This field is required";
  };

  return (
    <div className="space-y-5">
      {/* Contact Information */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-4 flex items-center gap-2">
          <User size={16} className="text-gray-600" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Inputs
              name="contactName"
              label="Full Name"
              required
              type="text"
              placeholder="John Doe"
              errors={errors?.contactName}
            />
            {errors?.contactName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.contactName)}
              </p>
            )}
          </div>

          <div>
            <Inputs
              name="phone"
              label="Phone Number"
              required
              type="tel"
              placeholder="+1 (555) 000-0000"
              errors={errors?.phone}
            />
            {errors?.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.phone)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-4 flex items-center gap-2">
          <MapPin size={16} className="text-gray-600" />
          Location Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <SelectInput
              name="country"
              label="Country"
              options={countryOptions}
              placeholder="Select Country"
              error={errors?.country}
              required
            />
            {errors?.country && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.country)}
              </p>
            )}
          </div>

          <div>
            <SelectInput
              name="state"
              label="State / Province"
              options={stateOptions}
              placeholder={loadingStates ? "Loading..." : "Select State"}
              error={errors?.state}
              disabled={!stateOptions.length || loadingStates}
              required
            />
            {errors?.state && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.state)}
              </p>
            )}
          </div>

          <div>
            <SelectInput
              name="district"
              label="District"
              options={districtOptions}
              placeholder={loadingDistricts ? "Loading..." : "Select District"}
              error={errors?.district}
              disabled={!districtOptions.length || loadingDistricts}
              required
            />
            {errors?.district && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.district)}
              </p>
            )}
          </div>

          <div>
            <Inputs
              name="city"
              label="City"
              required
              type="text"
              placeholder="New York"
              errors={errors?.city}
            />
            {errors?.city && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.city)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-4 flex items-center gap-2">
          <Home size={16} className="text-gray-600" />
          Address Details
        </h3>
        <div className="space-y-4">
          <div>
            <Inputs
              name="addressLine1"
              label="Address Line 1"
              required
              type="textarea"
              placeholder="Street address, P.O. box, company name"
              errors={errors?.addressLine1}
            />
            {errors?.addressLine1 && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.addressLine1)}
              </p>
            )}
          </div>

          <div>
            <Inputs
              name="addressLine2"
              label="Address Line 2 (Optional)"
              type="textarea"
              placeholder="Apartment, suite, unit, building, floor, etc."
              errors={errors?.addressLine2}
            />
            {errors?.addressLine2 && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.addressLine2)}
              </p>
            )}
          </div>

          <div>
            <Inputs
              name="zipCode"
              label="Postal / ZIP Code"
              required
              type="text"
              placeholder="10001"
              errors={errors?.zipCode}
            />
            {errors?.zipCode && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} />
                {getErrorMessage(errors.zipCode)}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Enter 5-10 digit postal code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
