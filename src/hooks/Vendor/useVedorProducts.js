import {
  vendorAllProducts,
  vendorSearchProducts,
  venderProductAssign,
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

export const useVendorProductAssign = () => {
  return {
    mutationFn: venderProductAssign,
  };
};
