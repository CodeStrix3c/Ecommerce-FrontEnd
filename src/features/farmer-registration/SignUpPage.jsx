import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SectionTitle from "@/components/shared/SectionTitle";
import StepHeader from "@/features/auth/components/StepHeader";
import FormStepper from "@/components/shared/FormStepper";

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { otpSchema } from "@/features/farmer-registration/schemas/otpSchema";
import { PROFILE_STEPS } from "@/constants/stepperData";
import { PROFILE_FIELDS, OTP_FIELDS } from "@/constants/profileFields";

import { setItemsInLocalStorage } from "@/utils/localStorage";

import {
  useEmailandPhoneNumberMutation,
  useSendOtpMutation,
  useOtpVerifyMutation,
  useProfileMutation,
} from "@/hooks/useFarmerProfileMutations";

import { useLoginMutation } from "@/hooks/useAuthMutation";

import ProfileSection from "../farmer-registration/sections/ProfileSection";
import OtpVerificationSection from "../farmer-registration/sections/OtpVerificationSection";
import FormNavigation from "../farmer-registration/components/FormNavigation";

const stepSchemas = [profileSchema, otpSchema];

export default function SupplierSignUp() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();
  const { labels, descriptions } = PROFILE_STEPS;

  const { mutateAsync: checkEmailPhone } = useEmailandPhoneNumberMutation();
  const { mutateAsync: sendOtp } = useSendOtpMutation();
  const { mutateAsync: verifyOtp } = useOtpVerifyMutation();
  const { mutateAsync: signup } = useProfileMutation();
  const { mutateAsync: login } = useLoginMutation();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
  });

  const {
    watch,
    trigger,
    register,
    formState: { errors },
  } = methods;

  const values = watch();

  /* =========================
     STEP 0 → CHECK + SEND OTP
     ========================= */
  const nextStep = async () => {
    const valid = await trigger(PROFILE_FIELDS);
    if (!valid) return;

    try {
      setFormData(values);

      await checkEmailPhone({
        email: values.email,
        phone: values.phone,
      });

      await sendOtp({
        phoneNumber: values.phone,
      });

      toast.success("OTP sent to your phone");
      setStep(1);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Email or phone verification failed"
      );
    }
  };

  /* =========================
     STEP 1 → OTP → SIGNUP → LOGIN
     ========================= */
  const handleSubmitClick = async () => {
    const valid = await trigger(OTP_FIELDS);
    if (!valid) return toast.error("Enter OTP");

    try {
      // 1️⃣ VERIFY OTP
      await verifyOtp({
        phoneNumber: formData.phone,
        otp: values.otp,
      });

      // 2️⃣ SIGNUP
      await signup({
        FullName: formData.fullName,
        Email: formData.email,
        Phone: formData.phone,
        Password: formData.password,
        ConfirmPassword: formData.confirmPassword,
        Age: formData.age,
        Gender: formData.gender,
      });

      // 3️⃣ AUTO LOGIN (NO SCREEN)
      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.phone,
      });

      // 4️⃣ STORE TOKEN
      setItemsInLocalStorage("token", loginResponse.token);

      toast.success("Account created & logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup or login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormProvider {...methods}>
        <Box component="form" onSubmit={(e) => e.preventDefault()}>
          <SectionTitle title="User Registration" centered />

          <FormStepper activeStep={step} steps={labels} />
          <StepHeader
            activeStep={step}
            labels={labels}
            descriptions={descriptions}
          />

          {step === 0 && (
            <ProfileSection
              register={register}
              errors={errors}
              control={methods.control}
            />
          )}

          {step === 1 && (
            <OtpVerificationSection register={register} errors={errors} />
          )}

          <FormNavigation
            step={step}
            totalSteps={2}
            nextStep={nextStep}
            prevStep={() => setStep(0)}
            handleSubmit={handleSubmitClick}
          />
        </Box>
      </FormProvider>
    </Box>
  );
}
