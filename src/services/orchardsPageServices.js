import axiosInstance from "@/api/client/axiosInstance";

export const getOrchardsPageData = async () => {
  const { data } = await axiosInstance.get("/data/orchardsPage/orchardsPageData.json", {
    auth: false,
  });

  return data;
};



