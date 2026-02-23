import Inputs from "@/components/shared/Inputs";
import SelectInput from "@/components/shared/SelectInput";

export const ShippingForm = ({
  errors,
  countryOptions,
  stateOptions,
  districtOptions,
}) => {
  return (
    <div className="flex-1">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--color-black)]">
          Shipping Address
        </h2>
      </div>

      <div className="space-y-6">
        <Inputs
          name="contactName"
          label="Full Name"
          required
          type="text"
          errors={errors?.contactName}
        />

        <Inputs
          name="phone"
          label="Phone Number"
          required
          type="tel"
          errors={errors?.phone}
        />

        <SelectInput
          name="country"
          label="Country"
          options={countryOptions}
          error={errors?.country}
        />

        <SelectInput
          name="state"
          label="State"
          options={stateOptions}
          error={errors?.state}
        />

        <SelectInput
          name="district"
          label="District"
          options={districtOptions}
          error={errors?.district}
        />

        <Inputs
          name="city"
          label="City"
          required
          type="text"
          errors={errors?.city}
        />

        <Inputs
          name="zipCode"
          label="Postal Code"
          required
          type="text"
          errors={errors?.zipCode}
        />

        {/* Address Line 1 (Textarea) */}
        <Inputs
          name="addressLine1"
          label="Address Line 1"
          required
          type="textarea"
          errors={errors?.addressLine1}
        />

        {/* Address Line 2 (Textarea) */}
        <Inputs
          name="addressLine2"
          label="Address Line 2"
          type="textarea"
          errors={errors?.addressLine2}
        />

        <button
          type="submit"
          className="w-full bg-[var(--color-black)] text-white py-4 rounded-lg font-semibold hover:bg-[var(--color-primary)] transition duration-300"
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};
