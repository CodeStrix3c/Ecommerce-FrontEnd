"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function InputCostDetailsSection({ register, errors, control }) {
  return (
    <>
      <FormLayout>
        {/* 1. Pesticide Supplier Location */}
        <Controller
          name="pesticideSupplierLocation"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Pesticide Supplier Location"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Location Type" },
                { value: "village", label: "Village Level" },
                { value: "town", label: "From Town" },
                { value: "city", label: "From City" },
                { value: "online", label: "Online Mostly" },
              ]}
            />
          )}
        />

        {/* 2. Payment Type */}
        <Controller
          name="paymentType"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Payment Type"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Payment Type" },
                { value: "credit", label: "Credit Purchase" },
                { value: "cash", label: "Cash Purchase" },
                { value: "mixed", label: "Mixed" },
              ]}
            />
          )}
        />

        {/* 3. Credit Period */}
        <Controller
          name="creditPeriod"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Credit Period"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Credit Period" },
                { value: "month", label: "Month" },
                { value: "cropSeason", label: "Crop Season" },
                { value: "noLimits", label: "No Limits" },
              ]}
            />
          )}
        />
      </FormLayout>
    </>
  );
}
