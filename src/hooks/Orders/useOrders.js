import { createOrder, getOrders } from "@/services/Order/orderservices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
};
