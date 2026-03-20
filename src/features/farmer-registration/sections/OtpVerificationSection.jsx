import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

export default function OtpVerificationSection({
  register,
  errors,
  onResend,
  setValue,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef([]);

  /* =========================
     REGISTER OTP FIELD (IMPORTANT)
  ========================= */
  useEffect(() => {
    register("otp");
  }, [register]);

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

    const joinedOtp = newOtp.join("");

    // ✅ Update form value + trigger validation
    setValue("otp", joinedOtp, {
      shouldValidate: true,
    });

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* =========================
     RESEND OTP
  ========================= */
  const handleResend = async () => {
    await onResend();
    setTimeLeft(120);
    setOtp(["", "", "", "", "", ""]);

    setValue("otp", "", {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex items-start justify-center px-4">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-4 mt-[-20px]">

        <p className="text-gray-600 text-sm -m-14 mb-2">
          Enter the 6-digit verification code sent to your registered <br />
          mobile number to continue.
        </p>

        {/* TIMER */}
        <p className="text-sm text-gray-500">
          OTP expires in{" "}
          <span className="font-semibold text-black">{formatTime()}</span>
        </p>

        {/* OTP INPUTS */}
        <div className="flex gap-3 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-400 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          ))}
        </div>

        {/* ERROR */}
        {errors?.otp && (
          <p className="text-red-500 text-sm">
            {errors.otp.message}
          </p>
        )}

        {/* RESEND */}
        {timeLeft === 0 ? (
          <Button
            variant="text"
            onClick={handleResend}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              color: "#2563eb",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Didn't receive the code? Resend OTP
          </Button>
        ) : (
          <p className="text-sm text-gray-600">
            Didn’t receive the code?{" "}
            <span className="text-[var(--color-primary)] font-medium">
              Resend in {formatTime()}
            </span>
          </p>
        )}

      </div>
    </div>
  );
}