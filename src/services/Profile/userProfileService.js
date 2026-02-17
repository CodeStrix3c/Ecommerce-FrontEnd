import axiosInstance from "@/api/client/axiosInstance";

export const getProfileApi = async (userId) => {
  if (!userId) throw new Error("UserId is missing!");

  const { data } = await axiosInstance.get(
    `/api/core/userProfile/GetProfileByUserId?userId=${userId}`,
  );

  return data;
};

export const updateUserProfileApi = async (id, formData) => {
  const response = await axiosInstance.put(
    `/api/core/userProfile/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    },
  );

  return response.data;
};

// export const deleteUserProfileApi = async (userId) => {
//     if (!userId) throw new Error("UserId is missing!");

//     const { data } = await axiosInstance.delete(
//         `/api/core/userProfile/?userId=${userId}`
//     );

//     return data;
// };
