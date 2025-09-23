import { z } from "zod";

export const cropNutritionSchema = z.object({
  fertilizerPractices: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select fertilizer practice")
  ),

  fertigationFacilities: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select fertigation facility option")
  ),

  nutritionPlan: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().min(1, "Enter nutrition plan or write 'None'")
  ),

  mulching: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select mulching option")
  ),

  lastFertiliserApplicationDate: z
    .string()
    .nonempty("Select last fertiliser application date"),

  fertiliserApplicationMode: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select mode of fertiliser application")
  ),
});
