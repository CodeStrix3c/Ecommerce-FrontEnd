import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishList,
} from "@/services/User/Wishlist/wishlistitems";

/* GET WISHLIST */
export const useGetWishlist = (userId) => {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlistItems({ userId }),
    enabled: !!userId,
    select: (data) => data?.items?.data || [],
  });
};

/* ADD ITEM */
export const useAddWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
};

/* REMOVE ITEM */
export const useRemoveWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
};
