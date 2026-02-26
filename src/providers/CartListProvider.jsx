// import { createContext, useState, useContext } from "react";

// const CartListContext = createContext();

// export const CartListProvider = ({ children }) => {
//   const [cartList, setCartList] = useState([]);

//   const toggleCartList = (place) => {
//     setCartList((prev) => {
//       const exists = prev.find((item) => item._id === place._id);
//       if (exists) {
//         return prev.filter((item) => item._id !== place._id);
//       } else {

//         return [...prev, { ...place, quantity: 1 }];
//       }
//     });
//   };

//   const addToCartList = (place) => {
//     setCartList((prev) => {
//       const exists = prev.find((item) => item._id === place._id);
//       if (exists) {

//         return prev.map((item) =>
//           item._id === place._id
//             ? { ...item, quantity: (item.quantity || 1) + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...place, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartList((prev) => prev.filter((item) => item._id !== id));
//   };

//   const clearCart = () => setCartList([]);

//   const updateQuantity = (id, quantity) => {
//     setCartList((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   return (
//     <CartListContext.Provider
//       value={{
//         cartList,
//         toggleCartList,
//         addToCartList,
//         removeFromCart,
//         clearCart,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </CartListContext.Provider>
//   );
// };

// export const useCartList = () => useContext(CartListContext);

import {
  useAddToCart,
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/User/Cart/usecartitems";

import { createContext, useContext, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUser } from "./UserProvider";

const CartListContext = createContext();

export const CartListProvider = ({ children }) => {
  const { token } = useUser();
  const queryClient = useQueryClient();

  /* -------------------- API HOOKS -------------------- */
  const { data, isLoading } = useGetCartItems();
  const { mutate: addItem } = useAddToCart();
  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: updateItemQuantity } = useUpdateCartQuantity();

  /* -------------------- CART DATA -------------------- */

  // ✅ 1. Keep items array (NO BREAKING CHANGES)
  const cartList = data?.items || [];

  // ✅ 2. Also expose full response
  const cartResponse = data || null;

  // ✅ Optional helpers (safe defaults)
  const subTotal = data?.subTotal || 0;
  const discount = data?.discount || 0;
  const subTotalWithDiscount = data?.subTotalWithDiscount || 0;
  const isValid = data?.isValid ?? true;

  /* -------------------- CLEAR CACHE ON LOGOUT -------------------- */
  useEffect(() => {
    if (!token) {
      queryClient.removeQueries({ queryKey: ["cart"] });
    }
  }, [token, queryClient]);

  /* -------------------- ADD TO CART -------------------- */
  const addToCartList = (payload) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    addItem({
      productId: payload.productId,
      quantity: payload.quantity || 1,
      variationName: payload.variationName || "",
    });
  };

  /* -------------------- REMOVE -------------------- */
  const removeFromCart = (cartItemId) => {
    removeItem({ cartItemId });
  };

  /* -------------------- UPDATE QUANTITY -------------------- */
  const updateQuantity = (cartItemId, quantity) => {
    updateItemQuantity({ cartItemId, quantity });
  };

  /* -------------------- CLEAR CART -------------------- */
  const clearCart = () => {
    cartList.forEach((item) => {
      removeItem({ cartItemId: item.id });
    });
  };

  /* -------------------- CONTEXT VALUE -------------------- */
  const value = useMemo(
    () => ({
      // 🔥 OLD STRUCTURE (unchanged)
      cartList,
      isLoading,

      // 🔥 NEW STRUCTURE (full response)
      cartResponse,
      subTotal,
      discount,
      subTotalWithDiscount,
      isValid,

      // 🔥 Actions
      addToCartList,
      removeFromCart,
      clearCart,
      updateQuantity,
    }),
    [
      cartList,
      cartResponse,
      subTotal,
      discount,
      subTotalWithDiscount,
      isValid,
      isLoading,
    ],
  );

  return (
    <CartListContext.Provider value={value}>
      {children}
    </CartListContext.Provider>
  );
};

export const useCartList = () => useContext(CartListContext);
