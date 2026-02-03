// services/Vendor/vendorProfile.js
import axiosInstance from "@/api/client/axiosInstance";

export const vendorProfile = async (vendorId) => {
  const response = await axiosInstance.get(`/api/vendors/${vendorId}`);
  return response.data;
};

export const updateVendorProfile = async ({ vendorId, payload }) => {
  const response = await axiosInstance.put(`/api/vendors/${vendorId}`, payload);
  return response.data;
};
