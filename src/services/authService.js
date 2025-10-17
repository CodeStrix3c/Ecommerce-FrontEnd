import axiosInstance from "@/api/axiosInstance";

export const signup = async (userData) => {
  console.log(userData, "userData....");

  const { data } = await axiosInstance.post("/register", userData);

  return data;
};

export const login = async (credentials) => {
  const { data } = await axiosInstance.post("/login", credentials, {
    auth: false,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data.token) {
    localStorage.setItem("jwtToken", data.token);
  }

  return data;
};

export const logout = () => {
  //   localStorage.removeItem("jwtToken");
};
