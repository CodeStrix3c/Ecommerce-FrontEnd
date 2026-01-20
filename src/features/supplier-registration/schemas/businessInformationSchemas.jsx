import { z } from "zod";

export const businessInformationSchema = z.object({
  businessName: z.string().min(1, "Business Name is Required"),
  slug: z.string().min(1, "Slug Name is Required"),
  description: z.string().min(1, "Description is Required"),
  businessEmail: z.string().email("Enter a valid business email"),

  // OPTIONAL user email
  userEmail: z
    .string()
    .email("Enter a valid user email")
    .optional()
    .or(z.literal("")),

  // ownerName: z.string().min(1, "Owner/Proprietor name is required"),
  // primaryContact: z
  //   .string()
  //   .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  // alternateContact: z
  //   .string()
  //   .regex(/^[0-9]{10}$/, "Enter a valid 10-digit number")
  //   .optional()
  //   .or(z.literal("")),
  // businessAddressVillage: z.string().min(1, "Village is required"),
  // businessAddressTehsil: z.string().min(1, "Tehsil is required"),
  // businessAddressDistrict: z.string().min(1, "District is required"),
  // businessAddressState: z.string().min(1, "State is required"),
  // businessAddressPincode: z.coerce
  //   .number({ invalid_type_error: "Enter a 6-digit PIN" })
  //   .min(100000)
  //   .max(999999),
  // gps: z.string().min(1, "GPS location is required"),
});
