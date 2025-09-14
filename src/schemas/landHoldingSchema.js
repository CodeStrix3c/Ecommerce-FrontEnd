// schemas/landSchema.ts
import { z } from "zod";

export const landSchema = z.object({
  soilType: z.string().min(1, "Soil type is required"),
  irrigationMethod: z.string().min(1, "Irrigation method is required"),
  environmentalConditions: z.string().min(1, "Conditions are required"),
  landTopography: z.string().optional(),
});
