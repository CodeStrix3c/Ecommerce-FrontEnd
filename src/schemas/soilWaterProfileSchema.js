import { z } from "zod";

export const soilWaterProfileSchema = z
  .object({
    // Soil Type
    soilType: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Soil type is required")
    ),

    // Soil Test Records (optional individually, but validated later)
    pH: z.coerce
      .number({ invalid_type_error: "Enter a valid number" })
      .optional(),
    N: z.coerce
      .number({ invalid_type_error: "Enter a valid number" })
      .optional(),
    P: z.coerce
      .number({ invalid_type_error: "Enter a valid number" })
      .optional(),
    K: z.coerce
      .number({ invalid_type_error: "Enter a valid number" })
      .optional(),
    organicCarbon: z.coerce
      .number({ invalid_type_error: "Enter a valid number" })
      .optional(),
    micronutrients: z.string().optional(),

    // Soil Health
    soilHealthStatus: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Soil health status is required")
    ),

    // Date
    lastSoilTestDate: z.string().nonempty("Last Soil Test Date is required"),

    // Water Source
    waterSource: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Water source is required")
    ),

    // Irrigation
    irrigationMethod: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Irrigation method is required")
    ),

    // Water Availability
    waterAvailability: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Water availability is required")
    ),

    // File Upload
    soilTestReport: z.any().optional(),
  })
  .refine(
    (data) => {
      const hasValues =
        data.pH ||
        data.N ||
        data.P ||
        data.K ||
        data.organicCarbon ||
        (data.micronutrients && data.micronutrients.trim() !== "");

      const hasFile = data.soilTestReport instanceof File;

      return hasValues || hasFile;
    },
    {
      // message:"
      // Provide soil test values or upload a report. At least one option is required.",
      message: " ",
      path: ["soilTestReport"], // attach error to report field (can also use ["pH"] if you want top inputs to highlight)
    }
  );
