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
        <SelectField
          name="pesticideSupplierLocation"
          control={control}
          register={register}
          label="Pesticide Supplier Location"
          errors={errors.pesticideSupplierLocation}
          options={[
            { value: "", label: "Select Location Type" },
            { value: "village", label: "Village Level" },
            { value: "town", label: "From Town" },
            { value: "city", label: "From City" },
            { value: "online", label: "Online Mostly" },
          ]}
        />
        <SelectField
          name="paymentType"
          label="Payment Type"
          control={control}
          errors={errors.paymentType}
          options={[
            { value: "", label: "Select Payment Type" },
            { value: "credit", label: "Credit Purchase" },
            { value: "cash", label: "Cash Purchase" },
            { value: "mixed", label: "Mixed" },
          ]}
        />
        <SelectField
          name="creditPeriod"
          label="Credit Period"
          errors={errors.creditPeriod}
          control={control}
          options={[
            { value: "", label: "Select Credit Period" },
            { value: "month", label: "Month" },
            { value: "cropSeason", label: "Crop Season" },
            { value: "noLimits", label: "No Limits" },
          ]}
        />
      </FormLayout>
    </>
  );
}
