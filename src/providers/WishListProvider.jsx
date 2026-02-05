// import { createContext, useState, useContext } from "react";

// const WishListContext = createContext();

// export const WishListProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const addToWishlist = (place) => {
//     setWishlist((prev) => {
//       if (prev.find((item) => item._id === place._id)) return prev; // prevent duplicates
//       return [...prev, place];
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== id));
//   };

//   const clearWishlist = () => setWishlist([]);

//   const toggleWishlist = (place) => {
//     const exists = wishlist.find((item) => item._id === place._id);
//     exists ? removeFromWishlist(place._id) : addToWishlist(place);
//   };

//   return (
//     <WishListContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         clearWishlist,
//         toggleWishlist,
//       }}
//     >
//       {children}
//     </WishListContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishListContext);

import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import {
  useAddWishlistItem,
  useGetWishlist,
  useRemoveWishlistItem,
} from "@/hooks/User/Wishlist/usewishlistitems";

const WishlistContext = createContext(null);

export const WishListProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");

  const { data: wishlist = [], isLoading } = useGetWishlist(userId);
  const addMutation = useAddWishlistItem();
  const removeMutation = useRemoveWishlistItem();

  const toggleWishlist = (product) => {
    const productId = product.id;

    const existingItem = wishlist.find((item) => item.productId === productId);

    if (existingItem) {
      // ✅ USE wishlist-item id
      removeMutation.mutate(existingItem.id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else {
      addMutation.mutate(
        { productId, quantity: 1 },
        { onSuccess: () => toast.success("Added to wishlist ❤️") },
      );
    }
  };

  const removeFromWishlist = (wishlistItemId) => {
    removeMutation.mutate(wishlistItemId, {
      onSuccess: () => toast.success("Removed from wishlist"),
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
