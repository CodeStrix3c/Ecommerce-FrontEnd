// FarmerRegistration.tsx
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ProfileSection from "./sections/ProfileSection";
import OtpVerificationSection from "./sections/OtpVerificationSection";
import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/features/auth/components/FormStepper";

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { otpSchema } from "@/features/farmer-registration/schemas/otpSchema";
import PageWrapper from "@/components/ui/PageWrapper";
import { useFarmer } from "@/providers/FarmerProvider";
import { OTP_FIELDS, PROFILE_FIELDS } from "../../constants/profileFields";

const stepSchemas = [profileSchema, otpSchema];
const stepLabels = ["Profile", "OTP Verification"];

export default function FarmerRegistration() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const { setProfileComplete, setOtpComplete } = useFarmer();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const {
    watch,
    trigger,
    register,
    formState: { errors },
    setValue,
  } = methods;
  const values = watch();
  console.log(values, "values in farmer registration");

  // useEffect(() => {
  //   setFarmer(values);
  // }, [values, setFarmer]);

  const nextStep = async () => {
    let stepFields = step === 0 ? PROFILE_FIELDS : OTP_FIELDS;
    const valid = await trigger(stepFields);

    if (step === 0 && valid && !otpSent) {
      const phone = watch("phone");
      if (phone) {
        console.log("OTP sent to phone:", phone);
        setOtpSent(true);
      }
    }

    if (valid) setStep((s) => Math.min(stepLabels.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmitClick = async () => {
    if (step !== 1) return nextStep();

    const valid = await trigger(["otp"]);
    if (!valid) {
      toast.error("Please enter the OTP");
      return;
    }
    setProfileComplete();
    setOtpComplete();
    localStorage.setItem("token", "fake-jwt-token-12345");
    localStorage.setItem("farmerData", JSON.stringify(values));

    toast.success("Signup successful!");
    navigate("/home");
  };

  return (
    <PageWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          bgcolor: "var(--color-gray-light)",
        }}
      >
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              borderRadius: 3,
              width: "100%",
              bgcolor: "var(--color-white)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="py-10">
              <SectionTitle title="Farmer Registration" centered />
            </div>
            <FormStepper activeStep={step} type="profile" />

            <Box
              sx={{
                width: "100%",
                border: "1px solid var(--color-black-light)",
                borderRadius: 2,
                py: 3,
              }}
            >
              {step === 0 && (
                <ProfileSection register={register} errors={errors} />
              )}
              {step === 1 && (
                <OtpVerificationSection register={register} errors={errors} />
              )}

              <FormNavigation
                step={step}
                totalSteps={stepLabels.length}
                nextStep={nextStep}
                prevStep={prevStep}
                handleSubmit={handleSubmitClick}
              />
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </PageWrapper>
  );
}
