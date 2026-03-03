import axiosInstance from "@/api/client/axiosInstance";

export const supplierSignup = async (userData) => {
  const { data } = await axiosInstance.post();
};

export const signup = async (userData) => {
  // console.log(userData, "userData....");

  const { data } = await axiosInstance.post("/register", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    "/api/core/account/login",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  // if (!loginRes?.success || !loginRes?.userId) {
  //   throw new Error("Invalid credentials");
  // }

  // const { data: tokenRes } = await axiosInstance.get(
  //   `/generate-token?userId=${loginRes.userId}`
  // );

  // if (!tokenRes?.token) {
  //   throw new Error("Failed to fetch JWT token");
  // }

  localStorage.setItem("token", data.token);

  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/api/core/account/logout");
  return data;
};
