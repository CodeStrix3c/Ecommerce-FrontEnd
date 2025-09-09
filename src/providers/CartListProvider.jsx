import { createContext, useState, useContext } from "react";

const CartListContext = createContext();

export const CartListProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const toggleCartList = (place) => {
    setCartList((prev) => {
      const exists = prev.find((item) => item._id === place._id);
      if (exists) {
        return prev.filter((item) => item._id !== place._id);
      } else {
        return [...prev, place];
      }
    });
  };

   const removeFromCart = (id) => {
    setCartList((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartList([]); 
  };

  return (
    <CartListContext.Provider value={{ cartList, toggleCartList, removeFromCart, clearCart }}>
      {children}
    </CartListContext.Provider>
  );
};

export const useCartList = () => useContext(CartListContext);
