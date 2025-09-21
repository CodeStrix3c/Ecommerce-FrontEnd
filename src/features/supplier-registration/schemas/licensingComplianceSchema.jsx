import { z } from "zod";

export const licensingComplianceSchema = z.object({
  dealerLicenseNumber: z.string().min(1, "Required Field"),

  licenseValidityStart: z
    .string()
    .min(1, "License validity start date is required"),

  licenseValidityEnd: z.string().min(1, "License expiry date is required"),

  licenseCopy: z
    .any()
    .refine(
      (file) =>
        file instanceof File || (Array.isArray(file) && file.length > 0),
      "License copy is required"
    )
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ["application/pdf", "image/jpeg", "image/png"].includes(file.type)),
      "Only PDF or JPEG/PNG files are allowed"
    ),

  gstNumber: z
    .string()
    .regex(/^[0-9]{15}$/, "GST must be a valid 15-digit number")
    .optional()
    .or(z.literal("")),

  pan: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN format (e.g., ABCDE1234F)"
    )
    .optional()
    .or(z.literal("")),
});
