import { getPaymentProviders } from "@/services/paymentServices/getpaymentServices";
import { useQuery } from "@tanstack/react-query";

export const usePaymentProviders = () => {
  return useQuery({
    queryKey: ["paymentproviders"],
    queryFn: getPaymentProviders,
  });
};
