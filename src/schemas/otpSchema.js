// schemas/otpSchema.ts
import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});
