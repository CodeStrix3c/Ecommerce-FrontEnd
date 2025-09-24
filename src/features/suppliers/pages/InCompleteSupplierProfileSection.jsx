import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import FormStepper from "@/features/auth/components/FormStepper";
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
  FINANCIAL_PAYMENT_FIELDS,
  LICENSING_COMPLIANCE_FIELDS,
  OPERATIONAL_DETAILS_FIELDS,
  PRODUCT_PORTFOLIO_FIELDS,
  SUPPORT_SERVICES_FIELDS,
} from "@/constants/supplierFormSteps";

const stepSchemas = [
  licensingComplianceSchema,
  productPortfolioSchema,
  operationalDetailsSchema,
  financialPaymentSchema,
  supportServicesSchema,
];

export default function InCompleteSupplierProfileSection({ onComplete }) {
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

  const values = watch();

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    toast.success("Form submitted successfully!");
  };

  const nextStep = async () => {
    let stepFields = [];

    if (step === 0) stepFields = LICENSING_COMPLIANCE_FIELDS;
    if (step === 1) stepFields = PRODUCT_PORTFOLIO_FIELDS;
    if (step === 2) stepFields = OPERATIONAL_DETAILS_FIELDS;
    if (step === 3) stepFields = FINANCIAL_PAYMENT_FIELDS;
    if (step === 4) stepFields = SUPPORT_SERVICES_FIELDS;

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

    const valid = await trigger(); // validate all fields
    if (!valid) return;

    const data = watch();

    // ✅ Collect completed sections
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "var(--color-white)",
        py: { xs: 5, lg: 4 },
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
            boxShadow: isMobile ? 0 : 0,
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
              p: 0,
            }}
          >
            {step === 0 && (
              <LicensingComplianceSection register={register} errors={errors} />
            )}
            {step === 1 && (
              <ProductPortfolioSection register={register} errors={errors} />
            )}
            {step === 2 && (
              <OperationalDetailsSection register={register} errors={errors} />
            )}
            {step === 3 && (
              <FinancialPaymentSection register={register} errors={errors} />
            )}
            {step === 4 && (
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
