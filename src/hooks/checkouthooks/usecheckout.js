// Updated usecheckout hook
import { useMutation } from "@tanstack/react-query";
import { checkout } from "@/services/checkoutservices/checkout";

export const usecheckout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (couponCode) => checkout(couponCode),
  });

  return { mutate, isPending };
};
