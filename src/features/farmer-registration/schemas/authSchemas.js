import { z } from "zod";

export const emailValidator = z
  .string({ required_error: "Email is required" })
  .nonempty("Email is required")
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email",
  });

export const passwordValidator = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
    "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
  );

export const phoneValidator = z
  .string()
  .regex(/^[0-9]{10}$/, "Enter your registered 10-digit phone number");

export const nameValidator = z.string().min(2, "Name is required");

export const fullNameValidator = z.string().min(2, "Full name is required");
export const otpValidator = z
  .string()
  .regex(/^[0-9]{6}$/, "Enter a valid 6-digit OTP");

export const loginPasswordValidator = z.string().min(1, "Password is required");

export const loginSchema = z.object({
  email: emailValidator,
  password: loginPasswordValidator,
});

export const phoneLoginSchema = z.object({
  phone: phoneValidator,
  password: loginPasswordValidator,
});

export const emailLoginSchema = z.object({
  email: emailValidator,
  password: loginPasswordValidator,
});

export const supplierLoginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const emailRegisterSchema = z
  .object({
    fullName: fullNameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const phoneRegisterSchema = z
  .object({
    fullName: fullNameValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const supplierRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
    contactPerson: nameValidator,
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(1, "Confirm password is required"),
    licenseNumber: z.string().min(3, "License number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    profilePic: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const farmerRegisterSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Enter your registered 10-digit phone number"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
        "Password must be at least 7 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    profilePic: z.any().optional(),

    farmName: z.string().min(1, "Farm / Orchard name is required"),
    farmSize: z
      .string()
      .min(1, "Farm size is required")
      .regex(/^[0-9]+$/, "Farm size must be a number (in kanals)"),
    mainCrops: z.string().min(1, "Please enter your main crops"),

    soilType: z.string().min(1, "Soil type is required"),
    irrigationMethod: z.string().min(1, "Irrigation method is required"),
    environmentalConditions: z
      .string()
      .min(1, "Environmental conditions are required"),

    farmMedia: z.any().optional(),

    village: z.string().min(1, "Village is required"),
    tehsil: z.string().min(1, "Tehsil is required"),
    district: z.string().min(1, "District is required"),
    state: z.string().min(1, "State is required"),
    pincode: z
      .string()
      .min(4, "Pin code is required")
      .regex(/^[0-9]+$/, "Pin code must be numeric"),
    gps: z.string().optional(),
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

export const profileUpdateSchema = z
  .object({
    fullName: fullNameValidator,
    phone: phoneValidator,
    email: emailValidator,
    password: passwordValidator.optional(),
    confirmPassword: z.string().optional(),
    profilePic: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );
export const registerSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );
