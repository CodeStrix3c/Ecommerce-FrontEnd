import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SectionTitle from "@/components/shared/SectionTitle";
import ContentWrapper from "@/components/shared/ContentWrapper";
import FormStepper from "@/components/shared/FormStepper";
import FormNavigation from "@/features/farmer-registration/components/FormNavigation";
import StepHeader from "@/features/auth/components/StepHeader";

import ProfileSection from "@/features/farmer-registration/sections/ProfileSection";
import AddressSection from "@/features/farmer-registration/sections/AddressSection";
import EducationSection from "@/features/farmer-registration/sections/EducationSection";
import ProfessionSection from "@/features/farmer-registration/sections/ProfessionSection";

import {
  PROFILE_FIELDS,
  ADDRESS_FIELDS,
  EDUCATION_FIELDS,
  PROFESSION_FIELDS,
} from "@/constants/profileFields";
import { PROFILE_STEPS } from "@/constants/stepperData";

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
import { educationSchema } from "@/features/farmer-registration/schemas/educationSchema";
import { professionSchema } from "@/features/farmer-registration/schemas/professionSchema";

const stepSchemas = [
  profileSchema,
  addressSchema,
  educationSchema,
  professionSchema,
];
const stepFieldsMap = [
  PROFILE_FIELDS,
  ADDRESS_FIELDS,
  EDUCATION_FIELDS,
  PROFESSION_FIELDS,
];

export default function FarmerProfileCompletion({ onComplete }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    const valid = await trigger(stepFieldsMap[step]);
    if (valid) setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setValue("gps", `${pos.coords.latitude},${pos.coords.longitude}`, {
          shouldValidate: true,
        }),
      () => alert("Unable to retrieve location")
    );
  };

  const onSubmitForm = async () => {
    if (step < stepSchemas.length - 1) return nextStep();

    const valid = await trigger();
    if (!valid) return;

    const data = watch();
    const completedSections = [
      "profile",
      "address",
      "education",
      "profession",
    ].slice(0, step + 1);
    onComplete?.({ ...data, completedSections });
    navigate("/farmer-dashboard");
  };

  const { labels } = PROFILE_STEPS;

  return (
    <ContentWrapper compactScreen topSpacing>
      <div className="lg:mt-44 md:mt-36">
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitForm)}
            sx={{
              // maxWidth: 800,
              // mx: "auto",
              // p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              bgcolor: "var(--color-white)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <SectionTitle
              title="Farmer Completion"
              centered
              className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl"
            />
            <FormStepper activeStep={step} steps={labels} />

            <StepHeader activeStep={step} type="profile" />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {step === 0 && (
                <ProfileSection register={register} errors={errors} />
              )}
              {step === 1 && (
                <AddressSection register={register} errors={errors} />
              )}
              {step === 2 && (
                <EducationSection register={register} errors={errors} />
              )}
              {step === 3 && (
                <ProfessionSection register={register} errors={errors} />
              )}
            </Box>

            <FormNavigation
              step={step}
              totalSteps={stepSchemas.length}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={onSubmitForm}
            />
          </Box>
        </FormProvider>
      </div>
    </ContentWrapper>
  );
}
