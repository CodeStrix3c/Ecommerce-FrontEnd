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

const stepSchemas = [businessInformationSchema, otpSchema];

export default function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setBusinessComplete, setOtpComplete } = useSupplier();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const { handleSubmit, trigger, register, formState: { errors } } = methods;

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

    toast.success("Business and OTP completed!");
    navigate("/supplier-profile");
  };

  return (
    <div className="mt-10 min-h-screen flex items-center justify-center p-4 ">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden ">
        
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAYJBKvwVdjVkNVfmObqXwa0V5wNbkTW8nAchGHbXQ7XOKhFX7VL3vCrtm9YQT5BuKAI&usqp=CAU"
            alt="Illustration"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0  flex flex-col justify-center items-center text-center p-4 rounded-2xl">
            <h2 className=" text-[var(--color-black)] text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              Welcome Crop Suppliers!
            </h2>
            <p className="text-[var(--color-black)] text-sm sm:text-base md:text-xl">
              Register your business to supply high-quality crops to farmers and
              distributors. Ensure timely deliveries, maintain quality standards,
              and expand your market reach.
            </p>
          </div>
        </div>

        
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
            <div className={`  ${step === 0 ? "" : ""}`}></div>
            <div className={` ${step === 1 ? "" : ""}`}></div>
          </div>

          <Box className="rounded-2xl">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleSubmitClick)} className="space-y-6">
                <SectionTitle
                  title="Supplier Registration"
                  className="lg:text-4xl text-2xl font-bold text-center mb-6 text-[var(--color-black)]"
                  centered
                />

                {step === 0 && (
                  <BusinessInformationSection register={register} errors={errors} />
                )}

                {step === 1 && (
                  <OtpVerificationSection register={register} errors={errors} />
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
  );
}
