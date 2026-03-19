import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useZodForm(schema, options = {}) {
  return useForm({
    ...(schema ? { resolver: zodResolver(schema) } : {}),

    mode: "onSubmit",
    reValidateMode: "onChange",

    // Important: ensure fields are never undefined
    defaultValues: {
      phoneNumber: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
      ...(options.defaultValues || {}),
    },

    ...options,
  });
}
