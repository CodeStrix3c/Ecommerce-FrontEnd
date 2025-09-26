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
  return (
    <FormLayout>
      {/* 1. Disease History */}
      <Controller
        name="diseaseHistory"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Disease History"
            errors={errors.diseaseHistory}
            multiple
            options={[
              { value: "scab", label: "Scab" },
              { value: "alternaria", label: "Alternaria" },
              { value: "powderyMildew", label: "Powdery Mildew" },
              { value: "other", label: "Other" },
            ]}
          />
        )}
      />

      {/* 2. Pest History */}
      <Controller
        name="pestHistory"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Pest History"
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
        )}
      />

      {/* 3. Spray Schedule (optional) */}
      <FormTextArea
        name="spraySchedule"
        label="Spray Schedule (optional – to track)"
        register={register}
        errors={errors.spraySchedule}
        required={false}
        rows={4}
      />

      {/* 4. Crop Insurance Coverage */}
      <Controller
        name="cropInsuranceCoverage"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Crop Insurance Coverage"
            errors={errors.cropInsuranceCoverage}
            options={[
              { value: "", label: "Select Option" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}
      />
    </FormLayout>
  );
}
