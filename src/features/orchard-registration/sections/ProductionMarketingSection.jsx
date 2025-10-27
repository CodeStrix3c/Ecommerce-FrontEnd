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
        <FormInput
          name="averageAnnualYield"
          label="Average Annual Yield (Boxes/Kilos)"
          type="number"
          register={register}
          errors={errors.averageAnnualYield}
        />

        <FormInput
          name="peakHarvestSeason"
          label="Peak Harvest Season (Month/Duration)"
          register={register}
          errors={errors.peakHarvestSeason}
        />

        <SelectField
          name="sellingPreference"
          control={control}
          register={register}
          label="Selling Preference"
          errors={errors.sellingPreference}
          options={[
            { value: "", label: "Select Selling Preference" },
            { value: "localMandi", label: "Local Mandi" },
            { value: "commissionAgent", label: "Commission Agent" },
            { value: "fpo", label: "FPO" },
            { value: "directBuyer", label: "Direct Buyer" },
            { value: "onlinePlatform", label: "Online Platform" },
          ]}
        />

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
