import {
  addAddress,
  addShippingAddress,
  getExistingAddresses,
  getUserAddresses,
  updateTaxAndShippingPrices,
} from "@/services/addressServices/addressservice";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useAddAddress = () => {
  return useMutation({
    mutationFn: (payload) => addAddress(payload),
  });
};

export const useUserAddresses = () => {
  return useQuery({
    queryKey: ["user-addresses"],
    queryFn: getUserAddresses,
  });
};

export const useCheckoutShipping = (checkoutId) => {
  return useQuery({
    queryKey: ["checkout-shipping", checkoutId],
    queryFn: () => getExistingAddresses(checkoutId),
    enabled: !!checkoutId,
  });
};

export const useAddShippingAddress = () => {
  return useMutation({
    mutationFn: addShippingAddress,
  });
};

export const useUpdateShippingPrices = () => {
  return useMutation({
    mutationFn: updateTaxAndShippingPrices,
  });
};
