import axiosInstance from "@/api/client/axiosInstance";

export const getCountries = async () => {
  const { data } = await axiosInstance.get("/api/countries");
  return data; // return only data
};
