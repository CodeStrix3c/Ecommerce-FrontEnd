import { Camera, CheckCircle2, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFileUploadMutation } from "@/hooks/User/Profile/useFileUpload";
import { useUpdateUserProfile } from "@/hooks/User/Profile/useUserProfile";

export default function UserProfileHeader({ data }) {
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: updateProfile } = useUpdateUserProfile();

  const name = data?.fullName || "";
  const email = data?.email || "";
  const hasImage = !!data?.profilePic;

  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  /* ================= CLOSE MENU OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  /* ================= MAIN BUTTON CLICK ================= */
  const handleMainButtonClick = (e) => {
    e.stopPropagation();
    if (isUploading) return;

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

  /* ================= UPLOAD ================= */
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
    <div className="lg:mt-24 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 p-6 sm:p-8 border border-gray-100 shadow-sm rounded-2xl mb-4">


      <div className="relative flex-shrink-0" ref={menuRef}>
        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-[var(--color-secondary)] bg-gray-100 relative">

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {hasImage ? (
            <img
              src={data.profilePic}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-black">
              <span className="text-3xl sm:text-4xl font-black text-white">
                {initials || "NA"}
              </span>
            </div>
          )}
        </div>


        <div className="absolute bottom-2 right-0 flex items-center">

          <div className="relative flex items-center">


            <button
              type="button"
              onClick={handleMainButtonClick}
              className="h-10 w-10 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center border-4 border-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 z-20"
            >
              {hasImage ? (
                showMenu ? (
                  <X className="h- w-4" />
                ) : (
                  <Pencil className="h-2 w-2" />
                )
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>


            {hasImage && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`
                  absolute left-full ml-3
                  flex items-center gap-3
                  bg-white px-3 py-2
                  rounded-full shadow-lg border
                  transition-all duration-300 ease-in-out
                  ${showMenu
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-3 pointer-events-none"
                  }
                `}
              >
                <button
                  onClick={handleChangePhotoClick}
                  className="h-9 w-9 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 transition"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <div className="h-5 w-[1px] bg-gray-300"></div>

                <button
                  onClick={handleRemoveClick}
                  className="h-9 w-9 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleProfilePicChange}
        />
      </div>


      <div className="flex flex-col text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize">
            {name || "Your Name"}
          </h2>
          <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50" />
        </div>

        <p className="text-sm text-gray-500 mt-1 break-all">
          {email || "N/A"}
        </p>
      </div>
    </div>
  );
}