import { otpValidator } from "@/utils/validators";
import { z } from "zod";

// export const otpSchema = z.object({
//   otp: z
//     .string()
//     .nonempty("Enter OTP")
//     .regex(/^\d{6}$/, "Invalid OTP format"),
// });
export const otpSchema = z.object({
  otp: otpValidator,
});
