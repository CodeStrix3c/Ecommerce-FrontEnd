import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ProfileSection from "./sections/ProfileSection";
import OtpVerificationSection from "./sections/OtpVerificationSection";
import FormNavigation from "./components/FormNavigation";
import SectionTitle from "@/components/shared/SectionTitle";

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { otpSchema } from "@/features/farmer-registration/schemas/otpSchema";
import { useFarmer } from "@/providers/FarmerProvider";
import { OTP_FIELDS, PROFILE_FIELDS } from "../../constants/profileFields";

import { useSignupMutation } from "@/hooks/useAuthMutation";
import { PROFILE_STEPS } from "@/constants/stepperData";
import StepHeader from "@/features/auth/components/StepHeader";
import FormStepper from "@/components/shared/FormStepper";
import { setItemsInLocalStorage } from "@/utils/localStorage";

const stepSchemas = [profileSchema, otpSchema];
const stepLabels = ["Profile", "OTP Verification"];

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const { labels, descriptions } = PROFILE_STEPS || {};

  const { setProfileComplete, setOtpComplete } = useFarmer();
  const navigate = useNavigate();

  const { mutate: signupMutate, isPending } = useSignupMutation();

  // console.log(signup, "signup mutation");

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
  console.log(values, "signup values");

  const nextStep = async () => {
    const stepFields = step === 0 ? PROFILE_FIELDS : OTP_FIELDS;
    const valid = await trigger(stepFields);

    if (step === 0 && valid && !otpSent) {
      const phone = watch("phone");
      if (phone) {
        console.log("OTP sent to phone:", phone);
        toast.info(`OTP sent to ${phone}`);
        setOtpSent(true);
      }
    }

    if (valid) setStep((s) => Math.min(stepLabels.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmitClick = async () => {
    if (step !== 1) return nextStep();

    const valid = await trigger(["otp"]);
    if (!valid) {
      toast.error("Please enter the OTP");
      return;
    }

    // const payload = {
    //   Email: values.email,
    //   FullName: values.fullName,
    //   // Phone: values.phone,
    //   Password: values.password,
    //   ConfirmPassword: values.confirmPassword,
    //   // Age: values.age,
    //   // Gender: values.gender,
    // };
    // console.log(payload, "payload");

    // signupMutate(values, {
    //   onSuccess: (data) => {
    //     console.log("Signup success:", data);
    //     toast.success("Signup successful!");
    //     navigate("/login");
    //   },
    //   onError: (err) => {
    //     console.error("Signup failed:", err.response.data[""][0]);
    //     toast.error(err.response?.data[""][0] || "Signup failed");
    //   },
    // });
    // setItemsInLocalStorage("userLoginToken", "signedUp");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "var(--color-gray-light)",
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            borderRadius: 3,
            width: "100%",
            bgcolor: "var(--color-white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="py-10">
            <SectionTitle
              title="Farmer Registration"
              className="lg:text-4xl text-2xl font-bold text-center mb-0 text-[var(--color-black)]"
              centered
            />
          </div>
          <FormStepper activeStep={step} steps={labels} />

          <StepHeader
            activeStep={step}
            labels={labels}
            descriptions={descriptions}
          />

          <Box
            sx={{
              width: "100%",
              border: "1px solid var(--color-black-light)",
              borderRadius: 2,
              py: 3,
              position: "relative",
              opacity: isPending ? 0.6 : 1,
              pointerEvents: isPending ? "none" : "auto",
            }}
          >
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
              totalSteps={stepLabels.length}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmitClick}
              isPending={isPending}
            />
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
}
