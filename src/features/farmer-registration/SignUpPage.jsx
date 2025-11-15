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
<<<<<<< HEAD

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { otpSchema } from "@/features/farmer-registration/schemas/otpSchema";
import { useFarmer } from "@/providers/FarmerProvider";
import { OTP_FIELDS, PROFILE_FIELDS } from "../../constants/profileFields";

import { useSignupMutation } from "@/hooks/useAuthMutation";
import { PROFILE_STEPS } from "@/constants/stepperData";
import StepHeader from "@/features/auth/components/StepHeader";
import FormStepper from "@/components/shared/FormStepper";
import { setItemsInLocalStorage } from "@/utils/localStorage";
=======
import StepHeader from "@/features/auth/components/StepHeader";
import FormStepper from "@/components/shared/FormStepper";

import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
import { otpSchema } from "@/features/farmer-registration/schemas/otpSchema";
import { PROFILE_STEPS } from "@/constants/stepperData";
import { PROFILE_FIELDS, OTP_FIELDS } from "@/constants/profileFields";

import { setItemsInLocalStorage } from "@/utils/localStorage";
import {
  useOtpVerifyMutation,
  useProfileMutation,
} from "@/hooks/useFarmerProfileMutations";
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651

const stepSchemas = [profileSchema, otpSchema];
const stepLabels = ["Profile", "OTP Verification"];

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
<<<<<<< HEAD
  const { labels, descriptions } = PROFILE_STEPS || {};

  const { setProfileComplete, setOtpComplete } = useFarmer();
  const navigate = useNavigate();

  const { mutate: signupMutate, isPending } = useSignupMutation();

  // console.log(signup, "signup mutation");
=======
  const navigate = useNavigate();
  const { labels, descriptions } = PROFILE_STEPS || {};

  const { mutateAsync: signupMutate, isPending: isSignupPending } =
    useProfileMutation();
  const { mutateAsync: verifyOtpMutate, isPending: isOtpPending } =
    useOtpVerifyMutation();
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651

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
<<<<<<< HEAD
  console.log(values, "signup values");
=======
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651

  const nextStep = async () => {
    const stepFields = step === 0 ? PROFILE_FIELDS : OTP_FIELDS;
    const valid = await trigger(stepFields);

<<<<<<< HEAD
    if (step === 0 && valid && !otpSent) {
      const phone = watch("phone");
      if (phone) {
        console.log("OTP sent to phone:", phone);
        toast.info(`OTP sent to ${phone}`);
        setOtpSent(true);
      }
=======
    if (!valid) return;

    if (step === 0 && !otpSent) {
      try {
        const payload = {
          Email: values.email,
          FullName: values.fullName,
          Phone: values.phone,
          Password: values.password,
          ConfirmPassword: values.confirmPassword,
          Age: values.age,
          Gender: values.gender,
        };

        await signupMutate(payload);
        toast.success("Signup successful! OTP sent to your phone.");
        setOtpSent(true);
        setStep(1);
      } catch (error) {
        console.error("❌ Signup failed:", error);
        toast.error(error.response?.data?.message || "Signup failed");
      }
      return;
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
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

<<<<<<< HEAD
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
=======
    try {
      const payload = { phone: values.phone, otp: values.otp };
      await verifyOtpMutate(payload);
      toast.success("OTP verified successfully!");
      setItemsInLocalStorage("token", "signedUp");
      navigate("/login");
    } catch (error) {
      console.error("❌ OTP verification failed:", error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
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
<<<<<<< HEAD
              title="Farmer Registration"
=======
              title="User Registration"
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
              className="lg:text-4xl text-2xl font-bold text-center mb-0 text-[var(--color-black)]"
              centered
            />
          </div>
<<<<<<< HEAD
          <FormStepper activeStep={step} steps={labels} />

=======

          <FormStepper activeStep={step} steps={labels} />
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
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
<<<<<<< HEAD
              opacity: isPending ? 0.6 : 1,
              pointerEvents: isPending ? "none" : "auto",
=======
              opacity: isSignupPending || isOtpPending ? 0.6 : 1,
              pointerEvents: isSignupPending || isOtpPending ? "none" : "auto",
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
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
<<<<<<< HEAD
              isPending={isPending}
=======
              isPending={isSignupPending || isOtpPending}
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
            />
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
}
