// components/ShippingForm.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import Inputs from "@/components/shared/Inputs";
import SelectInputs from "@/components/shared/SelectInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";

export const ShippingForm = ({
  countryOptions,
  stateOptions,
  districtOptions,
  loadingStates,
  loadingDistricts,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <Inputs
            name="contactName"
            label="Full Name"
            type="text"
            required
            errors={errors.contactName}
          />
        </div>

        {/* Phone */}
        <div>
          <Inputs
            name="phone"
            type="phone"
            label="Phone Number"
            required
            errors={errors.phone}
          />
        </div>

        {/* Country */}
        <div>
          <SelectInputs
            name="country"
            label="Country"
            options={countryOptions}
            errors={errors.country}
          />
        </div>

        {/* State */}
        <div>
          <SelectInputs
            name="state"
            label="State / Province"
            options={stateOptions}
            placeholder={loadingStates ? "Loading..." : "Select State"}
            disabled={!stateOptions.length || loadingStates}
            error={errors.state}
          />
        </div>

        {/* District */}
        <div>
          <SelectInputs
            name="district"
            label="District"
            options={districtOptions}
            placeholder={loadingDistricts ? "Loading..." : "Select District"}
            disabled={!districtOptions.length || loadingDistricts}
            error={errors.district}
          />
        </div>

        <Inputs name="city" label="City" required errors={errors.city} />

        {/* Address Line 1 */}
        {/* Address Line 1 */}
        <div className="md:col-span-2">
          <FormTextArea
            name="addressLine1"
            label="Address Line 1"
            register={register}
            errors={errors.addressLine1}
            required
            wordLimit={20} // ← hard limit
          />
        </div>

        {/* Address Line 2 */}
        <div className="md:col-span-2">
          <FormTextArea
            name="addressLine2"
            label="Address Line 2"
            required={false}
            register={register}
            errors={errors.addressLine2} // ← was missing!
            wordLimit={20} // ← hard limit
          />
        </div>
      </div>
    </div>
  );
};
