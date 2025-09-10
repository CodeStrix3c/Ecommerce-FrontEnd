import { createContext, useState, useContext } from "react";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (place) => {
    setWishlist((prev) => {
      if (prev.find((item) => item._id === place._id)) return prev; // prevent duplicates
      return [...prev, place];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  const clearWishlist = () => setWishlist([]);

  const toggleWishlist = (place) => {
    const exists = wishlist.find((item) => item._id === place._id);
    exists ? removeFromWishlist(place._id) : addToWishlist(place);
  };

  return (
    <WishListContext.Provider
      value={{ wishlist,addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist,}}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
