// useStepNavigation.ts
import { useState } from "react";

export const useStepNavigation = (stepLabels, watch, trigger, setValue) => {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const nextStep = async () => {
    const stepFieldsMap = [
      ["fullName", "phone", "email", "password", "confirmPassword"],
      ["farmName", "farmSize", "mainCrops"],
      [
        "soilType",
        "irrigationMethod",
        "environmentalConditions",
        "farmLocation",
      ],
      ["village", "tehsil", "district", "state", "pincode"],
      ["otp"],
    ];

    const valid = await trigger(stepFieldsMap[step]);

    if (step === 0 && valid && !otpSent) {
      const phone = watch("phone");
      if (phone) {
        console.log("OTP generated for phone:", phone);
        setOtpSent(true);
      }
    }

    if (valid) setStep((s) => Math.min(stepLabels.length - 1, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setValue("gps", `${pos.coords.latitude},${pos.coords.longitude}`, {
          shouldValidate: true,
        }),
      () => alert("Unable to retrieve location")
    );
  };

  return { step, nextStep, prevStep, detectLocation, otpSent };
};
