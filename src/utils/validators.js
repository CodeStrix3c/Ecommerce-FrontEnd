import { z } from "zod";

export const emailValidator = z
  .string()
  .optional()
  .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email",
  });

export const passwordValidator = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
    "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
  );

export const phoneValidator = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .regex(/^[0-9]{10}$/, "Enter your registered 10-digit phone number");

export const nameValidator = z.string().min(2, "Name is required");

export const fullNameValidator = z.string().min(2, "Full name is required");

export const otpValidator = z
  .string()
  .min(1, "OTP is required") // ✅ handles empty
  .regex(/^[0-9]{6}$/, "Enter a valid 6-digit OTP");

export const loginPasswordValidator = z.string().min(1, "Password is required");
