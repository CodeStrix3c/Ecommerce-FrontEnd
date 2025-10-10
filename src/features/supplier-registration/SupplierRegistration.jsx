import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BusinessInformationSection from "./sections/BusinessInformationSection";
import OtpVerificationSection from "../farmer-registration/sections/OtpVerificationSection";
import FormNavigation from "../orchard-registration/components/FormNavigation";
import { BUSINESS_INFORMATION_FIELDS } from "@/constants/supplierFormSteps";
import { OTP_FIELDS } from "@/constants/profileFields";
import { businessInformationSchema } from "./schemas/businessInformationSchemas";
import { otpSchema } from "../farmer-registration/schemas/otpSchema";
import { useSupplier } from "@/providers/SupplierProvider";
import ContentWrapper from "@/components/shared/ContentWrapper";

const stepSchemas = [businessInformationSchema, otpSchema];

export default function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setBusinessComplete, setOtpComplete } = useSupplier();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    register,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    const stepFields = step === 0 ? BUSINESS_INFORMATION_FIELDS : OTP_FIELDS;
    const valid = await trigger(stepFields);
    if (valid) setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmitClick = async () => {
    if (step < stepSchemas.length - 1) {
      nextStep();
      return;
    }

    const valid = await trigger();
    if (!valid) return;

    setBusinessComplete();
    setOtpComplete();
    localStorage.setItem("SRT", "dummy data");

    toast.success("Business and OTP completed!");
    navigate("/supplier-profile");
  };

  return (
    <ContentWrapper compactScreen>
      <div className="mt-10 lg:mt-36 md:mt-20 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row w-full overflow-hidden ">
          <div className="w-full flex flex-col justify-center ">
            <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
              <div className={`  ${step === 0 ? "" : ""}`}></div>
              <div className={` ${step === 1 ? "" : ""}`}></div>
            </div>

            <Box className="rounded-2xl">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(handleSubmitClick)}
                  className="space-y-6"
                >
                  <SectionTitle
                    title="Supplier Registration"
                    className="lg:text-4xl text-2xl font-bold text-center mb-6 text-[var(--color-black)]"
                    centered
                  />

                  {step === 0 && (
                    <BusinessInformationSection
                      register={register}
                      errors={errors}
                    />
                  )}

                  {step === 1 && (
                    <OtpVerificationSection
                      register={register}
                      errors={errors}
                    />
                  )}

                  <FormNavigation
                    step={step}
                    totalSteps={stepSchemas.length}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleSubmit={handleSubmitClick}
                  />
                </form>
              </FormProvider>
            </Box>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
