import { createOrder } from "@/services/Order/orderservices";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
