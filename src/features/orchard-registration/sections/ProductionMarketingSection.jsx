"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function ProductionMarketingSection({
  register,
  errors,
  control,
}) {
  return (
    <>
      <FormLayout>
        {/* 1. Average Annual Yield */}
        <FormInput
          name="averageAnnualYield"
          label="Average Annual Yield (Boxes/Kilos)"
          type="number"
          register={register}
          errors={errors.averageAnnualYield}
        />

        {/* 2. Peak Harvest Season */}
        <FormInput
          name="peakHarvestSeason"
          label="Peak Harvest Season (Month/Duration)"
          register={register}
          errors={errors.peakHarvestSeason}
        />

        {/* 3. Selling Preference */}
        <Controller
          name="sellingPreference"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Selling Preference"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Selling Preference" },
                { value: "localMandi", label: "Local Mandi" },
                { value: "commissionAgent", label: "Commission Agent" },
                { value: "fpo", label: "FPO" },
                { value: "directBuyer", label: "Direct Buyer" },
                { value: "onlinePlatform", label: "Online Platform" },
              ]}
            />
          )}
        />

        {/* 4. Buyer Details (optional) */}
        <FormInput
          name="buyerDetails"
          label="Buyer Details (Optional, for future linkage)"
          register={register}
          errors={errors.buyerDetails}
        />
      </FormLayout>
    </>
  );
}
