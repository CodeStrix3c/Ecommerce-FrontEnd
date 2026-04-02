import { useMutation, useQuery } from "@tanstack/react-query";
import {
  applyCoupon,
  getCoupons,
} from "@/services/checkoutservices/applyCoupon";

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: applyCoupon,
  });
};

// Get available coupons query hooknm
export const useGetCoupons = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
    enabled, // ✅ only fetches when panel opens
  });
};
