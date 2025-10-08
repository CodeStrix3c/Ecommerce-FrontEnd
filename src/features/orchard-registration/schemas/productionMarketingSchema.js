import { z } from "zod";

export const productionMarketingSchema = z.object({
  averageAnnualYield: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .min(1, "Average annual yield is required"),

  peakHarvestSeason: z.string().min(1, "Peak harvest season is required"),

  sellingPreference: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Selling preference is required")
  ),

  buyerDetails: z.string().optional(), // optional field for future linkage
});
