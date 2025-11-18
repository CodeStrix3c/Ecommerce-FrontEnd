import axiosInstance from "@/api/axiosInstance";

export const getSprayPageData = async () => {
  const { data } = await axiosInstance.get("/data/sprayPage/sprayPageData.json", {
    auth: false,
  });

  return data;
};

export const getSprayCardData = async () => {
  const { data } = await axiosInstance.get("/data/sprayPage/sprayCardData.json", {
    auth: false,
  });

  return data;
};


