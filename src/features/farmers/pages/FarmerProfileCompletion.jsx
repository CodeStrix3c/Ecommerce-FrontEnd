import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";
import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";

import FormNavigation from "@/features/farmer-registration/components/FormNavigation";

import EducationSection from "@/features/farmer-registration/sections/EducationSection";
import {
  ADDRESS_FIELDS,
  EDUCATION_FIELDS,
  PROFESSION_FIELDS,
  PROFILE_FIELDS,
} from "@/constants/profileFields";
import { educationSchema } from "@/features/farmer-registration/schemas/educationSchema";
import { professionSchema } from "@/features/farmer-registration/schemas/professionSchema";
import ProfessionSection from "@/features/farmer-registration/sections/ProfessionSection";
import AddressSection from "@/features/farmer-registration/sections/AddressSection";
import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
import ProfileSection from "@/features/farmer-registration/sections/ProfileSection";
import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import ContentWrapper from "@/components/shared/ContentWrapper";

const stepSchemas = [
  profileSchema,
  addressSchema,
  educationSchema,
  professionSchema,
];

export default function FarmerProfileCompletion({ onComplete }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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

  const values = watch();

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    toast.success("Form submitted successfully!");
  };
  const nextStep = async () => {
    let stepFields = [];
    if (step === 0) stepFields = PROFILE_FIELDS;

    if (step === 1) stepFields = ADDRESS_FIELDS;

    if (step === 2) stepFields = EDUCATION_FIELDS;
    if (step === 3) stepFields = PROFESSION_FIELDS;

    const valid = await trigger(stepFields);

    if (valid) setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
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
    if (step < stepSchemas.length - 1) {
      nextStep();
      return;
    }

    const valid = await trigger();
    if (!valid) return;

    const data = watch();

    const completedSections = [];
    if (step >= 0) completedSections.push("address");
    if (step >= 1) completedSections.push("education");
    if (step >= 2) completedSections.push("profession");
    console.log({ ...data, completedSections }, "data in incomplete farmer");

    onComplete?.({ ...data, completedSections });
    navigate("/farmer-dashboard");
  };

  return (
    <ContentWrapper compactScreen>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          bgcolor: "var(--color-white)",
          // py: { xs: 5, lg: 4 },
          // my: { xs: 0, md: 10, lg: 4 },
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
              // p: { md: 4, lg: 4 },
              bgcolor: "var(--color-white)",
              boxShadow: isMobile ? 0 : 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <SectionTitle title="Farmer Completion" centered />

            {/* <FormStepper activeStep={step} type="profile" /> */}

            <Box
              sx={{
                border: "1px solid var(--color-black-light)",
                borderRadius: 2,
                bgcolor: "var(--color-white)",
                p: 0,
              }}
            >
              {step === 0 && (
                <ProfileSection register={register} errors={errors} />
              )}{" "}
              {step === 1 && (
                <AddressSection register={register} errors={errors} />
              )}{" "}
              {step === 2 && (
                <EducationSection register={register} errors={errors} />
              )}
              {step === 3 && (
                <ProfessionSection register={register} errors={errors} />
              )}
              <FormNavigation
                step={step}
                totalSteps={stepSchemas.length}
                nextStep={nextStep}
                prevStep={prevStep}
                handleSubmit={handleSubmitClick}
              />
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </ContentWrapper>
  );
}
