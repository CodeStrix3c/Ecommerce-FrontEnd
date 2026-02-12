import axiosInstance from "@/api/client/axiosInstance";

// POST → add item
export const addToWishlist = async ({ productId, quantity }) => {
  const res = await axiosInstance.post(
    "/api/wishList/AddItem",
    { productId, quantity },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
};

// DELETE → remove item (id === productId)
export const removeFromWishList = async (productId) => {
  const res = await axiosInstance.delete("/api/wishList/RemoveItem", {
    params: { id: productId },
  });
  return res.data;
};

// GET → wishlist items
export const getWishlistItems = async ({ pageNumber = 1, pageSize = 50 }) => {
  const res = await axiosInstance.get("/api/wishList/PrivateList", {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return res.data;
};
