import { z } from "zod";

export const addressSchema = z.object({
  contactName: z.string().min(1, "Full name is required"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),

  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),

  // Address Line 1: Required + 800 char limit
  addressLine1: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address Line 1 cannot exceed 200 characters"),

  // Address Line 2: Optional + 800 char limit
  addressLine2: z
    .string()
    .max(200, "Address Line 2 cannot exceed 200 characters")
    .optional()
    .or(z.literal("")),

  zipCode: z.string().length(6, "Please enter a valid 6-digit PIN Code"),
});
