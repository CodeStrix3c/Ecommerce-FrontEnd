// schemas/demographicsSchema.ts
import { z } from "zod";

export const demographicsSchema = z.object({
  farmName: z.string().min(2, "Farm name is required"),
  farmSize: z.string().min(1, "Farm size is required"),
  mainCrops: z.string(z.string()).min(1, "Select at least one crop"),
});
