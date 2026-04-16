import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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
import { useUser } from "@/providers/UserProvider";
import { AlertTriangle } from "lucide-react";

const stepSchemas = [profileSchema, otpSchema];

// ✅ Generates email using phone number
const generateEmailFromPhone = (phone) => {
  return `${phone}@handicraft.com`;
};

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
  const { setUserId, setToken, setRoles, setVendorId } = useUser();

  const methods = useForm({
    resolver: zodResolver(stepSchemas[step]),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const {
    watch,
    trigger,
    register,
    formState: { errors },
  } = methods;

  const values = watch();

  const nextStep = async () => {
    const valid = await trigger(PROFILE_FIELDS);
    if (!valid) return;

    try {
      // ✅ Use phone-based email if empty
      const emailToUse = values.email?.trim()
        ? values.email
        : generateEmailFromPhone(values.phone);

      const enrichedValues = { ...values, email: emailToUse };
      setFormData(enrichedValues);

      await checkEmailPhone({
        email: emailToUse,
        phone: values.phone,
      });

      await sendOtp({
        phoneNumber: values.phone,
      });

      toast.success("OTP sent to your phone");
      setStep(1);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Email or phone verification failed",
      );
    }
  };

  const handleSubmitClick = async () => {
    const valid = await trigger(OTP_FIELDS);
    if (!valid) return;

    try {
      await verifyOtp({
        phoneNumber: formData.phone,
        otp: values.otp,
      });

      await signup({
        FullName: formData.fullName,
        Email: formData.email,
        Phone: formData.phone,
        Password: formData.password,
        ConfirmPassword: formData.confirmPassword,
        Age: formData.age,
        Gender: formData.gender,
      });

      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.phone,
      });

      setToken(loginResponse.token);
      setUserId(loginResponse.user);
      setRoles(loginResponse.roles);
      setVendorId(loginResponse.vendorId);

      toast.success("Account created & logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup or login failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp({
        phoneNumber: formData.phone,
      });

      toast.success("OTP resent successfully");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8">
          <FormProvider {...methods}>
            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <div className="relative mb-6">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/assets/images/logo6.png"
                    alt="App Logo"
                    className="h-14 sm:h-12 object-contain"
                  />
                  <h2 className="text-3xl font-semibold text-center">
                    {step === 0 ? "User Registration" : "OTP Verification"}
                  </h2>
                </div>
              </div>

              <FormStepper activeStep={step} steps={labels} />

              <StepHeader
                activeStep={step}
                labels={labels}
                descriptions={descriptions}
              />

              {step === 0 && (
                <>
                  <h3 className="text-xl font-bold -mt-14 mb-4">
                    Profile Information
                    <p className="text-sm font-normal text-gray-600">
                      Please provide your profile information to continue.
                    </p>
                  </h3>

                  <ProfileSection
                    register={register}
                    errors={errors}
                    control={methods.control}
                  />
                </>
              )}

              {step === 1 && (
                <OtpVerificationSection
                  register={register}
                  errors={errors}
                  setValue={methods.setValue}
                  onResend={handleResendOtp}
                />
              )}

              <FormNavigation
                step={step}
                totalSteps={2}
                nextStep={nextStep}
                prevStep={() => {
                  if (step === 0) {
                    navigate("/login");
                  } else {
                    setStep(step - 1);
                  }
                }}
                handleSubmit={handleSubmitClick}
              />
            </Box>
          </FormProvider>
        </div>
      </Box>

      <p className="mb-5 text-center text-sm px-4">
        Already have an account?{" "}
        <Link to="/login" className="font-medium underline">
          Login
        </Link>
      </p>
    </>
  );
}
