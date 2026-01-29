import axiosInstance from "@/api/client/axiosInstance";

export const getProfileApi = async (userId) => {
    if (!userId) throw new Error("UserId is missing!");

    const { data } = await axiosInstance.get(
        `/api/core/userProfile/GetProfileByUserId?userId=${userId}`,
        // { auth: false } // ✅ disables token
    );

    return data;
};






export const updateUserProfileApi = async (id, payload) => {
    if (!id) throw new Error("Profile id missing!");

    const { data } = await axiosInstance.put(
        `/api/core/userProfile/${id}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json-patch+json",
            },
        }
    );

    return data;
};



// export const deleteUserProfileApi = async (userId) => {
//     if (!userId) throw new Error("UserId is missing!");

//     const { data } = await axiosInstance.delete(
//         `/api/core/userProfile/?userId=${userId}`
//     );

//     return data;
// };
