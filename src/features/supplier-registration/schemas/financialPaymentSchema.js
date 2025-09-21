import { z } from "zod";

export const financialPaymentSchema = z
  .object({
    sellingViaZiraat: z.boolean(),
    bankDetails: z
      .object({
        accountHolder: z.string().min(1, "Account Holder Name is required"),
        accountNumber: z
          .string()
          .regex(/^[0-9]{9,18}$/, "Enter a valid Account Number"),
        ifsc: z
          .string()
          .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC Code"),
        bankName: z.string().min(1, "Bank Name is required"),
        branchName: z.string().min(1, "Branch Name is required"),
      })
      .optional(),

    upiAvailable: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Select if UPI/Digital Payment is available")
    ),
    creditFacility: z.preprocess(
      (val) => (val === undefined || val === null ? "" : val),
      z.string().nonempty("Select if Credit Facility is available")
    ),
  })
  .superRefine((data, ctx) => {
    if (data.sellingViaZiraat) {
      if (!data.bankDetails) {
        ctx.addIssue({
          path: ["bankDetails"],
          code: "custom",
          message: "Bank details are required if selling via ZIRAAT",
        });
      } else {
        // Check each field in bankDetails
        for (const key of [
          "accountHolder",
          "accountNumber",
          "ifsc",
          "bankName",
          "branchName",
        ]) {
          if (
            !data.bankDetails[key] ||
            (typeof data.bankDetails[key] === "string" &&
              data.bankDetails[key].trim() === "")
          ) {
            ctx.addIssue({
              path: ["bankDetails", key],
              code: "custom",
              message: `${key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())} is required`,
            });
          }
        }
      }
    }
  });
