import { z } from "zod";

export const inputCostDetailsSchema = z.object({
  pesticideSupplierLocation: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Pesticide supplier location is required")
  ),

  paymentType: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Payment type is required")
  ),

  creditPeriod: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Credit period is required")
  ),
});
