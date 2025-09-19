"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import SelectField from "@/components/ui/SelectField";
import FormInput from "@/features/auth/components/FormInput";
import FormDateInput from "@/components/ui/FormDateInput";
import FormTextArea from "@/components/ui/FormTextArea";

export default function CropNutritionManagementSection({
  register,
  errors,
  control,
}) {
  return (
    <>
      <FormLayout>
        {/* 1. Fertilizer Practices */}
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

        {/* 2. Fertigation Facilities */}
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

        {/* 4. Mulching */}
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

        {/* 5. Last Fertiliser Application Date */}
        <FormDateInput
          name="lastFertiliserApplicationDate"
          label="Last Fertiliser Application Date"
          register={register}
          errors={errors.lastFertiliserApplicationDate}
        />
        {/* 3. Nutrition Plan */}
        <FormTextArea
          name="nutritionPlan"
          label="Nutrition Plan (if already following)"
          register={register}
          errors={errors.nutritionPlan}
          rows={5} // you can adjust number of rows
        />

        {/* 6. Mode of Fertiliser Application */}
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
