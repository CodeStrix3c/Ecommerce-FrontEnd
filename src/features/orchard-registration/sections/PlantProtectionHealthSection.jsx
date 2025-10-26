"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";

export default function PlantProtectionHealthSection({
  register,
  errors,
  control,
}) {
  console.log(errors, "dkfjdkfj");

  return (
    <FormLayout>
      <SelectField
        name="diseaseHistory"
        control={control}
        label="Disease History"
        register={register}
        errors={errors.diseaseHistory}
        multiple
        options={[
          { value: "scab", label: "Scab" },
          { value: "alternaria", label: "Alternaria" },
          { value: "powderyMildew", label: "Powdery Mildew" },
          { value: "other", label: "Other" },
        ]}
      />

      <SelectField
        name="pestHistory"
        control={control}
        label="Pest History"
        register={register}
        errors={errors.pestHistory}
        multiple
        options={[
          { value: "aphids", label: "Aphids" },
          { value: "mites", label: "Mites" },
          { value: "codlingMoth", label: "Codling Moth" },
          { value: "leafMinor", label: "Leaf Minor" },
          { value: "other", label: "Other" },
        ]}
      />

      <FormTextArea
        name="spraySchedule"
        label="Spray Schedule (optional – to track)"
        register={register}
        errors={errors.spraySchedule}
        required={false}
        rows={4}
      />

      <SelectField
        name="cropInsuranceCoverage"
        register={register}
        control={control}
        label="Crop Insurance Coverage"
        errors={errors.cropInsuranceCoverage}
        options={[
          { value: "", label: "Select Option" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
    </FormLayout>
  );
}
