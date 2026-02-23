import axiosInstance from "@/api/client/axiosInstance";

export const getDistricts = async (stateId) => {
  if (!stateId) return [];

  const { data } = await axiosInstance.get(
    `/api/states-provinces/${stateId}/districts`,
  );

  return data;
};
