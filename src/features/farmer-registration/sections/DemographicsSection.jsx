import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import FormSection from "@/features/auth/components/FormSection";
import { Controller } from "react-hook-form";

export default function DemographicsSection({ register, errors }) {
  console.log(errors, "demogra");

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

        <Controller
          name="ownershipType"
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Ownership Type"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Ownership Type" },
                { value: "owned", label: "Owned" },
                { value: "leased", label: "Leased / Rented" },
                { value: "shared", label: "Shared / Partnership" },
                { value: "community", label: "Community / Institutional" },
                { value: "other", label: "Other" },
              ]}
            />
          )}
        />
      </FormLayout>
    </FormSection>
  );
}
