import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";
import useIsMobile from "@/hooks/useInMobile";
import { useNavigate } from "react-router-dom";

import LicensingComplianceSection from "@/features/supplier-registration/sections/LicensingComplianceSection";
import ProductPortfolioSection from "@/features/supplier-registration/sections/ProductPortfolioSection";
import OperationalDetailsSection from "@/features/supplier-registration/sections/OperationalDetailsSection";
import FinancialPaymentSection from "@/features/supplier-registration/sections/FinancialPaymentSection";
import SupportServicesSection from "@/features/supplier-registration/sections/SupportAndServicesSection";
import FormNavigation from "@/features/farmer-registration/components/FormNavigation";

import { licensingComplianceSchema } from "@/features/supplier-registration/schemas/licensingComplianceSchema";
import { productPortfolioSchema } from "@/features/supplier-registration/schemas/productPortfolioSchema";
import { operationalDetailsSchema } from "@/features/supplier-registration/schemas/operationalDetailsSchema";
import { financialPaymentSchema } from "@/features/supplier-registration/schemas/financialPaymentSchema";
import { supportServicesSchema } from "@/features/supplier-registration/schemas/supportServicesSchema";

import {
  BUSINESS_INFORMATION_FIELDS,
  FINANCIAL_PAYMENT_FIELDS,
  LICENSING_COMPLIANCE_FIELDS,
  OPERATIONAL_DETAILS_FIELDS,
  PRODUCT_PORTFOLIO_FIELDS,
  SUPPORT_SERVICES_FIELDS,
} from "@/constants/supplierFormSteps";
import BusinessInformationSection from "@/features/supplier-registration/sections/BusinessInformationSection";
import { businessInformationSchema } from "@/features/supplier-registration/schemas/businessInformationSchemas";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { SUPPLIER_STEPS } from "@/constants/stepperData";
import StepHeader from "@/features/auth/components/StepHeader";
import FormStepper from "@/components/shared/FormStepper";

const stepSchemas = [
  businessInformationSchema,
  licensingComplianceSchema,
  productPortfolioSchema,
  operationalDetailsSchema,
  financialPaymentSchema,
  supportServicesSchema,
];

export default function SupplierProfileCompletion({ onComplete }) {
  const { labels, descriptions } = SUPPLIER_STEPS || {};
  const totalSteps = labels.length;
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

    if (step === 0) stepFields = BUSINESS_INFORMATION_FIELDS;
    if (step === 1) stepFields = LICENSING_COMPLIANCE_FIELDS;
    if (step === 2) stepFields = PRODUCT_PORTFOLIO_FIELDS;
    if (step === 3) stepFields = OPERATIONAL_DETAILS_FIELDS;
    if (step === 4) stepFields = FINANCIAL_PAYMENT_FIELDS;
    if (step === 5) stepFields = SUPPORT_SERVICES_FIELDS;

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
    if (step >= 0) completedSections.push("licensing");
    if (step >= 1) completedSections.push("productPortfolio");
    if (step >= 2) completedSections.push("operationalDetails");
    if (step >= 3) completedSections.push("financialPayment");
    if (step >= 4) completedSections.push("supportServices");

    onComplete?.({ ...data, completedSections });
    navigate("/farmer-dashboard");
  };

  return (
    <ContentWrapper compactScreen topSpacing>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitClick)}
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
            title="Supplier Registration"
            centered
            className="text-xl sm:text-xl md:text-2xl lg:text-3xl"
          />

          <FormStepper activeStep={step} steps={labels} />

          <StepHeader activeStep={step} type="supplier" />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
          </Box>

          <FormNavigation
            step={step}
            totalSteps={stepSchemas.length}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmitClick}
          />
        </Box>
      </FormProvider>
    </ContentWrapper>
  );
}
