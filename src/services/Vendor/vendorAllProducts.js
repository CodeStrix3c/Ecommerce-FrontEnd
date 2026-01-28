import axiosInstance from "@/api/client/axiosInstance";

export const vendorAllProducts = async (payload) => {
  const response = await axiosInstance.post(
    "/api/catalog/ProductsApi/grid",
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
