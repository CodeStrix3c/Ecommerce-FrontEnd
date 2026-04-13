import { z } from "zod";

export const forgotPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10 digit phone number"),
});

export const verifyOtpSchema = z
  .object({
    otp: z.string().regex(/^\d{6}$/, "Please enter a valid 6 digit OTP"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
