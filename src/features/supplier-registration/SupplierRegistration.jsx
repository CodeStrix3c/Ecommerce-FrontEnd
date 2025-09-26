import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import BusinessInformationSection from "./sections/BusinessInformationSection";
import OtpVerificationSection from "../farmer-registration/sections/OtpVerificationSection";
import FormNavigation from "../orchard-registration/components/FormNavigation";
import { BUSINESS_INFORMATION_FIELDS } from "@/constants/supplierFormSteps";
import { OTP_FIELDS } from "@/constants/profileFields";
import { businessInformationSchema } from "./schemas/businessInformationSchemas";
import { otpSchema } from "../farmer-registration/schemas/otpSchema";
import { useSupplier } from "@/providers/SupplierProvider";

const stepSchemas = [businessInformationSchema, otpSchema];

export default function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setBusinessComplete, setOtpComplete } = useSupplier();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    trigger,
    register,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    let stepFields = step === 0 ? BUSINESS_INFORMATION_FIELDS : OTP_FIELDS;
    const valid = await trigger(stepFields);
    if (valid) setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmitClick = async () => {
    if (step < stepSchemas.length - 1) {
      nextStep();
      return;
    }

    const valid = await trigger();
    if (!valid) return;

    setBusinessComplete();
    setOtpComplete();

    toast.success("Business and OTP completed!");
    navigate("/supplier-profile");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 5,
        marginTop: "100px",
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitClick)}
          sx={{ width: 600 }}
        >
          <SectionTitle title="Supplier Registration" centered />
          {step === 0 && (
            <BusinessInformationSection register={register} errors={errors} />
          )}
          {step === 1 && (
            <OtpVerificationSection register={register} errors={errors} />
          )}

          <FormNavigation
            step={step}
            totalSteps={stepSchemas.length}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmitClick}
          />
        </Box>
      </FormProvider>
    </Box>
  );
}
