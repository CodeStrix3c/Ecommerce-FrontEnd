import { z } from "zod";

export const productPortfolioSchema = z.object({
  inputsSold: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).nonempty("Select at least one input")
  ),

  majorBrands: z.string().min(1, "Major brands stocked are required"),

  otherInputs: z
    .array(
      z.object({
        name: z.string().min(1, "Input name is required"),
        stock: z.preprocess(
          (val) => (val === "" ? undefined : Number(val)), // convert string → number
          z
            .number({ invalid_type_error: "Enter stock as a number" })
            .min(0, "Stock cannot be negative")
        ),
      })
    )
    .optional(),

  storageCapacity: z.string().optional(),
});

