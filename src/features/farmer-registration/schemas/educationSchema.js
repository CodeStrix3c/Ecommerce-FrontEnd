import { z } from "zod";

export const educationSchema = z.object({
  highestQualification: z.string().min(1, "Highest qualification is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  passingYear: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .min(1, "Year of passing is required"),
  specialization: z.string().optional(),
});
