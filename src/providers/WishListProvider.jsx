import { createContext, useState, useContext } from 'react';

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (place) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === place._id);
      if (exists) {
        return prev.filter((item) => item._id !== place._id);
      } else {
        return [...prev, place]; // add
      }
    });
  };

  return (
    <WishListContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
