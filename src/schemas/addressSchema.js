// schemas/addressSchema.ts
import { z } from "zod";

export const addressSchema = z.object({
  village: z.string().min(1, "Village is required"),
  tehsil: z.string().min(1, "Tehsil is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  gps: z.string().optional(),
});
