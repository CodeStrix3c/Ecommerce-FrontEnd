import axiosInstance from "@/api/client/axiosInstance";

export const addAddress = async (payload) => {
  const data = axiosInstance.post("/create", payload);
  return data;
};

export const getUserAddresses = async () => {
  const { data } = await axiosInstance.get("/list");
  return data;
}



export const deleteUserAddress = async (userAddressId) => {
  const { data } = await axiosInstance.post("/Delete", null, {
    params: { id: userAddressId },
  });
  return data;
};

export const getExistingAddressess = async (userAddressId) => {
  const { data } = await axiosInstance.get("/Edit", {
    params: { id: userAddressId },
  });
  return data;
};

export const editUserAddress = async ({ userAddressId, payload }) => {
  const { data } = await axiosInstance.post(
    "/Edit",
    payload,
    {
      params: { id: userAddressId }, 
    }
  );
  return data;
};

export const postSetDefaultAddress = async (userAddressId) => {
  const { data } = await axiosInstance.post("/SetAsDefault", null, {
    params: { id: userAddressId },
  });
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
