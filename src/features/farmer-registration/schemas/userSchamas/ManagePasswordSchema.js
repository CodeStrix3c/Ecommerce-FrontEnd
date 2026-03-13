import { z } from "zod";

export const ManageAddressSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  addressLine1: z.string().min(5, "Address Line 1 is required"),

  addressLine2: z.string().optional(),

  country: z
    .string()
    .min(1, "Country is required")
    .transform((val) => Number(val)),

  state: z
    .string()
    .min(1, "State is required")
    .transform((val) => Number(val)),

  district: z
    .string()
    .min(1, "District is required")
    .transform((val) => Number(val)),

  city: z.string().min(2, "City is required"),

  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});