"use client";

import React from "react";
import { Controller, useWatch } from "react-hook-form";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import SelectField from "@/components/shared/custom-inputs/SelectField";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

export default function FinancialPaymentSection({ register, errors, control }) {
  const sellingViaZiraat = useWatch({
    control,
    name: "sellingViaZiraat",
    defaultValue: false,
  });
  console.log(errors, "financial errors");
  // Add at the top of your component

  // Inside your component
  const { setValue } = useFormContext
    ? useFormContext()
    : { setValue: () => {} };

  useEffect(() => {
    if (!sellingViaZiraat) {
      setValue("bankDetails", undefined, { shouldValidate: true });
    }
  }, [sellingViaZiraat, setValue]);
  return (
    <>
      {/* General Payment Options */}
      <Box
        sx={{
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
        }}
      >
        <FormLayout>
          {/* UPI / Digital Payment */}
          <Controller
            name="upiAvailable"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="UPI / Digital Payment Options"
                options={[
                  { value: "", label: "Select" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                errors={errors.upiAvailable}
              />
            )}
          />

          {/* Credit Facility */}
          <Controller
            name="creditFacility"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="Credit Facility to Farmers"
                options={[
                  { value: "", label: "Select" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                errors={errors.creditFacility}
              />
            )}
          />
        </FormLayout>
      </Box>

      {/* Ziraat Marketplace Section */}
      <Box
        sx={{
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          pt: 1,
        }}
      >
        <FormControlLabel
          control={
            <Controller
              name="sellingViaZiraat"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)} // <-- ensures boolean
                  sx={{
                    p: 1,
                    color: "var(--color-primary)",
                    "&.Mui-checked": { color: "var(--color-primary)" },
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              )}
            />
          }
          label="Sell at ZIRAAT Marketplace"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "16px",
              color: "var(--color-text)",
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{ mb: 2, color: "var(--color-black)", fontSize: 12 }}
        >
          If you choose to sell via ZIRAAT, please provide your bank details for
          payouts.
        </Typography>

        {/* Bank Details (only if selling via ZIRAAT) */}
        {sellingViaZiraat && (
          <FormLayout>
            <FormInput
              name="bankDetails.accountHolder"
              label="Account Holder Name"
              register={register}
              errors={errors.bankDetails?.accountHolder}
            />
            <FormInput
              name="bankDetails.accountNumber"
              label="Account Number"
              type="text"
              register={register}
              errors={errors.bankDetails?.accountNumber}
            />
            <FormInput
              name="bankDetails.ifsc"
              label="IFSC Code"
              type="text"
              register={register}
              errors={errors.bankDetails?.ifsc}
            />
            <FormInput
              name="bankDetails.bankName"
              label="Bank Name"
              register={register}
              errors={errors.bankDetails?.bankName}
            />
            <FormInput
              name="bankDetails.branchName"
              label="Branch Name"
              register={register}
              errors={errors.bankDetails?.branchName}
            />
          </FormLayout>
        )}
      </Box>
    </>
  );
}
