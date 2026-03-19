import {
  forgotPassword,
  verifyOtpResetPassword,
} from "@/services/User/ForgotPassword/forgotPasswordServices";
import { useMutation } from "@tanstack/react-query";

// Send OTP
export const useSendOtpMutations = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// Verify OTP & Reset Password
export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: verifyOtpResetPassword,
  });
};
