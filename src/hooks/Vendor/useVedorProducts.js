import {
  vendorAllProducts,
  vendorSearchProducts,
  venderProductAssign,
  removeVendorProduct,
  updateVendorProduct,
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

export const useRemoveVendorProduct = () => {
  return {
    mutationFn: removeVendorProduct,
  };
};

// hooks/Vendor/useVedorProducts.ts
export const useUpdateVendorProduct = () => {
  return {
    mutationFn: updateVendorProduct,
  };
};
