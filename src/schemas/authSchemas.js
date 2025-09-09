import { z } from "zod";

// ----------------------
// Reusable validators
// ----------------------
export const emailValidator = z.email("Invalid email");

export const passwordValidator = z
  .string()
  .min(6, "Password must be at least 6 characters");

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
<<<<<<< HEAD
  email: emailValidator,
  password: passwordValidator,
=======
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
>>>>>>> 5cb6be1f4bad3944ae7d1f530e39e9e6bf842794
});

export const supplierLoginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

// ----------------------
// Register Schemas
// ----------------------
export const emailRegisterSchema = z.object({
<<<<<<< HEAD
  fullName: fullNameValidator,
  email: emailValidator,
  password: passwordValidator,
=======
  fullName: z.string().min(2, "Name is required"),
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
>>>>>>> 5cb6be1f4bad3944ae7d1f530e39e9e6bf842794
});

export const phoneRegisterSchema = z.object({
  fullName: fullNameValidator,
  phone: phoneValidator,
  password: passwordValidator,
});

export const supplierRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
<<<<<<< HEAD
    contactPerson: nameValidator,
    email: emailValidator,
    phone: phoneValidator,
    password: passwordValidator,
=======
    contactPerson: z.string().min(2, "Contact person is required"),
    email: z.string().z.email("Invalid email"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
>>>>>>> 5cb6be1f4bad3944ae7d1f530e39e9e6bf842794
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
<<<<<<< HEAD
=======

export const supplierLoginSchema = z.object({
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
>>>>>>> 5cb6be1f4bad3944ae7d1f530e39e9e6bf842794
