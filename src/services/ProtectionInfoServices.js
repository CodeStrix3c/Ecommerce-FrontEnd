import axiosInstance from "@/api/client/axiosInstance";

export const FAQs = async () => {
  const { data } = await axiosInstance.get("/data/ProtectionInfo/FAQs.json", {
    auth: false,
  });

  return data;
};

export const MethodSectionData = async () => {
  const { data } = await axiosInstance.get("/data/ProtectionInfo/MethodsSection.json", {
    auth: false,
  });

  return data;
};
export const PestDiseaseData = async () => {
  const { data } = await axiosInstance.get("/data/ProtectionInfo/pestDisease.json", {
    auth: false,
  });

  return data;
};