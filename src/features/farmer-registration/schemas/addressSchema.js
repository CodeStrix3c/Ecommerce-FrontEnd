import { z } from "zod";

export const shippingAddressSchema = z.object({
  contactName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      "Enter a valid phone number",
    ),

  country: z.string().min(1, "Country is required"),

  // ✅ FIXED HERE
  state: z.coerce.number().min(1, "State/Province is required"),

  // ✅ FIXED HERE
  district: z.coerce.number().min(1, "District is required"),

  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be less than 100 characters"),

  zipCode: z
    .string()
    .min(1, "Postal/ZIP code is required")
    .regex(/^[0-9]{5,10}$/, "Enter a valid postal/ZIP code (5-10 digits)"),

  addressLine1: z
    .string()
    .min(1, "Address line 1 is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),

  addressLine2: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),
});
