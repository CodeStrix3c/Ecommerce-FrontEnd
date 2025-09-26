import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";

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
        <SelectField
          name="landTopography"
          label="Land Topography"
          register={register}
          optional
          options={[
            { value: "", label: "-- Select Topography --" },
            { value: "flat", label: "Flat / Plain" },
            { value: "hilly", label: "Hilly / Sloped" },
            { value: "undulating", label: "Undulating / Mixed" },
            { value: "terraced", label: "Terraced" },
          ]}
        />
      </FormLayout>
    </FormSection>
  );
}
