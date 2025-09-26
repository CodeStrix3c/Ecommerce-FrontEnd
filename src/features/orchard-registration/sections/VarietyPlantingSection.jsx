"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function VarietyPlantingSection({ register, control, errors }) {
  console.log(errors, "in variety");

  return (
    <FormLayout>
      <Controller
        name="varietiesPlanted"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Varieties Planted"
            isMultiple
            options={[
              { value: "apple", label: "Apple" },
              { value: "pear", label: "Pear" },
              { value: "peach", label: "Peach" },
              { value: "plum", label: "Plum" },
              { value: "cherry", label: "Cherry" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Number of Trees (Total) */}
      <FormInput
        name="totalTrees"
        label="Total Number of Trees"
        type="number"
        register={register}
        errors={errors.totalTrees}
      />

      {/* Number of Trees Per Variety */}
      <FormInput
        name="treesPerVariety"
        label="Number of Trees per Variety"
        type="number"
        register={register}
        errors={errors.treesPerVariety}
      />

      {/* Rootstock Used */}
      <Controller
        name="rootstock"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Rootstock Used"
            options={[
              { value: "", label: "Select Rootstock" },
              { value: "M9", label: "M9" },
              { value: "MM106", label: "MM106" },
              { value: "Seedling", label: "Seedling" },
              { value: "Other", label: "Other" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Plant Density */}
      <Controller
        name="plantDensity"
        control={control}
        render={({ field, fieldState }) => (
          <SelectField
            {...field}
            label="Plant Density"
            options={[
              { value: "", label: "Select Density" },
              { value: "high", label: "High Density" },
              { value: "medium", label: "Medium Density" },
              { value: "traditional", label: "Traditional" },
            ]}
            errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
          />
        )}
      />

      {/* Tree Age Distribution */}
      <FormInput
        name="ageUnder5"
        label="Trees <5 Years"
        type="number"
        register={register}
        errors={errors.ageUnder5}
      />
      <FormInput
        name="age5to10"
        label="Trees 5–10 Years"
        type="number"
        register={register}
        errors={errors.age5to10}
      />
      <FormInput
        name="ageAbove10"
        label="Trees 10+ Years"
        type="number"
        register={register}
        errors={errors.ageAbove10}
      />
    </FormLayout>
  );
}
