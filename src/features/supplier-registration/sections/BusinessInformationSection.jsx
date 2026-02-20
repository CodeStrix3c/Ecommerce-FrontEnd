"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import Inputs from "@/components/shared/Inputs";


export default function BusinessInformationSection() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormLayout>
      {/* Business Name */}
      <Inputs
        name="businessName"
        label="Enter Your Business Name :"
        type="text"
        required={true}
        errors={errors.businessName}
      />

      {/* Slug */}
      <Inputs
        name="slug"
        label="Enter Your Business Slug Name :"
        type="text"
        required={true}
        errors={errors.slug}
      />

      {/* Business Email */}
      <Inputs
        name="businessEmail"
        label="Enter Your Business Email :"
        type="email"
        required={true}
        errors={errors.businessEmail}
      />

      {/* Registered Email (Optional) */}
      <Inputs
        name="userEmail"
        label="Enter Your Registered Email :"
        type="email"
        required={false}
        errors={errors.userEmail}
      />

      {/* Description */}
      <Inputs
        name="description"
        label="Enter Your Description :"
        type="textarea"
        rows={4}
        required={true}
        errors={errors.description}
      />

      {/* Optional fields if needed later */}
      {/*
      <Inputs
        name="primaryContact"
        label="Contact Number"
        type="phone"
        errors={errors.primaryContact}
      />

      <Inputs
        name="alternateContact"
        label="Alternate Contact"
        type="phone"
        errors={errors.alternateContact}
      />
      */}
    </FormLayout>
  );
}
