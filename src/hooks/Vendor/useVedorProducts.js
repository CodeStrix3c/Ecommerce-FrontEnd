import {
  vendorAllProducts,
  vendorSearchProducts,
} from "@/services/Vendor/vendorAllProducts";

export const useVendorProducts = () => {
  return {
    mutationFn: vendorAllProducts,
  };
};

export const useVendorSearch = () => {
  return {
    mutationFn: vendorSearchProducts,
  };
};
