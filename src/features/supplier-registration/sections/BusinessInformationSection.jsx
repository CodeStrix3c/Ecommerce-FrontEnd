"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormTextArea from "@/components/shared/custom-inputs/FormTextArea";
// import SelectField from "@/components/shared/custom-inputs/SelectField";
// import { GpsFixed } from "@mui/icons-material";
// import { getCurrentLocation } from "@/utils/getCurrentLocation";
// import MapBox from "@/components/ui/MapBox";

export default function BusinessInformationSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormLayout>
      <FormInput
        name="businessName"
        label="Enter Your Business Name"
        required={true}
        register={register}
        errors={errors.businessName}
      />

      <FormInput
        name="slug"
        label="Enter Your Business Slug Name"
        required={true}
        register={register}
        errors={errors.slug}
      />

      <FormInput
        name="businessEmail"
        label="Enter Your Business Email"
        type="email"
        required={true}
        register={register}
        errors={errors.businessEmail}
      />

      <FormInput
        name="userEmail"
        label="Enter Your Registered Email"
        type="email"
        required={null}
        register={register}
        errors={errors.userEmail}
      />

      <FormTextArea
        name="description"
        label="Enter Your Description"
        required={true}
        register={register}
        errors={errors.description}
      />

      {/* <FormInput
        name="primaryContact"
        label="Contact Number (Primary, OTP Login)"
        type="tel"
        register={register}
        errors={errors.primaryContact}
      /> */}

      {/* <FormInput
        name="alternateContact"
        label="Alternate Contact (Optional)"
        type="tel"
        register={register}
        errors={errors.alternateContact}
      /> */}

      {/* LOCATION / GPS CODE REMAINS COMMENTED */}
    </FormLayout>
  );
}
