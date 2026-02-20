// services/fileUploadService.js
import axiosInstance from "@/api/client/axiosInstance";

/**
 * Upload File (Profile Picture, Documents, etc.)
 */
export const uploadFile = async ({ file, UserType, UserId, FileCategory }) => {
  const formData = new FormData();

  // Append actual File object
  formData.append("File", file);

  formData.append("UserType", UserType);
  formData.append("UserId", UserId);
  formData.append("FileCategory", FileCategory);

  const response = await axiosInstance.post(
    "/api/FileUpload/upload",
    formData,
    {
      headers: {
        // Let browser automatically set boundary
        "Content-Type": undefined,
      },
    },
  );

  return response.data;
};

/**
 * Delete Uploaded File
 */
export const deleteUploadedFile = async ({ blobName, userId }) => {
  const response = await axiosInstance.post("/api/FileUpload/delete", {
    blobName,
    userId, // ✅ send this
  });

  return response.data;
};
