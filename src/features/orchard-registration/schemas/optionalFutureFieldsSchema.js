import { z } from "zod";

export const optionalFutureFieldsSchema = z.object({
  governmentSchemes: z.string().optional(), // optional text field
  fpoMembership: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().optional()
  ),
  certification: z.string().optional(),
  digitalToolsUsed: z.string().optional(),
});
