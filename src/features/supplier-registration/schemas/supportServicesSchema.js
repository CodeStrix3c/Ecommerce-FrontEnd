import { z } from "zod";

export const supportServicesSchema = z
  .object({
    advisorySupport: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Agronomy Advisory Support is required")
    ),
    fieldStaffAvailable: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Field Staff availability is required")
    ),
    fieldStaffCount: z
      .union([z.string(), z.number()])
      .optional()
      .refine(
        (val) => val === undefined || val === "" || !isNaN(Number(val)),
        "Field staff count must be a number"
      ),
    afterSalesService: z
      .string()
      .min(1, "After-Sales Service details are required"),
    deliveryRange: z
      .string()
      .min(1, "Delivery area range is required")
      .regex(/^\d+$/, "Delivery range must be a number"),
    computerAvailable: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Computer/Laptop availability is required")
    ),
    vehicleAvailable: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Vehicle availability is required")
    ),
  })
  .superRefine((data, ctx) => {
    if (data.fieldStaffAvailable === "yes") {
      if (
        data.fieldStaffCount === undefined ||
        data.fieldStaffCount === "" ||
        isNaN(Number(data.fieldStaffCount))
      ) {
        ctx.addIssue({
          path: ["fieldStaffCount"],
          code: "custom",
          message: "Number of Field Staff is required",
        });
      }
    }
  });
