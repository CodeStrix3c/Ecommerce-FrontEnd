import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  removeFromCart,
  getAllCartProducts,
} from "@/services/User/Cart/cartitems";

/* -------------------- GET CART ITEMS -------------------- */
export const useGetCartItems = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartProducts,
  });
};

/* -------------------- ADD TO CART -------------------- */
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Refetch cart after adding
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

/* -------------------- REMOVE FROM CART -------------------- */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      // Refetch cart after removing
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
