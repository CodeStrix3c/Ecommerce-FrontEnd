const { default: axiosInstance } = require("@/api/client/axiosInstance");

export const getCategories = async () => {
  const { data } = await axiosInstance.get("//api/categories");
  return data;
};
