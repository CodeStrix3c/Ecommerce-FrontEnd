import axiosInstance from "@/api/client/axiosInstance";

export const getStates = async (countryId) => {
  if (!countryId) return [];

  const { data } = await axiosInstance.get(
    `/api/countries/${countryId}/states-provinces`,
  );

  return data;
};
