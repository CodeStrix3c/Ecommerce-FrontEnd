"use client";

import React from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";

export default function ProfessionSection({ register, errors }) {
  return (
    <FormSection title="Profession Details">
      <FormLayout>
        <FormInput
          name="professionType"
          label="Profession / Occupation"
          register={register}
          errors={errors.professionType}
        />
        <FormInput
          name="organizationName"
          label="Organization / Employer Name"
          register={register}
          errors={errors.organizationName}
        />
        <FormInput
          name="designation"
          label="Designation / Role"
          register={register}
          errors={errors.designation}
        />
        <FormInput
          name="experienceYears"
          label="Years of Experience"
          type="number"
          register={register}
          errors={errors.experienceYears}
        />
        <FormInput
          name="skills"
          label="Key Skills / Expertise (Optional)"
          register={register}
          errors={errors.skills}
        />
      </FormLayout>
    </FormSection>
  );
}
