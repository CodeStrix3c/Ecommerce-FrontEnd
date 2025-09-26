"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/shared/custom-inputs/SelectField";
import FormDateInput from "@/components/shared/custom-inputs/FormDateInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";

export default function CropNutritionManagementSection({
  register,
  errors,
  control,
}) {
  return (
    <>
      <FormLayout>
        <Controller
          name="fertilizerPractices"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Fertilizer Practices"
              errors={errors.fertilizerPractices}
              options={[
                { value: "", label: "Select Fertilizer Practice" },
                { value: "organic", label: "Organic" },
                { value: "chemical", label: "Chemical" },
                { value: "integrated", label: "Integrated" },
              ]}
            />
          )}
        />

        <Controller
          name="fertigationFacilities"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Fertigation Facilities"
              errors={errors.fertigationFacilities}
              options={[
                { value: "", label: "Select Option" },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
        />

        <Controller
          name="mulching"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Mulching"
              errors={errors.mulching}
              options={[
                { value: "", label: "Select Option" },
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
        />

        <FormDateInput
          name="lastFertiliserApplicationDate"
          label="Last Fertiliser Application Date"
          register={register}
          errors={errors.lastFertiliserApplicationDate}
        />
        <FormTextArea
          name="nutritionPlan"
          label="Nutrition Plan (if already following)"
          register={register}
          errors={errors.nutritionPlan}
          rows={5}
        />

        <Controller
          name="fertiliserApplicationMode"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Mode of Fertiliser Application"
              errors={errors.fertiliserApplicationMode}
              options={[
                { value: "", label: "Select Application Mode" },
                { value: "soil", label: "Soil Application" },
                { value: "foliar", label: "Foliar Application" },
              ]}
            />
          )}
        />
      </FormLayout>
    </>
  );
}
