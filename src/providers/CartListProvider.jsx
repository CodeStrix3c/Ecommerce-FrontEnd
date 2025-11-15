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
    
        return [...prev, { ...place, quantity: 1 }];
      }
    });
  };


  const addToCartList = (place) => {
    setCartList((prev) => {
      const exists = prev.find((item) => item._id === place._id);
      if (exists) {
      
        return prev.map((item) =>
          item._id === place._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...place, quantity: 1 }];
    });
  };


  const removeFromCart = (id) => {
    setCartList((prev) => prev.filter((item) => item._id !== id));
  };

  
  const clearCart = () => setCartList([]);

  
  const updateQuantity = (id, quantity) => {
    setCartList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartListContext.Provider
      value={{
        cartList,
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
