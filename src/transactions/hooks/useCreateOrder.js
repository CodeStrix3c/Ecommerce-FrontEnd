import { useMutation } from "@tanstack/react-query";
import { createOrderApi } from "../services/transactionService";

export const useCreateOrder = () =>
  useMutation({
    mutationFn: createOrderApi,
  });
