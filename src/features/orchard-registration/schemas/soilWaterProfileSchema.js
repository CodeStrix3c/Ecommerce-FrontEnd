import { z } from "zod";

export const soilWaterProfileSchema = z
  .object({
    soilType: z.preprocess(
      (val) => (val == null ? "" : val),
      z.string().nonempty("Soil type is required")
    ),
    pH: z.union([z.string(), z.number()]).optional(),
    N: z.union([z.string(), z.number()]).optional(),
    P: z.union([z.string(), z.number()]).optional(),
    K: z.union([z.string(), z.number()]).optional(),
    organicCarbon: z.union([z.string(), z.number()]).optional(),
    micronutrients: z.string().optional(),
    soilHealthStatus: z.preprocess(
      (val) => (val == null ? "" : val),
      z.string().nonempty("Soil health status is required")
    ),
    lastSoilTestDate: z.string().nonempty("Last Soil Test Date is required"),
    waterSource: z.preprocess(
      (val) => (val == null ? "" : val),
      z.string().nonempty("Water source is required")
    ),
    irrigationMethod: z.preprocess(
      (val) => (val == null ? "" : val),
      z.string().nonempty("Irrigation method is required")
    ),
    waterAvailability: z.preprocess(
      (val) => (val == null ? "" : val),
      z.string().nonempty("Water availability is required")
    ),
    soilTestReport: z.any().optional(),
  })
  .refine(
    (data) => {
      const numericFields = [
        data.pH,
        data.N,
        data.P,
        data.K,
        data.organicCarbon,
        data.micronutrients,
      ];

      const anyNumericFilled = numericFields.some(
        (val) => val !== undefined && val !== null && val !== ""
      );
      const allNumericFilled = numericFields.every(
        (val) => val !== undefined && val !== null && val !== ""
      );

      const hasFile = data.soilTestReport instanceof File;

      // Either file uploaded OR all numeric fields filled
      return hasFile || allNumericFilled || (!anyNumericFilled && !hasFile)
        ? hasFile || allNumericFilled
        : false;
    },
    {
      message: "Either fill all soil test values or upload a soil test report.",
      path: ["soilTestReport"],
    }
  );
