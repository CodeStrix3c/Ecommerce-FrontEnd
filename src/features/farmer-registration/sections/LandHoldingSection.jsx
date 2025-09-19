import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/ui/SelectField";
import FormInput from "@/features/auth/components/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import { Controller } from "react-hook-form";

export default function LandHoldingSection({ register, errors }) {
  return (
    <FormSection title="Land Holding Details">
      <FormLayout>
        <FormInput
          name="soilType"
          label="Soil Type"
          register={register}
          errors={errors.soilType}
        />
        <FormInput
          name="irrigationMethod"
          label="Irrigation Method"
          register={register}
          errors={errors.irrigationMethod}
        />
        <FormInput
          name="environmentalConditions"
          label="Environmental Conditions"
          register={register}
          errors={errors.environmentalConditions}
        />

        {/* Optional Land Topography */}

        <Controller
          name="landTopography"
          render={({ field }) => (
            <SelectField
              {...field}
              label="Land Topography"
              errors={errors}
              options={[
                { value: "", label: "-- Select Topography --" },
                { value: "flat", label: "Flat / Plain" },
                { value: "hilly", label: "Hilly / Sloped" },
                { value: "undulating", label: "Undulating / Mixed" },
                { value: "terraced", label: "Terraced" },
              ]}
            />
          )}
        />
      </FormLayout>
    </FormSection>
  );
}
