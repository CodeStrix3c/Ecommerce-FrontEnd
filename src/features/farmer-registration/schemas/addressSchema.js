// schemas/addressSchema.js
import { z } from "zod";

export const addressSchema = z.object({
  contactName: z
    .string()
    .min(1, "Full name is required"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  country: z
    .string()
    .min(1, "Country is required"),

  state: z
    .string()
    .min(1, "State is required"),

  district: z
    .string()
    .min(1, "District is required"),

  city: z
    .string()
    .min(1, "City is required"),

  addressLine1: z
    .string()
    .min(1, "Address is required"),

  addressLine2: z
    .string()
    .optional(),

  zipCode: z
    .string()
    .min(6, "Please enter a valid 6-digit PIN Code.”.")
    .max(6, "Please enter a valid 6-digit PIN Code.”."),
});