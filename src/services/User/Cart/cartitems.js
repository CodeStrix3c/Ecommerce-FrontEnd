import axiosInstance from "@/api/client/axiosInstance";

/* -------------------- ADD TO CART -------------------- */
export const addToCart = async ({ productId, quantity, variationName }) => {
  const { data } = await axiosInstance.post(
    "/cart/add-item",
    { productId, quantity, variationName },
    { headers: { "Content-Type": "application/json" } },
  );

  return data;
};

/* -------------------- REMOVE FROM CART -------------------- */
export const removeFromCart = async ({ cartItemId }) => {
  const { data } = await axiosInstance.post("/cart/remove-item", cartItemId);

  return data;
};

/* -------------------- GET CART ITEMS -------------------- */
export const getAllCartProducts = async () => {
  const { data } = await axiosInstance.get("/cart/list");
  return data;
};

export const updateCartQuantity = async ({ cartItemId, quantity }) => {
  const { data } = await axiosInstance.post(
    "/cart/update-item-quantity",
    { cartItemId, quantity },
    { headers: { "Content-Type": "application/json" } },
  );
  return data;
};
