import { z } from "zod";

export const assignProductSchema = z
  .object({
    price: z.coerce
      .number({
        invalid_type_error: "Price is required",
      })
      .min(1, "Price must be greater than 0"),

    discountPrice: z.coerce
      .number({
        invalid_type_error: "Discount price must be a number",
      })
      .optional(),

    quantity: z.coerce
      .number({
        invalid_type_error: "Quantity is required",
      })
      .min(1, "Quantity must be at least 1"),

    isActive: z.boolean(),
  })
  .refine((data) => !data.discountPrice || data.discountPrice <= data.price, {
    path: ["discountPrice"],
    message: "Discount price cannot be greater than price",
  });
