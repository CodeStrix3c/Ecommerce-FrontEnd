import axiosInstance from "@/api/axiosInstance";

export const signup = async (userData) => {
  // console.log(userData, "userData....");

  const { data } = await axiosInstance.post("/register", userData);

  return data;
};

export const login = async (credentials) => {
  const { data: loginRes } = await axiosInstance.post("/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });

  if (!loginRes?.success || !loginRes?.userId) {
    throw new Error("Invalid credentials");
  }

  const { data: tokenRes } = await axiosInstance.get(
    `/generate-token?userId=${loginRes.userId}`
  );

  if (!tokenRes?.token) {
    throw new Error("Failed to fetch JWT token");
  }

  localStorage.setItem("jwtToken", tokenRes.token);

  return {
    ...loginRes,
    token: tokenRes.token,
  };
};

export const logout = () => {
  //   localStorage.removeItem("jwtToken");
};
