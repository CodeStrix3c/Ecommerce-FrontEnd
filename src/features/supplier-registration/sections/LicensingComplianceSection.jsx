"use client";

import React from "react";
import { Controller } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormDateInput from "@/components/shared/custom-inputs/FormDateInput";
import FileUploadField from "@/components/shared/custom-inputs/FileUploadField";

export default function LicensingComplianceSection({
  register,
  errors,
  control,
}) {
  return (
    <FormLayout>
      <FormInput
        name="dealerLicenseNumber"
        label="License Number (Issued by Agri Dept.)"
        register={register}
        errors={errors.dealerLicenseNumber}
      />

      <FormDateInput
        name="licenseValidityStart"
        label="License Validity Start Date"
        register={register}
        errors={errors.licenseValidityStart}
      />

      <FormDateInput
        name="licenseValidityEnd"
        label="License Validity Expiry Date"
        register={register}
        errors={errors.licenseValidityEnd}
      />

      <FormInput
        name="gstNumber"
        label="GST Number (if applicable)"
        register={register}
        required={null}
        errors={errors.gstNumber}
      />

      <FormInput
        name="pan"
        label="PAN (Optional, for Financial Integration)"
        register={register}
        required={null}
        errors={errors.pan}
      />

      <Controller
        name="licenseCopy"
        control={control}
        render={({ field, fieldState }) => (
          <FileUploadField
            {...field}
            label="Upload License Copy (PDF / JPEG / PNG)"
            error={fieldState.error?.message}
            onFilesChange={(files) => field.onChange(files)}
            // optional
          />
        )}
      />
    </FormLayout>
  );
}
