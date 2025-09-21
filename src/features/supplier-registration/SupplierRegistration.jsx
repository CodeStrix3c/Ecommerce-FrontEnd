import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/features/auth/components/FormStepper";
import { toast } from "react-toastify";

import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";
import BusinessInformationSection from "./sections/BusinessInformationSection";
import {
  businessInformationStepFields,
  financialPaymentStepFields,
  licensingComplianceStepFields,
  operationalDetailsStepFields,
  productPortfolioStepFields,
  supplierRegistrationDefaultFields,
  supportServicesStepFields,
} from "@/constants/supplierFormSteps";
import { businessInformationSchema } from "./schemas/businessInformationSchemas";
import FormNavigation from "../orchard-registration/components/FormNavigation";
import LicensingComplianceSection from "./sections/LicensingComplianceSection";
import { licensingComplianceSchema } from "./schemas/licensingComplianceSchema";
import { productPortfolioSchema } from "./schemas/productPortfolioSchema";
import ProductPortfolioSection from "./sections/ProductPortfolioSection";
import { operationalDetailsSchema } from "./schemas/operationalDetailsSchema";
import OperationalDetailsSection from "./sections/OperationalDetailsSection";
import { financialPaymentSchema } from "./schemas/financialPaymentSchema";
import FinancialPaymentSection from "./sections/FinancialPaymentSection";
import { supportServicesSchema } from "./schemas/supportServicesSchema";
import SupportServicesSection from "./sections/SupportAndServicesSection";

const stepSchemas = [
  businessInformationSchema,
  licensingComplianceSchema,
  productPortfolioSchema,
  operationalDetailsSchema,
  financialPaymentSchema,
  supportServicesSchema,
];

export default function SupplierRegistration() {
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

  const values = watch(supplierRegistrationDefaultFields);

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    toast.success("Form submitted successfully!");
  };

  const nextStep = async () => {
    let stepFields = [];

    if (step === 0) {
      stepFields = businessInformationStepFields;
    }

    if (step === 1) {
      stepFields = licensingComplianceStepFields;
    }

    if (step === 2) stepFields = productPortfolioStepFields;
    if (step === 3) stepFields = operationalDetailsStepFields;
    if (step === 4) stepFields = financialPaymentStepFields;
    if (step === 5) stepFields = supportServicesStepFields;

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
    navigate("/farmer-dashboard");
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
          <SectionTitle title="Supplier Registration" centered />

          <FormStepper activeStep={step} type="supplier" />

          <Box
            sx={{
              border: "1px solid var(--color-black-light)",
              borderRadius: 2,
              bgcolor: "var(--color-white)",
              p: 2,
            }}
          >
            {step === 0 && (
              <BusinessInformationSection register={register} errors={errors} />
            )}
            {step === 1 && (
              <LicensingComplianceSection register={register} errors={errors} />
            )}
            {step === 2 && (
              <ProductPortfolioSection register={register} errors={errors} />
            )}
            {step === 3 && (
              <OperationalDetailsSection register={register} errors={errors} />
            )}
            {step === 4 && (
              <FinancialPaymentSection register={register} errors={errors} />
            )}
            {step === 5 && (
              <SupportServicesSection register={register} errors={errors} />
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
