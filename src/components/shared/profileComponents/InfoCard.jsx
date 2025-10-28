import React from "react";

const UserHeaderCard = ({ title, image, name }) => {
  return (
    <div>
      {/* Title */}
      <div className="flex justify-center">
        <h1 className="py-5 text-2xl font-bold text-[var(--color-black)]">
          {title}
        </h1>
      </div>
      {/* User Info Card */}
      <div className="flex items-center space-x-4 mb-6 bg-[var(--color-black-hover)] p-2 rounded-sm">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white"
        />
        <div>
          <div className="text-lg font-bold text-gray-800">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default UserHeaderCard;
