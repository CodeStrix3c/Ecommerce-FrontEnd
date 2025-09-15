// OrchardRegistration.tsx
import { farmerRequiredFields } from "@/constants/farmerRequiredFields";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Divider,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

import ProfileSection from "./sections/ProfileSection";
import DemographicsSection from "./sections/DemographicsSection";
import LandHoldingSection from "./sections/LandHoldingSection";
import AddressSection from "./sections/AddressSection";
import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/components/ui/FormStepper";
import { toast } from "react-toastify";

import { demographicsSchema } from "@/schemas/demographicSchema";
import { landSchema } from "@/schemas/landHoldingSchema";
import { addressSchema } from "@/schemas/addressSchema";
import { useProgress } from "@/hooks/useProgress";
import useIsMobile from "@/hooks/useInMobile";
import LoginLink from "@/components/shared/LoginLink";

const stepSchemas = [demographicsSchema, landSchema, addressSchema];

const stepLabels = ["Demographics", "Land Holdings", "Address"];

export default function OrchardRegistration() {
  const [step, setStep] = useState(0);

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

    if (step === 0) stepFields = ["farmName", "farmSize", "mainCrops"];
    if (step === 1)
      stepFields = [
        "soilType",
        "irrigationMethod",
        "environmentalConditions",
        "farmLocation",
      ];
    if (step === 2)
      stepFields = ["village", "tehsil", "district", "state", "pincode"];

    const valid = await trigger(stepFields);

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
        bgcolor: "var(--color-white)",
        py: { xs: 5, lg: 12 },
        my: { xs: 0, md: 10, lg: 4 },
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            borderRadius: 3,
            width: "100%",
            maxWidth: 800,
            p: { md: 4, lg: 4 },

            bgcolor: "var(--color-white)",
            boxShadow: isMobile ? 0 : 3,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <SectionTitle title="Add Orchard/Farm" centered />

          <FormStepper
            activeStep={step}
            completion={completion}
            type="orchard"
          />

          <Box
            sx={{
              border: "1px solid var(--color-black-light)",
              borderRadius: 2,
              bgcolor: "var(--color-white)",
            }}
          >
            {step === 0 && (
              <DemographicsSection register={register} errors={errors} />
            )}
            {step === 1 && (
              <LandHoldingSection register={register} errors={errors} />
            )}
            {step === 2 && (
              <AddressSection
                register={register}
                errors={errors}
                detectLocation={detectLocation}
              />
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
  );
}
