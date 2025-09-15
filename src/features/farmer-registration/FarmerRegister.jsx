// FarmerRegister.tsx
import { farmerRequiredFields } from "@/constants/farmerRequiredFields";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, useTheme, useMediaQuery, Divider } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

import ProfileSection from "./sections/ProfileSection";
import DemographicsSection from "./sections/DemographicsSection";
import LandHoldingSection from "./sections/LandHoldingSection";
import AddressSection from "./sections/AddressSection";
import OtpVerificationSection from "./sections/OtpVerificationSection";
import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/components/ui/FormStepper";
import { profileSchema } from "@/schemas/profileSchema";
import { demographicsSchema } from "@/schemas/demographicSchema";
import { landSchema } from "@/schemas/landHoldingSchema";
import { addressSchema } from "@/schemas/addressSchema";
import { otpSchema } from "@/schemas/otpSchema";
import { useProgress } from "@/hooks/useProgress";
import useIsMobile from "@/hooks/useInMobile";
import LoginLink from "@/components/shared/LoginLink";

const stepSchemas = [
  profileSchema,
  demographicsSchema,
  landSchema,
  addressSchema,
  otpSchema,
];

const stepLabels = [
  "Profile",
  "Demographics",
  "Land Holdings",
  "Address",
  "OTP Verification",
];

export default function FarmerRegister() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const theme = useTheme();
  const isMobile = useIsMobile();
  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const values = watch(farmerRequiredFields);
  const completion = useProgress(values, farmerRequiredFields.length);

  const onSubmit = (data) => console.log("Form Data:", data);

  const nextStep = async () => {
    let stepFields = [];

    if (step === 0)
      stepFields = [
        "fullName",
        "phone",
        "email",
        "password",
        "confirmPassword",
      ];
    if (step === 1) stepFields = ["farmName", "farmSize", "mainCrops"];
    if (step === 2)
      stepFields = [
        "soilType",
        "irrigationMethod",
        "environmentalConditions",
        "farmLocation",
      ];
    if (step === 3)
      stepFields = ["village", "tehsil", "district", "state", "pincode"];
    if (step === 4) stepFields = ["otp"];

    const valid = await trigger(stepFields);

    if (step === 0 && valid && !otpSent) {
      const phone = watch("phone");
      if (phone) {
        console.log("OTP generated for phone:", phone);
        setOtpSent(true);
      }
    }

    if (valid) setStep((s) => Math.min(stepLabels.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation is not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setValue("gps", `${pos.coords.latitude},${pos.coords.longitude}`, {
          shouldValidate: true,
        }),
      () => alert("Unable to retrieve location")
    );
  };

  const handleSubmitClick = async () => {
    if (step !== 4) {
      nextStep();
      return;
    }

    const valid = await trigger(["otp"]);

    if (!valid) {
      toast.error("Please enter the OTP");
      return;
    }

    const data = watch();
    console.log("Form submitted with data:", data);
    toast.success("Form submitted successfully!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "var(--color-gray-light)",
        px: 2,
        py: { xs: 6, md: 4 },
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            borderRadius: 3,
            width: "100%",
            maxWidth: 850,
            p: { xs: 4, md: 6 },
            bgcolor: "var(--color-white)",
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src="/assets/images/ziraat.jpeg"
              alt="Ziraat Logo"
              className="h-16 object-contain"
            />
          </Box>

          <SectionTitle title="Registration Form" centered />

          {/* Google Login */}
          <Stack spacing={2} sx={{ my: 2, width: "100%" }}>
            <GoogleLogin
              onSuccess={(cred) => console.log("Google Login", cred.credential)}
              onError={() => console.log("Register failed")}
              text="continue_with"
              width="100%"
            />
          </Stack>

          <Divider flexItem sx={{ width: "100%", my: 2 }}>
            or
          </Divider>

          {/* Stepper */}
          <FormStepper
            activeStep={step}
            completion={completion}
            type="profile"
          />

          {/* Sections */}
          <Box
            sx={{
              width: "100%",
              border: "1px solid var(--color-black-light)",
              borderRadius: 2,
              bgcolor: "var(--color-white)",
              p: { xs: 2, md: 3 },
            }}
          >
            {step === 0 && (
              <ProfileSection register={register} errors={errors} />
            )}
            {step === 1 && (
              <DemographicsSection register={register} errors={errors} />
            )}
            {step === 2 && (
              <LandHoldingSection register={register} errors={errors} />
            )}
            {step === 3 && (
              <AddressSection
                register={register}
                errors={errors}
                detectLocation={detectLocation}
              />
            )}
            {step === 4 && (
              <OtpVerificationSection register={register} errors={errors} />
            )}

            <FormNavigation
              step={step}
              totalSteps={stepLabels.length}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmitClick}
            />
            <LoginLink link={"/login"} />
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
}
