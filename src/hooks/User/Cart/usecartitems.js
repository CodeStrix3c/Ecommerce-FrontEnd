import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addToCart,
  removeFromCart,
  getAllCartProducts,
  updateCartQuantity,
} from "@/services/User/Cart/cartitems";

/* -------------------- GET CART ITEMS -------------------- */
import { useUser } from "@/providers/UserProvider";

export const useGetCartItems = () => {
  const { token } = useUser();

  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartProducts,
    enabled: !!token, // ✅ THIS IS THE FIX
  });
};

/* -------------------- ADD TO CART -------------------- */
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Refetch cart after adding
      toast.success("Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

/* -------------------- REMOVE FROM CART -------------------- */
// export const useRemoveFromCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: removeFromCart,
//     onSuccess: () => {
//       // Refetch cart after removing
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,

    onSuccess: () => {
      // ✅ Show success message
      toast.success("Product removed from cart");

      // ✅ Refetch cart after removing
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      // ✅ Show error message
      toast.error(
        error?.response?.data?.message || "Failed to remove product from cart",
      );
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      // refresh cart after update
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
};
