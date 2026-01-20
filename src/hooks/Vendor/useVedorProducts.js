import { vendorAllProducts } from "@/services/Vendor/vendorAllProducts";
import { useMutation } from "@tanstack/react-query";

const useVendorProducts = () => {
  return {
    mutationFn: vendorAllProducts,
  };
};

export default useVendorProducts;
