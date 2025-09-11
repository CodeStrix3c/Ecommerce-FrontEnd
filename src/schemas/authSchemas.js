import { z } from "zod";

// ----------------------
// Reusable validators
// ----------------------
export const emailValidator = z.email("Invalid email");

export const passwordValidator = z
  .string()
  .min(7)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
    "Must have upper, lower, number & special (min 7 chars)"
  );

export const phoneValidator = z
  .string()
  .regex(/^[0-9]{10}$/, "Phone must be 10 digits");

export const nameValidator = z.string().min(2, "Name is required");

export const fullNameValidator = z.string().min(2, "Full name is required");

// ----------------------
// Login Schemas
// ----------------------
export const phoneLoginSchema = z.object({
  phone: phoneValidator,
  password: passwordValidator,
});

export const emailLoginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const supplierLoginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

// ----------------------
// Register Schemas
// ----------------------
export const emailRegisterSchema = z.object({
  fullName: fullNameValidator,
  email: emailValidator,
  password: passwordValidator,
});

export const phoneRegisterSchema = z.object({
  fullName: fullNameValidator,
  phone: phoneValidator,
  password: passwordValidator,
});

export const supplierRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
    contactPerson: nameValidator,
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(6, "Confirm password is required"),
    licenseNumber: z.string().min(3, "License number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const farmerRegisterSchema = z
  .object({
    // Personal details
    fullName: fullNameValidator.min(1, "Full name is required"),
    phone: phoneValidator.min(1, "Phone number is required"),
    email: emailValidator.min(1, "Email is required"),
    password: passwordValidator.min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),

    // Farm details
    farmName: z.string().min(1, "Farm / Orchard name is required"),
    farmSize: z
      .string()
      .min(1, "Farm size is required")
      .regex(/^[0-9]+$/, "Farm size must be a number (in acres/hectares)"),
    mainCrops: z.string().min(1, "Please enter your main crops"),

    // Land details
    soilType: z.string().min(1, "Soil type is required"),
    irrigationMethod: z.string().min(1, "Irrigation method is required"),
    environmentalConditions: z
      .string()
      .min(1, "Environmental conditions are required"),
    farmLocation: z.string().min(1, "Farm location is required"),

    // Optional: file upload (not strictly validated, but can check type/size if needed)
    farmMedia: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
