import axiosInstance from "@/api/axiosInstance";

export const getorderHistoryData = async () => {
  const {data} =  await axiosInstance.get("/data/orderHistoryPage/orderHistoryData.json", {
    auth: false,
   });

  return data;
};