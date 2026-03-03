import React, { useEffect, useRef, useState } from "react";
import FormLayout from "@/components/shared/FormLayout";
import Button from "@mui/material/Button";

export default function OtpVerificationSection({
  register,
  errors,
  onResend,
  setValue,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const inputsRef = useRef([]);

  /* =========================
     COUNTDOWN TIMER
     ========================= */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  /* =========================
     HANDLE OTP CHANGE
     ========================= */
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // combine & set to react-hook-form
    setValue("otp", newOtp.join(""));

    // move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* =========================
     RESEND OTP
     ========================= */
  const handleResend = async () => {
    await onResend();
    setTimeLeft(120); // restart timer
  };

  return (
    <>
      <p className="text-[var(--color-secondary)] mb-4 ">
        OTP expires in{" "}
        <span className="font-medium text-black">{formatTime()}</span>
      </p>

      <FormLayout>
        <div className="flex flex-col items-center w-full gap-4">
          {/* OTP Inputs */}
          <div className="flex gap-3 justify-center ">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}

          {/* Resend Section */}
          {timeLeft === 0 ? (
            <Button
              variant="text"
              onClick={handleResend}
              sx={{ textTransform: "none" }}
            >
              Resend OTP
            </Button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend available in {formatTime()}
            </p>
          )}
        </div>
      </FormLayout>
    </>
  );
}
