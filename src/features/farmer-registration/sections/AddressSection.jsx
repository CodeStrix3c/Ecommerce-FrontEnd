import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";

export default function AddressSection({
  register,
  errors,
  detectLocation,
  gpsLocation,
  loading,
  handleGetLocation,
}) {
  return (
    <FormSection
      title="Address"
      actionText="Use Current Location"
      onActionClick={detectLocation}
    >
      <FormLayout>
        <FormInput
          name="village"
          label="Village"
          register={register}
          errors={errors.village}
        />
        <FormInput
          name="tehsil"
          label="Tehsil"
          register={register}
          errors={errors.tehsil}
        />
        <FormInput
          name="district"
          label="District"
          register={register}
          errors={errors.district}
        />
        <FormInput
          name="state"
          label="State"
          register={register}
          errors={errors.state}
        />
        <FormInput
          name="pincode"
          label="Pin Code"
          type="number"
          register={register}
          errors={errors.pincode}
        />
        <FormInput
          name="gps"
          label="Orchard Location"
          value={gpsLocation ? gpsLocation : ""}
          readOnly
          icon={loading ? "Detecting..." : "Detect"}
          onClick={handleGetLocation}
          register={register}
          errors={errors.gps}
        />
      </FormLayout>
    </FormSection>
  );
}
