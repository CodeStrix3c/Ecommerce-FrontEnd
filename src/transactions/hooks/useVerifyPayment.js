import { useMutation } from "@tanstack/react-query";
import { verifyPaymentApi } from "../services/transactionService";

export const useVerifyPayment = () =>
  useMutation({
    mutationFn: verifyPaymentApi,
  });
