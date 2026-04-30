import { useQuery } from "@tanstack/react-query";
import { getTransactionByIdApi } from "../services/transactionService";

export const useTransactionById = (id) =>
  useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionByIdApi(id),
    enabled: !!id,
  });
