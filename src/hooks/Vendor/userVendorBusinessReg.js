import { vendorBusinessReg } from "@/services/Vendor/vendorBusinessRegService";
import { useMutation } from "@tanstack/react-query";

const useVendorBusinessReg = () => {
  return useMutation({
    mutationFn: vendorBusinessReg,
  });
};

export default useVendorBusinessReg;
