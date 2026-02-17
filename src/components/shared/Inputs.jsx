import { Controller, useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Inputs({
  name,
  label,
  type = "text", // phone | age | number | text | password | email | otp | textarea
  errors,
  required = false,
  countryCode = "+91",
  placeholder = label,
  disabled = false,
  rows = 4,
}) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const otpRefs = useRef([]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        const value = field.value || "";
        const hasError = !!errors;

        /* ================= OTP HANDLING ================= */
        const handleOtpChange = (e, index) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 1);

          const otpArray = value.split("");
          otpArray[index] = val;

          const otpValue = otpArray.join("").slice(0, 6);
          field.onChange(otpValue);

          if (val && index < 5) {
            otpRefs.current[index + 1]?.focus();
          }
        };

        const handleOtpKeyDown = (e, index) => {
          if (e.key === "Backspace" && !value[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
          }
        };

        /* ================= NORMAL INPUT ================= */
        const handleChange = (e) => {
          let input = e.target.value;

          if (type === "phone") input = input.replace(/\D/g, "").slice(0, 10);
          if (type === "age") input = input.replace(/\D/g, "").slice(0, 3);
          if (type === "pincode") input = input.replace(/\D/g, "").slice(0, 6);

          if (type === "bankaccount") {
            input = input.replace(/\D/g, "").slice(0, 18);
          }

          if (type === "gst") {
            input = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
          }

          if (type === "number") {
            input = input.replace(/[^0-9.]/g, "");
            const parts = input.split(".");
            if (parts.length > 2) input = parts[0] + "." + parts[1];
          }

          if (type === "text") {
            input = input.slice(0, 32);
            input = input.replace(/[^a-zA-Z0-9\s,./-]/g, "");
          }

          if (type === "email") {
            input = input
              .replace(/[^a-zA-Z0-9@._-]/g, "")
              .replace(/@(?=.*@)/g, "")
              .slice(0, 50);
          }

          if (type === "address") {
            input = input.replace(/[^a-zA-Z0-9\s,./-]/g, "").slice(0, 120);
          }

          if (type === "textarea") {
            input = input.slice(0, 300);
          }

          if (type === "branchname") {
            input = input
              .replace(/[^a-zA-Z0-9\s,./-]/g, "")
              .replace(/\s+/g, " ")
              .slice(0, 32);
          }

          if (type === "licence") {
            input = input
              .toUpperCase()
              .replace(/[^A-Z0-9/-]/g, "")
              .replace(/[-/]{2,}/g, (m) => m[0])
              .slice(0, 24);
          }

          if (type === "pan") {
            input = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
          }

          if (type === "ifsc") {
            input = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
          }

          if (type === "password") {
            input = input.slice(0, 24);
          }

          if (type === "name") {
            input = input
              .replace(/[^a-zA-Z\s]/g, "")
              .replace(/\s+/g, " ")
              .slice(0, 30);
          }

          field.onChange(input);
        };

        const inputType =
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type === "email"
            ? "email"
            : "text";

        return (
          <div className="flex flex-col gap-1.5 w-full">
            {/* Label */}
            <label className="text-sm font-medium text-black">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {/* ================= OTP ================= */}
            {type === "otp" ? (
              <div className="flex justify-between">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-12 h-12 text-center text-lg rounded-lg outline-none"
                    style={{
                      border: `1px solid ${
                        hasError
                          ? "var(--color-error)"
                          : "rgba(0,0,0,0.4)"
                      }`,
                    }}
                  />
                ))}
              </div>
            ) : (
              /* ================= INPUT / TEXTAREA ================= */
              <div
                className="flex items-center w-full rounded-[10px] overflow-hidden"
                style={{
                  minHeight: type === "textarea" ? "auto" : 52,
                  backgroundColor: disabled
                    ? "#f5f5f5"
                    : "var(--color-white)",
                  opacity: disabled ? 0.7 : 1,
                  border: `1px solid ${
                    hasError
                      ? "var(--color-error)"
                      : "rgba(0,0,0,0.4)"
                  }`,
                }}
              >
                {type === "phone" && (
                  <span className="pl-2 text-gray-500 font-medium">
                    {countryCode}
                  </span>
                )}

                {type === "textarea" ? (
                  <textarea
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    rows={rows}
                    disabled={disabled}
                    className="flex-1 px-2 py-2 outline-none bg-transparent resize-none"
                  />
                ) : (
                  <input
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    disabled={disabled}
                    className="flex-1 px-2 outline-none bg-transparent"
                  />
                )}

                {type === "password" && !disabled && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 text-gray-500"
                  >
                    {!showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Error */}
            {hasError && (
              <span className="text-xs text-red-500">
                {errors?.message || errors}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
