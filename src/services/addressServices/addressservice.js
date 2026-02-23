import axiosInstance from "@/api/client/axiosInstance";

export const addAddress = async (payload) => {
  const { data } = await axiosInstance.post("/create", payload);
  return data;
};

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

export const getCountries = async () => {
  const { data } = await axiosInstance.get("/api/countries");
  return data;
};

export const getStates = async (countryId) => {
  const { data } = await axiosInstance.get(
    `/api/country-states-provinces/${countryId}`,
  );
  return data;
};

export const getDistricts = async (stateId) => {
  const { data } = await axiosInstance.get(
    `/api/states-provinces/${stateId}/districts`,
  );
  return data;
};
