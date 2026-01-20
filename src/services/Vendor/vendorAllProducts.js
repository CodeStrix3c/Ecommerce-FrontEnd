import axiosInstance from "@/api/client/axiosInstance";

export const vendorAllProducts = async (payload) => {
  const response = await axiosInstance.post("/api/products", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
