import { vendorAllProducts } from "@/services/Vendor/vendorAllProducts";

const useVendorProducts = () => {
  return {
    mutationFn: vendorAllProducts,
  };
};

export default useVendorProducts;
