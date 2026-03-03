import {
  addAddress,
  addShippingAddress,
  deleteUserAddress,
  editUserAddress,
  getExistingAddresses,
  getExistingAddressess,
  getUserAddresses,
  postSetDefaultAddress,
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

 export const useDeleteUserAddress = () => {
  return useMutation({
    mutationFn: (userAddressId) => deleteUserAddress(userAddressId),
  });
};

export const useExistingAddress = (userAddressId) => {
  return useQuery({
    queryKey: ["existing-addresses", userAddressId],
    queryFn: () => getExistingAddressess(userAddressId), 
    enabled: !!userAddressId,
  });
};

export const useEditUserAddress = () => {
  return useMutation({
    mutationFn: ({ userAddressId, payload }) =>
      editUserAddress({ userAddressId, payload }),
  });
}

export const useSetDefaultAddress = () => {
  return useMutation({
    mutationFn: (userAddressId) => postSetDefaultAddress(userAddressId),});
  }

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
