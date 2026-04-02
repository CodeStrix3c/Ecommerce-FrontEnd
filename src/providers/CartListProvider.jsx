import {
  useAddToCart,
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/User/Cart/usecartitems";

import { createContext, useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUser } from "./UserProvider";

const CartListContext = createContext();

export const CartListProvider = ({ children }) => {
  const { token } = useUser();
  const queryClient = useQueryClient();

  /* -------------------- API HOOKS -------------------- */
  const { data, isLoading } = useGetCartItems();
  const { mutateAsync: addItem } = useAddToCart();
  const { mutateAsync: removeItem } = useRemoveFromCart();
  const { mutateAsync: updateItemQuantity } = useUpdateCartQuantity();

  /* -------------------- FULL CART DATA -------------------- */
  const cartItems = data?.items || [];
  const subTotal = data?.subTotal || 0;
  const discount = data?.discount || 0;
  const subTotalWithDiscount = data?.subTotalWithDiscount || 0;

  /* -------------------- CLEAR CACHE ON LOGOUT -------------------- */
  useEffect(() => {
    if (!token) {
      queryClient.removeQueries({ queryKey: ["cart"] });
    }
  }, [token, queryClient]);

  /* -------------------- ADD TO CART -------------------- */
  const addToCartList = async (payload) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    await addItem({
      productId: payload.productId,
      quantity: payload.quantity || 1,
      variationName: payload.variationName || "",
    });
  };

  /* -------------------- REMOVE -------------------- */
  const removeFromCart = async (cartItemId) => {
    await removeItem({ cartItemId });
  };

  /* -------------------- UPDATE QUANTITY -------------------- */
  const updateQuantity = async (cartItemId, quantity) => {
    await updateItemQuantity({ cartItemId, quantity });
  };

  /* -------------------- CLEAR CART -------------------- */
  const clearCart = async () => {
    await Promise.all(
      cartItems.map((item) => removeItem({ cartItemId: item.id })),
    );
  };

  return (
    <CartListContext.Provider
      value={{
        cartList: cartItems,
        subTotal,
        discount,
        subTotalWithDiscount,
        isLoading,
        addToCartList,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartListContext.Provider>
  );
};

export const useCartList = () => useContext(CartListContext);
