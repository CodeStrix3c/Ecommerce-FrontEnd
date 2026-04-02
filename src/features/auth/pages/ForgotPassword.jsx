import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormProvider } from "react-hook-form";
import { ShieldCheck } from "lucide-react";

import ContentWrapper from "@/components/shared/ContentWrapper";

import {
  useSendOtpMutations,
  useVerifyOtpMutation,
} from "@/hooks/User/ForgotPassword/useforgotpassword";

import {
  forgotPasswordSchema,
  verifyOtpSchema,
} from "@/features/farmer-registration/schemas/userSchamas/passwordAndverifiyotpSchema";

import VerifyOtpStep from "../components/VerifyOtp";
import ForgotPasswordStep from "../components/ForgotPasswordStep";
import { useZodForm } from "@/hooks/useZofForm";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(""); // store phone
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);

  const { mutateAsync: sendOtp } = useSendOtpMutations();
  const { mutateAsync: verifyOtp } = useVerifyOtpMutation();

  const methods = useZodForm(
    step === 0 ? forgotPasswordSchema : verifyOtpSchema,
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  /* ================= TIMER ================= */

  useEffect(() => {
    if (step !== 1) return;

    if (timeLeft === 0) {
      setExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, step]);

  const formatTime = () => {
    const seconds = timeLeft % 60;
    return `0:${seconds.toString().padStart(2, "0")}`;
  };

  /* ================= RESEND OTP ================= */

  const handleResend = async () => {
    try {
      await sendOtp({ phoneNumber });

      toast.success("OTP resent successfully");

      setTimeLeft(60);
      setExpired(false);
      setValue("otp", "");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error || // ✅ FIXED
        error?.response?.data ||
        "Failed to resend OTP";

      toast.error(message);
    }
  };

  /* ================= FORM SUBMIT ================= */

  const onSubmit = async (data) => {
    try {
      /* STEP 1 : SEND OTP */
      if (step === 0) {
        await sendOtp({
          phoneNumber: data.phoneNumber,
        });

        setPhoneNumber(data.phoneNumber); // store phone

        toast.success("OTP sent successfully");

        setStep(1);
        setTimeLeft(60);
        setExpired(false);
      } else {
        /* STEP 2 : VERIFY OTP */
        const response = await verifyOtp({
          phoneNumber,
          otp: data.otp,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        });

        const message =
          response?.message ||
          response?.data?.message ||
          "Password updated successfully";

        toast.success(message);

        /* redirect to home */
        navigate("/");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error || // ✅ FIXED
        error?.response?.data ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <ContentWrapper>
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-white)] px-4">
        <div className="w-full max-w-md">
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src="/assets/images/logo6.png" className="w-24" />
          </div>

          <FormProvider {...methods}>
            {step === 0 && (
              <ForgotPasswordStep
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
              />
            )}

            {step === 1 && (
              <VerifyOtpStep
                errors={errors}
                expired={expired}
                timeLeft={timeLeft}
                formatTime={formatTime}
                handleResend={handleResend}
                onSubmit={handleSubmit(onSubmit)}
                onBack={() => setStep(0)}
                isSubmitting={isSubmitting}
              />
            )}
          </FormProvider>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-1 mt-6 text-sm">
            <ShieldCheck size={18} style={{ color: "var(--color-primary)" }} />
            <span>Your information is secure</span>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ForgotPasswordPage;
