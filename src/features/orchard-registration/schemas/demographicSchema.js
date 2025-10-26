import { z } from "zod";

export const demographicsSchema = z.object({
  plantationPattern: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Required Field")
  ),
  ownershipType: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Required Field")
  ),
  orchardName: z.string().min(1, "Orchard name is required"),

  orchardSizeKanals: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .min(1, "Size (Kanals) is required"),

  orchardSizeMarlas: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .min(1, "Size (Marlas) is required"),

  establishmentYear: z.coerce
    .number({ invalid_type_error: "Enter a year" })
    .min(1900, "Enter valid year")
    .max(new Date().getFullYear(), "Cannot be in future"),

  orchardDistrict: z.string().min(1, "District is required"),
  orchardTehsil: z.string().min(1, "Tehsil is required"),
  orchardZone: z.string().min(1, "Zone is required"),

  orchardPincode: z.coerce
    .number({ invalid_type_error: "Enter a 6-digit PIN" })
    .min(100000, "PIN must be 6 digits")
    .max(999999, "PIN must be 6 digits"),

  // gps: z.string().min(1, "GPS location is required"),
});
