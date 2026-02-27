import axiosInstance from "@/api/client/axiosInstance";

export const addAddress = async (payload) => {
  const data = axiosInstance.post("/create", payload);
  return data;
};

export const getUserAddresses = async () => {
  const { data } = await axiosInstance.get("/list");
  return data;
}

export const getExistingAddresses = async (checkoutId) => {
  const { data } = await axiosInstance.get(`/checkout/${checkoutId}/shipping`);
  return data;
};

export const addShippingAddress = async ({ checkoutId, payload }) => {
  const { data } = await axiosInstance.post(
    `/checkout/${checkoutId}/shipping`,
    payload,
  );
  return data;
};

export const updateTaxAndShippingPrices = async ({ checkoutId, payload }) => {
  const { data } = await axiosInstance.post(
    `/checkout/${checkoutId}/update-tax-and-shipping-prices`,
    payload,
  );
  return data;
};
