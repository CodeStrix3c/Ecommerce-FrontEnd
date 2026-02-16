// validations/userProfileSchema.js

import { z } from "zod";

export const userProfileSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    email: z.string().email("Invalid email").optional().or(z.literal("")),

    phone: z.string().min(10, "Phone number must be 10 digits"),

    age: z.coerce.number().min(18, "Minimum age is 18").max(100, "Invalid age"),

    gender: z.string().min(1, "Gender is required"),

    profilePic: z.any().optional(),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
