import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import DemographicsSection from "./sections/DemographicsSection";
import VarietyPlantingSection from "./sections/VarietyPlantingSection";
import SoilWaterProfileSection from "./sections/SoilWaterProfileSection";
import CropNutritionManagementSection from "./sections/CropNutritionManagementSection";
import PlantProtectionHealthSection from "./sections/PlantProtectionHealthSection";
import FarmInfrastructureSection from "./sections/FarmInfrastructureSection";

import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";

import { demographicsSchema } from "@/features/orchard-registration/schemas/demographicSchema";
import { varietyPlantingSchema } from "@/features/orchard-registration/schemas/varietyPlantingSchema";
import { soilWaterProfileSchema } from "@/features/orchard-registration/schemas/soilWaterProfileSchema";
import { cropNutritionSchema } from "@/features/orchard-registration/schemas/cropNutritionSchema";
import { plantProtectionSchema } from "@/features/orchard-registration/schemas/plantProtectionSchema";
import { farmInfrastructureSchema } from "@/features/orchard-registration/schemas/farmInfrastructureSchema";

import {
  soilWaterStepFields,
  cropNutritionStepFields,
  plantProtectionStepFields,
  farmInfrastructureStepFields,
  demographicsStepFields,
  varietyPlantingStepFields,
  productionMarketingStepFields,
  inputCostDetailsStepFields,
  optionalFutureFieldsStepFields,
} from "@/constants/orchardFormSteps";

import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";
import ProductionMarketingSection from "./sections/ProductionMarketingSection";
import { productionMarketingSchema } from "./schemas/productionMarketingSchema";
import InputCostDetailsSection from "./sections/InputCostDetailsSection";
import { inputCostDetailsSchema } from "./schemas/inputCostDetailsSchema";
import { optionalFutureFieldsSchema } from "./schemas/optionalFutureFieldsSchema";
import OptionalFutureFieldsSection from "./sections/OptionalFutureFieldsSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import FormStepper from "@/components/shared/FormStepper";
import { ORCHARD_STEPS } from "@/constants/stepperData";
import StepHeader from "../auth/components/StepHeader";

const stepSchemas = [
  demographicsSchema,
  varietyPlantingSchema,
  soilWaterProfileSchema,
  cropNutritionSchema,
  plantProtectionSchema,
  farmInfrastructureSchema,
  productionMarketingSchema,
  inputCostDetailsSchema,
  optionalFutureFieldsSchema,
];

export default function OrchardRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { labels, descriptions } = ORCHARD_STEPS || {};
  const stepperRef = useRef(null);
  const isMobile = useIsMobile();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (isMobile && stepperRef.current) {
      const activeEl = stepperRef.current.querySelector(
        ".MuiStep-root.Mui-active"
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [step, isMobile]);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    toast.success("Orchard Added");
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
    if (step === 6) stepFields = productionMarketingStepFields;
    if (step === 7) stepFields = inputCostDetailsStepFields;
    if (step === 8) stepFields = optionalFutureFieldsStepFields;

    const valid = await trigger(stepFields);

    if (!valid) setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

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
    navigate("/orchards");
  };

  return (
    <ContentWrapper>
      <div className="mt-10 lg:mt-36 md:mt-20">
        <Box sx={{}}>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                gap: 2,
                borderRadius: 2,
                bgcolor: "var(--color-white)",
              }}
            >
              <Box
                sx={{
                  borderRight: { sm: "1px solid var(--color-black-light)" },
                }}
              >
                <div className="mb-4">
                  <SectionTitle
                    title="Add Orchard/Farm"
                    centered
                    className="lg:text-2xl sm:text-2xl md:text-xl text-xl"
                  />
                </div>
                <div
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="hide-scrollbar"
                >
                  <FormStepper
                    activeStep={step}
                    steps={labels}
                    ref={stepperRef}
                  />
                </div>
              </Box>

              <Box sx={{ flex: 1 }}>
                <StepHeader
                  activeStep={step}
                  labels={labels}
                  descriptions={descriptions}
                />

                {step === 0 && (
                  <DemographicsSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 1 && (
                  <VarietyPlantingSection
                    register={register}
                    control={methods.control}
                    errors={errors}
                  />
                )}
                {step === 2 && (
                  <SoilWaterProfileSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 3 && (
                  <CropNutritionManagementSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 4 && (
                  <PlantProtectionHealthSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 5 && (
                  <FarmInfrastructureSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 6 && (
                  <ProductionMarketingSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 7 && (
                  <InputCostDetailsSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                )}
                {step === 8 && (
                  <OptionalFutureFieldsSection
                    register={register}
                    errors={errors}
                    control={methods.control}
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
      </div>
    </ContentWrapper>
  );
}
