import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/ui/SelectField";
import FormInput from "@/features/auth/components/FormInput";
import FormSection from "@/features/auth/components/FormSection";

export default function DemographicsSection({ register, errors }) {
  return (
    <FormSection title="Farm Details">
      <FormLayout>
        <FormInput
          name="farmName"
          label="Farm / Orchard Name"
          register={register}
          errors={errors.farmName}
        />
        <FormInput
          name="farmSize"
          label="Enter Farm Size (Kanals)"
          type="number"
          register={register}
          errors={errors.farmSize}
        />
        <FormInput
          name="mainCrops"
          label="Main Crops"
          register={register}
          errors={errors.mainCrops}
        />

        {/* Ownership Type (Optional) */}
        <SelectField
          name="ownershipType"
          label="Ownership Type"
          register={register}
          errors={errors}
          optional
          options={[
            { value: "", label: "Select Ownership Type" },
            { value: "owned", label: "Owned" },
            { value: "leased", label: "Leased / Rented" },
            { value: "shared", label: "Shared / Partnership" },
            { value: "community", label: "Community / Institutional" },
            { value: "other", label: "Other" },
          ]}
        />
      </FormLayout>
    </FormSection>
  );
}
