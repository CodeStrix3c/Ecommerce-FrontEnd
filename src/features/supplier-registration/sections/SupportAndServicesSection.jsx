"use client";

import React from "react";
import { Controller, useWatch } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function SupportServicesSection({ register, errors, control }) {
  const fieldStaffAvailable = useWatch({
    control,
    name: "fieldStaffAvailable",
    defaultValue: "no",
  });
  console.log(errors, "errors in support services");

  return (
    <FormLayout>
      {/* 1. Agronomy Advisory Support */}
      <Controller
        name="advisorySupport"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Agronomy Advisory Support"
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            errors={errors.advisorySupport}
          />
        )}
      />

      {/* 2. Field Staff Available */}
      <Controller
        name="fieldStaffAvailable"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Field Staff Available"
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            errors={errors.fieldStaffAvailable}
          />
        )}
      />

      {/* If Yes → Ask Number of Staff */}
      {fieldStaffAvailable === "yes" && (
        <FormInput
          name="fieldStaffCount"
          label="Number of Field Staff"
          type="number"
          register={register}
          errors={errors.fieldStaffCount}
          required={null}
        />
      )}

      {/* 3. After-Sales Service */}
      <FormInput
        name="afterSalesService"
        label="After-Sales Service (Warranty / Return / Replacement policy)"
        register={register}
        errors={errors.afterSalesService}
      />

      {/* 4. Preferred delivery area range */}
      <FormInput
        name="deliveryRange"
        label="Preferred Delivery Area Range (Sq. KMs)"
        type="number"
        register={register}
        errors={errors.deliveryRange}
      />

      {/* 5. Computer/Laptop Facility */}
      <Controller
        name="computerAvailable"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Computer/Laptop Facility Available"
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            errors={errors.computerAvailable}
          />
        )}
      />

      {/* 6. Vehicle for Delivery */}
      <Controller
        name="vehicleAvailable"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Vehicle for Delivery / Two Wheeler"
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            errors={errors.vehicleAvailable}
          />
        )}
      />
    </FormLayout>
  );
}
