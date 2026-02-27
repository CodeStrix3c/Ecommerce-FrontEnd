import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .refine(
        (value) => {
          const isValid =
            value.length >= 7 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[@$!%*?&]/.test(value);

          return isValid;
        },
        {
          message:
            "Password must be at least 7 characters and include uppercase, lowercase, number and special character",
        }
      ),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });