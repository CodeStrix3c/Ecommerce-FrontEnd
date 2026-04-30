import { useMutation } from "@tanstack/react-query";
import { releasePaymentApi } from "../services/transactionService";

export const useReleasePayment = () =>
  useMutation({
    mutationFn: releasePaymentApi,
  });
