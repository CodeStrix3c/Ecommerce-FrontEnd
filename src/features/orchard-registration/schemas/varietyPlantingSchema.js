import { z } from "zod";

export const varietyPlantingSchema = z.object({
  varietiesPlanted: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).nonempty("Select at least one variety")
  ),
  totalTrees: z.coerce
    .number({ invalid_type_error: "Enter total number of trees" })
    .min(1, "Total number of trees is required"),

  treesPerVariety: z.coerce
    .number({ invalid_type_error: "Enter number of trees per variety" })
    .min(1, "Number of trees per variety is required"),

  rootstock: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select a rootstock")
  ),

  plantDensity: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Select plant density")
  ),

  ageUnder5: z.coerce
    .number({ invalid_type_error: "Enter number of trees per variety" })
    .min(1, "Required Field"),

  age5to10: z.coerce
    .number({ invalid_type_error: "Enter number of trees per variety" })
    .min(1, "Required Field"),

  ageAbove10: z.coerce
    .number({ invalid_type_error: "Enter number of trees per variety" })
    .min(1, "Required Field"),
});
