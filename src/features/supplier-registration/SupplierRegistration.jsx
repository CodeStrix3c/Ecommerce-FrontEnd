import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BusinessInformationSection from "./sections/BusinessInformationSection";
// import OtpVerificationSection from "../farmer-registration/sections/OtpVerificationSection";
import FormNavigation from "../orchard-registration/components/FormNavigation";
// import { BUSINESS_INFORMATION_FIELDS } from "@/constants/supplierFormSteps";
// import { OTP_FIELDS } from "@/constants/profileFields";
import { businessInformationSchema } from "./schemas/businessInformationSchemas";
// import { otpSchema } from "../farmer-registration/schemas/otpSchema";
import { useSupplier } from "@/providers/SupplierProvider";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import FormStepper from "@/components/shared/FormStepper";
import StepHeader from "../auth/components/StepHeader";
import { SUPPLIER_STEPS } from "@/constants/stepperData";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemsInLocalStorage,
} from "@/utils/localStorage";
import useVendorBusinessReg from "@/hooks/Vendor/userVendorBusinessReg";

// const stepSchemas = [businessInformationSchema, otpSchema];

const DUMMY_EMAIL = "dummyuser@artandcraft.com";

export default function SupplierRegistration() {
  const { labels, descriptions } = SUPPLIER_STEPS || {};

  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setBusinessComplete, setOtpComplete } = useSupplier();
  const { mutateAsync: SupplierReg, pending } = useVendorBusinessReg();

  const methods = useForm({
    resolver: zodResolver(businessInformationSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const handleSubmitClick = async (data) => {
    try {
      console.log("VALIDATED DATA:", data);

      // ✅ GUARANTEED EMAIL NORMALIZATION
      // - empty
      // - undefined
      // - whitespace
      // → ALWAYS fallback to dummy
      const email =
        typeof data.userEmail === "string" && data.userEmail.trim().length > 0
          ? data.userEmail.trim()
          : DUMMY_EMAIL;

      const userId = Number(getItemFromLocalStorage("userId"));
      const response = await SupplierReg({
        name: data.businessName,
        slug: data.slug,
        description: data.description,
        email: data.businessEmail,
        isActive: true,
        managers: [
          {
            email,
            userId,
          },
        ],
      });

      console.log("SUPPLIER API RESPONSE:", response);
      setItemsInLocalStorage("VendorId", response.vendorId);
      console.log(SupplierReg, "these are supplier detatils");
      toast.success("Supplier registered successfully");
      removeItemFromLocalStorage("token");
      removeItemFromLocalStorage("roles");
      removeItemFromLocalStorage("useId");
      toast.success("please login to see vendor dashboard");

      navigate("/");
    } catch (error) {
      console.error("API ERROR:", error);
      toast.error("Supplier registration failed");
    }

    // setBusinessComplete();
    // setOtpComplete();
    // setItemsInLocalStorage("SRT", "fakeSupplierToken");
    // toast.success("Business and OTP completed!");
    // navigate("/supplier-profile");
  };

  return (
    <div className="mt-0 mb-3 flex items-center justify-center">
      <div className="flex flex-col w-full overflow-hidden">
        <Box className="rounded-2xl">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(handleSubmitClick)}
              className="space-y-6"
            >
              <SectionTitle
                title="Supplier Registration"
                className="lg:text-4xl text-2xl font-bold text-center mb-10"
                centered
              />

              {/* <FormStepper activeStep={step} steps={labels} /> */}

              <StepHeader
                activeStep={step}
                labels={labels}
                descriptions={descriptions}
              />

              {step === 0 && (
                <BusinessInformationSection
                  register={register}
                  errors={errors}
                  control={methods.control}
                />
              )}

              {/* {step === 1 && (
                <OtpVerificationSection
                  register={register}
                  errors={errors}
                  control={methods.control}
                />
              )} */}

              <FormNavigation
                step={step}
                totalSteps={1}
                // nextStep={nextStep}
                // prevStep={prevStep}
                handleSubmit={handleSubmit(handleSubmitClick)}
              />
            </form>
          </FormProvider>
        </Box>
      </div>
    </div>
  );
}
