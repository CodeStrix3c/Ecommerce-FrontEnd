import React from "react";
import { Pencil } from "lucide-react";

export default function ProfileAvatar({
  avatar,
  onEdit,
  size = "w-24 h-24 sm:w-32 sm:h-32",
}) {
  return (
    <div className={`relative ${size} flex-shrink-0 mx-auto sm:mx-0`}>
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-full h-full object-cover rounded-full border border-[var(--color-gray)]"
      />
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute bottom-0 right-0 bg-[var(--color-secondary)] text-[var(--color-white)] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-secondary-hover)] transition"
        >
          <Pencil size={16} />
        </button>
      )}
    </div>
  );
}
