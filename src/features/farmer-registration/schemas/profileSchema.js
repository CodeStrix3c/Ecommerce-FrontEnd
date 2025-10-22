import { z } from "zod";
import { emailValidator } from "./authSchemas";

export const profileSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Enter your registered 10-digit phone number"),
    email: emailValidator,
    age: z.coerce
      .number({ invalid_type_error: "Age is required" })
      .min(1, "Age is required"),
    gender: z.preprocess(
      (val) => (val === undefined ? "" : val),
      z.string().nonempty("Gender is required")
    ),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
        "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    profilePic: z.any().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
