import { farmerRequiredFields } from "@/constants/farmerRequiredFields";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import DemographicsSection from "./sections/DemographicsSection";
import VarietyPlantingSection from "./sections/VarietyPlantingSection";
import SoilWaterProfileSection from "./sections/SoilWaterProfileSection";
import CropNutritionManagementSection from "./sections/CropNutritionManagementSection";
import PlantProtectionHealthSection from "./sections/PlantProtectionHealthSection";
import FarmInfrastructureSection from "./sections/FarmInfrastructureSection";
import LandHoldingSection from "./sections/LandHoldingSection";
import AddressSection from "./sections/AddressSection";

import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/components/ui/FormStepper";
import { toast } from "react-toastify";

import { demographicsSchema } from "@/schemas/demographicSchema";
import { varietyPlantingSchema } from "@/schemas/varietyPlantingSchema";
import { soilWaterProfileSchema } from "@/schemas/soilWaterProfileSchema";
import { cropNutritionSchema } from "@/schemas/cropNutritionSchema";
import { plantProtectionSchema } from "@/schemas/plantProtectionSchema";
import { farmInfrastructureSchema } from "@/schemas/farmInfrastructureSchema";

import {
  soilWaterStepFields,
  cropNutritionStepFields,
  plantProtectionStepFields,
  farmInfrastructureStepFields,
  demographicsStepFields,
  varietyPlantingStepFields,
  orchardRegistrationDefaultFields,
} from "@/constants/orchardFormSteps";

import { useProgress } from "@/hooks/useProgress";
import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";

const stepSchemas = [
  demographicsSchema,
  varietyPlantingSchema,
  soilWaterProfileSchema,
  cropNutritionSchema,
  plantProtectionSchema,
  farmInfrastructureSchema,
];

export default function OrchardRegistration() {
  const [step, setStep] = useState(0);
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

  const values = watch(orchardRegistrationDefaultFields);
  const completion = useProgress(
    values,
    orchardRegistrationDefaultFields.length
  );

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    toast.success("Form submitted successfully!");
  };

  const nextStep = async () => {
    let stepFields = [];

    if (step === 0) {
      stepFields = demographicsStepFields;
    }

    if (step === 1) {
      stepFields = varietyPlantingStepFields;
    }

    if (step === 2) stepFields = soilWaterStepFields;
    if (step === 3) stepFields = cropNutritionStepFields;
    if (step === 4) stepFields = plantProtectionStepFields;
    if (step === 5) stepFields = farmInfrastructureStepFields;

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
    if (!valid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const data = watch();
    onSubmit(data);
    navigate("/dashboard");
  };
  console.log(completion, "completion");

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
              p: 2,
            }}
          >
            {step === 0 && (
              <DemographicsSection register={register} errors={errors} />
            )}
            {step === 1 && (
              <VarietyPlantingSection register={register} errors={errors} />
            )}
            {step === 2 && (
              <SoilWaterProfileSection register={register} errors={errors} />
            )}
            {step === 3 && (
              <CropNutritionManagementSection
                register={register}
                errors={errors}
              />
            )}
            {step === 4 && (
              <PlantProtectionHealthSection
                register={register}
                errors={errors}
              />
            )}
            {step === 5 && (
              <FarmInfrastructureSection register={register} errors={errors} />
            )}
            {step === 6 && (
              <LandHoldingSection register={register} errors={errors} />
            )}
            {step === 7 && (
              <AddressSection
                register={register}
                errors={errors}
                detectLocation={detectLocation}
              />
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
  );
}
