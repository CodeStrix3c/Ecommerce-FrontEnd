"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function OptionalFutureFieldsSection({
  register,
  errors,
  control,
}) {
  return (
    <>
      <FormLayout>
        <FormInput
          name="governmentSchemes"
          label="Government Schemes Availed (Subsidy, Insurance, etc.)"
          placeholder="Mention if any (optional)"
          register={register}
          errors={errors.governmentSchemes}
          required={null}
        />

        <SelectField
          name="fpoMembership"
          register={register}
          control={control}
          optional
          label="FPO / Cooperative Membership"
          errors={errors.fpoMembership}
          options={[
            { value: "", label: "Select Membership Status" },
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "planning", label: "Planning to Join" },
          ]}
        />

        <FormInput
          name="certification"
          label="Certification (Organic, GAP, Fair Trade, etc.)"
          placeholder="Mention certifications if any"
          register={register}
          errors={errors.certification}
          required={null}
        />

        <FormInput
          name="digitalToolsUsed"
          label="Digital Tools Used (Weather apps, Advisory apps, Farm management tools)"
          placeholder="List tools or apps used"
          register={register}
          errors={errors.digitalToolsUsed}
          required={null}
        />
      </FormLayout>
    </>
  );
}
