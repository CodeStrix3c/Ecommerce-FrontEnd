import { z } from "zod";

export const professionSchema = z.object({
  professionType: z.string().min(1, "Profession/Occupation is required"),
  organizationName: z.string().min(1, "Organization name is required"),
  designation: z.string().min(1, "Designation is required"),
  experienceYears: z
    .string()
    .regex(/^\d+$/, "Enter valid years of experience")
    .min(1, "Years of experience is required"),
  skills: z.string().optional(),
});
