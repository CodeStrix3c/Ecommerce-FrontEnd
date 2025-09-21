import { z } from "zod";

export const plantProtectionSchema = z.object({
  diseaseHistory: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select disease history")
  ),

  // Pest History (multi-select)
  pestHistory: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select pest history")
  ),

  // Spray Schedule (optional text field)
  spraySchedule: z
    .preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string()
    )
    .optional(),

  // Crop Insurance Coverage (Yes/No required)
  cropInsuranceCoverage: z.preprocess(
    (val) => (val === undefined || val === null ? "" : val),
    z.string().nonempty("Select crop insurance coverage option")
  ),
});
