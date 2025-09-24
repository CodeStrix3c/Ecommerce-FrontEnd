"use client";

import React from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";

export default function EducationSection({ register, errors }) {
  return (
    <FormSection title="Education Details">
      <FormLayout>
        <FormInput
          name="highestQualification"
          label="Highest Qualification"
          register={register}
          errors={errors.highestQualification}
        />
        <FormInput
          name="instituteName"
          label="Institute / University Name"
          register={register}
          errors={errors.instituteName}
        />
        <FormInput
          name="passingYear"
          label="Year of Passing"
          type="number"
          register={register}
          errors={errors.passingYear}
        />
        <FormInput
          name="specialization"
          label="Specialization / Major (Optional)"
          register={register}
          errors={errors.specialization}
        />
      </FormLayout>
    </FormSection>
  );
}
