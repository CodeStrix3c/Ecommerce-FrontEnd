import axiosInstance from "@/api/axiosInstance";

export const getFaqData = async () => {
 const {data} = await axiosInstance.get("/data/helpCenter/FaqData.json", {
    auth: false,
   });

  return data;
};
export const getCardsData = async () => {
  const {data} =  await axiosInstance.get("/data/helpCenter/CardsData.json", {
    auth: false,
   });

  return data;
};

export const getTopArticlesData = async () => {
  const { data } =  await axiosInstance.get("/data/helpCenter/TopArticlesData.json", {
    auth: false,
   });

  return data;
};

export const getGuidesAndResourcesData = async () => {
   const {data} =  await axiosInstance.get("/data/helpCenter/Guides&ResourcesData.json", {
    auth: false,
   });

  return data;
};

export const getBottomCardData = async () => {
  const { data } =   await axiosInstance.get("/data/helpCenter/BottomCardData.json", {
    auth: false,
   });

  return data;
};

