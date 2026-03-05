import axiosInstance from "@/api/client/axiosInstance";

export const createOrder = async ({ checkoutId }) => {
  const { data } = await axiosInstance.post(
    `/api/CoD/CoDCheckout?checkoutId=${checkoutId}`,
  );

  return data;
};
