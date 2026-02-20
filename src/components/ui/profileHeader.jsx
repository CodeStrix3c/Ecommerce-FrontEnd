import { Camera, CheckCircle2, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFileUploadMutation } from "@/hooks/User/Profile/useFileUpload";
import { useUpdateUserProfile } from "@/hooks/User/Profile/useUserProfile";

export default function UserProfileHeader({ data }) {
  const fileInputRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: updateProfile } = useUpdateUserProfile();

  const isLoading = isUploading;

  const name = data?.fullName || "";
  const email = data?.email || "";

  // ✅ WhatsApp-style initials
  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const hasImage = !!data?.profilePic;

  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    if (showMenu) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // ---------------- HANDLERS ----------------

  const handleMainButtonClick = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    if (!hasImage) {
      fileInputRef.current?.click();
    } else {
      setShowMenu((prev) => !prev);
    }
  };

  const handleChangePhotoClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    fileInputRef.current?.click();
  };

  const handleRemoveClick = async (e) => {
    e.stopPropagation();
    setShowMenu(false);

    try {
      await updateProfile({
        id: data.id,
        payload: { ...data, profilePic: "" },
      });
      toast.success("Profile picture removed");
    } catch {
      toast.error("Failed to remove picture");
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const uploadRes = await uploadFileAsync({
        file,
        UserType: "User",
        UserId: data?.id,
        FileCategory: "ProfilePicture",
      });

      const fileUrl = uploadRes?.fileUrl || uploadRes?.data;
      if (!fileUrl) throw new Error();

      await updateProfile({
        id: data.id,
        payload: { ...data, profilePic: fileUrl },
      });

      toast.success("Profile picture updated");
    } catch {
      toast.error("Failed to update picture");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-8 p-6 border border-gray-100 shadow-sm rounded-2xl transition-all duration-300 mb-2">
      {/* ================= AVATAR ================= */}
      <div className="relative group flex-shrink-0">
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-black bg-gray-100 relative transition-all duration-500">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {hasImage ? (
            <img
              src={data.profilePic}
              alt="Profile"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-black">
              <span className="text-4xl font-black text-white">
                {initials || "NA"}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="absolute bottom-2 right-2 flex items-center">
          <button
            type="button"
            onClick={handleMainButtonClick}
            className={`
              h-10 w-10 rounded-full bg-black text-white
              flex items-center justify-center border-4 border-white shadow-lg
              transition-all duration-300 hover:scale-105 active:scale-95
              ${showMenu ? "rotate-90" : ""}
            `}
          >
            {hasImage ? (
              showMenu ? (
                <X className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>

          {/* Slide Menu */}
          {hasImage && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                absolute right-1/2 top-1/2 -translate-y-1/2
                flex items-center gap-2 bg-white pl-8 pr-3 rounded-full shadow-md border
                transition-all duration-300
                ${
                  showMenu
                    ? "opacity-100 translate-x-[100%]"
                    : "opacity-0 w-0 pointer-events-none"
                }
              `}
            >
              <button
                onClick={handleChangePhotoClick}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-gray-300"></div>

              <button
                onClick={handleRemoveClick}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleProfilePicChange}
        />
      </div>

      {/* ================= NAME + EMAIL ================= */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize">
            {name || "Your Name"}
          </h2>
          <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50" />
        </div>

        {/* ✅ Email stays exactly as stored (no uppercase) */}
        <p className="text-sm text-gray-500 mt-1">{email || "N/A"}</p>
      </div>
    </div>
  );
}
