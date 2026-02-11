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
export const removeFromCart = async ({ id }) => {
  const { data } = await axiosInstance.post("/cart/remove-item", id, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

/* -------------------- GET CART ITEMS -------------------- */
export const getAllCartProducts = async () => {
  const { data } = await axiosInstance.get("/cart/list");
  return data;
};
