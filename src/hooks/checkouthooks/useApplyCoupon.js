import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "@/services/checkoutservices/applyCoupon";

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: applyCoupon,
  });
};
