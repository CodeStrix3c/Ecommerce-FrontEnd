import axiosInstance from "@/api/client/axiosInstance";
import { getItemFromLocalStorage } from "@/utils/localStorage";

export const vendorAllProducts = async (payload) => {
  const vendorId = getItemFromLocalStorage("vendorId");
  const response = await axiosInstance.post(
    `/api/vendors/${vendorId}/products/grid`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

// services/Vendor/vendorAllProducts.js
export const vendorSearchProducts = async ({ name }) => {
  const response = await axiosInstance.get("/api/products/quick-search", {
    params: {
      name, // ✅ query param
    },
  });

  return response.data;
};

export const venderProductAssign = async ({ payload }) => {
  const vendorId = getItemFromLocalStorage("vendorId");
  const response = await axiosInstance.post(
    `/api/vendors/${vendorId}/products/assign`,
    payload,
  );
  return response.data;
};
