import { z } from "zod";

export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailLoginSchema = z.object({
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailRegisterSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const phoneRegisterSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const supplierRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
    contactPerson: z.string().min(2, "Contact person is required"),
    email: z.string().z.email("Invalid email"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
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

export const supplierLoginSchema = z.object({
  email: z.string().z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
