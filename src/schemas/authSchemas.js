import { z } from 'zod';

export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const emailLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const emailRegisterSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const phoneRegisterSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
