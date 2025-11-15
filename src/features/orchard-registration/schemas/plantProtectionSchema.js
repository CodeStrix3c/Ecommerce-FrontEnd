import { z } from "zod";

export const plantProtectionSchema = z.object({
  diseaseHistory: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select disease history")
  ),

  pestHistory: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select pest history")
  ),

  spraySchedule: z
    .preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string()
    )
    .optional(),

  cropInsuranceCoverage: z.preprocess(
    (val) => (val === undefined || val === null ? "" : val),
    z.string().nonempty("Select crop insurance coverage option")
  ),
});
