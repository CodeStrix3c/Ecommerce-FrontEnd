import { useQuery } from "@tanstack/react-query";
import { getTransactionsApi } from "../services/transactionService";

export const useTransactions = (userId) =>
  useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactionsApi(userId),
    enabled: !!userId,
  });
