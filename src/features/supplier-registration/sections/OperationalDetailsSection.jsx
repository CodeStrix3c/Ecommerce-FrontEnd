"use client";

import React from "react";
import { Controller, useWatch } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function OperationalDetailsSection({
  register,
  errors,
  control,
}) {
  const deliveryService = useWatch({
    control,
    name: "deliveryService",
    defaultValue: "",
  });
  console.log(errors, "errors in operational details");

  const serviceAreaOptions = [
    { value: "villageA", label: "Village A" },
    { value: "villageB", label: "Village B" },
    { value: "villageC", label: "Village C" },
    { value: "blockX", label: "Block X" },
    { value: "blockY", label: "Block Y" },
  ];

  return (
    <FormLayout>
      {/* Years in Business (required) */}
      <FormInput
        name="yearsInBusiness"
        label="Years in Business"
        type="number"
        register={register}
        errors={errors.yearsInBusiness}
      />

      {/* Distributor / Company Tie-ups (required) */}
      <FormInput
        name="distributorTieUps"
        label="Distributor / Company Tie-ups"
        register={register}
        errors={errors.distributorTieUps}
      />

      {/* Delivery Service Available (required) */}
      <Controller
        name="deliveryService"
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label="Delivery Service Available"
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            errors={errors.deliveryService}
          />
        )}
      />

      {deliveryService === "yes" && (
        <Controller
          name="serviceArea"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label="Service Area (Villages / Blocks covered)"
              isMultiple
              options={serviceAreaOptions}
              errors={deliveryService === "yes" && errors.serviceArea}
            />
          )}
        />
      )}

      {/* Average Monthly Sales Volume (optional) */}
      <FormInput
        name="averageMonthlySales"
        label="Average Monthly Sales Volume (optional)"
        type="number"
        register={register}
        errors={errors.averageMonthlySales}
        required={null}
      />
    </FormLayout>
  );
}
