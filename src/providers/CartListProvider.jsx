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
} from "@/hooks/User/Cart/usecartitems";
import { createContext, useContext } from "react";

const CartListContext = createContext();

export const CartListProvider = ({ children }) => {
  /* -------------------- API HOOKS -------------------- */
  const { data, isLoading } = useGetCartItems();
  const { mutate: addItem } = useAddToCart();
  const { mutate: removeItem } = useRemoveFromCart();

  /* -------------------- CART DATA -------------------- */
  const cartList = data?.items || [];
  // adjust based on your API response shape

  /* -------------------- ADD TO CART -------------------- */
  const addToCartList = (payload) => {
    console.log("CartProvider addToCartList called with:", payload);

    // Ensure we have the correct structure
    const cartPayload = {
      productId: payload.productId,
      quantity: payload.quantity || 1,
      variationName: payload.variationName || "",
    };

    console.log("Calling addItem mutation with:", cartPayload);

    addItem(cartPayload);
  };

  /* -------------------- TOGGLE CART -------------------- */
  const toggleCartList = (product) => {
    const exists = cartList.find(
      (item) => item.productId === product.productId,
    );

    if (exists) {
      removeItem({ productId: product.productId });
    } else {
      addItem({
        productId: product.productId,
        quantity: 1,
        variationName: product.variationName || "",
      });
    }
  };

  /* -------------------- REMOVE -------------------- */
  const removeFromCart = (id) => {
    removeItem({ id });
  };

  /* -------------------- UPDATE QUANTITY -------------------- */
  const updateQuantity = (productId, quantity) => {
    addItem({
      productId,
      quantity,
      variationName: "",
    });
  };

  /* -------------------- CLEAR CART -------------------- */
  const clearCart = () => {
    cartList.forEach((item) => {
      removeItem({ productId: item.productId });
    });
  };

  return (
    <CartListContext.Provider
      value={{
        cartList,
        isLoading,
        toggleCartList,
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
