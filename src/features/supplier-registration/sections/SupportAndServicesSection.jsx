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
      <SelectField
        name="advisorySupport"
        register={register}
        control={control}
        label="Agronomy Advisory Support"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        errors={errors.advisorySupport}
      />

      <SelectField
        name="fieldStaffAvailable"
        register={register}
        control={control}
        label="Field Staff Available"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        errors={errors.fieldStaffAvailable}
      />

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

      <FormInput
        name="afterSalesService"
        label="After-Sales Service (Warranty / Return / Replacement policy)"
        register={register}
        errors={errors.afterSalesService}
      />

      <FormInput
        name="deliveryRange"
        label="Preferred Delivery Area Range (Sq. KMs)"
        type="number"
        register={register}
        errors={errors.deliveryRange}
      />

      <SelectField
        name="computerAvailable"
        register={register}
        control={control}
        label="Computer/Laptop Facility Available"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        errors={errors.computerAvailable}
      />

      <SelectField
        name="vehicleAvailable"
        register={register}
        control={control}
        label="Vehicle for Delivery / Two Wheeler"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        errors={errors.vehicleAvailable}
      />
    </FormLayout>
  );
}
